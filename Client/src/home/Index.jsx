import React from 'react';
import {accountService} from '@/_services';
import {BarChart} from '@/_components';

function Home() {
    const user = accountService.userValue;
    console.log(user);
    
    
    return (
        <section className="main mainMargin scrollhost">
            <h1>Hi {user.name} </h1>
                <BarChart ids={user.id}></BarChart>
            <br/>    
        </section>
    );
}
 
export { Home };