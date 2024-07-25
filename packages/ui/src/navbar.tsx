"use client";

import { Button } from "./button";

interface NavBarProps {
  user?: {
    name?: string | null;
  };
  onSignIn: () => void;
  onSignOut: () => void;
}

export const NavBar = ({ user, onSignIn, onSignOut }: NavBarProps) => {
  return (
    <div className="flex justify-between bg-zinc-200 p-3">
      <div className="flex items-center text-base font-bold text-zinc-700">
        Payment App
      </div>
      <div>
        <Button onClick={user ? onSignOut : onSignIn}>
          {user ? "Log out" : "Login"}
        </Button>
      </div>
    </div>
  );
};
