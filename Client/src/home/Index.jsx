import React from 'react';

import { accountService  } from '@/_services';

function Home() {
    const user = accountService.userValue;
    
    return (
        <article className="p-4 container">
                <h1>Hi {user.firstName}</h1>
                
        </article>
    );
}

export { Home };