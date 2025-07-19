import { Link, NavLink } from "react-router-dom";

export default function Header() {
  return (
    <header className="border-b">
      <div className="container mx-auto flex items-center justify-between p-4">
        <Link to="/" className="text-xl font-bold text-indigo-600">
          AI4ALL
        </Link>
        <nav className="space-x-4">
          <NavLink to="/" className={({ isActive }) => isActive ? "text-indigo-600 font-semibold" : "text-gray-600"}>
            Home
          </NavLink>
          <NavLink to="/about" className={({ isActive }) => isActive ? "text-indigo-600 font-semibold" : "text-gray-600"}>
            About
          </NavLink>
          <NavLink to="/projects" className={({ isActive }) => isActive ? "text-indigo-600 font-semibold" : "text-gray-600"}>
            Projects
          </NavLink>
          <NavLink to="/contact" className={({ isActive }) => isActive ? "text-indigo-600 font-semibold" : "text-gray-600"}>
            Contact
          </NavLink>
        </nav>
      </div>
    </header>
  );
}
