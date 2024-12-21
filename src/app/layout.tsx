import './globals.css';
import { UserProvider } from '@/context/UserContext';
import Navbar from './components/Navbar';
import AdminSidebar from './components/AdminSidebar';

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="tr">
      <head>
        <title>Yurt Yönetim Sistemi</title>
      </head>
      <body className="bg-background">
        <UserProvider>
          <Navbar />
          <div className="flex">
      <AdminSidebar />
      <div className="flex-1 p-6 transition-all duration-300">
          <main className="pt-16 ml-16 md:ml-64 p-4">{children}</main>
          </div>
          </div>
        </UserProvider>
      </body>
    </html>
  );
}
