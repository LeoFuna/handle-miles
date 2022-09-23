import { Button, Modal } from "@mui/material";
import { Box } from "@mui/system";
import { DataGrid, GridColumns } from "@mui/x-data-grid";
import Header from "components/core/Header";
import TransactionsModal from "components/transactions/TransactionsModal";
import { useTransactions } from "hooks/transactions-hooks";
import { useSession } from "next-auth/react";
import { useState } from "react";

const tableColumns: GridColumns = [
  { field: 'date', headerName: 'Data', flex: 1, headerAlign: 'center', align: 'center' },
  { field: 'company', headerName: 'Programa', flex: 1, headerAlign: 'center', align: 'center' },
  { field: 'totalMiles', headerName: 'Total', flex: 1, headerAlign: 'center', align: 'center' },
  { field: 'averagePrice', headerName: 'Preço Médio', flex: 1, headerAlign: 'center', align: 'center' },
  { field: 'type', headerName: '', width: 60, headerAlign: 'center', align: 'center' },
];

function Transactions() {
  const session = useSession();
  const userId = (typeof session.data?.id === 'string') ? session.data?.id : undefined;
  const transactions = useTransactions({ userId });
  const [openModal, setOpenModal] = useState(false);

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
      <TransactionsModal
        open={openModal}
      />
      <DataGrid
        autoHeight
        rows={transactions.data?.transactions || []}
        columns={tableColumns}
        rowsPerPageOptions={[8]}
        pageSize={10}
      />
    </>
  );
}

export default Transactions;
