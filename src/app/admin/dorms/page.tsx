'use client';

import { useState } from 'react';
import { dorms as initialDorms } from '../../../data/dorm';
import DormCards from './components/DormCards';
import SearchBar from '@/searchbar/SearchBar';
import DormModal from './components/DormModal';

export default function DormsPage() {
  const [dorms, setDorms] = useState(initialDorms);
  const [filteredDorms, setFilteredDorms] = useState(initialDorms);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleSearch = (query: string) => {
    const lowerCaseQuery = query.toLowerCase();
    const filtered = dorms.filter(
      (dorm) =>
        dorm.name.toLowerCase().includes(lowerCaseQuery) ||
        dorm.total_capacity.toString().includes(lowerCaseQuery) ||
        dorm.number_registered.toString().includes(lowerCaseQuery)
    );
    setFilteredDorms(filtered);
  };

  const handleAddDorm = (newDorm: any) => {
    const updatedDorms = [...dorms, newDorm];
    setDorms(updatedDorms);
    setFilteredDorms(updatedDorms);
  };

  const handleDeleteDorm = (id: string) => {
    const updatedDorms = dorms.filter((dorm) => dorm.id !== id);
    setDorms(updatedDorms);
    setFilteredDorms(updatedDorms);
  };

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-6">Yurt İşlemleri</h1>
      <SearchBar
        placeholder="Yurt adı, kapasite veya doluluk oranına göre arayın..."
        onSearch={handleSearch}
      />
      <DormCards data={filteredDorms} onDelete={handleDeleteDorm} />
      <button
        className="mt-4 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
        onClick={() => setIsModalOpen(true)}
      >
        Yeni Yurt Ekle
      </button>
      <DormModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} onSave={handleAddDorm} />
    </div>
  );
}
