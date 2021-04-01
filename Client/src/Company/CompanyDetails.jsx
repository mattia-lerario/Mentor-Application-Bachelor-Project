import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

import { companyService} from '@/_services';

import {CompanyWrapper} from '../style/styledcomponents';

//img
import avatar from '../media/avatar.jpg'
//icons
import {BsPlusCircleFill} from 'react-icons/bs';

function CompanyDetails({ match }) {
    const { path } = match;
    const [totalHours, setTotalHours] = useState(0);

    const { id } = match.params;
    const companyId = id;
    const [company, setUsers] = useState(null);

    const { path } = match;


    function sumHours(timeLogList) {
        const reducer = (hr, currentValue) => hr + currentValue.hours;   
        const hours = (timeLogList.reduce(reducer, 0));
        setTotalHours(hours);
    }

    useEffect(() => {
        companyService.getAll().then(x => setUsers(x));
    }, []);

    useEffect(() => {
         
        async function fetchData() {
            
            if(!company)return;
            const comp = (await company.find(c => c.id === companyId));

            sumHours(comp.hoursSpendtOnCompany);
        }
        fetchData();
        
    }, [company]);
    

    return (

        <CompanyWrapper>
            {/* <Link to="/companies" className={'BtnSimple Right'}>Back</Link> */}
            
            {company && company.filter(company => company.id === companyId).map(company => 
                <article key={company.id}>

                    <section className="headerImg">
                        {company.companyImg} {/*Not working, but is supposed to show the image saved in the database on the specific company */}                    
                    </section>

                    <Link to={`${path}/updateWorkingHoursMentor`} className={'BtnLink'}>
                    <button type="button" className={'Btn BtnMain Right'}>Update Hours</button>
                    </Link>
                    
                    <Link to={`${path}/powerranking`} className={'BtnLink'}>
                    <button type="button" className={'Btn BtnMain Right'}>Power ranking</button>
                    </Link>

                    <section>
                        <h1>{company.companyName}</h1>
                    </section>


                    <article className="BoxWrapper">

                        <section className="MainBox">
                            <section className="Box Details">
                                <h4>Details</h4>
                                <p>{company.CompanyDetails}</p>
                                <p>Description</p>
                            </section>
                            
                            <section className="Box PRbox">
                                <h4>Section for power ranking</h4>
                                {company.powerRanking && company.powerRanking.map(pr =>
                                <article
                                key = {pr.date}>
                                    <p>{pr.question1}</p>
                                    <p>{pr.comment1}</p>
                                    { /*<br></br>
                                        <BarChart data={data}></BarChart>*/}
                                    <p>{pr.question2}</p>
                                    <p>{pr.comment2}</p>
                                </article>
                                )}
                            </section>

                            <section className="Box Feed">
                            <Link to={`${path}/updateMentor`} className={'Tooltip'}>  
                                <BsPlusCircleFill/> 
                                <span className={'TooltipText'}>Add post</span>
                            </Link>
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
                                    <p>{totalHours}</p>
                            </section>

                            <section className="Box Team">
                                <h4>The team</h4>
                                {/*
                                Legge til onclick på hvert teammember
                                Link til medlemmets profil
                                */}
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