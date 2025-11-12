import { recentTransactionType } from "../components/(share_types)/AllTypes";
import { firestoreService } from "./firestoreService";


// Add a transaction
export const addTransaction = async (userId: string, transaction: recentTransactionType) => {
  const path = ["users", userId, "transactions"];
  return await firestoreService.addDocumentAtPath(path, transaction);
};

// Update a transaction
export const updateTransaction = async (userId: string, transactionId: string, updatedData: Partial<recentTransactionType>) => {
  const path = ["users", userId, "transactions", transactionId];
  return await firestoreService.updateDocumentAtPath(path, updatedData);
};

// Delete a transaction
export const deleteTransaction = async (userId: string, transactionId: string) => {
  const path = ["users", userId, "transactions", transactionId];
  return await firestoreService.deleteDocumentAtPath(path);
};

// Get all transactions
export const getTransactions = async (userId: string) => {
  const path = ["users", userId, "transactions"];
  return await firestoreService.getDocumentsAtPath(path);
};
