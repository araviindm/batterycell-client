import {
  BrowserRouter as Router,
  Routes,
  Route,
  Link,
  useLocation,
} from "react-router-dom";
import Impedance from "./components/Impedance";
import Home from "./components/Home";
import BatteryCellDetails from "./components/BatteryCellDetails";

const NavLink = ({ to, children }) => {
  const location = useLocation();
  const isActive = location.pathname === to;

  return (
    <Link
      to={to}
      className={`px-4 py-2 font-semibold ${
        isActive ? "text-sky-500 underline" : ""
      }`}
    >
      {children}
    </Link>
  );
};

const App = () => {
  return (
    <Router>
      <div>
        <nav className="flex justify-center py-4 space-x-4 bg-gray-800">
          <NavLink to="/">Home</NavLink>
          <NavLink to="/impedance">Impedance</NavLink>
        </nav>

        <Routes>
          <Route exact path="/" element={<Home />} />
          <Route path="/batterycell/:cellId" element={<BatteryCellDetails />} />
          <Route exact path="/impedance" element={<Impedance />} />
        </Routes>
      </div>
    </Router>
  );
};
export default App;
