"use client";
import { createUserWithEmailAndPassword, signInWithEmailAndPassword } from "firebase/auth";
import { useForm } from "react-hook-form";
import { auth } from "../lib/firebase";
import { useRouter } from "next/navigation";
import { Lock, Mail } from "lucide-react";
import { useAuthStore } from "../store/authstore";

export default function AuthForm({ value }: { value: string }) {
  const { register, handleSubmit, reset, formState: { errors } } = useForm({
    defaultValues: { email: "", password: "" },
  });

  const router = useRouter();
  const { login } = useAuthStore();

  async function onSubmit(data: any) {
    const { email, password } = data;

    try {
      if (value === "Register") {
        const userCredential = await createUserWithEmailAndPassword(auth, email, password);
        const userData = {
          uid: userCredential.user.uid,
          email: userCredential.user.email,
        };

        // 🔹 Save user to Zustand store
        login(userData);

        reset();
        alert("User registered successfully!");
        router.push("/");
      } else {
        const userCredential = await signInWithEmailAndPassword(auth, email, password);
        const userData = {
          uid: userCredential.user.uid,
          email: userCredential.user.email,
        };

        // 🔹 Save user to Zustand store
        login(userData);

        reset();
        alert("Login successful!");
        router.push("/");
      }
    } catch (err: any) {
      console.error(err);
      alert(err.message);
    }
  }

  function handleClick() {
    router.push(value === "Login" ? "/register" : "/login");
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-md">
        <h2 className="text-2xl font-bold text-center mb-6">{value}</h2>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          {/* Email */}
          <div className="relative">
            <Mail className="absolute top-3 left-3 w-5 h-5 text-gray-400" />
            <input
              type="text"
              placeholder="Email"
              {...register("email", {
                required: "Email is required",
                pattern: {
                  value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                  message: "Invalid email address",
                },
              })}
              className="pl-10 pr-3 py-2 border rounded w-full focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            {errors.email && <p className="text-red-500 text-sm mt-1">{errors.email.message}</p>}
          </div>

          {/* Password */}
          <div className="relative">
            <Lock className="absolute top-3 left-3 w-5 h-5 text-gray-400" />
            <input
              type="password"
              placeholder="Password"
              {...register("password", {
                required: "Password is required",
                minLength: {
                  value: 6,
                  message: "Password must be at least 6 characters",
                },
              })}
              className="pl-10 pr-3 py-2 border rounded w-full focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            {errors.password && <p className="text-red-500 text-sm mt-1">{errors.password.message}</p>}
          </div>

          {/* Submit */}
          <button
            type="submit"
            className="w-full py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition font-semibold"
          >
            {value}
          </button>
        </form>

        {/* Switch Between Login/Register */}
        <p className="text-center mt-4 text-gray-500">
          {value === "Login" ? "Don't have an account?" : "Already have an account?"}{" "}
          <button onClick={handleClick} className="text-blue-600 font-semibold hover:underline">
            {value === "Login" ? "Register" : "Login"}
          </button>
        </p>
      </div>
    </div>
  );
}
// const { user } = await signInWithEmailAndPassword(auth, email, password);
// const userData = {
//   uid: user.uid,      // unique Firebase identifier
//   email: user.email,  // the login email
// };
// login(userData);      // store in Zustand