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


function CompanyDetails({ match }) {
    const { path } = match;
    
    const [totalHours, setTotalHours] = useState(0);
    const [q1, setQuestion1] = useState(0);
    const [q2, setQuestion2] = useState(0);
    const [q3, setQuestion3] = useState(0);
    const [q4, setQuestion4] = useState(0);
    const [q5, setQuestion5] = useState(0);
    const [q6, setQuestion6] = useState(0);
    const [q7, setQuestion7] = useState(0);
    const [q8, setQuestion8] = useState(0);
    let comp = company;
    //const { path } = match;
    const { id } = match.params;
    const companyId = id;
    const [company, setUsers] = useState(null);
    let graphData = [];


    function sumHours(timeLogList) {
        const reducer = (hr, currentValue) => hr + currentValue.hours;   
        const hours = (timeLogList.reduce(reducer, 0));
        setTotalHours(hours);
    }

    function graphDataSet(Ranking) {
      console.log(Ranking)
        setQuestion1(parseInt(Ranking.question1));
        setQuestion2(parseInt(Ranking.question2));
        setQuestion3(parseInt(Ranking.question3));
        setQuestion4(parseInt(Ranking.question4));
        setQuestion5(parseInt(Ranking.question5));
        setQuestion6(parseInt(Ranking.question6));
        setQuestion7(parseInt(Ranking.question7));
        setQuestion8(parseInt(Ranking.question8));
    }
   
         
    

    useEffect(() => {
        companyService.getAll().then(x => setUsers(x));
    }, []);

 

    useEffect(() => {
         
       async function fetchData() {
            
            if(!company)return;
            const comp = (await company.find(c => c.id === companyId));
           
            sumHours(comp.hoursSpendtOnCompany); 
            graphDataSet(comp.powerRanking[comp.powerRanking.length-1]);
            //sumHours(comp.hoursSpendtOnCompany);            
        }
        fetchData();
       
    }, [company]);
    
   graphData = [
  {
    label: 'Series 1',
    data: [
      { primary: "Question 1", secondary: q1.toString()},
      { primary: "Question 2", secondary:q2.toString() },
      { primary: "Question 3", secondary: q3.toString() },
      { primary: "Question 4", secondary: q4.toString()},
      { primary: "Question 5", secondary: q5.toString()},
        { primary: "Question 6", secondary: q6.toString() },
      { primary: "Question 7", secondary: q7.toString() },
      { primary: "Question 8", secondary: q8.toString() },
      { primary: "Question 1", secondary: q1.toString() }
           ],
  }
   ];
    var chartOptions = {
    scales: {
      yAxes: [{
          ticks: {
              beginAtZero:true,
              min: 0,
              max: 6    
          }
        }]
     }
}
        

    return (

        <CompanyWrapper>
            {/* <Link to="/companies" className={'BtnSimple Right'}>Back</Link> */}
            
            {company && company.filter(company => company.id === companyId).map(company => 
                <article key={company.id}>

                    <section>
                        <img className="headerImg" src={companyImg}></img>
                    </section>

                    <Link to={`${path}/updateWorkingHoursMentor/${company.id}`} className={'BtnLink'}>
                    <button type="button" className={'Btn BtnMain Right'}>Update Hours</button>
                    </Link>
                    
                    <Link to={`${path}/directPowerRanking/${company.id}`} className={'BtnLink'}>
                    <button type="button" className={'Btn BtnMain Right'}>Power ranking</button>
                    </Link>

                    {/*
                    <section>
                        <h1>{company.companyName}</h1>
                    </section>
                    */}


                    <article key={company.id} className="BoxWrapper">

                        <section className="MainBox">
                            <section className="Box Details">
                                <h4>Details about {company.companyName}</h4>
                                <p>{company.CompanyDetails}</p>
                                <p>Description</p>
                            </section>
                            <section className="Box PRbox">
                                <section className="Box Details">
                                    <h4>Power Ranking Results</h4>
                                    <BarChart options={chartOptions} companyData={graphData} />
                                </section>
                            </section>
                            <section className="Box PRbox">
                                <h4>Mentor Comments</h4>
                                {/*
                                <BarChart options={chartOptions} companyData={graphData} />
                                */}
                                
                                {company.powerRanking && company.powerRanking.map(pr =>
                                <article
                                key = {pr.date}>
                                    <p> Comment: {pr.comment1}</p>
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

