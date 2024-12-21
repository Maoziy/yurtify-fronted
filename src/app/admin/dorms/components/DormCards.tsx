'use client';

import React, { useState, useEffect } from 'react';
import { PieChart, Pie, Cell, Tooltip } from 'recharts';
import { motion } from 'framer-motion';

const COLORS = ['#0f3460', '#e63946'];

export default function DormCards({ data, onDormSelect }) {
  const [selectedDorm, setSelectedDorm] = useState<string | null>(null);

  const handleCardClick = (dormId: string) => {
    if (selectedDorm === dormId) {
      setSelectedDorm(null);
    } else {
      setSelectedDorm(dormId);
      onDormSelect(dormId);
    }
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      {data.map((dorm) => {
        const chartData = [
          { name: 'Dolu', value: dorm.number_registered },
          { name: 'Boş', value: dorm.total_capacity - dorm.number_registered },
        ];

        return (
          <motion.div
            key={dorm.id}
            onClick={() => handleCardClick(dorm.id)}
            className={`p-4 rounded-lg shadow-lg cursor-pointer transition-all duration-300 ${
              selectedDorm === dorm.id
                ? 'bg-gradient-to-br from-blue-500 to-green-500'
                : 'bg-gradient-to-br from-gray-700 to-gray-800'
            }`}
            whileHover={{
              scale: 1.05,
            }}
            whileTap={{
              scale: 0.95,
            }}
          >
            <h2 className="text-xl font-bold text-white mb-4">{dorm.name}</h2>
            <PieChart width={120} height={120}>
              <Pie data={chartData} dataKey="value" cx="50%" cy="50%" outerRadius={50}>
                {chartData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
              <Tooltip
                formatter={(value: number, name: string) => [`${value} kişi`, name]}
                contentStyle={{
                  backgroundColor: '#16213e',
                  color: '#eaeaea',
                  borderRadius: '8px',
                  padding: '10px',
                  fontSize: '0.9rem',
                }}
              />
            </PieChart>
            <p className="text-white mt-4">
              Toplam Kapasite: <strong>{dorm.total_capacity}</strong>
            </p>
            <p className="text-white">
              Kayıtlı Öğrenci: <strong>{dorm.number_registered}</strong>
            </p>
          </motion.div>
        );
      })}
    </div>
  );
}
