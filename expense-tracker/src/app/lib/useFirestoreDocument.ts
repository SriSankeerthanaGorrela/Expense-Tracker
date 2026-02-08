// import { useEffect, useState, useMemo } from "react";
// import { firestoreService, FirestoreDoc } from "./firestoreService";
// import { useAuthStore } from "../store/authstore";

// export const useFirestoreDocument = (pathString: string) => {

// const { user, isLoading: authLoading } = useAuthStore();
//   const [doc, setDoc] = useState<FirestoreDoc | null>(null);
//   const [loading, setLoading] = useState<boolean>(true);
//   const [error, setError] = useState<string | null>(null);

//   // Convert string path to array and stabilize it
//   const pathArray = useMemo(() => {
//     return pathString.split("/").filter((segment) => segment.trim() !== "");
//   }, [pathString]);

//   useEffect(() => {
//     setDoc(null);
//     setError(null);
//     setLoading(true);

//     if (authLoading) return;

//     if (!user) {
//       setError("User not authenticated");
//       setLoading(false);
//       return;
//     }

//     // Documents must have even number of segments
//     if (pathArray.length % 2 !== 0) {
//       const errMsg = `Invalid document path: must have even number of segments. Received: "${pathString}" (${pathArray.length} segments)`;
//       console.error(errMsg);
//       setError(errMsg);
//       setLoading(false);
//       return;
//     }

//     try {
//       const unsubscribe = firestoreService.listenDocumentAtPath(
//         pathArray,
//         (document) => {
//           setDoc(document);
//           setLoading(false);
//         },
//         (err) => {
//           console.error("Firestore error:", err);
//           setError(err.message || "Firestore subscription error");
//           setLoading(false);
//         }
//       );

//       return () => unsubscribe();
//     } catch (err) {
//       const error = err as Error;
//       console.error("Firestore subscription failed:", error);
//       setError(error.message || "Unknown Firestore error");
//       setLoading(false);
//     }
//   }, [authLoading, user, pathArray, pathString]);

//   const updateDocument = async (data: Record<string, unknown>) => {
//     try {
//       return await firestoreService.updateDocumentAtPath(pathArray, data);
//     } catch (err) {
//       const error = err as Error;
//       setError(error.message || "Failed to update document");
//       return null;
//     }
//   };

//   const deleteDocument = async () => {
//     try {
//       return await firestoreService.deleteDocumentAtPath(pathArray);
//     } catch (err) {
//       const error = err as Error;
//       setError(error.message || "Failed to delete document");
//       return null;
//     }
//   };

//   return {
//     doc,
//     loading,
//     error,
//     updateDocument,
//     deleteDocument,
//   };
// };
import { useEffect, useState, useMemo } from "react";
import { firestoreService, FirestoreDoc } from "./firestoreService";
import { useAuthStore } from "../store/authstore";

export const useFirestoreDocument = (pathString: string) => {

const { user, isLoading: authLoading } = useAuthStore();
  const [doc, setDoc] = useState<FirestoreDoc | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  // Convert string path to array and stabilize it
  const pathArray = useMemo(() => {
    return pathString.split("/").filter((segment) => segment.trim() !== "");
  }, [pathString]);

  useEffect(() => {
    setDoc(null);
    setError(null);
    setLoading(true);

    if (authLoading) return;

    if (!user) {
      setError("User not authenticated");
      setLoading(false);
      return;
    }

    // Documents must have even number of segments
    if (pathArray.length % 2 !== 0) {
      const errMsg = `Invalid document path: must have even number of segments. Received: "${pathString}" (${pathArray.length} segments)`;
      console.error(errMsg);
      setError(errMsg);
      setLoading(false);
      return;
    }

    try {
      const unsubscribe = firestoreService.listenDocumentAtPath(
        pathArray,
        (document) => {
          setDoc(document);
          setLoading(false);
        },
        (err) => {
          console.error("Firestore error:", err);
          setError(err.message || "Firestore subscription error");
          setLoading(false);
        }
      );

      return () => unsubscribe();
    } catch (err) {
      const error = err as Error;
      console.error("Firestore subscription failed:", error);
      setError(error.message || "Unknown Firestore error");
      setLoading(false);
    }
  }, [authLoading, user, pathArray, pathString]);

  const updateDocument = async (data: Record<string, unknown>) => {
    try {
      return await firestoreService.updateDocumentAtPath(pathArray, data);
    } catch (err) {
      const error = err as Error;
      setError(error.message || "Failed to update document");
      return null;
    }
  };

  const deleteDocument = async () => {
    try {
      return await firestoreService.deleteDocumentAtPath(pathArray);
    } catch (err) {
      const error = err as Error;
      setError(error.message || "Failed to delete document");
      return null;
    }
  };

  return {
    doc,
    loading,
    error,
    updateDocument,
    deleteDocument,
  };
};