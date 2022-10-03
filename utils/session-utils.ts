export type SessionData = {
  expires: string;
  familyId: string;
  id: string;
  name: string;
  user: {
    name: string;
  }
}

export const getSerializedValuesFromSession = (session: SessionData | any): { userId: string, familyId: string, name: string } => {
  const userId = (typeof session?.id === 'string') ? session.id : '';
  const familyId = (typeof session?.familyId === 'string') ? session.familyId : '';
  const name = (typeof session?.name === 'string') ? session.name : '';
  return {
    userId,
    familyId,
    name,
  };
};
