import { useState } from "react";
import PropTypes from "prop-types";
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

const EventModal = ({ isOpen, onClose, selectedSlot, onSave }) => {
  const [title, setTitle] = useState("");
  const [startTime, setStartTime] = useState(
    format(selectedSlot?.start || new Date(), "HH:mm")
  );
  const [endTime, setEndTime] = useState(
    format(selectedSlot?.end || new Date(), "HH:mm")
  );

  const handleSubmit = (e) => {
    e.preventDefault();
    const [startHour, startMinute] = startTime.split(":").map(Number);
    const [endHour, endMinute] = endTime.split(":").map(Number);

    const selectedDate = new Date(selectedSlot.start);
    const startDate = new Date(selectedDate);
    const endDate = new Date(selectedDate);

    startDate.setHours(startHour, startMinute, 0);
    endDate.setHours(endHour, endMinute, 0);

    onSave({
      title,
      start: startDate,
      end: endDate,
    });
    setTitle("");
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        backgroundColor: "rgba(0,0,0,0.5)",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        zIndex: 1000,
      }}
    >
      <div
        style={{
          backgroundColor: "white",
          padding: "20px",
          borderRadius: "8px",
          width: "300px",
        }}
      >
        <h2>Agregar Evento</h2>
        <form onSubmit={handleSubmit}>
          <div style={{ marginBottom: "15px" }}>
            <label>
              Título:
              <input
                type="text"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                style={{ width: "100%", padding: "5px" }}
                required
              />
            </label>
          </div>
          <div style={{ marginBottom: "15px" }}>
            <p>Fecha: {format(selectedSlot.start, "dd/MM/yyyy")}</p>
            <div style={{ display: "flex", gap: "10px", alignItems: "center" }}>
              <label>
                Hora inicio:
                <input
                  type="time"
                  value={startTime}
                  onChange={(e) => setStartTime(e.target.value)}
                  style={{ marginLeft: "10px" }}
                  required
                />
              </label>
            </div>
            <div
              style={{
                display: "flex",
                gap: "10px",
                alignItems: "center",
                marginTop: "10px",
              }}
            >
              <label>
                Hora fin:
                <input
                  type="time"
                  value={endTime}
                  onChange={(e) => setEndTime(e.target.value)}
                  style={{ marginLeft: "10px" }}
                  required
                />
              </label>
            </div>
          </div>
          <div
            style={{ display: "flex", gap: "10px", justifyContent: "flex-end" }}
          >
            <button type="button" onClick={onClose}>
              Cancelar
            </button>
            <button type="submit">Guardar</button>
          </div>
        </form>
      </div>
    </div>
  );
};
EventModal.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  selectedSlot: PropTypes.shape({
    start: PropTypes.instanceOf(Date),
    end: PropTypes.instanceOf(Date),
  }),
  onSave: PropTypes.func.isRequired,
};

export const Calendar = () => {
  const [eventos, setEventos] = useState([
    {
      title: "Reunión",
      start: new Date(2024, 1, 15, 10, 0),
      end: new Date(2024, 1, 15, 12, 0),
    },
  ]);
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedSlot, setSelectedSlot] = useState(null);

  const handleSelectSlot = (slotInfo) => {
    setSelectedSlot(slotInfo);
    setModalOpen(true);
  };

  const handleSaveEvent = (newEvent) => {
    setEventos([...eventos, newEvent]);
  };

  return (
    <div style={{ height: "100vh" }}>
      <BigCalendar
        localizer={localizer}
        events={eventos}
        startAccessor="start"
        endAccessor="end"
        selectable
        onSelectSlot={handleSelectSlot}
        views={["month", "week", "day", "agenda"]}
        defaultView="month"
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
      <EventModal
        isOpen={modalOpen}
        onClose={() => setModalOpen(false)}
        selectedSlot={selectedSlot}
        onSave={handleSaveEvent}
      />
    </div>
  );
};
