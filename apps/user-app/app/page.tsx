"use client";

import { Button } from "@repo/ui/button";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";

export default function Home() {
  const session = useSession();
  const router = useRouter();

  if (session.status === "loading") return <div>Loading ...</div>;

  return (
    <div className="h-screen flex flex-col bg-slate-100">
      <div className="w-full text-center font-semibold text-5xl text-slate-700 py-10 mt-10">
        Payment Application
      </div>
      {session.status === "authenticated" && (
        <div className="flex justify-center py-5">
          <div>
            <Button
              onClick={() => {
                router.push("/dashboard");
              }}
            >
              Go to Dashboard
            </Button>
          </div>
        </div>
      )}
    </div>
  );
}
