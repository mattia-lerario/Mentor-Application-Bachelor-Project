import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

import { accountService } from '@/_services';
import { BtnWrapper } from '../../style/styledcomponents';

function List({ match }) {
    const { path } = match;
    const [users, setUsers] = useState(null);

    useEffect(() => {
        accountService.getAll().then(x => setUsers(x));
    }, []);

    function deleteUser(id) {
        setUsers(users.map(x => {
            if (x.id === id) { x.isDeleting = true; }
            return x;
        }));
        accountService.delete(id).then(() => {
            setUsers(users => users.filter(x => x.id !== id));
        });
    }

    return (
        <div>
            <h1>Users</h1>
            <p>All users from secure (admin only) api end point:</p>
            <BtnWrapper>
                <Link to={`${path}/add`} className="Btn MainBtn LinkBtn">Add User</Link>
                <Link to={`${path}/addMentor`} className="Btn MainBtn LinkBtn">Add Mentor</Link>
            </BtnWrapper>
            <table className="table table-striped">
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
                                <BtnWrapper>
                                <Link to={`${path}/edit/${user.id}`} className="Btn MainBtn LinkBtn">Edit</Link>
                                <Link onClick={() => deleteUser(user.id)} className="Btn DeleteBtn LinkBtn" style={{ width: '60px' }} disabled={user.isDeleting}>
                                    {user.isDeleting 
                                        ? <span className="spinner-border spinner-border-sm"></span>
                                        : <span>Delete</span>
                                    }
                                </Link>
                                </BtnWrapper>
                            </td>
                        </tr>
                    )}
                    {!users &&
                        <tr>
                            <td colSpan="4" className="text-center">
                                <span className="spinner-border spinner-border-lg align-center"></span>
                            </td>
                        </tr>
                    }
                </tbody>
            </table>
        </div>
    );
}

export { List };