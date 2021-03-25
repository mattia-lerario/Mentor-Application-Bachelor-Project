import React from 'react';
import { Router } from 'react-router-dom';
import { render } from 'react-dom';

import { history } from './_helpers';
import { accountService } from './_services';
import { App } from './app';
import {Nav} from './_components/Nav';
import './styles.less';

/*// setup fake backend
import { configureFakeBackend } from './_helpers';
configureFakeBackend();
*/
// attempt silent token refresh before startup
accountService.refreshToken().finally(startApp);

function startApp() { 
    render(
        <Router history={history}>
            <Nav></Nav>
            <App />
        </Router>,
        document.getElementById('app')
    );
}