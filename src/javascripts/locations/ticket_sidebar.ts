// need to import basic garden css styles
import '@zendeskgarden/css-bedrock'

import App from 'src/javascripts/components/App'

/* global ZAFClient */
// @ts-ignore ZAFClient is a global variable
const client = ZAFClient.init()

client.on('app.registered', function() {
    return new App(client)
})
