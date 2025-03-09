// "use client";

// import { Button } from "@repo/ui/button";
// import { useSession } from "next-auth/react";
// import { useRouter } from "next/navigation";

// export default function Home() {
//   const session = useSession();
//   const router = useRouter();

//   if (session.status === "loading") return <div>Loading ...</div>;

//   return (
//     <div className="h-screen flex flex-col bg-slate-100">
//       <div className="w-full text-center font-semibold text-5xl text-slate-700 py-10 mt-10">
//         Payment Application
//       </div>
//       {session.status === "authenticated" && (
//         <div className="flex justify-center py-5">
//           <div>
//             <Button
//               onClick={() => {
//                 router.push("/dashboard");
//               }}
//             >
//               Go to Dashboard
//             </Button>
//           </div>
//         </div>
//       )}
//     </div>
//   );
// }

"use client";

import { Button } from "@repo/ui/button";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { CheckCircle } from "lucide-react";

export default function Home() {
  const session = useSession();
  const router = useRouter();

  if (session.status === "loading") return <div>Loading ...</div>;

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-50 to-slate-200 flex flex-col">
      <div className="flex flex-col items-center justify-center text-center px-4 py-20">
        <h1 className="text-5xl md:text-6xl font-bold text-slate-800 leading-tight mb-4">
          The Smartest Way to Send & Receive Money
        </h1>
        <p className="text-lg text-slate-600 max-w-2xl">
          Pay friends, split bills, manage your balance — all in one simple,
          secure, and lightning-fast platform.
        </p>
        <div className="mt-8 flex gap-4 flex-wrap justify-center">
          {session.status === "authenticated" ? (
            <Button
              onClick={() => router.push("/dashboard")}
              classname="px-6 py-3 text-base"
            >
              Go to Dashboard
            </Button>
          ) : (
            <>
              <Button
                onClick={() => router.push("/signup")}
                classname="px-6 py-3 text-base"
              >
                Get Started
              </Button>
              <Button
                onClick={() => router.push("/api/auth/signin")}
                classname="px-6 py-3 text-base"
              >
                Sign In
              </Button>
            </>
          )}
        </div>
      </div>

      <div className="bg-white py-16 px-6 md:px-20 shadow-inner">
        <h2 className="text-3xl font-semibold text-center text-slate-800 mb-10">
          Why Choose Us?
        </h2>
        <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          <FeatureCard
            title="Fast Transactions"
            description="Send and receive money instantly, 24/7 with no hidden delays."
          />
          <FeatureCard
            title="Secure & Encrypted"
            description="We use bank-level encryption and security best practices."
          />
          <FeatureCard
            title="User-Friendly Interface"
            description="A sleek and intuitive design makes managing payments easy."
          />
        </div>
      </div>

      <footer className="mt-auto text-center text-sm text-slate-500 py-6">
        © {new Date().getFullYear()} Digital Wallet Pay. All rights reserved.
      </footer>
    </div>
  );
}

function FeatureCard({
  title,
  description,
}: {
  title: string;
  description: string;
}) {
  return (
    <div className="p-6 bg-slate-50 rounded-2xl shadow-md hover:shadow-lg transition-all border border-slate-200">
      <div className="flex items-center gap-3 mb-4 text-green-600">
        <CheckCircle className="w-6 h-6" />
        <h3 className="text-xl font-semibold text-slate-800">{title}</h3>
      </div>
      <p className="text-slate-600 text-sm">{description}</p>
    </div>
  );
}
