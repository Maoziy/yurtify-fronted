import * as React from 'react';
import { DataGrid, GridColDef } from '@mui/x-data-grid';
import { Button } from '@mui/material';

interface TableProps {
  data: any[];
  onEdit: (student: any) => void;
  onDelete: (id: number) => void;
}

export default function Table({ data, onEdit, onDelete }: TableProps) {
  const columns: GridColDef[] = [
    {
      field: 'photo',
      headerName: 'Fotoğraf',
      width: 100,
      renderCell: (params) => (
        <img
          src={params.value || '/placeholder.png'}
          alt="Student"
          style={{ width: '40px', height: '40px', borderRadius: '50%' }}
        />
      ),
    },
    { field: 'name', headerName: 'Adı', width: 150 },
    { field: 'phone', headerName: 'Telefon', width: 150 },
    { field: 'dorm', headerName: 'Yurt', width: 150 },
    { field: 'room', headerName: 'Oda', width: 100 },
    {
      field: 'actions',
      headerName: 'İşlemler',
      width: 200,
      renderCell: (params) => (
        <div style={{ display: 'flex', gap: '10px' }}>
          <Button
            variant="contained"
            color="primary"
            onClick={() => onEdit(params.row)}
          >
            Düzenle
          </Button>
          <Button
            variant="contained"
            color="secondary"
            onClick={() => onDelete(params.row.id)}
          >
            Sil
          </Button>
        </div>
      ),
    },
  ];

  return (
    <div style={{ height: 400, width: '100%' }}>
      <DataGrid rows={data} columns={columns} pageSize={5} rowsPerPageOptions={[5]} />
    </div>
  );
}
