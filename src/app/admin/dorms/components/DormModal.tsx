import React, { useState } from 'react';
import { Button } from '@mui/material';

interface DormModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (dorm: any) => void;
}

export default function DormModal({ isOpen, onClose, onSave }: DormModalProps) {
  const [formData, setFormData] = useState({
    name: '',
    total_capacity: '',
    number_registered: '',
    floor: '',
    dorm_type: '0', // 0: Kız, 1: Erkek
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.total_capacity || !formData.number_registered) {
      alert('Lütfen tüm alanları doldurun!');
      return;
    }
    onSave({
      ...formData,
      id: Date.now().toString(), // Geçici bir ID
      total_capacity: parseInt(formData.total_capacity),
      number_registered: parseInt(formData.number_registered),
    });
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed top-0 left-0 w-full h-full bg-black bg-opacity-50 flex items-center justify-center">
      <div className="bg-white p-6 rounded shadow-lg w-1/2">
        <h2 className="text-2xl font-bold mb-4">Yeni Yurt Ekle</h2>
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            placeholder="Yurt Adı"
            value={formData.name}
            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
            className="w-full mb-4 p-2 border rounded"
          />
          <input
            type="number"
            placeholder="Toplam Kapasite"
            value={formData.total_capacity}
            onChange={(e) => setFormData({ ...formData, total_capacity: e.target.value })}
            className="w-full mb-4 p-2 border rounded"
          />
          <input
            type="number"
            placeholder="Kayıtlı Öğrenci Sayısı"
            value={formData.number_registered}
            onChange={(e) => setFormData({ ...formData, number_registered: e.target.value })}
            className="w-full mb-4 p-2 border rounded"
          />
          <select
            value={formData.dorm_type}
            onChange={(e) => setFormData({ ...formData, dorm_type: e.target.value })}
            className="w-full mb-4 p-2 border rounded"
          >
            <option value="0">Kız</option>
            <option value="1">Erkek</option>
          </select>
          <div className="flex justify-end space-x-2">
            <Button variant="outlined" onClick={onClose}>
              İptal
            </Button>
            <Button type="submit" variant="contained" color="primary">
              Kaydet
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
}
