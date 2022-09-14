import { Button } from "@mui/material";
import { DataGrid, GridColumns } from "@mui/x-data-grid";
import Header from "components/core/Header";

const tableColumns: GridColumns = [
  { field: 'id', headerName: 'ID', width: 60, headerAlign: 'center', align: 'center' },
  { field: 'date', headerName: 'Data', flex: 1, headerAlign: 'center', align: 'center' },
  { field: 'company', headerName: 'Programa', flex: 1, headerAlign: 'center', align: 'center' },
  { field: 'totalMiles', headerName: 'Total', flex: 1, headerAlign: 'center', align: 'center' },
  { field: 'averagePrice', headerName: 'Preço Médio', flex: 1, headerAlign: 'center', align: 'center' },
  { field: 'type', headerName: '', width: 60, headerAlign: 'center', align: 'center' },
];

const mockRows = [
  { id: 1, date: '06/09/2022', company: 'Tudo Azul', totalMiles: 100000, averagePrice: '$ 17,50', type: '+' },
  { id: 2, date: '08/09/2022', company: 'Latam', totalMiles: 100000, averagePrice: '$ 17,50', type: '+' },
  { id: 3, date: '08/09/2022', company: 'PDA', totalMiles: 100000, averagePrice: '$ 17,50', type: '-' },
  { id: 4, date: '14/09/2022', company: 'Tudo Azul', totalMiles: 100000, averagePrice: '$ 17,50', type: '+' },
  { id: 5, date: '06/09/2022', company: 'Tudo Azul', totalMiles: 100000, averagePrice: '$ 17,50', type: '+' },
  { id: 6, date: '08/09/2022', company: 'Latam', totalMiles: 100000, averagePrice: '$ 17,50', type: '+' },
  { id: 7, date: '08/09/2022', company: 'PDA', totalMiles: 100000, averagePrice: '$ 17,50', type: '-' },
  { id: 8, date: '14/09/2022', company: 'Tudo Azul', totalMiles: 100000, averagePrice: '$ 17,50', type: '+' },
  { id: 9, date: '06/09/2022', company: 'Tudo Azul', totalMiles: 100000, averagePrice: '$ 17,50', type: '+' },
  { id: 10, date: '08/09/2022', company: 'Latam', totalMiles: 100000, averagePrice: '$ 17,50', type: '+' },
  { id: 11, date: '08/09/2022', company: 'PDA', totalMiles: 100000, averagePrice: '$ 17,50', type: '-' },
  { id: 12, date: '14/09/2022', company: 'Tudo Azul', totalMiles: 100000, averagePrice: '$ 17,50', type: '+' },
];

function Transactions() {
  return(
    <>
      <Header />
      <Button 
        variant='outlined' 
        sx={{ m: 2 }}
        onClick={ () => console.log('Abre modal pra criaçao de Transação!')}
      >Criar</Button>
      <DataGrid
        autoHeight
        rows={mockRows}
        columns={tableColumns}
        rowsPerPageOptions={[8]}
        pageSize={10}
      />
    </>
  );
}

export default Transactions;
