import React, { createContext } from 'react';
import { render } from 'react-dom';
import { ThemeProvider, DEFAULT_THEME } from '@zendeskgarden/react-theming';

import I18n from 'src/typecripts/lib/i18n';
import AppView from 'src/typecripts/components/AppView';
import { ZAFClient } from '@lib/types';

export const ClientContext = createContext<ZAFClient|undefined>(undefined);

class App {
  _client: ZAFClient;
  initializePromise: Promise<void>;

  constructor(client: ZAFClient) {
    this._client = client;

    // this.initializePromise is only used in testing
    // indicate app initilization(including all async operations) is complete
    this.initializePromise = this.init();
  }

  /**
   * Initialize module, render main template
   */
  async init() {
    const currentUser = (await this._client.get('currentUser')).currentUser;

    I18n.loadTranslations(currentUser.locale);

    const appContainer = document.querySelector('.main');

    render(
      <ThemeProvider theme={{ ...DEFAULT_THEME }}>
        <ClientContext.Provider value={this._client}>
          <AppView />
        </ClientContext.Provider>
      </ThemeProvider>,
      appContainer
    );
  }
}

export default App;
