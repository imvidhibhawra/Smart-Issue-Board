// src/firebase/issues.js
import {
  collection,
  addDoc,
  getDocs,
  query,
  orderBy,
  onSnapshot,
  Timestamp,
} from "firebase/firestore";
import { db } from "./config";

// Named export for creating an issue
export const createIssue = async (issue) => {
  await addDoc(collection(db, "issues"), {
    ...issue,
    status: "Open",
    createdAt: Timestamp.now(),
  });
};

// Named export for fetching all issues once
export const fetchIssues = async () => {
  const q = query(collection(db, "issues"), orderBy("createdAt", "desc"));
  const snapshot = await getDocs(q);
  return snapshot.docs.map((doc) => ({
    id: doc.id,
    ...doc.data(),
  }));
};

// Named export for realtime listener
export const listenToIssues = (setIssues) => {
  const q = query(collection(db, "issues"), orderBy("createdAt", "desc"));
  return onSnapshot(q, (snapshot) => {
    const data = snapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));
    setIssues(data);
  });
};
