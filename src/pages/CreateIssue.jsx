import { useState, useEffect } from "react";
import Navbar from "../components/Navbar";
import { createIssue, fetchIssues } from "../firebase/issues";
import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";

const CreateIssue = () => {
  const { user } = useAuth();
  const navigate = useNavigate();

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [priority, setPriority] = useState("Low");
  const [assignedTo, setAssignedTo] = useState("");
  const [similarIssues, setSimilarIssues] = useState([]);

  useEffect(() => {
    const checkSimilarity = async () => {
      if (title.length < 4) return;

      const issues = await fetchIssues();
      const matches = issues.filter((i) =>
        i.title.toLowerCase().includes(title.toLowerCase())
      );
      setSimilarIssues(matches);
    };

    checkSimilarity();
  }, [title]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (similarIssues.length > 0) {
      const confirmCreate = confirm(
        "Similar issues exist. Do you want to continue?"
      );
      if (!confirmCreate) return;
    }

    await createIssue({
      title,
      description,
      priority,
      assignedTo,
      createdBy: user.email,
    });

    navigate("/issues");
  };

  return (
    <>
      <Navbar />
      <div className="p-8 max-w-xl mx-auto">
        <h2 className="text-2xl font-bold mb-6">Create New Issue</h2>

        {similarIssues.length > 0 && (
          <div className="bg-yellow-500/20 p-4 rounded mb-4">
            <p className="text-yellow-300">
              Similar issues detected. Please review before submitting.
            </p>
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            placeholder="Title"
            className="w-full p-2 bg-slate-700 rounded"
            onChange={(e) => setTitle(e.target.value)}
            required
          />

          <textarea
            placeholder="Description"
            className="w-full p-2 bg-slate-700 rounded"
            onChange={(e) => setDescription(e.target.value)}
            required
          />

          <select
            className="w-full p-2 bg-slate-700 rounded"
            onChange={(e) => setPriority(e.target.value)}
          >
            <option>Low</option>
            <option>Medium</option>
            <option>High</option>
          </select>

          <input
            placeholder="Assigned To (email)"
            className="w-full p-2 bg-slate-700 rounded"
            onChange={(e) => setAssignedTo(e.target.value)}
          />

          <button className="w-full bg-orange-500 py-2 rounded">
            Create Issue
          </button>
        </form>
      </div>
    </>
  );
};

export default CreateIssue;
