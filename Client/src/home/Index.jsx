import React from 'react';

import { accountService  } from '@/_services';

function Home() {
    const user = accountService.userValue;
    
    return (
        <article className="p-4 container">
                <h1>Hi {user.firstName}</h1>
                <p>You're logged in with React & JWT!!</p>
        </article>
    );
}

export { Home };