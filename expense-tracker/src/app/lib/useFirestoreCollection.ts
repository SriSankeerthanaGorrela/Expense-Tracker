import { useEffect, useState, useMemo } from "react";

import { firestoreService, FirestoreDoc } from "./firestoreService";
import { useAuth } from "./AuthContext";

export const useFirestoreCollection = <T = FirestoreDoc>(
  pathString: string,
  filters?: unknown
) => {
  const { user, loading: authLoading } = useAuth();
  const [docs, setDocs] = useState<T[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const path = useMemo(
    () => pathString.split("/").filter(Boolean),
    [pathString]
  );

//   const stableFilters = useMemo(() => {
//   return filters ? JSON.parse(JSON.stringify(filters)) : undefined;
// }, [JSON.stringify(filters)]);
const stableFilters = useMemo(() => {
  return filters ? structuredClone(filters) : undefined;
}, [filters]);


  useEffect(() => {
    if (authLoading) return;

    setDocs([]);
    setError(null);
    setLoading(true);

    if (!user) {
      setError("User not authenticated");
      setLoading(false);
      return;
    }

    if (path.length % 2 === 0) {
      const errMsg = `Invalid collection path: must have odd number of segments. Received: ${pathString}`;
      console.error(errMsg);
      setError(errMsg);
      setLoading(false);
      return;
    }

    try {
      // ✅ this is the only MAJOR CHANGE:
      const unsubscribe = firestoreService.listenDocumentsAtPath(
        path,
        (data) => {
          setDocs(data as T[]);
          setLoading(false);
        },
        (err) => {
          console.error("Firestore error:", err);
          setError(err.message || "Firestore subscription error");
          setLoading(false);
        },
        stableFilters
      );

      return () => unsubscribe();
    } catch (err) {
      const error = err as Error;
      console.error("Firestore subscription failed:", error);
      setError(error.message || "Unknown Firestore error");
      setLoading(false);
    }
  }, [authLoading, user, pathString, path, stableFilters]);

  const addDocument = async (data: Record<string, unknown>) => {
    try {
      return await firestoreService.addDocumentAtPath(path, data);
    } catch (err) {
      const error = err as Error;
      setError(error.message || "Failed to add document");
      return null;
    }
  };

  const updateDocument = async (
    docId: string,
    data: Record<string, unknown>
  ) => {
    try {
      return await firestoreService.updateDocumentAtPath(
        [...path, docId],
        data
      );
    } catch (err) {
      const error = err as Error;
      setError(error.message || "Failed to update document");
      return null;
    }
  };

  const deleteDocument = async (docId: string) => {
    try {
      return await firestoreService.deleteDocumentAtPath([...path, docId]);
    } catch (err) {
      const error = err as Error;
      setError(error.message || "Failed to delete document");
      return null;
    }
  };

  return { docs, loading, error, addDocument, updateDocument, deleteDocument };
};
