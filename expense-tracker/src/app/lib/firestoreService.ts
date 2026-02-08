import {
  collection,
  doc,
  getDocs,
  getDoc,
  updateDoc,
  deleteDoc,
  onSnapshot,
  query,
  where,
  orderBy,
  limit,
  WhereFilterOp,
  DocumentData,
  CollectionReference,
  DocumentReference,
  QueryConstraint,
  QueryDocumentSnapshot,
  serverTimestamp,
  setDoc,
} from "firebase/firestore";
import { db } from "./firebase";

/**
 * 🔑 Firestore document type
 * ID comes ONLY from Firestore, never stored in data
 */
export type FirestoreDoc = {
  id: string;
  [key: string]: unknown;
};

/**
 * 📁 Get Collection Reference from path
 * Example path: ["users", uid, "goals"]
 */
const getCollectionRef = (
  path: string[]
): CollectionReference<DocumentData> => {
  if (path.length % 2 === 0) {
    throw new Error("Invalid collection path");
  }

  let ref: any = db;

  for (let i = 0; i < path.length - 1; i += 2) {
    ref = doc(ref, path[i], path[i + 1]);
  }

  return collection(ref, path[path.length - 1]);
};

/**
 * 📄 Get Document Reference
 */
const getDocumentRef = (path: string[]): DocumentReference<DocumentData> => {
  return doc(db, ...path);
};

export const firestoreService = {
  // ===========================================================
  // 🔥 GET DOCUMENTS
  // ===========================================================
  getDocumentsAtPath: async (
    path: string[],
    filters: { field: string; op: WhereFilterOp; value: unknown }[] = [],
    options?: {
      orderByField?: string;
      order?: "asc" | "desc";
      limit?: number;
    }
  ): Promise<FirestoreDoc[]> => {
    const colRef = getCollectionRef(path);

    const constraints: QueryConstraint[] = [];

    filters.forEach((f) =>
      constraints.push(where(f.field, f.op, f.value))
    );

    if (options?.orderByField) {
      constraints.push(orderBy(options.orderByField, options.order ?? "asc"));
    }

    if (options?.limit) {
      constraints.push(limit(options.limit));
    }

    const q =
      constraints.length > 0 ? query(colRef, ...constraints) : colRef;

    const snapshot = await getDocs(q);

    return snapshot.docs.map((d: QueryDocumentSnapshot<DocumentData>) => ({
      ...d.data(),   // data first
      id: d.id,      // Firestore ID ALWAYS wins
    }));
  },

  // ===========================================================
  // 🔥 REALTIME COLLECTION LISTENER
  // ===========================================================
  listenDocumentsAtPath: (
    path: string[],
    callback: (docs: FirestoreDoc[]) => void,
    errorCallback?: (error: Error) => void,
    filters: { field: string; op: WhereFilterOp; value: unknown }[] = [],
    options?: {
      orderByField?: string;
      order?: "asc" | "desc";
      limit?: number;
    }
  ) => {
    const colRef = getCollectionRef(path);
    const constraints: QueryConstraint[] = [];

    filters.forEach((f) =>
      constraints.push(where(f.field, f.op, f.value))
    );

    if (options?.orderByField) {
      constraints.push(orderBy(options.orderByField, options.order ?? "asc"));
    }

    if (options?.limit) {
      constraints.push(limit(options.limit));
    }

    const q =
      constraints.length > 0 ? query(colRef, ...constraints) : colRef;

    return onSnapshot(
      q,
      (snapshot) => {
        const docs = snapshot.docs.map((d) => ({
          ...d.data(),
          id: d.id, // Firestore ID overrides everything
        }));
        callback(docs);
      },
      (error) => {
        console.error("Firestore listener error:", error);
        errorCallback?.(error);
      }
    );
  },

  // ===========================================================
  // 🔥 ADD DOCUMENT
  // ===========================================================
  addDocumentAtPath: async (
    path: string[],
    data: DocumentData
  ): Promise<FirestoreDoc> => {
    const colRef = getCollectionRef(path);
    const docRef = doc(colRef);

    const docData = {
      ...data,
      createdAt: serverTimestamp(),
    };

    await setDoc(docRef, docData);

    return {
      ...data,
      id: docRef.id,
    };
  },

  // ===========================================================
  // 🔥 GET SINGLE DOCUMENT
  // ===========================================================
  getDocumentAtPath: async (
    path: string[]
  ): Promise<FirestoreDoc | null> => {
    const docRef = getDocumentRef(path);
    const snapshot = await getDoc(docRef);

    if (!snapshot.exists()) return null;

    return {
      ...snapshot.data(),
      id: snapshot.id,
    };
  },

  // ===========================================================
  // 🔥 REALTIME SINGLE DOCUMENT
  // ===========================================================
  listenDocumentAtPath: (
    path: string[],
    callback: (doc: FirestoreDoc | null) => void,
    errorCallback?: (error: Error) => void
  ) => {
    const docRef = getDocumentRef(path);

    return onSnapshot(
      docRef,
      (snapshot) => {
        if (!snapshot.exists()) {
          callback(null);
          return;
        }

        callback({
          ...snapshot.data(),
          id: snapshot.id,
        });
      },
      (error) => {
        console.error("Firestore doc listener error:", error);
        errorCallback?.(error);
      }
    );
  },

  // ===========================================================
  // 🔥 UPDATE DOCUMENT
  // ===========================================================
  updateDocumentAtPath: async (
    path: string[],
    data: DocumentData
  ): Promise<void> => {
    const docRef = getDocumentRef(path);
    await updateDoc(docRef, data);
  },

  // ===========================================================
  // 🔥 DELETE DOCUMENT
  // ===========================================================
  deleteDocumentAtPath: async (path: string[]): Promise<string> => {
    const docRef = getDocumentRef(path);
    await deleteDoc(docRef);
    return path[path.length - 1];
  },
};