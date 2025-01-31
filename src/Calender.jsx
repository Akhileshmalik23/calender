import { useState } from "react";
import Render from "./components/Render";
import { MdArrowBackIos ,MdArrowForwardIos } from "react-icons/md";
export default function Calender() {
  const [currentDate, setCurrentDate] = useState(new Date());
  const currentMonth = currentDate.getMonth();
  const currentYear = currentDate.getFullYear();

  const giveTotalDays = () => {
    const day = new Date(currentYear, currentMonth + 1, 0);
    return day.getDate();
  };
  const totalDays = giveTotalDays(currentYear, currentMonth);
  const handelSub = () => {
    setCurrentDate(new Date(currentYear, currentMonth - 1, 1));
  };

  const handelAdd = () => {
    setCurrentDate(new Date(currentYear, currentMonth + 1, 1));
  };

  const handleToday = () => {
    setCurrentDate(new Date());
  };

  const daysInMonth = [];
  for (let i = 1; i <= totalDays; i++) {
    daysInMonth.push(i);
  }
  const getDayOfWeek = (day) => {
    const date = new Date(currentYear, currentMonth, day);
    return date.toLocaleString("default", { weekday: "short" });
  };


  
  return (
    <div className="pt-12">
      {/* nav Bar */}
      <div className="fixed top-0 left-0 w-full flex items-center justify-between p-2 bg-neutral-100 z-50">

        <div className="flex ml-2 gap-x-1 text-2xl font-normal text-blue-400 ">
          <div className="">{currentDate.toLocaleString("default", { month: "long" })}</div>
          <div className="">{currentYear}</div>
        </div>

        <div className="flex items-center text-blue-500 font-extrabold text-2xl gap-x-2">
          <button onClick={handelSub} className="">
            <MdArrowBackIos />
          </button>
          <div className="text-lg font-semibold" onClick={handleToday} >Today</div>
          <div className="flex items-center ">
            <button onClick={handelAdd} >
              <MdArrowForwardIos />
            </button>
          </div>
        </div>
      </div>

      {/* body */}
      <Render daysInMonth={daysInMonth} getDayOfWeek={getDayOfWeek} />

    </div>
  );
}
