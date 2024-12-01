"use client";
import { Sidebar } from "@/components/Sidebar";
import { useSidebarToggle } from "@/hooks/use-sidebar-toggle";
import { useStore } from "@/hooks/use-store";

export default function DemoLayout({
  children
}) {
  const sidebar = useStore(useSidebarToggle, (state) => state);

  return (
    <div className={`transition-[margin-left] ease-in-out duration-300  ${sidebar?.isOpen === false ? "lg:ml-[90px]" : "lg:ml-72"}`}>
      <Sidebar />
      {children}
    </div>);
}