import { useState } from "react";

export default function Calendar() {
  const [currentDate, setCurrentDate] = useState(new Date());

  const months = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec",
  ];

  const handleMonthClick = (monthIndex) => {
    const newDate = new Date(currentDate.getFullYear(), monthIndex);
    setCurrentDate(newDate);
  };

  const getDaysInMonth = (date) => {
    const year = date.getFullYear();
    const month = date.getMonth();
    const firstDay = new Date(year, month, 1).getDay();
    const daysInMonth = new Date(year, month + 1, 0).getDate();

    const days = [];
    let blankDays = (firstDay + 6) % 7; // shift Sunday to end
    for (let i = 0; i < blankDays; i++) days.push(null);
    for (let d = 1; d <= daysInMonth; d++) {
      days.push(d);
    }
    return days;
  };

  const days = getDaysInMonth(currentDate);

  return (
    <div style={{ width: "310px", padding: "12px", fontFamily: "sans-serif" }}>
      {/* Horizontally scrollable month buttons */}
      <div
        style={{
          display: "flex",
          overflowX: "auto",
          whiteSpace: "nowrap",
          marginBottom: "16px",
          gap: "8px",
        }}
      >
        {months.map((month, idx) => (
          <button
            key={month}
            onClick={() => handleMonthClick(idx)}
            style={{
              backgroundColor:
                idx === currentDate.getMonth() ? "#1E3769" : "#ccc",
              color: idx === currentDate.getMonth() ? "white" : "black",
              border: "none",
              padding: "8px",
              minWidth: "60px",
              cursor: "pointer",
              borderRadius: "6px",
              flexShrink: 0, // prevents shrinking
            }}
          >
            {month}
          </button>
        ))}
      </div>

      {/* Weekday headers */}
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
                  fontWeight: "bold",
          fontSize: "14px"
        }}
      >
        {["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"].map((day) => (
          <div key={day} style={{ width: "40px", textAlign: "center" }}>
            {day}
          </div>
        ))}
      </div>

      {/* Calendar days */}
      <div style={{ display: "flex", flexWrap: "wrap" }}>
        {days.map((day, idx) => (
          <div
            key={idx}
            style={{
              width: "40px",
              height: "40px",
              textAlign: "center",
              lineHeight: "40px",
              margin: "2px",
              backgroundColor: day ? "#f0f0f0" : "transparent",
              borderRadius: "4px",
              color: day ? "#000" : "transparent",
              border: day ? "1px solid #ddd" : "none",
            }}
          >
            {day || ""}
          </div>
        ))}
      </div>
    </div>
  );
}
