"use client";

import { Button } from "@repo/ui/button";
import { TextInput } from "@repo/ui/textInput";
import axios from "axios";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function SignUp() {
  const [phoneNumber, setPhoneNumber] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");
  const router = useRouter();

  const handleSubmit = async () => {
    if (!phoneNumber || !password || !confirmPassword) {
      setError("Inputs are not valid !");
      return;
    }

    if (password !== confirmPassword) {
      setError("Passwords do not match !");
      return;
    }

    const response = await axios.post("/api/signup", {
      phoneNumber,
      password,
    });

    if (response.status !== 200) alert("Something went wrong !");
    else {
      alert("Account created");
      router.push("/");
    }
  };

  return (
    <div className="h-screen flex flex-col">
      <div className="flex justify-center mt-20">
        <div className="bg-slate-100 rounded-md px-5 py-3 drop-shadow-md md:w-[600px]">
          <div className="py-2">
            <div className="font-semibold text-xl py-1">
              Sign Up to Continue
            </div>
            <div className="text-sm text-slate-600">
              Create a account to sign up
            </div>
          </div>
          {error && (
            <div className="py-2">
              <div className="bg-red-100 rounded-md py-3 px-4 text-red-600/50">
                {error}
              </div>
            </div>
          )}
          <div className="py-2">
            <TextInput
              label="Phone Number"
              placeholder="Enter Phone Number"
              onChange={(e) => setPhoneNumber(e)}
            />
            <TextInput
              label="Password"
              placeholder="Enter Password"
              onChange={(e) => setPassword(e)}
            />
            <TextInput
              label="Confirm Password"
              placeholder="Enter Confirm Password"
              onChange={(e) => setConfirmPassword(e)}
            />
          </div>
          <div className="py-2 flex justify-end">
            <Button onClick={() => handleSubmit()}>Sign Up</Button>
          </div>
        </div>
      </div>
    </div>
  );
}
