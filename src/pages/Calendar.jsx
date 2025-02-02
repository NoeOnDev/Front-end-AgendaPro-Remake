import { Calendar as BigCalendar } from "react-big-calendar";
import { format, parse, startOfWeek, getDay } from "date-fns";
import { es } from "date-fns/locale";
import "react-big-calendar/lib/css/react-big-calendar.css";
import { dateFnsLocalizer } from "react-big-calendar";

const locales = {
  es: es,
};

const localizer = dateFnsLocalizer({
  format,
  parse,
  startOfWeek,
  getDay,
  locales,
});

export const Calendar = () => {
  const eventos = [
    {
      title: "Reunión",
      start: new Date(2024, 1, 15, 10, 0),
      end: new Date(2024, 1, 15, 12, 0),
    },
  ];

  return (
    <div style={{ height: "100vh" }}>
      <BigCalendar
        localizer={localizer}
        events={eventos}
        startAccessor="start"
        endAccessor="end"
        messages={{
          next: "Siguiente",
          previous: "Anterior",
          today: "Hoy",
          month: "Mes",
          week: "Semana",
          day: "Día",
          agenda: "Agenda",
        }}
        style={{ height: "calc(100% - 50px)" }}
      />
    </div>
  );
};
