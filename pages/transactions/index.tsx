import { DataGrid, GridColumns } from "@mui/x-data-grid";
import Header from "components/core/Header";
import SelectUserAndBtnCreate from "components/core/SelectUserAndBtnCreate";
import TransactionsModal from "components/transactions/TransactionsModal";
import { GeneralContext } from "context/GeneralContext";
import { Transaction, useTransactions } from "hooks/transactions-hooks";
import { useUsersByFamily } from "hooks/users-hooks";
import { useSession } from "next-auth/react";
import Signout from "pages/auth/signout";
import { useContext, useState } from "react";
import { formatDate } from "utils/date-utils";
import { formatPriceToPtBRCurrency, separateNumberWithDots } from "utils/numbers-utils";
import { getSerializedValuesFromSession } from "utils/session-utils";

const dateFormatter = ({ value }: { value: string }) => formatDate(value, 'dd/MM/yy');

const tableColumns: GridColumns = [
  { field: 'date', headerName: 'Data', flex: 1, headerAlign: 'center', align: 'center', valueFormatter: dateFormatter },
  { field: 'company', headerName: 'Programa', flex: 1, headerAlign: 'center', align: 'center' },
  { field: 'totalMiles', headerName: 'Total', flex: 1, headerAlign: 'center', align: 'center', valueFormatter: separateNumberWithDots},
  { field: 'averagePrice', headerName: 'Preço Médio', flex: 1, headerAlign: 'center', align: 'center', valueFormatter: formatPriceToPtBRCurrency},
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
  const { selectedUserName } = useContext(GeneralContext);
  const { userId, familyId, name } = getSerializedValuesFromSession(session.data);
  const [openModal, setOpenModal] = useState(false);
  const familyUsers = useUsersByFamily({ familyId, name });
  const transactions = useTransactions({ userId: familyUsers.data?.users.find((user: any) => user.name === selectedUserName)?.id || userId });

  if (session.status === 'loading') return <h1>Carregando...</h1>;
  if (session.status === 'unauthenticated') return <Signout />;
  return(
    <>
      <Header title='Movimentações' />
      <SelectUserAndBtnCreate setOpenModal={setOpenModal} />
      <DataGrid
        autoHeight
        rows={serializeTransactions(transactions.data?.transactions || [])}
        columns={tableColumns}
        rowsPerPageOptions={[10]}
        pageSize={10}
      />
      <TransactionsModal
        open={openModal}
        userId={familyUsers.data?.users.find((user: any) => user.name === selectedUserName)?.id || ''}
        setOpen={setOpenModal}
      />
    </>
  );
}

export default Transactions;
