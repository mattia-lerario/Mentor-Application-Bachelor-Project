import React from 'react';
import { DragDropContext, Draggable, Droppable } from 'react-beautiful-dnd';
import { accountService  } from '@/_services';
import {MyChart} from '@/_components';
import {BarChart} from '@/_components';
function Home() {
    const user = accountService.userValue;
    
    return (
        <article className="p-4 container">
            
                <h1>Hi {user.firstName}</h1>
                <DragDropContext>
                    <Droppable id="charts">
                        {(provided) => (
                            <div {...provided.droppableProps} ref={provided.innerRef} >
                                
                        <MyChart></MyChart><br></br>
                        
                         
                        <MyChart></MyChart>
                       
                          </div>      
                        )}
                
                </Droppable>
                </DragDropContext>
        </article>
    );
}

export { Home };