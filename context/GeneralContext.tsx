import { useSession } from "next-auth/react";
import { createContext, Dispatch, SetStateAction, useEffect, useState } from "react";
import { getSerializedValuesFromSession } from "utils/session-utils";

interface AccountContext {
  selectedUserName: string;
  setSelectedUserName: Dispatch<SetStateAction<string>>;
  session: {
    familyId: string;
    name: string;
  };
}

export const GeneralContext = createContext<AccountContext>({
  selectedUserName: '',
  setSelectedUserName: () => { return; },
  session: {
    familyId: '',
    name: '',
  },
});

function UserContext({ children }: any) {
  const session = useSession();
  const { name, familyId } = getSerializedValuesFromSession(session.data);

  const [selectedUserName, setSelectedUserName] = useState<string>('');

  useEffect(() => {
    setSelectedUserName(name);
  }, [name]);

  return(
    <GeneralContext.Provider value={{ selectedUserName, setSelectedUserName, session: { familyId, name } }}>
      {children}
    </GeneralContext.Provider>
  );
}

export default UserContext;
