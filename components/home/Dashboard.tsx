import { Box, Typography } from "@mui/material";
import { DataGrid, GridColumns } from "@mui/x-data-grid";

const tableColumns: GridColumns = [
  { field: 'id', headerName: 'ID', width: 60, headerAlign: 'center', align: 'center' },
  { field: 'company', headerName: '', flex: 1, align: 'center' },
  { field: 'totalMiles', headerName: 'Total', flex: 1, headerAlign: 'center', align: 'center' },
  { field: 'average', headerName: 'Preço Médio', flex: 1, headerAlign: 'center', align: 'center' },
  { field: 'totalMoney', headerName: 'Total $', flex: 1, headerAlign: 'center', align: 'center' },
  { field: 'projectedInvoicing', headerName: 'Faturamento', flex: 1, headerAlign: 'center', align: 'center' },
];

const mockRows = [
  { id: 1, company: 'Tudo Azul', totalMiles: 100000, average: '$ 17,50', totalMoney: 1750, projectedInvoicing: 2050 },
  { id: 2, company: 'Smiles', totalMiles: 100000, average: '$ 17,50', totalMoney: 1750, projectedInvoicing: 2050 },
  { id: 3, company: 'Latam', totalMiles: 100000, average: '$ 17,50', totalMoney: 1750, projectedInvoicing: 2050 },
  { id: 4, company: 'Livelo', totalMiles: 100000, average: '$ 17,50', totalMoney: 1750, projectedInvoicing: 2050 },
  { id: 5, company: 'Esfera', totalMiles: 100000, average: '$ 17,50', totalMoney: 1750, projectedInvoicing: 2050 },
  { id: 6, company: 'Pda', totalMiles: 100000, average: '$ 17,50', totalMoney: 1750, projectedInvoicing: 2050 },
];

function Dashboard() {
  return (
    <Box flexDirection='column' justifyContent='center' display='flex'>
      <Box display='flex' justifyContent='space-evenly' m={5} >
        <Box display='flex' flexDirection='column' textAlign='center'>
          <Typography variant='h3'>
            Total Investido
          </Typography>
          <Typography variant='h5'>
            R$ 50.000,00
          </Typography>
        </Box>
        <Box display='flex' flexDirection='column' textAlign='center'>
          <Typography variant='h3'>
            Faturamento
          </Typography>
          <Typography variant='h5'>
            R$ 60.000,00
          </Typography>
        </Box>
        <Box display='flex' flexDirection='column' textAlign='center'>
          <Typography variant='h3'>
            Total de Milhas
          </Typography>
          <Typography variant='h5'>
            200.000
          </Typography>
        </Box>
        <Box display='flex' flexDirection='column' textAlign='center'>
          <Typography variant='h3'>
            Total de Pontos
          </Typography>
          <Typography variant='h5'>
            120.000
          </Typography>
        </Box>
      </Box>

      <DataGrid
        autoHeight
        rows={mockRows}
        columns={tableColumns}
        rowsPerPageOptions={[8]}
      />
    </Box>
  );
}

export default Dashboard;
