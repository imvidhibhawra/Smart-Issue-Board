import { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import IssueTable from "../components/IssueTable";
import { listenToIssues } from "../firebase/issues";

const Issues = () => {
  const [issues, setIssues] = useState([]);
  const [statusFilter, setStatusFilter] = useState("All");
  const [priorityFilter, setPriorityFilter] = useState("All");

  useEffect(() => {
    const unsubscribe = listenToIssues(setIssues);
    return () => unsubscribe();
  }, []);

  const filteredIssues = issues.filter((issue) => {
    const statusMatch =
      statusFilter === "All" || issue.status === statusFilter;
    const priorityMatch =
      priorityFilter === "All" || issue.priority === priorityFilter;

    return statusMatch && priorityMatch;
  });

  return (
    <>
      <Navbar />

      <div className="p-8">
        <h2 className="text-3xl font-bold mb-6">All Issues</h2>

        <div className="flex gap-4 mb-6">
          <select
            className="bg-slate-800 p-2 rounded"
            onChange={(e) => setStatusFilter(e.target.value)}
          >
            <option>All</option>
            <option>Open</option>
            <option>In Progress</option>
            <option>Done</option>
          </select>

          <select
            className="bg-slate-800 p-2 rounded"
            onChange={(e) => setPriorityFilter(e.target.value)}
          >
            <option>All</option>
            <option>Low</option>
            <option>Medium</option>
            <option>High</option>
          </select>
        </div>

        <div className="bg-slate-900 rounded-xl overflow-x-auto">
          <IssueTable issues={filteredIssues} />
        </div>
      </div>
    </>
  );
};

export default Issues;
