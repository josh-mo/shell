import { useContext } from 'react';
import { ClientContext } from 'src/typecripts/components/App';

import { ZAFClient } from '@lib/types';


const useClient = ():ZAFClient => {
  const context = useContext(ClientContext);
  if (context === undefined) {
    throw new Error(`useClient must be used within a ClientProvider`);
  }
  return context;
};

export default useClient;
