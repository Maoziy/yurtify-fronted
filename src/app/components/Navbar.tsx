'use client';

import Link from 'next/link';
import { useUser } from '@/context/UserContext';
import { motion } from 'framer-motion';
import { HomeIcon, BuildingLibraryIcon, PhoneIcon, ArrowLeftOnRectangleIcon } from '@heroicons/react/24/outline';
import { UserCircleIcon } from '@heroicons/react/24/solid';

export default function Navbar() {
  const { user, setUser } = useUser();

  const handleLogout = () => {
    setUser(null); // Kullanıcı bilgisini sıfırla
  };

  return (
    <motion.nav
      className="bg-gradient-to-r-primary text-white p-4 shadow-md fixed w-full z-50"
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <div className="container mx-auto flex justify-between items-center">
        {/* Logo */}
        <div className="text-2xl font-bold">
          <Link href="/">Yurtify</Link>
        </div>

        {/* Navigation Links */}
        <ul className="flex space-x-6">
          <li className="flex items-center space-x-2">
            <HomeIcon className="h-5 w-5" />
            <Link href="/" className="hover:text-accent">
              Ana Sayfa
            </Link>
          </li>
          <li className="flex items-center space-x-2">
            <BuildingLibraryIcon className="h-5 w-5" />
            <Link href="/dorms" className="hover:text-accent">
              Yurtlar
            </Link>
          </li>
          <li className="flex items-center space-x-2">
            <PhoneIcon className="h-5 w-5" />
            <Link href="/contact" className="hover:text-accent">
              İletişim
            </Link>
          </li>
        </ul>

        {/* Kullanıcı Avatarı veya Giriş/Kayıt */}
        <div className="flex items-center space-x-4">
          {user ? (
            <div className="flex items-center space-x-2">
              {/* Kullanıcı Avatarı */}
              <div className="relative">
                {user.photo ? (
                  <img
                    src={user.photo}
                    alt="User Avatar"
                    className="h-8 w-8 rounded-full border-2 border-backround"
                  />
                ) : (
                  <UserCircleIcon className="h-8 w-8 text-backround" />
                )}
              </div>
              <Link href="/auth/login" className="hover:text-accent">
              <button
                onClick={handleLogout}
                className="flex items-center space-x-2 bg-secondary px-3 py-1 rounded hover:bg-accent"
              >
                <ArrowLeftOnRectangleIcon className="h-5 w-5" />
                
              </button>
              </Link>
            </div>
          ) : (
            <motion.div
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              className="bg-secondary px-4 py-2 rounded hover:bg-accent cursor-pointer"
            >
              <Link href="/auth/login" className="flex items-center space-x-2">
                <ArrowLeftOnRectangleIcon className="h-5 w-5" />
                <span>Giriş/Kayıt</span>
              </Link>
            </motion.div>
          )}
        </div>
      </div>
    </motion.nav>
  );
}
