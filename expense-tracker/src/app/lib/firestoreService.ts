
import {
  collection,
  doc,
  getDocs,
  getDoc,
  addDoc,
  updateDoc,
  deleteDoc,
  onSnapshot,
  query,
  where,
  WhereFilterOp,
  DocumentData,
  CollectionReference,
  DocumentReference,
  QueryConstraint,
  QueryDocumentSnapshot,
} from "firebase/firestore";
import { db } from "./firebase";

export type FirestoreDoc = {
  id: string;
  [key: string]: unknown;
};

// Get Collection Reference (for collections - odd segments)
const getCollectionRef = (
  path: string[]
): CollectionReference<DocumentData> => {
  let ref: unknown = db;
  for (let i = 0; i < path.length; i += 2) {
    const col = path[i];
    const id = path[i + 1];
    if (id) {
      ref = doc(ref, col, id);
    } else {
      ref = collection(ref, col);
    }
  }
  return ref as CollectionReference<DocumentData>;
};

// Get Document Reference (for documents - even segments)
const getDocumentRef = (path: string[]): DocumentReference<DocumentData> => {
  return doc(db, ...path);
};

export const firestoreService = {
  // ========== COLLECTION OPERATIONS ==========

  // Get all documents in a collection with optional filters
  getDocumentsAtPath: async (
    path: string[],
    filters: { field: string; op: WhereFilterOp; value: unknown }[] = []
  ): Promise<FirestoreDoc[]> => {
    const colRef = getCollectionRef(path);
    const constraints: QueryConstraint[] = filters.map((f) =>
      where(f.field, f.op, f.value)
    );

    const q = constraints.length > 0 ? query(colRef, ...constraints) : colRef;
    const snapshot = await getDocs(q);
    return snapshot.docs.map((d: QueryDocumentSnapshot<DocumentData>) => ({
      id: d.id,
      ...d.data(),
    }));
  },

  // Listen to all documents in a collection (with optional filters)
  listenDocumentsAtPath: (
    path: string[],
    callback: (docs: FirestoreDoc[]) => void,
    errorCallback?: (error: Error) => void,
    filters: { field: string; op: WhereFilterOp; value: unknown }[] = []
  ) => {
    const colRef = getCollectionRef(path);
    const constraints: QueryConstraint[] = filters.map((f) =>
      where(f.field, f.op, f.value)
    );
    const q = constraints.length > 0 ? query(colRef, ...constraints) : colRef;

    const unsubscribe = onSnapshot(
      q,
      (snapshot) => {
        const data = snapshot.docs.map(
          (d: QueryDocumentSnapshot<DocumentData>) => ({
            id: d.id,
            ...d.data(),
          })
        );
        callback(data);
      },
      (error) => {
        console.error("Firestore onSnapshot error:", error);
        if (errorCallback) errorCallback(error);
      }
    );

    return unsubscribe;
  },

  // Add document to collection
  addDocumentAtPath: async (
    path: string[],
    data: DocumentData
  ): Promise<FirestoreDoc> => {
    const colRef = getCollectionRef(path);
    const docRef = await addDoc(colRef, data);
    return { id: docRef.id, ...data };
  },

  // ========== DOCUMENT OPERATIONS ==========

  // Get single document
  getDocumentAtPath: async (path: string[]): Promise<FirestoreDoc | null> => {
    const docRef = getDocumentRef(path);
    const snapshot = await getDoc(docRef);

    if (snapshot.exists()) {
      return { id: snapshot.id, ...snapshot.data() };
    }
    return null;
  },

  // Listen to single document
  listenDocumentAtPath: (
    path: string[],
    callback: (doc: FirestoreDoc | null) => void,
    errorCallback?: (error: Error) => void
  ) => {
    const docRef = getDocumentRef(path);

    const unsubscribe = onSnapshot(
      docRef,
      (snapshot) => {
        if (snapshot.exists()) {
          callback({ id: snapshot.id, ...snapshot.data() });
        } else {
          callback(null);
        }
      },
      (error) => {
        console.error("Firestore onSnapshot error:", error);
        if (errorCallback) errorCallback(error);
      }
    );

    return unsubscribe;
  },

  // Update document
  updateDocumentAtPath: async (
    path: string[],
    data: DocumentData
  ): Promise<FirestoreDoc> => {
    const docRef = getDocumentRef(path);
    await updateDoc(docRef, data);
    return { id: path[path.length - 1], ...data };
  },

  // Delete document
  deleteDocumentAtPath: async (path: string[]): Promise<string> => {
    const docRef = getDocumentRef(path);
    await deleteDoc(docRef);
    return path[path.length - 1];
  },
};
