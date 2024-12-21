'use client';

import { useState } from 'react';
import { Button } from '@mui/material';
import { dorms } from '../../../data/dorm';
import { rooms as initialRooms } from '../../../data/rooms';
import { floors } from '../../../data/floor';
import DormCards from '../dorms/components/DormCards';
import RoomsTable from './components/RoomsTable';
import RoomModal from './components/RoomModal';
import SearchBar from '@/searchbar/SearchBar';

export default function RoomsPage() {
  const [selectedDormId, setSelectedDormId] = useState<string | null>(null);
  const [rooms, setRooms] = useState(initialRooms);
  const [filteredRooms, setFilteredRooms] = useState(initialRooms);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleDormSelect = (dormId: string) => {
    setSelectedDormId(dormId);
    const dormRooms = initialRooms.filter((room) => room.dorm_id === dormId);
    setFilteredRooms(dormRooms);
  };

  const handleAddRoom = (room: any) => {
    const updatedRooms = [...rooms, { ...room, id: (rooms.length + 1).toString() }];
    setRooms(updatedRooms);
    if (room.dorm_id === selectedDormId) {
      setFilteredRooms(updatedRooms.filter((r) => r.dorm_id === selectedDormId));
    }
  };

  const handleSearch = (query: string) => {
    const lowerCaseQuery = query.toLowerCase();
    const filtered = rooms.filter(
      (room) =>
        room.room_name.toLowerCase().includes(lowerCaseQuery) ||
        room.capacity.toString().includes(lowerCaseQuery) ||
        room.number_of_student.toString().includes(lowerCaseQuery)
    );
    setFilteredRooms(filtered);
  };

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-6">Oda İşlemleri</h1>
      <DormCards data={dorms} onDormSelect={handleDormSelect} />
      {selectedDormId && (
        <div className="mt-8">
          <SearchBar
            placeholder="Oda, kapasite veya öğrenci arayın..."
            onSearch={handleSearch}
          />
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl font-bold">
              {dorms.find((dorm) => dorm.id === selectedDormId)?.name} Odaları
            </h2>
            <Button
              variant="contained"
              color="primary"
              onClick={() => setIsModalOpen(true)}
            >
              Yeni Oda Ekle
            </Button>
          </div>
          <RoomsTable data={filteredRooms} onEdit={() => {}} onDelete={() => {}} />
        </div>
      )}
      <RoomModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSave={handleAddRoom}
        dormId={selectedDormId as string}
        floors={floors.filter((floor) => floor.dorm_id === selectedDormId)} // Sadece seçilen yurda ait katlar
      />
    </div>
  );
}
