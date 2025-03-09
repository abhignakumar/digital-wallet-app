// "use client";

// import { Button } from "@repo/ui/button";
// import { TextInput } from "@repo/ui/textInput";
// import axios from "axios";
// import { useRouter } from "next/navigation";
// import { useState } from "react";

// export default function SignUp() {
//   const [phoneNumber, setPhoneNumber] = useState("");
//   const [password, setPassword] = useState("");
//   const [confirmPassword, setConfirmPassword] = useState("");
//   const [error, setError] = useState("");
//   const router = useRouter();

//   const handleSubmit = async () => {
//     if (!phoneNumber || !password || !confirmPassword) {
//       setError("Inputs are not valid !");
//       return;
//     }

//     if (password !== confirmPassword) {
//       setError("Passwords do not match !");
//       return;
//     }

//     const response = await axios.post("/api/signup", {
//       phoneNumber,
//       password,
//     });

//     if (response.status !== 200) alert("Something went wrong !");
//     else {
//       alert("Account created");
//       router.push("/");
//     }
//   };

//   return (
//     <div className="h-screen flex flex-col">
//       <div className="flex justify-center mt-20">
//         <div className="bg-slate-100 rounded-md px-5 py-3 drop-shadow-md md:w-[600px]">
//           <div className="py-2">
//             <div className="font-semibold text-xl py-1">
//               Sign Up to Continue
//             </div>
//             <div className="text-sm text-slate-600">
//               Create a account to sign up
//             </div>
//           </div>
//           {error && (
//             <div className="py-2">
//               <div className="bg-red-100 rounded-md py-3 px-4 text-red-600/50">
//                 {error}
//               </div>
//             </div>
//           )}
//           <div className="py-2">
//             <TextInput
//               label="Phone Number"
//               placeholder="Enter Phone Number"
//               onChange={(e) => setPhoneNumber(e)}
//             />
//             <TextInput
//               label="Password"
//               placeholder="Enter Password"
//               onChange={(e) => setPassword(e)}
//             />
//             <TextInput
//               label="Confirm Password"
//               placeholder="Enter Confirm Password"
//               onChange={(e) => setConfirmPassword(e)}
//             />
//           </div>
//           <div className="py-2 flex justify-end">
//             <Button onClick={() => handleSubmit()}>Sign Up</Button>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// }

"use client";

import { Button } from "@repo/ui/button";
import { TextInput } from "@repo/ui/textInput";
import axios from "axios";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { AlertTriangle } from "lucide-react";

export default function SignUp() {
  const [phoneNumber, setPhoneNumber] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");
  const router = useRouter();

  const handleSubmit = async () => {
    setError("");

    if (!phoneNumber || !password || !confirmPassword) {
      setError("Please fill in all fields.");
      return;
    }

    if (password !== confirmPassword) {
      setError("Passwords do not match.");
      return;
    }

    try {
      const response = await axios.post("/api/signup", {
        phoneNumber,
        password,
      });

      if (response.status === 200) {
        alert("Account created successfully!");
        router.push("/");
      } else {
        setError("Something went wrong. Please try again.");
      }
    } catch (e) {
      setError("An error occurred. Please try again.");
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-50 to-slate-200 flex items-center justify-center px-4">
      <div className="bg-white rounded-2xl shadow-lg max-w-md w-full p-8">
        <h1 className="text-3xl font-bold text-slate-800 mb-2">
          Create an Account
        </h1>
        <p className="text-slate-600 mb-6 text-sm">
          Join Digital Wallet Pay to experience fast, secure, and simple
          payments.
        </p>

        {error && (
          <div className="flex items-center gap-2 text-red-600 bg-red-100 px-4 py-3 rounded-lg mb-4 text-sm">
            <AlertTriangle className="w-5 h-5" />
            <span>{error}</span>
          </div>
        )}

        <div className="space-y-4">
          <TextInput
            label="Phone Number"
            placeholder="Enter your phone number"
            onChange={(e) => setPhoneNumber(e)}
          />
          <TextInput
            label="Password"
            placeholder="Enter your password"
            onChange={(e) => setPassword(e)}
          />
          <TextInput
            label="Confirm Password"
            placeholder="Re-enter your password"
            onChange={(e) => setConfirmPassword(e)}
          />
        </div>

        <div className="mt-6">
          <Button onClick={handleSubmit} classname="w-full py-3 text-base">
            Sign Up
          </Button>
        </div>

        <div className="mt-4 text-center text-sm text-slate-500">
          Already have an account?{" "}
          <button
            onClick={() => router.push("/api/auth/signin")}
            className="text-blue-600 hover:underline font-medium"
          >
            Sign In
          </button>
        </div>
      </div>
    </div>
  );
}
