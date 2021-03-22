//Made this file for the hamburger-menu, but did't work

import React from 'react';
import { Route, Switch } from 'react-router-dom';

import {MenuWrapper} from '../style/styledcomponents';
import { Sidebar } from './Sidebar';
import { DragDropContext } from 'react-beautiful-dnd';
function Menu({ match }) {
    const { path } = match;
    
    return (
        <MenuWrapper>
            <div className="Padding">
                    <Switch>
                        <Route exact path={path} component={Sidebar} />
                        <Route path={`${path}/sidebar`} component={Sidebar} />
                    </Switch>
            </div>
        </MenuWrapper>

    );
}

export { Menu };