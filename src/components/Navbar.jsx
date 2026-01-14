import { Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { signOut } from "firebase/auth";
import { auth } from "../firebase/config";

const Navbar = () => {
  const { user } = useAuth();

  return (
    <nav className="flex items-center justify-between px-8 py-4 bg-slate-950">
      <h1 className="text-xl font-bold text-orange-500">
        SmartBus
      </h1>

      <div className="flex items-center gap-6">
        {!user ? (
          <>
            <Link to="/login" className="hover:text-orange-400">
              Login
            </Link>
            <Link
              to="/register"
              className="bg-orange-500 px-4 py-2 rounded-md"
            >
              Sign Up
            </Link>
          </>
        ) : (
          <>
            <span className="text-sm text-slate-300">
              {user.email}
            </span>
            <button
              onClick={() => signOut(auth)}
              className="bg-red-500 px-4 py-2 rounded-md"
            >
              Logout
            </button>
          </>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
