export interface recentTransactionType{
  icon?:React.ReactNode;
  id?:string;
  description:string;
  payment:string;
  date:string;
  category:string;
  amount:number;
}

export interface GoalCardProps {
  id:string;
  title: string;
  targetDate:string;
  current: number;
  target: number;
  onAddMoney?: () => void;
  onEditGoal?: () => void;
}