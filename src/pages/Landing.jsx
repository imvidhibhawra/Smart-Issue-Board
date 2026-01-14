import { motion } from "framer-motion";
import Navbar from "../components/Navbar";
import { Link } from "react-router-dom";
import { Helmet } from "react-helmet-async";

const Landing = () => {
  return (
    <>
      <Helmet>
        <title>SmartBus – Intelligent Issue Board</title>
        <meta
          name="description"
          content="A smart bus travel dashboard with issue tracking and intelligent management."
        />
      </Helmet>

      <Navbar />

      <section className="min-h-screen flex flex-col items-center justify-center text-center px-6">
        <motion.h1
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-5xl font-extrabold mb-6"
        >
          Travel Smarter.  
          <span className="text-orange-500"> Manage Issues Faster.</span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4 }}
          className="text-slate-300 max-w-xl mb-8"
        >
          A bold, animated dashboard for bus travel operations with intelligent
          issue tracking and real-time collaboration.
        </motion.p>

        <motion.div
          initial={{ scale: 0.8 }}
          animate={{ scale: 1 }}
          transition={{ duration: 0.5 }}
          className="flex gap-4"
        >
          <Link
            to="/login"
            className="bg-orange-500 px-6 py-3 rounded-lg text-lg"
          >
            Get Started
          </Link>
          <Link
            to="/register"
            className="border border-orange-500 px-6 py-3 rounded-lg text-lg"
          >
            Create Account
          </Link>
        </motion.div>
      </section>
    </>
  );
};

export default Landing;
