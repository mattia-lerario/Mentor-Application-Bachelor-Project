import React from 'react';
import { DragDropContext, Draggable, Droppable } from 'react-beautiful-dnd';
import { accountService,companyService  } from '@/_services';
import {MyChart} from '@/_components';
import {BarChart} from '@/_components';
import { checkPropTypes } from 'prop-types';
function Home() {
    const user = accountService.userValue;
    console.log(user);
    
    
    return (
        <section className="main mainMargin scrollhost">
            <h1>Hi {user.name} </h1>
                <BarChart ids={user}></BarChart>
            <br/>    
        </section>
    );
}

export { Home };