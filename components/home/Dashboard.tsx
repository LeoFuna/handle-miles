import { Box, MenuItem, Select, Typography } from "@mui/material";
import { DataGrid, GridColumns } from "@mui/x-data-grid";
import { GeneralContext } from "context/GeneralContext";
import { Account, UserAccountsSWR, useUserAccounts } from "hooks/accounts-hooks";
import { useCompanySettingsByFamily } from "hooks/settings-hooks";
import { useUsersByFamily } from "hooks/users-hooks";
import { useContext } from "react";
import { formatPriceToPtBRCurrency, separateNumberWithDots } from "utils/numbers-utils";

const conditionsEnum = {
  IS_POINTS: (companyName: string): boolean => ['Esfera', 'Livelo', 'PDA'].includes(companyName),
};

const tableColumns: GridColumns = [
  { field: 'company', headerName: '', flex: 1, align: 'center' },
  { field: 'totalMiles', headerName: 'Total de Pontos', flex: 1, headerAlign: 'center', align: 'center', valueFormatter: separateNumberWithDots },
  { field: 'averagePrice', headerName: 'Preço Médio', flex: 1, headerAlign: 'center', align: 'center', valueFormatter: formatPriceToPtBRCurrency },
  { field: 'totalMoney', headerName: 'Total Investido', flex: 1, headerAlign: 'center', align: 'center', valueFormatter: formatPriceToPtBRCurrency },
  { field: 'projectedInvoicing', headerName: 'Faturamento Previsto', flex: 1, headerAlign: 'center', align: 'center', valueFormatter: formatPriceToPtBRCurrency },
];

const serializeAccounts = (accounts: UserAccountsSWR, companiesSettings: any) => accounts.data?.accounts.map((account) => {
  const { averagePrice, ...rest } = account;
  const accountFormatedToRender = { ...rest, averagePrice: '', totalMoney: '', projectedInvoicing: '' };
  accountFormatedToRender.averagePrice = averagePrice.toFixed(2);
  accountFormatedToRender.totalMoney = (averagePrice * (account.totalMiles / 1000)).toFixed(2);

  const sellAveragePrice = companiesSettings.data?.exchangeConfigs
  .find((settings: any) => settings.companyId === account.companyId).sellAveragePrice;

  accountFormatedToRender.projectedInvoicing = (sellAveragePrice * (account.totalMiles / 1000)).toFixed(2);

  return accountFormatedToRender;
});

const buildMainHeaderData = (accounts: Account[], companiesSettings: any) => {
  return accounts.reduce((prev, current) => {
    const sellAveragePrice = companiesSettings.data?.exchangeConfigs
      .find((settings: any) => settings.companyId === current.companyId).sellAveragePrice;
    prev.totalInvested += current.averagePrice * (current.totalMiles / 1000);

    if (conditionsEnum.IS_POINTS(current.company)) {
      prev.totalPoints += current.totalMiles;
      prev.projectedInvoice += (current.totalMiles / 1000) * sellAveragePrice;
      return prev;
    }
    prev.totalMiles += current.totalMiles;
    prev.projectedInvoice += (current.totalMiles / 1000) * sellAveragePrice;
    return prev;
  }, { totalInvested: 0, projectedInvoice: 0, totalMiles: 0, totalPoints: 0 });
};

function Dashboard({ familyId, name }: { userId: string, familyId: string, name: string }) {
  const { selectedUserName, setSelectedUserName } = useContext(GeneralContext);

  const familyUsers = useUsersByFamily({ familyId, name });
  const accounts = useUserAccounts({ userId: familyUsers.data?.users.find((user: any) => user.name === selectedUserName).id || '' });
  const companiesSettings = useCompanySettingsByFamily({ familyId });

  return (
    <Box flexDirection='column' justifyContent='center' display='flex'>
      <Box display='flex' justifyContent='space-evenly' m={5} >
        <Box display='flex' flexDirection='column' border={1} p={1.5} borderRadius={4} textAlign='center'>
          <Typography variant='h4'>
            Total Investido
          </Typography>
          <Typography variant='h5'>
          {!!accounts.data?.accounts ? formatPriceToPtBRCurrency({ value: buildMainHeaderData(accounts.data.accounts, companiesSettings).totalInvested }) : ''}
          </Typography>
        </Box>
        <Box display='flex' flexDirection='column' border={1} p={1.5} borderRadius={4} textAlign='center'>
          <Typography variant='h4'>
            Faturamento
          </Typography>
          <Typography variant='h5'>
            {!!accounts.data?.accounts ? formatPriceToPtBRCurrency({ value: buildMainHeaderData(accounts.data.accounts, companiesSettings).projectedInvoice }) : ''}
          </Typography>
        </Box>
        <Box display='flex' flexDirection='column' border={1} p={1.5} borderRadius={4} textAlign='center'>
          <Typography variant='h4'>
            Total de Milhas
          </Typography>
          <Typography variant='h5'>
            {!!accounts.data?.accounts ? `${separateNumberWithDots({ value: buildMainHeaderData(accounts.data.accounts, companiesSettings).totalMiles })}` : ''}
          </Typography>
        </Box>
        <Box display='flex' flexDirection='column' border={1} p={1.5} borderRadius={4} textAlign='center'>
          <Typography variant='h4'>
            Total de Pontos
          </Typography> 
          <Typography variant='h5'>
          {!!accounts.data?.accounts ? `${separateNumberWithDots({ value: buildMainHeaderData(accounts.data.accounts, companiesSettings).totalPoints })}` : ''}
          </Typography>
        </Box>
      </Box>
      <Box m={2}>
        <Select
          value={selectedUserName}
          onChange={(event) => setSelectedUserName(event.target.value)}
        >
          {familyUsers.data?.users.map(
            (user: any) => <MenuItem key={user.id} value={user.name}>{user.name}</MenuItem>)
          }
        </Select>
      </Box>
      <DataGrid
        autoHeight
        rows={serializeAccounts(accounts, companiesSettings) || []}
        columns={tableColumns}
        rowsPerPageOptions={[8]}
        style={{ fontSize: '1.6em' }}
      />
    </Box>
  );
}

export default Dashboard;
