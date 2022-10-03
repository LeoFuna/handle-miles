import { Box, MenuItem, Select, Typography } from "@mui/material";
import { DataGrid, GridColumns } from "@mui/x-data-grid";
import { UserAccountsSWR, useUserAccounts } from "hooks/accounts-hooks";
import { useUsersByFamily } from "hooks/users-hooks";
import { useState } from "react";

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

const buildMainHeaderData = (accounts: UserAccountsSWR) => {
  return accounts.data?.accounts.reduce((prev, current) => {
    prev.totalInvested += current.averagePrice * (current.totalMiles / 1000);
    if (conditionsEnum.IS_POINTS(current.company)) {
      prev.totalPoints += current.totalMiles;
      prev.projectedInvoice += (current.totalMiles / 1000) * averageSellPrice.POINTS;
    } else {
      prev.totalMiles += current.totalMiles;
      prev.projectedInvoice += (current.totalMiles / 1000) * averageSellPrice.MILES;
    }
    return prev;
  }, { totalInvested: 0, projectedInvoice: 0, totalMiles: 0, totalPoints: 0 });
};

function Dashboard({ userId, familyId, name }: { userId: string, familyId: string, name: string }) {
  const [selectedAccount, setSelectedAccount] = useState(name);

  const familyUsers = useUsersByFamily({ familyId, name });
  const accounts = useUserAccounts({ userId: familyUsers.data?.users.find((user: any) => user.name === selectedAccount).id || '' });

  return (
    <Box flexDirection='column' justifyContent='center' display='flex'>
      <Box display='flex' justifyContent='space-evenly' m={5} >
        <Box display='flex' flexDirection='column' textAlign='center'>
          <Typography variant='h3'>
            Total Investido
          </Typography>
          <Typography variant='h5'>
            {`R$ ${buildMainHeaderData(accounts)?.totalInvested.toFixed(2) || ''}`}
          </Typography>
        </Box>
        <Box display='flex' flexDirection='column' textAlign='center'>
          <Typography variant='h3'>
            Faturamento
          </Typography>
          <Typography variant='h5'>
            {`R$ ${buildMainHeaderData(accounts)?.projectedInvoice.toFixed(2) || ''}`}
          </Typography>
        </Box>
        <Box display='flex' flexDirection='column' textAlign='center'>
          <Typography variant='h3'>
            Total de Milhas
          </Typography>
          <Typography variant='h5'>
            {`${buildMainHeaderData(accounts)?.totalMiles }`}
          </Typography>
        </Box>
        <Box display='flex' flexDirection='column' textAlign='center'>
          <Typography variant='h3'>
            Total de Pontos
          </Typography> 
          <Typography variant='h5'>
            {`${buildMainHeaderData(accounts)?.totalPoints}`}
          </Typography>
        </Box>
      </Box>
      <Box>
        <Select
          value={selectedAccount}
          onChange={(event) => setSelectedAccount(event.target.value)}
        >
          {familyUsers.data?.users.map(
            (user: any) => <MenuItem key={user.id} value={user.name}>{user.name}</MenuItem>)
          }
        </Select>
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
