import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import './index.css'
import { Auth0Provider } from '@auth0/auth0-react';

ReactDOM.createRoot(document.getElementById('root')!).render(
    <Auth0Provider
        domain="dev-rglgi3ifuoda0lfd.eu.auth0.com"
        clientId="ciWiedZqOuIQM3q0IkCO7QXV1TMJIkco"
        authorizationParams={{
            redirect_uri: window.location.origin
        }}>
        <App />
    </Auth0Provider>,
);