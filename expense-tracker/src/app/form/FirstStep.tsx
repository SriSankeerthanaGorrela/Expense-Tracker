"use client";
import { HandCoins } from "lucide-react";
import React from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import { useAuthStore } from "../store/authstore";
import { useFirestoreCollection } from "../lib/useFirestoreCollection";
import { useFirestoreDocument } from "../lib/useFirestoreDocument";

// ✅ Type for your form fields
type FirstStepFormData = {
  name: string;
  email: string;
  income: number;
  targetSavings: number;
};

// ✅ Props for your component
interface FirstStepProps {
  onContinue: () => void;
}

const FirstStep: React.FC<FirstStepProps> = ({ onContinue }) => {
  // ✅ Tell react-hook-form what data type you're using
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<FirstStepFormData>({
    defaultValues: {
      name: "",
      email: "",
      income: 0,
      targetSavings: 0,
    },
  });
 const { user,login } = useAuthStore();
  const userId = user?.uid;
  const {updateDocument,loading}=useFirestoreDocument(`users/${userId}`)
  // ✅ Ensure `data` is strongly typed
  const onSubmit: SubmitHandler<FirstStepFormData> = async(data) => {
    console.log("Step 1 Data:", data);
    await updateDocument({ ...data })
     login({
    ...user,
    name: data.name,
    
  });
    onContinue();
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="space-y-4 gap-5 grid grid-cols-2 dark:bg-gray-900 p-4"
    >
      <div className="space-y-2">
        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
          Full Name
        </label>
        <input
          type="text"
          {...register("name", { required: "Name is required" })}
          placeholder="Enter your full name"
          className="input-field"
        />
        {errors.name && (
          <p className="text-red-500 text-sm">{errors.name.message}</p>
        )}
      </div>

      <div className="space-y-2">
        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
          Email
        </label>
        <input
          type="email"
          {...register("email", { required: "Email is required" })}
          placeholder="Enter your email"
          className="input-field"
        />
        {errors.email && (
          <p className="text-red-500 text-sm">{errors.email.message}</p>
        )}
      </div>

      <div className="space-y-2">
        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
          Monthly Income (₹)
        </label>
        <input
          type="number"
          {...register("income", {
            required: "Income is required",
            min: { value: 0, message: "Income must be positive" },
          })}
          placeholder="Enter your monthly income"
          className="input-field"
        />
        {errors.income && (
          <p className="text-red-500 text-sm">{errors.income.message}</p>
        )}
      </div>

      <div className="space-y-2">
        <label className="flex gap-2 text-sm font-medium text-gray-700 dark:text-gray-300">
        Target Savings (%)
        </label>
        <input
          type="number"
          {...register("targetSavings", {
            required: "Target savings is required",
            min: { value: 0, message: "Target must be positive" },
          })}
          placeholder="Enter your savings goal"
          className="input-field"
        />
        {errors.targetSavings && (
          <p className="text-red-500 text-sm">{errors.targetSavings.message}</p>
        )}
      </div>

      <button type="submit" className="btn-primary col-span-2">
        Continue
      </button>
    </form>
  );
};

export default FirstStep;
