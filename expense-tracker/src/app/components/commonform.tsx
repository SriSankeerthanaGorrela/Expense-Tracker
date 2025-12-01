"use client";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
} from "firebase/auth";
import { useForm } from "react-hook-form";
import { auth, db } from "../lib/firebase";
import { useRouter } from "next/navigation";
import { Eye, EyeOff, Lock, LogIn, Mail, TrendingUp, UserPlus } from "lucide-react";
import { useAuthStore } from "../store/authstore";
import { doc, getDoc, setDoc } from "firebase/firestore";
import { serverTimestamp } from "firebase/firestore";
import toast from "react-hot-toast";
import { useState } from "react";
export default function AuthForm({ value }: { value: string }) {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    defaultValues: { email: "", password: "" },
  });
const [loading, setLoading] = useState(false);
const[show,setShow]=useState(false);
  const router = useRouter();
  const { login } = useAuthStore();

  async function onSubmit(data: any) {
    const { email, password } = data;
    setLoading(true);

    try {
      if (value === "Register") {
        const userCredential = await createUserWithEmailAndPassword(
          auth,
          email,
          password
        );
        const user = {
          uid: userCredential.user.uid,
          email: userCredential.user.email,
        };
        await setDoc(doc(db, "users", user.uid), {
          uid: user.uid,
          email: user.email,
          isNewuser: true, // 👈 new user
          createdAt: serverTimestamp(),
          name: "",
        });

        // 🔹 Save user to Zustand store

        reset();
      
          toast.success("User registered successfully! Please login.");
setTimeout(() => router.push("/login"), 800); 

    
      } else {
        const userCredential = await signInWithEmailAndPassword(
          auth,
          email,
          password
        );
        const uid = userCredential.user.uid;

        // ✅ Fetch the Firestore user document
        const docRef = doc(db, "users", uid);
        const docSnap = await getDoc(docRef);
        let userData = {
          uid,
          email: userCredential.user.email,
          isNewuser: false,
        };

        if (docSnap.exists()) {
          userData = { ...userData, ...docSnap.data() };
          
        }

        login(userData);
        reset();
        toast.success("Logged in successfully!");
        
          router.push("/dashboard");
        
      }
      } catch (err: any) {
      switch (err.code) {
        case "auth/email-already-in-use":
          toast.error("Email already registered. Try logging in.");
          break;

        case "auth/wrong-password":
          toast.error("Incorrect password.");
          break;

        case "auth/user-not-found":
          toast.error("No account found for this email.");
          break;

        case "auth/invalid-email":
          toast.error("Invalid email address.");
          break;

        default:
          toast.error("Something went wrong. Please try again.");
      }
    } finally {
      setLoading(false);
    }
  }

  function handleClick() {
    router.push(value === "Login" ? "/register" : "/login");
  }

  return (
    <div className="min-h-screen flex items-center justify-center w-full bg-gradient-to-br from-sky-50 via-teal-50 to-blue-50">
      <div className="bg-white p-8 space-y-5 rounded-lg shadow-xl w-full max-w-md ">
        <p className="bg-gradient-to-r from-sky-500 to-teal-500 mx-auto rounded-full w-fit ">
          {" "}
          <TrendingUp className="w-17 h-17 text-white p-4" />
        </p>
        {value === "Login" ? (
          <div className="space-y-2 flex flex-col items-center">
            <h2 className="w-fit gradient-text text-4xl font-bold">
              Welcome Back
            </h2>
            <p className="text-sm">Sign in to manage your finances</p>
          </div>
        ) : (
          <div className="flex flex-col space-y-2 items-center">
            <h2 className="text-4xl pb-1 w-fit gradient-text font-bold text-center ">
              Get Started
            </h2>
            <p className="text-sm">Create account to start tracking</p>
          </div>
        )}

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
              className="input-field"
            />
            {errors.email && (
              <p className="text-red-500 text-sm mt-1">
                {errors.email.message}
              </p>
            )}
          </div>

          {/* Password */}
          <div className="relative">
            <Lock className="absolute top-3 left-3 w-5 h-5 text-gray-400" />
            <input
              type={show?"text":"password"}
              placeholder="Password"
                autoComplete="new-password"

              {...register("password", {
                required: "Password is required",
                minLength: {
                  value: 6,
                  message: "Password must be at least 6 characters",
                },
                pattern: {
                  value: /^(?=.*[A-Z])(?=.*[!@#$&*]).+$/,
                  message:
                    "Password must include 1 uppercase letter and 1 special character",
                },
              })}
              className="input-field"
            />
            <button type="button" className="right-3 absolute top-4 text-gray-700" onClick={() => setShow(!show)}> {show ? <EyeOff size={20}/> : <Eye size={20}/>} </button>
            {errors.password && (
              <p className="text-red-500 text-sm mt-1">
                {errors.password.message}
              </p>
            )}
          </div>

          {/* Submit */}
         <button
  type="submit"
  disabled={loading}
  className={`btn-primary flex gap-3 w-full items-center justify-center ${
    loading ? "opacity-60 cursor-not-allowed" : ""
  }`}
>
  {loading ? (
    <>
      <span className="loader w-4 h-4 border-2 border-t-transparent border-white rounded-full animate-spin"></span>
      Processing...
    </>
  ) : value === "Login" ? (
    <>
      <LogIn />
      Signin
    </>
  ) : (
    <>
      <UserPlus />
      Register
    </>
  )}
</button>

        </form>

        {/* Switch Between Login/Register */}
        <p className="text-center mt-4 text-gray-500">
          {value === "Login"
            ? "Don't have an account?"
            : "Already have an account?"}{" "}
          <button
            onClick={handleClick}
            className="text-blue-600 font-semibold hover:underline"
          >
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