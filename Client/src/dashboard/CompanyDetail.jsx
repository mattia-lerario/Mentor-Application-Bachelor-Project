import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import {BarChart} from '@/_components';
import { companyService } from '@/_services';
//style
import {CompanyWrapper} from '../style/styledcomponents';
//img
import avatar from '../media/avatar.jpg';
import companyImg from '../media/company.jpg';

//icons
import {BsPlusCircleFill} from 'react-icons/bs';

function CompanyDetails({match}) {
    const { id } = match.params;
    const companyId = id;
    const [company, setUsers] = useState(null);
        

    useEffect(() => {
        companyService.getAll().then(x => setUsers(x));
    }, []);

        

    return (

        <CompanyWrapper>
            
            {company && company.filter(company => company.id === companyId).map(company => 
                <article key={company.id}>

                    <section>
                        <img className="headerImg" src={companyImg}></img>                     
                    </section>

                    <section>
                        <h1>{company.companyName}</h1>
                    </section>


                    <article key={company.id} className="BoxWrapper">

                        <section className="MainBox">
                            <section className="Box Details">
                                <h4>Details</h4>
                                <p>{company.CompanyDetails}</p>
                                <p>Description</p>
                            </section>
                                                       
                            <section className="Box Feed">

                                <h4>Feed</h4>
                                <section className="Post">
                                    <section id="PosterInfo">
                                        <img className="ProfilePic" src={avatar}></img>
                                        <p id="PostedBy">First name After name</p>
                                    </section>
                                    <p id="Date">date posted</p>
                                    <h5>Post title</h5>
                                    <p>content</p>
                                </section>
                            </section>
                        </section>

                        
                        <section className="Sidebox">
                            <section className="Box PeopleBox">
                                <h4>People</h4>
                                <table>
                                    <tr>
                                        <th>6</th>
                                        <th>6</th>
                                        <th>6</th>
                                    </tr>
                                    <tr>
                                        <td>Employees</td>
                                        <td>Advisors</td>
                                        <td>Mentors</td>
                                    </tr>
                                </table>
                            </section>
                            <section className="Box MetricsBox">
                                <h4>Metrics</h4>
                                <p>Sales Revenue: {company.salesRevenue}</p>
                                <p>Company number: {company.companyNumber}</p>
                            </section>

                            <section className="Box TimeLog">
                                <h4>Time Log</h4>
                                <ul>
                                    {company.hoursSpendtOnCompany && company.hoursSpendtOnCompany.map((hr, index) =>
                                    <li key = {index}>{hr.hours} hours was used {hr.dateOfWork[8]}{hr.dateOfWork[9]}/{hr.dateOfWork[5]}{hr.dateOfWork[6]}</li>             
                                    )}
                                </ul>
                                    <p><b>Total time used on {company.companyName}</b></p>
                            </section>

                            <section className="Box Team">
                                <h4>The team</h4>
                              
                                <section className="TeamMember">
                                    <img className="ProfilePic" src={avatar}></img>
                                    <h5>Name</h5>
                                    <p>Stilling</p>
                                </section>
                                <section className="TeamMember">
                                    <img className="ProfilePic" src={avatar}></img>
                                    <h5>Name</h5>
                                    <p>Stilling</p>
                                </section>
                                <section className="TeamMember">
                                    <img className="ProfilePic" src={avatar}></img>
                                    <h5>Name</h5>
                                    <p>Stilling</p>
                                </section>
                                <section className="TeamMember">
                                    <img className="ProfilePic" src={avatar}></img>
                                    <h5>Name</h5>
                                    <p>Stilling</p>
                                </section>
                                <section className="TeamMember">
                                    <img className="ProfilePic" src={avatar}></img>
                                    <h5>Name</h5>
                                    <p>Stilling</p>
                                </section>
                                <section className="TeamMember">
                                    <img className="ProfilePic" src={avatar}></img>
                                    <h5>Name</h5>
                                    <p>Stilling</p>
                                </section>
                            </section>
                        </section>
                    </article>

                </article>

                
            )}
            
        </CompanyWrapper>
    );
}    

export { CompanyDetails };