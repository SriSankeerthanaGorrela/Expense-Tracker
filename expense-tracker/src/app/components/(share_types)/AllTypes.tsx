import { Timestamp } from "firebase/firestore";

export interface recentTransactionType{
  icon?:React.ReactNode;
  id?:string;
  description:string;
  payment:string;
  date:string | Timestamp;
  category:string;
  amount:number;
  createdAt?:Timestamp;
}
export type Budget = {
  id: string;
  name: string;
  amount: number;
  createdAt?: Timestamp;
};

export interface monthlyExpensesType {
  month: string;
  expense: number;
}

export interface GoalCardProps {
  id:string;
  goalName: string;
  goalType?:string
  targetDate:string;
  current: number;
  targetAmount: number;
  onAddMoney?: () => void;
  onEditGoal?: () => void;
}
export type NewGoalInput = Omit<GoalCardProps, "id">;
// type for updating a goal (id is not updated)
export type EditGoalInput = Omit<GoalCardProps, "id" | "current"> & {
  current?: number; // optional, if you want to allow editing
};
