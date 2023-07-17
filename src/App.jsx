import { Outlet } from "react-router-dom";
import Navbar from "./shared/Navbar";

const App = () => {
  return (
    <div className="max-w-[1440px] mx-auto overflow-hidden">
      <Navbar />
      <Outlet />
    </div>
  );
};

export default App;