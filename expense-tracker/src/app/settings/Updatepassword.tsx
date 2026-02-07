"use client";
import React, { useState } from "react";
import { Lock } from "lucide-react";
import { EmailAuthProvider, reauthenticateWithCredential, updatePassword } from "firebase/auth";
import { getFirebaseAuth } from "../lib/firebase";
import { useAuthStore } from "../store/authstore"; // to get current user

function UpdatePassword() {
  const { user } = useAuthStore(); // get logged-in user
  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

const handlePasswordChange = async (e) => {
  e.preventDefault();
  setMessage("");
  setLoading(true);

  if (!oldPassword || !newPassword || !confirmPassword) {
    setMessage("⚠️ Please fill all fields.");
    setLoading(false);
    return;
  }

  if (newPassword !== confirmPassword) {
    setMessage("❌ New passwords do not match.");
    setLoading(false);
    return;
  }

  const auth = getFirebaseAuth();
  if (!auth || !auth.currentUser || !user?.email) {
    setMessage("⚠️ User not authenticated.");
    setLoading(false);
    return;
  }

  try {
    const credential = EmailAuthProvider.credential(
      user.email,
      oldPassword
    );

    await reauthenticateWithCredential(auth.currentUser, credential);
    await updatePassword(auth.currentUser, newPassword);

    setMessage("✅ Password updated successfully!");
    setOldPassword("");
    setNewPassword("");
    setConfirmPassword("");
  } catch (error) {
    if (error.code === "auth/wrong-password") {
      setMessage("❌ The current password is incorrect.");
    } else if (error.code === "auth/requires-recent-login") {
      setMessage("⚠️ Please re-login and try again.");
    } else {
      setMessage("⚠️ " + error.message);
    }
  } finally {
    setLoading(false);
  }
};

  return (
    <div className="bg-white shadow-md rounded-2xl border border-gray-200 p-8 w-full mx-auto space-y-6">
      <h2 className="flex gap-3 text-xl font-semibold items-center text-gray-700">
        <Lock className="bg-teal-100 text-teal-400 p-1 rounded-md" size={30} /> Security
      </h2>

      <form className="space-y-5" onSubmit={handlePasswordChange}>
        <div className="flex flex-col gap-5">
          <input
            type="password"
            placeholder="Current Password"
            value={oldPassword}
            onChange={(e) => setOldPassword(e.target.value)}
            className="w-full border p-2 border-gray-300 rounded-lg focus:outline-none bg-gray-100"
          />

          <input
            type="password"
            placeholder="New Password"
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
            className="w-full border p-2 border-gray-300 rounded-lg focus:outline-none bg-gray-100"
          />

          <input
            type="password"
            placeholder="Confirm New Password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            className="w-full border p-2 border-gray-300 rounded-lg focus:outline-none bg-gray-100"
          />
        </div>

        <div className="flex justify-between items-center">
          <button
            type="submit"
            disabled={loading}
            className={`btn-primary ${loading ? "opacity-50 cursor-not-allowed" : ""}`}
          >
            {loading ? "Updating..." : "Update Password"}
          </button>
        </div>

        {message && (
          <p
            className={`text-sm mt-2 ${
              message.startsWith("✅") ? "text-green-600" : "text-red-500"
            }`}
          >
            {message}
          </p>
        )}
      </form>
    </div>
  );
}

export default UpdatePassword;
