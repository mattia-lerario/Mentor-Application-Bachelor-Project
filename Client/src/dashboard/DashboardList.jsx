import React, { useState, useEffect } from 'react';

//Styling
import {ListWrapper} from '../style/styledcomponents';

import { companyService } from '@/_services';
import { mentorService } from '@/_services';

//icon
import {HiOutlineMail} from 'react-icons/Hi';

function DashboardList({ match }) {
    const { path } = match;
    const [company, setUsers] = useState(null);

    useEffect(() => {
        companyService.getAll().then(x => setUsers(x));
    }, []);

    return (
        
        <ListWrapper>
        <div>
            <h1>All Companies</h1>
            <p>All companies showcased in dashboard</p>
              
            <div className="card">
                <p className="companyName">Company 1</p>
                <p>Sales Revenue</p>
                <p>Company number: </p>
                <p><HiOutlineMail/>: </p>
            </div>  
            <div className="card">
                <p className="companyName">Company 2</p>
                <p>Sales Revenue</p>
                <p>Company number: </p>
                <p><HiOutlineMail/>: </p>
            </div>  
            <div className="card">
                <p className="companyName">Company 3</p>
                <p>Sales Revenue</p>
                <p>Company number: </p>
                <p>Email: </p>
            </div>  
            <div className="card">
                <p className="companyName">Company 4</p>
                <p>Sales Revenue</p>
                <p>Company number: </p>
                <p>Email: </p>
            </div>  

        </div>
        </ListWrapper>
        
        );
}

export { DashboardList }; 