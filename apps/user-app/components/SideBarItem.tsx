"use client";

import { usePathname, useRouter } from "next/navigation";

interface SideBarItemProps {
  href: string;
  title: string;
  icon: React.ReactNode;
}

export const SideBarItem = ({ href, title, icon }: SideBarItemProps) => {
  const router = useRouter();
  const pathname = usePathname();
  const isSelected = pathname === href;

  return (
    <div
      className={`flex cursor-pointer ${isSelected ? "text-[#6a51a6]" : "text-slate-500"} p-2 pl-8 hover:bg-[#6a51a6]/10 transition-all`}
      onClick={() => {
        router.push(href);
      }}
    >
      <div>{icon}</div>
      <div className="font-bold ml-2">{title}</div>
    </div>
  );
};
