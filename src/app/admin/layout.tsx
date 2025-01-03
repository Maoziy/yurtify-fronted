import AdminSidebar from "../components/AdminSidebar"

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex">
      <main className="flex-grow">{children}</main>
    </div>
  );
}
