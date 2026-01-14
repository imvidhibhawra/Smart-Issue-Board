import { useState } from "react";
import { signInWithEmailAndPassword, signInWithPopup } from "firebase/auth";
import { auth, googleProvider } from "../firebase/config";
import { useNavigate, Link } from "react-router-dom";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleEmailLogin = async (e) => {
    e.preventDefault();
    try {
      await signInWithEmailAndPassword(auth, email, password);
      navigate("/dashboard");
    } catch (error) {
      alert(error.message);
    }
  };

  const handleGoogleLogin = async () => {
    try {
      await signInWithPopup(auth, googleProvider);
      navigate("/dashboard");
    } catch (error) {
      alert(error.message);
    }
  };

  return (
    <div className="min-h-screen flex justify-center items-center bg-slate-900">
      <form
        onSubmit={handleEmailLogin}
        className="bg-slate-800 p-8 rounded-xl w-96 flex flex-col gap-4"
      >
        <h2 className="text-2xl font-bold text-center mb-4">Login</h2>

        <input
          type="email"
          placeholder="Email"
          className="p-2 rounded bg-slate-700"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <input
          type="password"
          placeholder="Password"
          className="p-2 rounded bg-slate-700"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />

        <button className="bg-orange-500 py-2 rounded font-semibold">
          Login
        </button>

        <button
  type="button"
  onClick={handleGoogleLogin}
  className="flex items-center justify-center gap-2 bg-white text-gray-800 font-medium py-2 rounded shadow hover:shadow-md transform hover:scale-105 transition duration-200"

>
  <svg
    className="w-5 h-5"
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 533.5 544.3"
  >
    <path
      fill="#4285F4"
      d="M533.5 278.4c0-18.7-1.5-37.2-4.3-55.2H272v104.5h146.9c-6.3 33.9-25 62.7-53.2 81.9v68h85.8c50.2-46.2 79-114.2 79-199.2z"
    />
    <path
      fill="#34A853"
      d="M272 544.3c71.5 0 131.5-23.7 175.3-64.2l-85.8-68c-23.8 16-54.3 25.4-89.5 25.4-68.9 0-127-46.4-147.8-108.4h-87.9v68.2C87.2 480.5 173.2 544.3 272 544.3z"
    />
    <path
      fill="#FBBC05"
      d="M124.2 337.3c-4.8-14.1-7.6-29.2-7.6-44.3s2.8-30.2 7.6-44.3v-68.2h-87.9c-18.9 37.4-29.7 79.1-29.7 124.5s10.8 87.1 29.7 124.5l87.9-68.2z"
    />
    <path
      fill="#EA4335"
      d="M272 107.7c37 0 70.2 12.7 96.4 33.6l72-72C404.2 32 343.2 0 272 0 173.2 0 87.2 63.8 36.3 159.3l87.9 68.2C145 154.1 203.1 107.7 272 107.7z"
    />
  </svg>
  Sign in with Google
</button>

        <p className="text-sm text-center text-gray-400">
          Don’t have an account?{" "}
          <Link to="/register" className="text-orange-400">
            Register
          </Link>
        </p>
      </form>
    </div>
  );
};

export default Login;
