import React from 'react';
import { DataGrid, GridColDef } from '@mui/x-data-grid';
import { PieChart, Pie, Cell, Tooltip } from 'recharts';
import { Button } from '@mui/material';

const COLORS = ['#0f3460', '#e63946'];

interface RoomsTableProps {
  data: any[];
  onEdit: (room: any) => void;
  onDelete: (id: string) => void;
}

export default function RoomsTable({ data, onEdit, onDelete }: RoomsTableProps) {
  const columns: GridColDef[] = [
    { field: 'room_name', headerName: 'Oda Adı', width: 150 },
    { field: 'capacity', headerName: 'Kapasite', width: 100 },
    { field: 'number_of_student', headerName: 'Öğrenci Sayısı', width: 150 },
    { field: 'floor_id', headerName: 'Kat ID', width: 150 },
    {
      field: 'occupancy',
      headerName: 'Doluluk Oranı',
      width: 200,
      renderCell: (params) => {
        const data = [
          { name: 'Dolu', value: params.row.number_of_student },
          { name: 'Boş', value: params.row.capacity - params.row.number_of_student },
        ];
        return (
          <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100%' }}>
            <PieChart width={80} height={80}>
              <Pie
                data={data}
                dataKey="value"
                cx="50%"
                cy="50%"
                outerRadius={35}
                fill="#8884d8"
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
            </PieChart>
          </div>
        );
      },
    },
    {
      field: 'actions',
      headerName: 'İşlemler',
      width: 200,
      renderCell: (params) => (
        <div style={{ display: 'flex', gap: '10px' }}>
          <Button variant="contained" color="primary" onClick={() => onEdit(params.row)}>
            Düzenle
          </Button>
          <Button variant="contained" color="secondary" onClick={() => onDelete(params.row.id)}>
            Sil
          </Button>
        </div>
      ),
    },
  ];

  return (
    <div style={{ height: 600, width: '80%', margin: '0 auto' }}>
      <DataGrid
        rows={data}
        columns={columns}
        pageSize={5}
        rowsPerPageOptions={[5]}
        rowHeight={120} // Hücre yüksekliği artırıldı
        disableSelectionOnClick
      />
    </div>
  );
}
