import { useState } from "react";
import "./Calendar.css";

export default function Calendar() {
  const startDate = new Date(2025, 6, 1); // July = month 6 (0-based index)
  const [currentDate, setCurrentDate] = useState(startDate);

  const getMonthYearOptions = () => {
    const months = [];
    for (let i = 0; i < 24; i++) {
      const date = new Date(startDate.getFullYear(), startDate.getMonth() + i);
      months.push({
        label: date.toLocaleString("default", {
          month: "short",
          year: "numeric",
        }),
        date,
      });
    }
    return months;
  };

  const monthOptions = getMonthYearOptions();

  const handleMonthClick = (dateObj) => {
    setCurrentDate(dateObj);
  };

  const getDaysInMonth = (date) => {
    const year = date.getFullYear();
    const month = date.getMonth();
    const firstDay = new Date(year, month, 1).getDay(); // 0 = Sunday
    const daysInMonth = new Date(year, month + 1, 0).getDate();

    const days = [];
    let blankDays = (firstDay + 6) % 7; // Shift so Monday is first
    for (let i = 0; i < blankDays; i++) days.push(null);
    for (let d = 1; d <= daysInMonth; d++) days.push(d);
    return days;
  };

  const days = getDaysInMonth(currentDate);

  return (
    <div
      className="calendar-desktop-only"
      style={{
        width: "310px",
        padding: "12px",
        fontFamily: "sans-serif",
        marginTop: "-36px",
      }}
    >
    
      <div
        className="calendar-desktop-only"
        style={{
          display: "flex",
          overflowX: "auto",
          whiteSpace: "nowrap",
          marginBottom: "16px",
          gap: "8px",
        }}
      >
        {monthOptions.map(({ label, date }) => {
          const isActive =
            date.getFullYear() === currentDate.getFullYear() &&
            date.getMonth() === currentDate.getMonth();
          return (
            <button
              key={label}
              onClick={() => handleMonthClick(date)}
              style={{
                backgroundColor: isActive ? "#1E3769" : "#ccc",
                color: isActive ? "white" : "black",
                border: "none",
                padding: "8px",
                minWidth: "90px",
                cursor: "pointer",
                borderRadius: "6px",
                flexShrink: 0,
                marginBottom: "6px",
              }}
            >
              {label}
            </button>
          );
        })}
      </div>

  
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          fontWeight: "bold",
          fontSize: "14px",
          marginTop: "4px",
          marginBottom: "8px",
        }}
      >
        {["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"].map((day) => (
          <div key={day} style={{ width: "40px", textAlign: "center" }}>
            {day}
          </div>
        ))}
      </div>

      <div style={{ display: "flex", flexWrap: "wrap", width: "308px" }}>
        {days.map((day, idx) => (
          <div
            key={idx}
            style={{
              width: "37px",
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
      <button
    
        className="calendar-btn"
      >
      
        Start Planning
      </button>
    </div>
  );
}
