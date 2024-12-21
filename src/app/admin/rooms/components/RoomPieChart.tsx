import React from 'react';
import { PieChart, Pie, Cell, Tooltip, Legend } from 'recharts';

interface Room {
  number: string;
  capacity: number;
  occupancy: number;
}

interface RoomPieChartProps {
  room: Room;
}

const COLORS = ['#0f3460', '#e63946'];

export default function RoomPieChart({ room }: RoomPieChartProps) {
  const data = [
    { name: 'Dolu', value: room.occupancy },
    { name: 'Boş', value: room.capacity - room.occupancy },
  ];

  return (
    <div>
      <PieChart width={200} height={200}>
        <Pie
          data={data}
          dataKey="value"
          cx="50%"
          cy="50%"
          outerRadius={80}
          fill="#8884d8"
          label={(entry) => `${entry.name}: ${entry.value}`}
        >
          {data.map((entry, index) => (
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
        <Legend />
      </PieChart>
    </div>
  );
}
