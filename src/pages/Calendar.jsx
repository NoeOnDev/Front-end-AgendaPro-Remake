import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import multiMonthPlugin from "@fullcalendar/multimonth";
import esLocale from "@fullcalendar/core/locales/es";
import "./Calendar.css";

export const Calendar = () => {
  const eventos = [
    {
      title: "Reunión de ejemplo",
      start: "2025-02-01T10:00:00",
      end: "2025-02-01T11:00:00",
    },
  ];

  return (
    <div className="calendar-wrapper">
      <FullCalendar
        plugins={[dayGridPlugin, multiMonthPlugin]}
        initialView="dayGridMonth"
        locale={esLocale}
        events={eventos}
        height="100%"
        aspectRatio={1.5}
        headerToolbar={{
          left: "prev,next today",
          center: "title",
          right: "dayGridMonth,dayGridWeek,dayGridDay,multiMonthYear",
        }}
      />
    </div>
  );
};
