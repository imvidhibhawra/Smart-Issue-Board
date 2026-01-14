import { doc, updateDoc } from "firebase/firestore";
import { db } from "../firebase/config";
import { useAuth } from "../context/AuthContext";

const IssueTable = ({ issues }) => {
  const { user } = useAuth();

  const handleStatusChange = async (issue, newStatus) => {
    if (issue.status === "Open" && newStatus === "Done") {
      alert("Issue must move to In Progress before Done.");
      return;
    }

    const ref = doc(db, "issues", issue.id);
    await updateDoc(ref, { status: newStatus });
  };

  return (
    <table className="w-full border-collapse">
      <thead>
        <tr className="bg-slate-800 text-left">
          <th className="p-3">ID</th>
          <th className="p-3">Priority</th>
          <th className="p-3">Title</th>
          <th className="p-3">Status</th>
          <th className="p-3">Author</th>
          <th className="p-3">Created</th>
        </tr>
      </thead>

      <tbody>
        {issues.map((issue) => (
          <tr
            key={issue.id}
            className={`border-b border-slate-700 ${
              issue.assignedTo === user.email
                ? "bg-orange-500/10"
                : ""
            }`}
          >
            <td className="p-3 text-sm">{issue.id.slice(0, 6)}</td>

            <td className="p-3">
              <span
                className={`px-2 py-1 rounded text-sm ${
                  issue.priority === "High"
                    ? "bg-red-500/20 text-red-400"
                    : issue.priority === "Medium"
                    ? "bg-yellow-500/20 text-yellow-400"
                    : "bg-green-500/20 text-green-400"
                }`}
              >
                {issue.priority}
              </span>
            </td>

            <td className="p-3">{issue.title}</td>

            <td className="p-3">
              <select
                value={issue.status}
                onChange={(e) =>
                  handleStatusChange(issue, e.target.value)
                }
                className="bg-slate-700 rounded px-2 py-1"
              >
                <option>Open</option>
                <option>In Progress</option>
                <option>Done</option>
              </select>
            </td>

            <td className="p-3 text-sm">{issue.createdBy}</td>

            <td className="p-3 text-sm">
              {issue.createdAt?.toDate().toLocaleString()}
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default IssueTable;
