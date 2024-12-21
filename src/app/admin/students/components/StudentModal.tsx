import { useState } from 'react';

interface StudentModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (student: any) => void;
  student?: any;
  dorms: any[];
}

export default function StudentModal({ isOpen, onClose, onSave, student, dorms }: StudentModalProps) {
  const [formData, setFormData] = useState({
    name: student?.name || '',
    phone: student?.phone || '',
    dorm: student?.dorm || '',
    room: student?.room || '',
    photo: student?.photo || null,
  });

  const handlePhotoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      const reader = new FileReader();
      reader.onload = () => setFormData({ ...formData, photo: reader.result as string });
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSave(formData);
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed top-0 left-0 w-full h-full bg-black bg-opacity-50 flex items-center justify-center">
      <div className="bg-current p-6 rounded shadow-lg w-1/2">
        <h2 className="text-primary text-2xl font-bold mb-4">{student ? 'Düzenle' : 'Yeni Öğrenci'}</h2>
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            placeholder="Adı"
            value={formData.name}
            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
            className="text-gray-500 w-full mb-4 p-2 border rounded"
          />
          <input
            type="text"
            placeholder="Telefon"
            value={formData.phone}
            onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
            className="text-gray-500 w-full mb-4 p-2 border rounded"
          />
          <select
            value={formData.dorm}
            onChange={(e) => setFormData({ ...formData, dorm: e.target.value })}
            className="text-gray-500 w-full mb-4 p-2 border rounded"
          >
            <option value="" disabled>
              Yurt Seçiniz
            </option>
            {dorms.map((dorm) => (
              <option key={dorm.id} value={dorm.name}>
                {dorm.name}
              </option>
            ))}
          </select>
          <select
            value={formData.room}
            onChange={(e) => setFormData({ ...formData, room: e.target.value })}
            className="text-gray-500 w-full mb-4 p-2 border rounded"
          >
            <option value="" disabled>
              Oda Seçiniz
            </option>
            {dorms
              .find((dorm) => dorm.name === formData.dorm)
              ?.rooms.map((room) => (
                <option key={room} value={room}>
                  {room}
                </option>
              ))}
          </select>
          <input type="file" onChange={handlePhotoChange} className="w-full mb-4 p-2 border rounded" />
          {formData.photo && (
            <img src={formData.photo} alt="Preview" className="h-24 w-24 object-cover rounded-full mb-4" />
          )}
          <div className="flex justify-end">
            <button type="button" onClick={onClose} className="bg-gray-500 text-white py-2 px-4 rounded mr-2">
              İptal
            </button>
            <button type="submit" className="bg-secondary text-white py-2 px-4 rounded">
              Kaydet
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
