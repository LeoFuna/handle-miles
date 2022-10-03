import { Button, MenuItem, Modal, Select } from "@mui/material";
import { DataGrid, GridColumns } from "@mui/x-data-grid";
import Header from "components/core/Header";
import TransactionsModal from "components/transactions/TransactionsModal";
import { Transaction, useTransactions } from "hooks/transactions-hooks";
import { useUsersByFamily } from "hooks/users-hooks";
import { useSession } from "next-auth/react";
import { useState } from "react";
import { getSerializedValuesFromSession } from "utils/session-utils";

const tableColumns: GridColumns = [
  { field: 'date', headerName: 'Data', flex: 1, headerAlign: 'center', align: 'center' },
  { field: 'company', headerName: 'Programa', flex: 1, headerAlign: 'center', align: 'center' },
  { field: 'totalMiles', headerName: 'Total', flex: 1, headerAlign: 'center', align: 'center' },
  { field: 'averagePrice', headerName: 'Preço Médio', flex: 1, headerAlign: 'center', align: 'center' },
  { field: 'note', headerName: 'Descrição', flex: 1, headerAlign: 'center', align: 'center' },
  { field: 'type', headerName: '', width: 60, headerAlign: 'center', align: 'center' },
];

const serializeTransactions = (transactionsFromApi: Transaction[]) => {
  return transactionsFromApi.map((transaction: Transaction) => {
    const averagePriceFormated = parseFloat(transaction.averagePrice.toString()).toFixed(2);
    return {
      ...transaction,
      averagePrice: averagePriceFormated,
    };
  });
};

function Transactions() {
  const session = useSession();
  const { userId, familyId, name } = getSerializedValuesFromSession(session.data);
  const [selectedAccount, setSelectedAccount] = useState(name);
  const [openModal, setOpenModal] = useState(false);

  const familyUsers = useUsersByFamily({ familyId, name });
  const transactions = useTransactions({ userId: familyUsers.data?.users.find((user: any) => user.name === selectedAccount)?.id || userId });

  if (session.status !== 'authenticated') return <h1>Usuário não autenticado</h1>;
  return(
    <>
      <Header />
      <Button 
        variant='outlined' 
        sx={{ m: 2 }}
        onClick={ () => setOpenModal(true)}
      >
        Criar
      </Button>
      <Select
        value={selectedAccount}
        onChange={(event) => setSelectedAccount(event.target.value)}
      >
        {familyUsers.data?.users.map(
          (user: any) => <MenuItem key={user.id} value={user.name}>{user.name}</MenuItem>)
        }
      </Select>
      <TransactionsModal
        open={openModal}
        userId={familyUsers.data?.users.find((user: any) => user.name === selectedAccount)?.id || ''}
        setOpen={setOpenModal}
      />
      <DataGrid
        autoHeight
        rows={serializeTransactions(transactions.data?.transactions || [])}
        columns={tableColumns}
        rowsPerPageOptions={[8]}
        pageSize={10}
      />
    </>
  );
}

export default Transactions;
