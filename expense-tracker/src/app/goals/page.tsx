// "use client";
// import { Target, TrendingUp, Plus } from "lucide-react";
// import React, { useState, useEffect } from "react";
// import KpiDataCard from "../components/kpiDataCard";
// import Dialog from "../components/Dialog";
// import AddGoalForm from "./addGoalForm";
// import { GoalCardProps } from "../components/(share_types)/AllTypes";
// import { useAuthStore } from "../store/authstore";
// import { useFirestoreCollection } from "../lib/useFirestoreCollection";
// import { doc, updateDoc } from "firebase/firestore";
// import { db } from "../lib/firebase";

// const GoalsPage = () => {
//   const { user } = useAuthStore();
//   const { docs: goalsdata,addDocument } = useFirestoreCollection(
//     `users/${user?.uid}/goals`
//   );

//   const [goals, setGoals] = useState<GoalCardProps[]>([]);
//   const [openDialog, setOpenDialog] = useState(false);
//   const [editGoal, setEditGoal] = useState<GoalCardProps | null>(null);

//   const [addMoneyDialog, setAddMoneyDialog] = useState(false);
//   const [amount, setAmount] = useState(0);
//   const [selectedGoal, setSelectedGoal] = useState<GoalCardProps | null>(null);

//   // Sync Firestore → state
//   useEffect(() => {
//     setGoals(goalsdata);
//   }, [goalsdata]);

//   // Add goal
// // Add goal
// const handleAddGoal = async (newGoal: GoalCardProps) => {
//   try {
//     if (!user?.uid) return;

//     // 1️⃣ Add document to Firestore (auto-generates ID)
//     const docRef = await addDocument({
//       goalName: newGoal.goalName,
//       goalType: newGoal.goalType,
//       current: Number(newGoal.current || 0),
//       targetAmount: Number(newGoal.targetAmount || 0),
//       targetDate: newGoal.targetDate || "",
//       userId: user.uid,   // ⭐ SAVE USER UID INSIDE THE DOCUMENT
//     });

//     // 2️⃣ Now update the same doc with its generated ID
//     await updateDoc(
//       doc(db, `users/${user.uid}/goals/${docRef.id}`),
//       { id: docRef.id }
//     );

//     // 3️⃣ Prepare new goal for UI
//     const savedGoal = {
//       ...newGoal,
//       id: docRef.id,
//       userId: user.uid,
//     };

//     // 4️⃣ Update UI
//     setGoals((prev) => [...prev, savedGoal]);
//     setOpenDialog(false);

//   } catch (error) {
//     console.error("Error adding goal:", error);
//   }
// };


//   // Edit goal
//   const handleEditGoal = (goal: GoalCardProps) => {
//     setEditGoal(goal);
//     setOpenDialog(true);
//   };

//   // Save edited goal
//   const handleUpdateGoal = async (updatedGoal: GoalCardProps) => {
//   if (!updatedGoal.id || !user?.uid) return;

//   try {
//     const ref = doc(db, `users/${user.uid}/goals/${updatedGoal.id}`);

//     await updateDoc(ref, {
//       goalName: updatedGoal.goalName,
//       goalType: updatedGoal.goalType,
//       current: Number(updatedGoal.current || 0),
//       targetAmount: Number(updatedGoal.targetAmount || 0),
//       targetDate: updatedGoal.targetDate || "",
//     });

//     // Update UI instantly
//     setGoals((prev) =>
//       prev.map((g) => (g.id === updatedGoal.id ? updatedGoal : g))
//     );

//     setEditGoal(null);
//     setOpenDialog(false);
//   } catch (error) {
//     console.error("Error updating goal:", error);
//   }
// };

//   /** ---------------------------
//    *  ADD MONEY FUNCTION
//    *  --------------------------- */
//   const handleAddMoney = async () => {
//     if (!selectedGoal) return;

//     const newCurrent = Number(selectedGoal.current || 0) + Number(amount);

//     // 1️⃣ Update Firestore
//     await updateDoc(
//       doc(db, `users/${user?.uid}/goals/${selectedGoal.id}`),
//       { current: newCurrent }
//     );

//     // 2️⃣ Update React UI instantly
//     setGoals((prev) =>
//       prev.map((g) =>
//         g.id === selectedGoal.id ? { ...g, current: newCurrent } : g
//       )
//     );

//     // Reset UI
//     setAmount(0);
//     setSelectedGoal(null);
//     setAddMoneyDialog(false);
//   };

//   // KPI
//   const totalTarget = goals.reduce((sum, g) => sum + Number(g.targetAmount || 0), 0);
//   const totalSaved = goals.reduce((sum, g) => sum + Number(g.current || 0), 0);
//   const totalGoals = goals.length;

//   return (
//     <div className="p-6 min-h-screen space-y-6">
//       {/* HEADER */}
//       <div className="flex justify-between items-center">
//         <div>
//           <h1 className="text-2xl font-semibold">Financial Goals</h1>
//           <p className="text-gray-500 text-sm">
//             Track your saving goals and progress
//           </p>
//         </div>

//         <button
//           onClick={() => setOpenDialog(true)}
//           className="flex items-center gap-2 bg-green-600 text-white px-4 py-2 rounded-lg"
//         >
//           <Plus size={18} />
//           <span>Add Goal</span>
//         </button>

//         {/* Add / Edit Goal Dialog */}
//         <Dialog open={openDialog} onClose={() => setOpenDialog(false)}>
//           <AddGoalForm
//             onClose={() => setOpenDialog(false)}
//             onAddGoal={handleAddGoal}
//             onSave={handleUpdateGoal}
//             editGoal={editGoal}
//           />
//         </Dialog>
//       </div>

//       {/* KPI CARDS */}
//       <div className="grid grid-cols-3 gap-6">
//         <KpiDataCard
//           title="Total Goals"
//           value={totalGoals}
//           icon={<Target className="text-green-500" />}
//         />
//         <KpiDataCard
//           title="Total Target"
//           value={totalTarget}
//           icon={<TrendingUp className="text-blue-500" />}
//         />
//         <KpiDataCard
//           title="Total Saved"
//           value={totalSaved}
//           icon={<TrendingUp className="text-blue-500" />}
//         />
//       </div>

//       {/* GOALS LIST */}
//       <div className="grid grid-cols-2 gap-7">
//         {goals.map((goal) => {
//           const date = new Date(goal.targetDate);
//           const today = new Date();
//           const daysLeft = Math.max(
//             0,
//             Math.ceil((date.getTime() - today.getTime()) / (1000 * 60 * 60 * 24))
//           );

//           const progress =
//             (Number(goal.current || 0) / Number(goal.targetAmount || 1)) * 100;

//           return (
//             <div key={goal.id} className="p-5 w-full bg-white rounded-xl">
//               {/* Header */}
//               <div className="flex justify-between items-start mb-3">
//                 <div>
//                   <h2 className="font-semibold text-lg">{goal.goalName}</h2>
//                   <p className="text-sm text-gray-500">{daysLeft} days left</p>

//                   <p className="text-sm text-gray-500">
//                     Target Date:
//                     <span className="font-medium ml-1">
//                       {date.toLocaleDateString("en-IN", {
//                         day: "2-digit",
//                         month: "short",
//                         year: "numeric",
//                       })}
//                     </span>
//                   </p>
//                 </div>

//                 <span className="text-sm font-semibold text-green-600">
//                   {progress.toFixed(0)}%
//                 </span>
//               </div>

//               {/* Progress Bar */}
//               <div className="w-full bg-gray-200 h-2 rounded-full mb-4">
//                 <div
//                   className="bg-green-500 h-2 rounded-full"
//                   style={{ width: `${progress}%` }}
//                 ></div>
//               </div>

//               {/* Money Section */}
//               <div className="flex justify-between border-b pb-3 text-sm mb-4">
//                 <div>
//                   <p>Current</p>
//                   <p className="font-semibold">
//                     ₹{Number(goal.current || 0).toLocaleString()}
//                   </p>
//                 </div>

//                 <div className="text-right">
//                   <p>Target</p>
//                   <p className="font-semibold">
//                     ₹{Number(goal.targetAmount || 0).toLocaleString()}
//                   </p>
//                 </div>
//               </div>

//               {/* Buttons */}
//               <div className="flex justify-between items-center">
//                 <button
//                   onClick={() => {
//                     setSelectedGoal(goal);
//                     setAddMoneyDialog(true);
//                   }}
//                   className="bg-green-500 text-white px-8 py-2 rounded-lg text-sm"
//                 >
//                   Add Money
//                 </button>

//                 <button
//                   onClick={() => handleEditGoal(goal)}
//                   className="text-gray-600 hover:underline text-sm"
//                 >
//                   Edit Goal
//                 </button>
//               </div>

//               {/* ADD MONEY POPUP */}
//               <Dialog
//                 open={addMoneyDialog && selectedGoal?.id === goal.id}
//                 size="sm"
//                 onClose={() => setAddMoneyDialog(false)}
//               >
//                 <div className="p-6 bg-white rounded-lg">
//                   <h2 className="text-xl font-semibold mb-4">
//                     Add Money to {goal.goalName}
//                   </h2>

//                   <input
//                     type="number"
//                     placeholder="Amount"
//                     value={amount}
//                     onChange={(e) => setAmount(Number(e.target.value))}
//                     className="input-field w-full mb-4 border p-2 rounded"
//                   />

//                   <button
//                     className="bg-green-600 text-white w-full py-2 rounded-lg"
//                     onClick={handleAddMoney}
//                   >
//                     Submit
//                   </button>
//                 </div>
//               </Dialog>
//             </div>
//           );
//         })}
//       </div>
//     </div>
//   );
// };

// export default GoalsPage;

"use client";

import React, { useState } from "react";
import KpiDataCard from "../components/kpiDataCard";
import { useAuthStore } from "../store/authstore";
import { useFirestoreCollection } from "../lib/useFirestoreCollection";
import AddGoalDialog from "./addGoalForm";
import AddMoneyDialog from "./AddMoney";
import EditGoalDialog from "./EditGoal";
import Dialog from "../components/Dialog";



function Page() {
  const { user } = useAuthStore();

  const {
    docs: goalsdata,
    addDocument,
    updateDocument
  } = useFirestoreCollection(`users/${user?.uid}/goals`);

  const [openAddGoal, setOpenAddGoal] = useState(false);
  const [openAddMoney, setOpenAddMoney] = useState(false);
  const [openEditGoal, setOpenEditGoal] = useState(false);
  const [selectedGoal, setSelectedGoal] = useState(null);

  // Calculate KPIs
  const totalGoals = goalsdata.length;
  const totalTarget = goalsdata.reduce((sum, g) => sum + g.targetAmount, 0);
  const totalSaved = goalsdata.reduce((sum, g) => sum + g.current, 0);

  const openAddGoalDialog = () => setOpenAddGoal(true);

  const openAddMoneyDialog = (goal: any) => {
    setSelectedGoal(goal);
    setOpenAddMoney(true);
  };

  const openEditGoalDialog = (goal: any) => {
    setSelectedGoal(goal);
    setOpenEditGoal(true);
  };

  return (
    <div className="p-6 space-y-6">

      {/* KPI Cards */}
      <section className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <KpiDataCard title="Total Goals" value={totalGoals} icon={<></>} />
        <KpiDataCard title="Total Target" value={totalTarget} icon={<></>} />
        <KpiDataCard title="Total Saved" value={totalSaved} icon={<></>} />
      </section>

      {/* Add Goal Button */}
      <button
        className="bg-blue-600 text-white px-4 py-2 rounded-lg"
        onClick={openAddGoalDialog}
      >
        ➕ Add Goal
      </button>

      {/* GOALS LIST */}
      <div className="space-y-5">
        {goalsdata.map((goal) => {
          const current = goal.current || 0;
          const progress = Math.min(
            Math.round((current / goal.targetAmount) * 100),
            100
          );

          const daysLeft = Math.ceil(
            (new Date(goal.targetDate).getTime() - Date.now()) /
              (1000 * 60 * 60 * 24)
          );

          return (
            <div
              key={goal.id}
              className="p-5 bg-white dark:bg-gray-800 rounded-xl shadow-md border"
            >
              <div className="flex justify-between items-start mb-3">
                <div>
                  <h2 className="font-semibold text-lg">{goal.goalName}</h2>
                  <p className="text-sm text-gray-500">
                    {daysLeft} days left
                  </p>
                  <p className="text-sm text-gray-500">
                    Target Date: <span className="font-medium">{goal.targetDate}</span>
                  </p>
                </div>
                <span className="text-sm font-semibold text-green-600">
                  {progress}%
                </span>
              </div>

              {/* Progress Bar */}
              <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2 mb-4">
                <div
                  className="bg-green-500 h-2 rounded-full"
                  style={{ width: `${progress}%` }}
                />
              </div>

              {/* Amount Section */}
              <div className="flex justify-between border-b pb-3 mb-4">
                <div>
                  <p>Current</p>
                  <p className="font-semibold">₹{current}</p>
                </div>
                <div>
                  <p>Target</p>
                  <p className="font-semibold">₹{goal.targetAmount}</p>
                </div>
              </div>

              {/* ACTION BUTTONS */}
              <div className="flex justify-between">
                <button
                  onClick={() => openAddMoneyDialog(goal)}
                  className="bg-green-500 text-white px-8 py-2 rounded-lg"
                >
                  Add Money
                </button>
                <button
                  onClick={() => openEditGoalDialog(goal)}
                  className="text-gray-600 hover:underline"
                >
                  Edit Goal
                </button>
              </div>
            </div>
          );
        })}
      </div>
      <Dialog open={openAddGoal} size="md" onClose={() => setOpenAddGoal(false)}>
        <AddGoalDialog
          onClose={() => setOpenAddGoal(false)}
          onSave={(goalData) => addDocument(goalData)}
        />
 </Dialog>
      {/* Dialogs */}
      <Dialog open={openAddMoney} size="sm" onClose={() => setOpenAddMoney(false)}>
        <AddMoneyDialog
          goal={selectedGoal}
          onClose={() => setOpenAddMoney(false)}
          onSave={(amount) =>
            updateDocument(selectedGoal.id, {
              current: selectedGoal.current + amount,
         
            })
              
  
          } />
        </Dialog>
      <Dialog open={openEditGoal} onClose={() => setOpenEditGoal(false)}  >
 <EditGoalDialog
          goal={selectedGoal}
          onClose={() => setOpenEditGoal(false)}
          onSave={(updatedData) =>
            updateDocument(selectedGoal.id, updatedData)
          } />
      </Dialog>

    </div>
  );
}

export default Page;
