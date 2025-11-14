// import React, { useEffect, useState } from "react";
// import { recentTransactionType } from "../components/(share_types)/AllTypes";
// import { useAuthStore } from "../store/authstore";
// import { useFirestoreCollection } from "../lib/useFirestoreCollection";

// interface AddTransactionFormTypeProp {
//   onClose: () => void;
//   categories: string[];
//   onSave: (newTransaction: recentTransactionType) => void;
//   editingData?: recentTransactionType | null;
// }

// const AddTransactionForm: React.FC<AddTransactionFormTypeProp> = ({
//   onClose,
//   categories,
//   onSave,
//   editingData,
// }) => {
//   const { user } = useAuthStore();

//   const { addDocument, updateDocument } = useFirestoreCollection(
//     user ? `users/${user.uid}/transactions` : ""
//   );

//   const [formData, setFormData] = useState({
//     description: "",
//     amount: "" as number | "",
//     category: "",
//     payment: "",
//     date: "",
//   });

//   useEffect(() => {
//     if (editingData) {
//       setFormData({
//         description: editingData.description || "",
//         amount: String(editingData.amount) || "",
//         category: editingData.category || "",
//         payment: editingData.payment || "",
//         date: editingData.date || "",
//       });
//     } else {
//       setFormData({
//         description: "",
//         amount: "",
//         category: "",
//         payment: "",
//         date: "",
//       });
//     }
//   }, [editingData]);

//   function handleChange(e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) {
//     const { name, value } = e.target;
//     setFormData((prev) => ({
//       ...prev,
//       [name]: name === "amount" ? Number(value) : value,
//     }));
//   }

//   const handleSubmit = async (e: React.FormEvent) => {
//     e.preventDefault();

//     const transactionData = {
//       ...formData,
//       amount: Number(formData.amount),
//     };

//     try {
//       if (editingData?.id) {
//         await updateDocument(editingData.id, transactionData);
//       } else {
//         await addDocument(transactionData);
//       }

//       onSave({
//         ...transactionData,
//         id: editingData?.id || "",
//       });
//       onClose();
//     } catch (error) {
//       console.error("Error saving transaction:", error);
//     }
//   };

//   return (
//     <div>
//       <h2 className="text-xl font-semibold mb-4">
//         {editingData ? "Edit Transaction" : "Add New Transaction"}
//       </h2>
//       <form className="space-y-4" onSubmit={handleSubmit}>
//         <div className="space-y-2">
//           <label className="label">Description</label>
//           <input
//             type="text"
//             name="description"
//             value={formData.description}
//             onChange={handleChange}
//             placeholder="Enter description..."
//             className="input-field"
//           />
//         </div>

//         <div className="space-y-2">
//           <label className="label">Amount</label>
//           <input
//             type="number"
//             name="amount"
//             value={formData.amount}
//             onChange={handleChange}
//             placeholder="Enter amount..."
//             className="input-field"
//           />
//         </div>

//         <div>
//           <label className="label">Payment Method</label>
//           <select
//             name="payment"
//             value={formData.payment}
//             onChange={handleChange}
//             className="input-field"
//           >
//             <option value="">Select payment</option>
//             <option value="UPI">UPI</option>
//             <option value="Card">Card</option>
//             <option value="Cash">Cash</option>
//             <option value="Bank">Bank</option>
//           </select>
//         </div>

//         <div className="space-y-2">
//           <label className="label">Category</label>
//           <select
//             name="category"
//             value={formData.category}
//             onChange={handleChange}
//             className="input-field"
//           >
//             <option value="">Select category</option>
//             {categories.map((cat) => (
//               <option key={cat} value={cat}>
//                 {cat}
//               </option>
//             ))}
//           </select>
//         </div>

//         <div className="space-y-2">
//           <label className="label">Date</label>
//           <input
//             type="date"
//             name="date"
//             value={formData.date}
//             onChange={handleChange}
//             className="input-field"
//           />
//         </div>

//         <div className="flex justify-end gap-2 mt-4">
//           <button
//             type="button"
//             onClick={onClose}
//             className="px-4 py-2 rounded-md border border-gray-300 hover:bg-gray-100"
//           >
//             Cancel
//           </button>
//           <button
//             type="submit"
//             className="px-4 py-2 rounded-md bg-blue-600 text-white hover:bg-blue-700"
//           >
//             {editingData ? "Update Transaction" : "Add Transaction"}
//           </button>
//         </div>
//       </form>
//     </div>
//   );
// };

// export default AddTransactionForm;


import React, { useEffect, useState } from "react";
import { recentTransactionType } from "../components/(share_types)/AllTypes";
interface AddTransactionFormTypeProp {
  onClose: () => void;
  categories: string[];
  onSave:(newTransaction:recentTransactionType)=>void
  editingData?:recentTransactionType | null
}
const AddTransactionForm: React.FC<AddTransactionFormTypeProp> = ({
  onClose,
  categories,
  onSave,
  editingData,

}) => {
  const [formData, setFormData] = useState(
     {
  
    description: "",
    amount: "",
    category: "",
    payment: "",
    date: "",
    
  });
  //  useEffect(() => {
  //   if (editingData) {
  //     setFormData((prev)=>({
  //       ...prev,
  //       amount:String(editingData.amount) // convert number to string
  //     }));
  //   }
  // }, [editingData]);
  useEffect(() => {
  if (editingData) {
    setFormData({
      
      description: editingData.description || "",
      amount: String(editingData.amount) || "",
      category: editingData.category || "",
      payment: editingData.payment || "",
      date: editingData.date || "",
    });
  } else {
    // reset form when no editingData
    setFormData({
      
      description: "",
      amount: "",
      category: "",
      payment: "",
      date: "",
    });
  }
}, [editingData]);


  function handleChange(e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) {
    const{name,value}=e.target;
    setFormData((prev)=>(
        {
            ...prev,[name]: name==="amount"? Number(value):value
        }
    ))
  }
// const handleSubmit=(e:React.FormEvent)=>{
//     e.preventDefault();
//     console.log("new transaction",formData);
//     const transaction:recentTransactionType={
//         ...formData,
//         amount: Number(formData.amount), //always convert to  number here...
//       //id:editingData?.id || ""
//     }
    
      
    
//     onSave(transaction);
//     onClose();
// }
const handleSubmit = (e: React.FormEvent) => {
  e.preventDefault();
  console.log("new transaction", formData);

  const transaction: recentTransactionType = {
    ...formData,
    amount: Number(formData.amount),
  };

  if (editingData) {
    // merge existing id from editingData
    console.log("🧾 Saving transaction:", editingData ? { ...editingData, ...formData } : formData);

    onSave({ ...editingData, ...transaction });
  } else {
    onSave(transaction); // let Firestore auto-generate id
  }

  onClose();
};

  return (
    <div>
      <h2 className="text-xl font-semibold mb-4">{editingData ? "Edit Transaction" : "Add New Transaction"}</h2>
      <form className="space-y-4" onSubmit={handleSubmit}>
        <div className="space-y-2">
          <label className="label">Description</label>
          <input
            type="text"
            name="description"
            value={formData.description}
            onChange={handleChange}
            placeholder="Enter description..."
            className="input-field"
          />
        </div>
        <div className="space-y-2">
          <label className="label">Amount</label>
          <input
            type="number"
            name="amount"
            value={formData.amount}
            onChange={handleChange}
            placeholder="Enter amount..."
            className="input-field"
          />
        </div>
        <div>
        <label className="label">Payment Method</label>
        <select
          name="payment"
          value={formData.payment}
          onChange={handleChange}
          className="input-field"
        >
          <option value="">Select payment</option>
          <option>UPI</option>
          <option>Card</option>
          <option>Cash</option>
          <option>Bank</option>
        </select>
      </div>
        <div className="space-y-2">
          <label className="label">Category</label>
          <select
            name="category"
            value={formData.category}
            onChange={handleChange}
            className="input-field"
          >
              <option value="">Select category</option>

            {categories.map((cat)=>(
                
                <option key={cat} value={cat}>{cat}</option>
            ))}
          </select>
        </div>

        <div className="space-y-2">
            <label className="label">Date</label>
            <input
            type="date"
            name="date"
            value={formData.date}
            onChange={handleChange}
            className="input-field"
            />
        </div>
        <div className="flex justify-end gap-2 mt-4">
        <button
          type="button"
          onClick={onClose}
          className="px-4 py-2 rounded-md border border-gray-300 hover:bg-gray-100"
        >
          Cancel
        </button>
        <button
          type="submit"
          className="px-4 py-2 rounded-md bg-blue-600 text-white hover:bg-blue-700"
        >
          {editingData ? "Update Transaction" : "Add Transaction"}

        </button>
            </div>
      </form>
    </div>
  );
};

export default AddTransactionForm;