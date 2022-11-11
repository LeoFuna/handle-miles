import { useSession } from "next-auth/react";
import { createContext, Dispatch, SetStateAction, useEffect, useState } from "react";
import { getSerializedValuesFromSession } from "utils/session-utils";

interface AccountContext {
  selectedUserName: string;
  setSelectedUserName: Dispatch<SetStateAction<string>>
}

export const GeneralContext = createContext<AccountContext>({
  selectedUserName: '',
  setSelectedUserName: () => { return; },
});

function UserContext({ children }: any) {
  const session = useSession();
  const { name } = getSerializedValuesFromSession(session.data);

  const [selectedUserName, setSelectedUserName] = useState<string>('');

  useEffect(() => {
    setSelectedUserName(name);
  }, [name]);

  return(
    <GeneralContext.Provider value={{ selectedUserName, setSelectedUserName }}>
      {children}
    </GeneralContext.Provider>
  );
}

export default UserContext;
