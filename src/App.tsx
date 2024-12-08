import { BrowserRouter, Route, Routes } from "react-router-dom";
import Index from "./pages/index/Index";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";

function App() {
  return (
    <div className="bg-slate-800 dark:bg-slate-100 font-[vazir]" dir="rtl">
      <div>
        <BrowserRouter>
          <Navbar />
          <Routes>
            <Route path={"/"} element={<Index />} />
          </Routes>
          <Footer />
        </BrowserRouter>
      </div>
    </div>
  );
}

export default App;
