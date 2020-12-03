import Vue from 'vue';
import VeeValidate from 'vee-validate';

import { store } from './_store';
import { router } from './_helpers';
import App from './app/App';

import { createProvider } from 'vue-apollo';
import { ApolloClient } from 'apollo-client';
import { HttpLink } from 'apollo-link-http';
import { InMemoryCache } from 'apollo-cache-inmemory';

import VueApollo, { ApolloProvider } from 'vue-apollo';

Vue.config.productionTip = false;

const httpLink = new HttpLink({
    uri: 'https://evening-cliffs-51162.herokuapp.com/graphql/',
    useGETForQueries: false,
    credentials: 'include',
    headers: {
        Accept: 'application/json',
        'content-type': 'application/json',
    },
    fetchOptions: {
        mode: 'cors'
    },
    onError: ({ networkError, graphQLErrors }) => {
        console.log('graphQLErrors', graphQLErrors)
        console.log('networkError', networkError)
    }
});

const apolloClient = new ApolloClient({
    link: httpLink,
    cache: new InMemoryCache(),
    connectToDevTools: true,
    onError: (e) => { console.log(e) },
    headers: {
        Accept: 'application/json',
        'content-type': 'application/json',
    },
});

Vue.use(VeeValidate);
Vue.use(VueApollo);

// setup fake backend
// import { configureFakeBackend } from './_helpers';
// configureFakeBackend();

const apolloProvider = new VueApollo({
    defaultClient: apolloClient
});

new Vue({
    el: '#app',
    router,
    store,
    apolloProvider,
    render: h => h(App)
});