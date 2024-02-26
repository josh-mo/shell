import { useContext } from 'react';
import { ClientContext, ZafClient } from 'src/javascripts/components/App';

const useClient = ():ZafClient => {
  const context = useContext(ClientContext);
  if (context === undefined) {
    throw new Error(`useClient must be used within a ClientProvider`);
  }
  return context;
};

export default useClient;
