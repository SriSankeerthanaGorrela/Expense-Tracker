import { useEffect, useState, useMemo } from "react";
import { firestoreService, FirestoreDoc } from "./firestoreService";
import { useAuthStore } from "../store/authstore";
import { WhereFilterOp } from "firebase/firestore";

export const useFirestoreCollection = <T = FirestoreDoc>(
  pathString: string,
  filters?: { field: string; op: WhereFilterOp; value: unknown }[],
  options?: { orderByField?: string; order?: "asc" | "desc"; limit?: number }
) => {
  const { user, isLoading: authLoading } = useAuthStore();
  const [docs, setDocs] = useState<T[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  // stable path
  const path = useMemo(
    () => pathString.split("/").filter(Boolean),
    [pathString]
  );

  // Stable filters — memoized based on content
  const stableFilters = useMemo(() => {
    return filters && filters.length > 0 ? JSON.stringify(filters) : null;
  }, [filters]);

  // Stable options — memoized based on content
  const stableOptions = useMemo(() => {
    return options ? JSON.stringify(options) : null;
  }, [options]);

  useEffect(() => {
    if (authLoading) return;

    if (!user) {
      setError("User not authenticated");
      setLoading(false);
      return;
    }

    if (path.length % 2 === 0) {
      setError(`Invalid collection path: ${pathString}`);
      setLoading(false);
      return;
    }

    setLoading(true);
    setError(null);

    try {
      const parsedFilters = stableFilters ? JSON.parse(stableFilters) : undefined;
      const parsedOptions = stableOptions ? JSON.parse(stableOptions) : undefined;

      const unsubscribe = firestoreService.listenDocumentsAtPath(
        path,
        (data) => {
          setDocs(data as T[]);
          setLoading(false);
        },
        (err) => {
          setError(err.message || "Firestore subscription error");
          setLoading(false);
        },
        parsedFilters,
        parsedOptions
      );

      return () => unsubscribe();
    } catch (err) {
      setError((err as Error).message);
      setLoading(false);
    }
  }, [authLoading, user?.uid, pathString, stableFilters, stableOptions]);

  // CRUD operations
  const addDocument = async (data: Record<string, unknown>) => {
    try {
      return await firestoreService.addDocumentAtPath(path, data);
    } catch (err) {
      setError((err as Error).message);
      return null;
    }
  };

  const updateDocument = async (docId: string, data: Record<string, unknown>) => {
    try {
      return await firestoreService.updateDocumentAtPath([...path, docId], data);
    } catch (err) {
      setError((err as Error).message);
      return null;
    }
  };

  const deleteDocument = async (docId: string) => {
    try {
      return await firestoreService.deleteDocumentAtPath([...path, docId]);
    } catch (err) {
      setError((err as Error).message);
      return null;
    }
  };

  return { docs, loading, error, addDocument, updateDocument, deleteDocument };
};
