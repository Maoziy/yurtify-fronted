'use client';

import { useState } from 'react';
import Table from './components/StudentsTable';
import StudentModal from './components/StudentModal';
import SearchBar from './components/SearchBar';

export default function StudentsPage() {
  const [students, setStudents] = useState([
    {
      id: 1,
      name: 'Ali Veli',
      phone: '555-123-4567',
      dorm: 'Yurt A',
      room: '101',
      photo: '/placeholder.png',
    },
    {
      id: 2,
      name: 'Ayşe Fatma',
      phone: '555-987-6543',
      dorm: 'Yurt B',
      room: '202',
      photo: '/placeholder.png',
    },
  ]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedStudent, setSelectedStudent] = useState<any>(null);

  const dorms = [
    { id: 1, name: 'Yurt A', rooms: ['101', '102', '103'] },
    { id: 2, name: 'Yurt B', rooms: ['201', '202'] },
  ];

  const handleSave = (student: any) => {
    if (selectedStudent) {
      setStudents(
        students.map((s) =>
          s.id === selectedStudent.id ? { ...student, id: s.id } : s
        )
      );
    } else {
      setStudents([
        ...students,
        { ...student, id: students.length + 1, photo: student.photo || '/placeholder.png' },
      ]);
    }
    setIsModalOpen(false);
  };

  const handleDelete = (id: number) => {
    setStudents(students.filter((student) => student.id !== id));
  };

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Öğrenci Yönetimi</h1>
      <SearchBar onSearch={(value) => console.log(value)} />
      <button
        onClick={() => {
          setIsModalOpen(true);
          setSelectedStudent(null);
        }}
        className="bg-secondary text-white py-2 px-4 rounded mb-4"
      >
        Yeni Öğrenci
      </button>
      <Table
        data={students}
        onEdit={(student) => {
          setSelectedStudent(student);
          setIsModalOpen(true);
        }}
        onDelete={handleDelete}
      />
      <StudentModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSave={handleSave}
        student={selectedStudent}
        dorms={dorms}
      />
    </div>
  );
}
