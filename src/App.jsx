import { Outlet } from "react-router";
import Navbar from "./components/Navbar";
import Topbar from "./components/Topbar";
import Footer from "./components/Footer";

function App() {
  return (
    <>
      <Topbar />
      <Navbar />
      <Outlet />
      <Footer />
    </>
  );
}

export default App;