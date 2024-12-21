import React, { useState } from 'react';
import { DataGrid, GridColDef } from '@mui/x-data-grid';
import { PieChart, Pie, Cell, Tooltip } from 'recharts';
import { Button, TextField, Dialog, DialogActions, DialogContent, DialogTitle } from '@mui/material';

const COLORS = ['#0f3460', '#e63946'];

interface DormsTableProps {
  data: any[];
  onEdit: (updatedDorm: any) => void;
  onDelete: (id: string) => void;
}

export default function DormsTable({ data, onEdit, onDelete }: DormsTableProps) {
  const [searchQuery, setSearchQuery] = useState('');
  const [filteredData, setFilteredData] = useState(data);
  const [editModalOpen, setEditModalOpen] = useState(false);
  const [selectedDorm, setSelectedDorm] = useState<any | null>(null);

  // Arama İşlevi
  const handleSearch = (query: string) => {
    setSearchQuery(query);
    const lowerCaseQuery = query.toLowerCase();
    const filtered = data.filter(
      (dorm) =>
        dorm.name.toLowerCase().includes(lowerCaseQuery) ||
        dorm.total_capacity.toString().includes(lowerCaseQuery) ||
        dorm.number_registered.toString().includes(lowerCaseQuery)
    );
    setFilteredData(filtered);
  };

  // Düzenleme Modalını Açma
  const handleEditClick = (dorm: any) => {
    setSelectedDorm(dorm);
    setEditModalOpen(true);
  };

  // Düzenleme İşlemi
  const handleSave = () => {
    if (selectedDorm) {
      onEdit(selectedDorm);
    }
    setEditModalOpen(false);
  };

  const columns: GridColDef[] = [
    { field: 'name', headerName: 'Yurt Adı', width: 200 },
    { field: 'room_capacity', headerName: 'Oda Kapasitesi', width: 150 },
    { field: 'total_capacity', headerName: 'Toplam Kapasite', width: 150 },
    { field: 'number_registered', headerName: 'Kayıtlı Öğrenci', width: 150 },
    {
      field: 'occupancy',
      headerName: 'Doluluk Oranı',
      width: 200,
      renderCell: (params) => {
        const data = [
          { name: 'Dolu', value: params.row.number_registered },
          { name: 'Boş', value: params.row.total_capacity - params.row.number_registered },
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
          <Button variant="contained" color="primary" onClick={() => handleEditClick(params.row)}>
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
    <>
      <div style={{ marginBottom: '16px', width: '80%', margin: '0 auto' }}>
        <TextField
          label="Ara"
          variant="outlined"
          fullWidth
          value={searchQuery}
          onChange={(e) => handleSearch(e.target.value)}
        />
      </div>
      <div style={{ height: 600, width: '80%', margin: '0 auto' }}>
        <DataGrid
          rows={filteredData}
          columns={columns}
          pageSize={5}
          rowsPerPageOptions={[5]}
          rowHeight={120} // Hücre yüksekliği artırıldı
          disableSelectionOnClick
        />
      </div>
      <Dialog open={editModalOpen} onClose={() => setEditModalOpen(false)}>
        <DialogTitle>Yurdu Düzenle</DialogTitle>
        <DialogContent>
          <TextField
            label="Yurt Adı"
            fullWidth
            margin="normal"
            value={selectedDorm?.name || ''}
            onChange={(e) => setSelectedDorm({ ...selectedDorm, name: e.target.value })}
          />
          <TextField
            label="Toplam Kapasite"
            fullWidth
            margin="normal"
            value={selectedDorm?.total_capacity || ''}
            onChange={(e) => setSelectedDorm({ ...selectedDorm, total_capacity: e.target.value })}
          />
          <TextField
            label="Kayıtlı Öğrenci"
            fullWidth
            margin="normal"
            value={selectedDorm?.number_registered || ''}
            onChange={(e) => setSelectedDorm({ ...selectedDorm, number_registered: e.target.value })}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setEditModalOpen(false)} color="secondary">
            İptal
          </Button>
          <Button onClick={handleSave} color="primary">
            Kaydet
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
}
