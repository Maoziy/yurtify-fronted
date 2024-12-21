'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { useUser } from '@/context/UserContext';
import {
  UserGroupIcon,
  HomeIcon,
  BuildingOfficeIcon,
  Bars3Icon,
  XMarkIcon,
} from '@heroicons/react/24/outline';

export default function AdminSidebar() {
  const { user } = useUser();
  const [isOpen, setIsOpen] = useState(true);

  if (!user || user.role !== 'admin') {
    return null;
  }

  return (
    <motion.div
      className={`${
        isOpen ? 'w-64' : 'w-16'
      } bg-gradient-to-r-primary
 text-white h-screen fixed top-16 transition-all duration-300 z-40`}
      initial={{ width: 0 }}
      animate={{ width: isOpen ? '16rem' : '4rem' }}
    >
      {/* Toggle Button */}
      <div className="flex items-center justify-between w-full px-4 py-4">
        <button onClick={() => setIsOpen(!isOpen)} className="p-2 hover:bg-secondary rounded">
          {isOpen ? <XMarkIcon className="h-6 w-6" /> : <Bars3Icon className="h-6 w-6" />}
        </button>
      </div>

      {/* Menu Items */}
      <nav className="flex flex-col mt-4 space-y-2 w-full">
        <a
          href="/admin/students"
          className="flex items-center px-4 py-2 hover:bg-secondary rounded"
        >
          <UserGroupIcon className="h-6 w-6 mr-2" />
          {isOpen && <span>Öğrenci İşlemleri</span>}
        </a>
        <a
          href="/admin/rooms"
          className="flex items-center px-4 py-2 hover:bg-secondary rounded"
        >
          <HomeIcon className="h-6 w-6 mr-2" />
          {isOpen && <span>Oda İşlemleri</span>}
        </a>
        <a
          href="/admin/dorms"
          className="flex items-center px-4 py-2 hover:bg-secondary rounded"
        >
          <BuildingOfficeIcon className="h-6 w-6 mr-2" />
          {isOpen && <span>Yurt İşlemleri</span>}
        </a>
      </nav>
    </motion.div>
  );
}
