import { Box, Typography } from "@mui/material";
import { DataGrid, GridColumns } from "@mui/x-data-grid";
import { UserAccountsSWR, useUserAccounts } from "hooks/accounts-hooks";

const averageSellPrice = { MILES: 20, POINTS: 40 };
const conditionsEnum = {
  IS_POINTS: (companyName: string): boolean => ['Esfera', 'Livelo', 'PDA'].includes(companyName),
};

const tableColumns: GridColumns = [
  { field: 'company', headerName: '', flex: 1, align: 'center' },
  { field: 'totalMiles', headerName: 'Total de Pontos', flex: 1, headerAlign: 'center', align: 'center' },
  { field: 'averagePrice', headerName: 'Preço Médio', flex: 1, headerAlign: 'center', align: 'center' },
  { field: 'totalMoney', headerName: 'Total Investido', flex: 1, headerAlign: 'center', align: 'center' },
  { field: 'projectedInvoicing', headerName: 'Faturamento Previsto', flex: 1, headerAlign: 'center', align: 'center' },
];

const serializeAccounts = (accounts: UserAccountsSWR) => accounts.data?.accounts.map((account) => {
  const { averagePrice, ...rest } = account;
  const accountFormatedToRender = { ...rest, averagePrice: '', totalMoney: '', projectedInvoicing: '' };
  accountFormatedToRender.averagePrice = `R$ ${averagePrice}`;
  accountFormatedToRender.totalMoney = `R$ ${parseFloat((averagePrice * (account.totalMiles / 1000)).toFixed(2))}`;
  conditionsEnum.IS_POINTS(account.company) ?
    accountFormatedToRender.projectedInvoicing = `
    R$ ${parseFloat((averageSellPrice.POINTS * (account.totalMiles / 1000)).toFixed(2))}
    ` :
    accountFormatedToRender.projectedInvoicing = `
    R$ ${parseFloat((averageSellPrice.MILES * (account.totalMiles / 1000)).toFixed(2))}
    `;
  return accountFormatedToRender;
});

function Dashboard({ userId }: { userId?: string }) {
  const accounts = useUserAccounts({ userId });

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
        rows={serializeAccounts(accounts) || []}
        columns={tableColumns}
        rowsPerPageOptions={[8]}
      />
    </Box>
  );
}

export default Dashboard;
