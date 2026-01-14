import Navbar from "../components/Navbar";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";

const Dashboard = () => {
  return (
    <>
      <Navbar />

      <div className="p-8">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-3xl font-bold mb-8"
        >
          Operations Dashboard
        </motion.h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
          <div className="bg-slate-800 p-6 rounded-xl">
            <h3 className="text-lg font-semibold">Total Issues</h3>
            <p className="text-3xl text-orange-500 mt-2">Live</p>
          </div>

          <div className="bg-slate-800 p-6 rounded-xl">
            <h3 className="text-lg font-semibold">In Progress</h3>
            <p className="text-3xl text-yellow-400 mt-2">Tracking</p>
          </div>

          <div className="bg-slate-800 p-6 rounded-xl">
            <h3 className="text-lg font-semibold">Resolved</h3>
            <p className="text-3xl text-green-400 mt-2">Done</p>
          </div>
        </div>

        <div className="flex gap-4">
          <Link
            to="/create-issue"
            className="bg-orange-500 px-6 py-3 rounded-lg"
          >
            Create Issue
          </Link>

          <Link
            to="/issues"
            className="border border-orange-500 px-6 py-3 rounded-lg"
          >
            View Issues
          </Link>
        </div>
      </div>
    </>
  );
};

export default Dashboard;
