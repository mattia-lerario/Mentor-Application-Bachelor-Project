import React from 'react';

import { accountService  } from '@/_services';
import {MyChart} from '@/_components';
import {BarChart} from '@/_components';
function Home() {
    const user = accountService.userValue;
    
    return (
        <article className="p-4 container">
                <h1>Hi {user.firstName}</h1>
                <MyChart></MyChart><br></br>
                <BarChart></BarChart>
        </article>
    );
}

export { Home };