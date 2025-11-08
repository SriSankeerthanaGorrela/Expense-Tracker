"use client";
import { useAuthStore } from "../store/authstore";
import { doc, updateDoc } from "firebase/firestore";
import { db } from "../lib/firebase";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";

export default function FormPage() {
  const { user, login } = useAuthStore(); // ✅ bring login to update state
  const router = useRouter();
  const { register, handleSubmit } = useForm();

  async function onSubmit(data: any) {
    try {
      await updateDoc(doc(db, "users", user.uid), {
        name: data.name,
        age: data.age,
        isNewuser: false, // ✅ mark user as known
      });

      // ✅ Update Zustand store locally too
      const updatedUser = { ...user, isNewuser: false };
      login(updatedUser); // refresh Zustand + localStorage state

      alert("Form submitted successfully!");
      router.push("/dashboard");
    } catch (err) {
      console.error(err);
      alert("Error saving form data");
    }
  }

  return (
    <div className="flex min-h-screen justify-center items-center bg-gray-50">
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="bg-white p-8 rounded-lg shadow-md space-y-4 w-96"
      >
        <h2 className="text-xl font-semibold text-center mb-4">
          Complete Your Profile
        </h2>

        <input
          type="text"
          placeholder="Full Name"
          {...register("name", { required: true })}
          className="w-full p-2 border rounded"
        />
        <input
          type="number"
          placeholder="Age"
          {...register("age", { required: true })}
          className="w-full p-2 border rounded"
        />

        <button
          type="submit"
          className="w-full py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
        >
          Submit
        </button>
      </form>
    </div>
  );
}
