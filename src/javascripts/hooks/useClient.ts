import { useContext } from 'react';
import { ClientContext } from 'src/javascripts/modules/App';

export const useClient = () => {
  const context = useContext(ClientContext);
  if (context === undefined) {
    throw new Error(`useClient must be used within a ClientProvider`);
  }
  return context;
};

export default useClient;
