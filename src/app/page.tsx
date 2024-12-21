'use client';

import React from 'react';
import { Pie } from 'react-chartjs-2';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
ChartJS.register(ArcElement, Tooltip, Legend);

import { dorms } from '../data/dorm';

export default function HomePage() {
  return (
    <div className="p-6 space-y-10">
      <h1 className="text-5xl font-sans text-primary font-bold text-center mb-6">Yurt Yönetim Sistemi</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {dorms.map((dorm) => {
          const data = {
            labels: ['Dolu', 'Boş'],
            datasets: [
              {
                data: [dorm.number_registered, dorm.total_capacity - dorm.number_registered],
                backgroundColor: ['#2f4550', '#f4f4f9'],
                hoverBackgroundColor: ['#FF4500', '#B22222'],
              },
            ],
          };

          return (
            <div
              key={dorm.id}
               className="p-4 bg-gradient-to-r from-secondary to-accent text-white shadow-lg rounded-lg hover:shadow-xl transition-all duration-300"
            >
              <img src={dorm.image} alt={dorm.name} className="rounded-lg mb-4" />
              <h2 className="text-2xl font-sans font-bold mb-2">{dorm.name}</h2>
              <p className="text-sm font-sans  mb-4 whitespace-pre-line bottom-100">{dorm.detail_text}</p>
              <Pie
                data={data}
                options={{
                  responsive: true,
                  plugins: {
                    legend: {
                      position: 'top',
                    },
                  },
                }}
              />
            </div>
          );
        })}
      </div>
    </div>
  );
}
