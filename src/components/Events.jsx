import { useEffect, useState } from "react";
import PropTypes from "prop-types";

const Events = ({ daysInMonth }) => {
  const resources = [
    "Resource A",
    "Resource B",
    "Resource C",
    "Resource D",
    "Resource E",
    "Resource F",
    "Resource G",
    "Resource H",
  ];

  const [events, setEvents] = useState(() => {
    const savedEvents = localStorage.getItem("events");
    return savedEvents ? JSON.parse(savedEvents) : {};
  });

  const [draggingEvent, setDraggingEvent] = useState(null);

  // Save events to localStorage whenever they change
  useEffect(() => {
    localStorage.setItem("events", JSON.stringify(events));
  }, [events]);

  // Function to generate a random color
  const getRandomColor = () => {
    const colors = [
      "bg-red-200",
      "bg-blue-200",
      "bg-green-200",
      "bg-yellow-200",
      "bg-purple-200",
      "bg-pink-200",
      "bg-indigo-200",
      "bg-teal-200",
      "bg-orange-200",
      "bg-cyan-200",
    ];
    return colors[Math.floor(Math.random() * colors.length)];
  };

  // Function to add an event
  const addEvent = (resource, day) => {
    const key = `${resource}-${day}`;
    const newEvent = {
      id: Date.now(),
      content: `Event`,
      color: getRandomColor(),
      resource,
      day,
    };
    setEvents((prevEvents) => ({
      ...prevEvents,
      [key]: [...(prevEvents[key] || []), newEvent],
    }));
  };

    // Function to delete an event
  const editEvent = (resource, day, eventId) => {
    const newContent = prompt("Enter new event name:");

    if (newContent) {
      setEvents((prevEvents) => {
        const updatedEvents = { ...prevEvents };

        Object.keys(updatedEvents).forEach((existingKey) => {
          updatedEvents[existingKey] = updatedEvents[existingKey].map((event) =>
            event.id === eventId ? { ...event, content: newContent } : event
          );
        });

        return updatedEvents;
      });
    }
  };

  // Function to delete an event
  const deleteEvent = (resource, day, eventId) => {
    const key = `${resource}-${day}`;
    setEvents((prevEvents) => ({
      ...prevEvents,
      [key]: prevEvents[key].filter((event) => event.id !== eventId),
    }));
  };

  // Function to handle drag start
  const handleDragStart = (event) => {
    setDraggingEvent(event);
  };

  // Prevent default drag-over behavior
  const handleDragOver = (e) => {
    e.preventDefault();
  };

  // Handle dropping the dragged event on a new day
  const handleDrop = (day, resource) => {
    if (draggingEvent && draggingEvent.day !== day) {
      const oldKey = `${draggingEvent.resource}-${draggingEvent.day}`;
      const newKey = `${resource}-${day}`;

      setEvents((prevEvents) => {
        // Remove the event from the original day
        const updatedEvents = { ...prevEvents };
        updatedEvents[oldKey] = updatedEvents[oldKey]?.filter(
          (event) => event.id !== draggingEvent.id
        );

        // Add the event to both the original and the new day
        updatedEvents[oldKey] = [
          ...(updatedEvents[oldKey] || []),
          {
            ...draggingEvent,
            day: draggingEvent.day,
            resource: draggingEvent.resource,
          },
        ];

        updatedEvents[newKey] = [
          ...(updatedEvents[newKey] || []),
          { ...draggingEvent, day, resource },
        ];

        return updatedEvents;
      });
    }
    setDraggingEvent(null);
  };

  // Reset dragging state on drag end
  const handleDragEnd = () => {
    setDraggingEvent(null);
  };

  return (
    <div>
      {resources.map((resource) => (
        <div key={resource} className="flex font-semibold min-w-18 min-h-18">
          <div className="min-h-18 min-w-40 text-sm flex justify-center items-center border-r-[1px] border-b-[1px] border-gray-300 bg-white sticky left-0 z-10">
            {resource}
          </div>

          {daysInMonth.map((day) => {
            const key = `${resource}-${day}`;
            return (
              <div
                key={key}
                className="flex cursor-pointer flex-col justify-center items-center border-r-[1px] border-b border-gray-300 min-h-18 min-w-18"
                onClick={() => addEvent(resource, day)}
                onDragOver={handleDragOver}
                onDrop={() => handleDrop(day, resource)}
                onDragEnd={handleDragEnd}
              >
                {/* Render Events */}
                <div className="text-xs mt-1 text-center">
                  {events[key]?.map((event) => (
                    <div
                      key={event.id}
                      className={`px-2 py-1 rounded my-1 text-black max-w-14 cursor-pointer overflow-auto scrollbar-hide ${event.color}`}
                      draggable
                      onClick={(e) => {
                        e.stopPropagation();
                        editEvent(resource, day, event.id);
                      }}
                      onContextMenu={(e) => {
                        e.preventDefault();
                        deleteEvent(resource, day, event.id);
                      }}
                      onDragStart={() => handleDragStart(event)}
                    >
                      {event.content}
                    </div>
                  ))}
                </div>
              </div>
            );
          })}
        </div>
      ))}
    </div>
  );
};

Events.propTypes = {
  daysInMonth: PropTypes.arrayOf(PropTypes.number).isRequired,
};

export default Events;
