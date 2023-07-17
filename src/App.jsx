import { Outlet } from "react-router-dom";
import Navbar from "./shared/Navbar";
import Footer from "./shared/Footer";

const App = () => {
  return (
    <div className="max-w-[1440px] mx-auto overflow-hidden">
      <Navbar />
      <Outlet />
      <Footer />
    </div>
  );
};

export default App;