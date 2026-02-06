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
  Firestore,
  
} from "firebase/firestore";
import { db } from "./firebase";

export type FirestoreDoc<T = Record<string, unknown>> = T & {
  id: string;
};

// Get Collection Reference
const getCollectionRef = (
  path: string[]
): CollectionReference<DocumentData> => {
  if (path.length % 2 === 0) {
    throw new Error("Invalid collection path");
  }

  let current: Firestore | DocumentReference<DocumentData> = db;

  for (let i = 0; i < path.length - 1; i += 2) {
    const col = path[i];
    const docId = path[i + 1];

    current = doc(current, col, docId);
  }

  // Final segment MUST be a collection
  const lastCollection = path[path.length - 1];

  return collection(current, lastCollection);
};

// Get Document Reference
const getDocumentRef = (path: string[]): DocumentReference<DocumentData> => {
  return doc(db, ...path);
};

export const firestoreService = {
  // ===========================================================
  // 🔥 GET DOCUMENTS WITH FILTER + ORDERBY + LIMIT
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

    // Add filters
    filters.forEach((f) => {
      constraints.push(where(f.field, f.op, f.value));
    });

    // Add orderBy
    if (options?.orderByField) {
      constraints.push(orderBy(options.orderByField, options.order ?? "asc"));
    }

    // Add limit
    if (options?.limit) {
      constraints.push(limit(options.limit));
    }

    const q =
      constraints.length > 0 ? query(colRef, ...constraints) : colRef;

    const snapshot = await getDocs(q);

    return snapshot.docs.map((d: QueryDocumentSnapshot<DocumentData>) => ({
      id: d.id,
      ...d.data(),
    }));
  },

  // ===========================================================
  // 🔥 REALTIME LISTENER WITH FILTER + ORDERBY + LIMIT
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

    // Add filters
    filters.forEach((f) => {
      constraints.push(where(f.field, f.op, f.value));
    });

    // Add orderBy
    if (options?.orderByField) {
      constraints.push(orderBy(options.orderByField, options.order ?? "asc"));
    }

    // Add limit
    if (options?.limit) {
      constraints.push(limit(options.limit));
    }

    const q =
      constraints.length > 0 ? query(colRef, ...constraints) : colRef;

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

  // ===========================================================
  // 🔥 ADD DOCUMENT
  // ===========================================================
addDocumentAtPath: async (
  path: string[],
  data: DocumentData
): Promise<FirestoreDoc> => {

  const colRef = getCollectionRef(path);

  // ⭐ Create document reference (gives auto ID)
  const docRef = doc(colRef);

  const docData = {
    id: docRef.id,              // ⭐ Store ID inside document
                   // ⭐ Every goal starts with 0
    createdAt: serverTimestamp(),
    ...data,
  };

  // ⭐ Use setDoc so we can write custom ID into document
  await setDoc(docRef, docData);

  return docData;  // Already includes id
},


  // ===========================================================
  // 🔥 GET SINGLE DOCUMENT
  // ===========================================================
  getDocumentAtPath: async (path: string[]): Promise<FirestoreDoc | null> => {
    const docRef = getDocumentRef(path);
    const snapshot = await getDoc(docRef);

    if (snapshot.exists()) {
      return { id: snapshot.id, ...snapshot.data() };
    }
    return null;
  },

  // ===========================================================
  // 🔥 LISTEN TO SINGLE DOCUMENT
  // ===========================================================
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
