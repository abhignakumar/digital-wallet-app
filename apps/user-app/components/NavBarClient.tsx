"use client";

import { NavBar } from "@repo/ui/navbar";
import { signIn, signOut, useSession } from "next-auth/react";
import { useRouter } from "next/navigation";

export const NavBarClient = () => {
  const session = useSession();
  const router = useRouter();

  return (
    <div>
      <NavBar
        onSignIn={signIn}
        onSignOut={async () => {
          await signOut();
          router.push("/api/auth/signin");
        }}
        user={session.data?.user}
      />
    </div>
  );
};
