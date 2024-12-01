import { Navbar } from "@/components/Navbar";

export function ContentLayout({ title, children }) {
  return (
    <div>
      <Navbar title={title} />
      <div className="container mt-4 px-4 sm:px-8">{children}</div>
    </div>
  );
}