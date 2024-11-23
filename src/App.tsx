import { BrowserRouter, Route, Routes } from "react-router-dom";
import Index from "./pages/index/Index";
import Navbar from "./components/Navbar";

function App() {
  return (
    <div className="bg-slate-800 font-[vazir]" dir="rtl">
      <div className="xl:max-w-5xl xl:mx-auto">
        <BrowserRouter>
          <Navbar />
          <Routes>
            <Route path={"/"} element={<Index />} />
          </Routes>
        </BrowserRouter>
      </div>
    </div>
  );
}

export default App;
