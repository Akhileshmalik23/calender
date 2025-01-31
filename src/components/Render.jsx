import PropTypes from "prop-types";
import DateView from "./DateView";
import Events from "./Events";

const Render = ({ daysInMonth, getDayOfWeek }) => {

  return (
    <div className="w-fit ">
      {/* Header Row */}
      <DateView daysInMonth={daysInMonth} getDayOfWeek={getDayOfWeek} />
    
      {/* Resource Rows */}
      <Events daysInMonth={daysInMonth} />
    </div>
  );
};

Render.propTypes = {
  daysInMonth: PropTypes.arrayOf(PropTypes.number).isRequired,
  getDayOfWeek: PropTypes.func.isRequired,
};

export default Render;
