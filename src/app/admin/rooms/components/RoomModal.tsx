import React, { useState } from 'react';
import { Button } from '@mui/material';

interface RoomModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (room: any) => void;
  dormId: string; // Seçilen Yurt ID'si
  floors: any[]; // Kat bilgisi
}

export default function RoomModal({ isOpen, onClose, onSave, dormId, floors }: RoomModalProps) {
  const [formData, setFormData] = useState({
    room_name: '',
    capacity: '',
    number_of_student: 0,
    floor_id: '',
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.room_name || !formData.capacity || !formData.floor_id) {
      alert('Lütfen tüm alanları doldurun!');
      return;
    }
    onSave({ ...formData, dorm_id: dormId });
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed top-0 left-0 w-full h-full bg-black bg-opacity-50 flex items-center justify-center">
      <div className="bg-white p-6 rounded shadow-lg w-1/2">
        <h2 className="text-2xl font-bold mb-4">Yeni Oda Ekle</h2>
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            placeholder="Oda Adı"
            value={formData.room_name}
            onChange={(e) => setFormData({ ...formData, room_name: e.target.value })}
            className="w-full mb-4 p-2 border rounded"
          />
          <input
            type="number"
            placeholder="Kapasite"
            value={formData.capacity}
            onChange={(e) => setFormData({ ...formData, capacity: parseInt(e.target.value) })}
            className="w-full mb-4 p-2 border rounded"
          />
          <select
            value={formData.floor_id}
            onChange={(e) => setFormData({ ...formData, floor_id: e.target.value })}
            className="w-full mb-4 p-2 border rounded"
          >
            <option value="" disabled>
              Kat Seçiniz
            </option>
            {floors.map((floor) => (
              <option key={floor.id} value={floor.id}>
                {floor.floor_number}. Kat
              </option>
            ))}
          </select>
          <div className="flex justify-end space-x-2">
            <Button variant="outlined" onClick={onClose}>
              İptal
            </Button>
            <Button onClick={onsubmit} type="submit" variant="contained" color="primary">
              Kaydet
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
}
