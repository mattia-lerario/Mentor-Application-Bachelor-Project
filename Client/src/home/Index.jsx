import React from 'react';
import { DragDropContext, Draggable, Droppable } from 'react-beautiful-dnd';
import { accountService,companyService  } from '@/_services';
import {MyChart} from '@/_components';
import {BarChart} from '@/_components';
import { checkPropTypes } from 'prop-types';
function Home() {
    const user = accountService.userValue;
    const company = companyService.userValue;
    
    return (
        <article className="p-4 container">
            
                <h1>Hi {user.name} </h1>
                <DragDropContext>
                    <Droppable id="charts">
                        {(provided) => (
                            <div {...provided.droppableProps} ref={provided.innerRef} >
                                
                        <MyChart ids={user}></MyChart><br></br>
                        
                         
                      
                       
                          </div>      
                        )}
                
                </Droppable>
                </DragDropContext>
        </article>
    );
}

export { Home };