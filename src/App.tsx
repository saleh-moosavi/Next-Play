import { BrowserRouter, Route, Routes } from "react-router-dom";
import Index from "./pages/Index";
import Navbar from "./components/Navbar";

function App() {
  return (
    <div className="bg-slate-800" dir="rtl">
      <BrowserRouter>
        <Navbar />
        <Routes>
          <Route path={"/"} element={<Index />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
