import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Calendar } from "../pages/Calendar";

export const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Calendar />} />
      </Routes>
    </BrowserRouter>
  );
};
