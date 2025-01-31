import PropTypes from "prop-types";

const DateView = ({ daysInMonth, getDayOfWeek }) => {
  const currentDate = new Date().getDate();
  return (
    <div className="flex  ">
      <div className="h-8 min-w-40 flex justify-center items-center border-t border-b border-r border-gray-300 bg-white sticky left-0 z-10"></div>
      
      <div className="flex items-center h-8 ">
        {daysInMonth.map((day) => (
          <div
            key={day}
            className={`flex items-center justify-center border-r border-t border-b border-gray-300 h-8 w-18  gap-x-1 text-sm ${
              day === currentDate ? "bg-gray-200" : ""
            }`}
          >
            <div>{day}</div>
            <div>{getDayOfWeek(day)}</div>
          </div>
        ))}
      </div>
    </div>
  );
};

DateView.propTypes = {
  daysInMonth: PropTypes.arrayOf(PropTypes.number).isRequired,
  getDayOfWeek: PropTypes.func.isRequired,
};

export default DateView;
