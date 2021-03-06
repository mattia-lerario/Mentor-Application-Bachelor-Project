import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

import { accountService, companyService, mentorService} from '@/_services';

function List({ match }) {
    const { path } = match;
    const [users, setUsers] = useState(null);
    const [mentors, setMentors] = useState(null);
    const [companies, setCompanies] = useState(null);
    

    useEffect(() => {
        accountService.getAll().then(x => setUsers(x));
        companyService.getAll().then(x => setCompanies(x));
        mentorService.getAll().then(x => setMentors(x));
    }, []);

    function deleteUser(id) {
        setUsers(users.map(x => {
            if (x.id === id) { x.isDeleting = true; }
            return x;
        }));
        
       // users && users.filter(user => user.mentor === "Mentor" ||user.role === "Mentor").map()
        
      /* if(user.mentors != null)
        mentors && mentors.filter(mentor=>mentor.id === user.mentors[0]).map( users =>
            
        console.log(users.mentors));
        
        /*if(user.role = mentor){
            mentorService.delete(id);
        }  

        if(user.role === company){
            companyService.delete(id);
        }*/
        
        accountService.delete(id).then(() => {
            setUsers(users => users.filter(x => x.id !== id));
        });
    }

    return (
        <section>
            <Link to="/admin" className={'BtnSimple BtnBack'}>Back</Link>
            <h1>All Accounts</h1>
            <p>View of all Users in the System</p>

                <Link to={`${path}/add`} className={'Btn BtnMain BtnLink'}>Add User</Link>
            <table className={'Table'}>
                <thead>
                    <tr>
                        <th style={{ width: '30%' }}>Name</th>
                        <th style={{ width: '30%' }}>Email</th>
                        <th style={{ width: '30%' }}>Role</th>
                        <th style={{ width: '10%' }}></th>
                    </tr>
                </thead>
                <tbody>
                    {users && users.map(user =>
                        <tr key={user.id}>
                            <td>{user.title} {user.firstName} {user.lastName}</td>
                            <td>{user.email}</td>
                            <td>{user.role}</td>
                            <td style={{ whiteSpace: 'nowrap' }}>
                                    <Link to={`${path}/edit/${user.id}`} className={'BtnSimple'}>Edit</Link>
                                    <Link onClick={() => deleteUser(user.id)} className={'BtnSimple'} style={{ width: '60px' }} disabled={user.isDeleting}>
                                        {user.isDeleting 
                                            ? <span></span>
                                            : <span>Delete</span>
                                        }
                                    </Link>
                            </td>
                        </tr>
                    )}
                    {!users &&
                        <tr>
                            <td colSpan="4" className="text-center">
                                <span></span>
                            </td>
                        </tr>
                    }
                </tbody>
            </table>
        </section>
    );
}

export { List };