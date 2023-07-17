import { Outlet } from "react-router-dom";
import Navbar from "./shared/Navbar";
import { Helmet } from "react-helmet";

const App = () => {
  return (
    <div className="max-w-[1440px] mx-auto overflow-hidden">
      <Helmet>
        <title>Luxury Living</title>
        <meta name="description" content="This is Luxury Living." />
        <meta name="keywords" content="luxury living, luxury, Luxury Living, Arif Luxury Living" />
      </Helmet>
      <Navbar />
      <Outlet />
    </div>
  );
};

export default App;