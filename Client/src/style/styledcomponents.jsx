import styled from 'styled-components';  

/*
slate grey - #38507a
*/

/*
List of what elements are getting styled here, in listed order:
- Menu
- Buttons
- Update Profile Form
- Profile Index
- Sidebar (menu)
- Company list table
*/


/* ---MENU--- */
/* File: Nav.jsx */
export const MenuWrapper = styled.div`
//---makes the background of the menu slategrey
.MenuBar{
    display:flex;
    flex-direction:row;
    padding: 1rem;
}
//---displays the links horizontal(inline). 
.MenuLinks{
    height: 10vh;
    display: inline;
    padding: 0.5rem;
}
//---making the text in the menu white
.NavLink{
    color: black;
    padding: 0.5rem;
    border-radius: 0.3rem;
}
//---gives the links a underscore and grey-color when hovered.
.NavLink:hover{
    text-decoration: #202e46 underline 0.5vh;
}
// ---ADMIN-MENU---
//adding the background-color for the Admin-menu
#AdminLink{
    color: black;
}
#AdminLink:hover{
}
`;


/* ---UPDATE PROFILE-FORM--- */
/* File: Update.jsx */
export const FormWrapper = styled.div`
/*
Resource:
https://www.w3schools.com/howto/tryit.asp?filename=tryhow_css_inline_form
26.01.2021
W3Schools.com
*/

//---Making the parameters displayed inline.
.FormRow{
    display: flex;
    flex-flow: column wrap;
}
//---Giving space between the different paramenters(eg. Title, Name etc.)
.FormRow div{
    margin: 5px 20px 5px 0;
}
//---Styling the input-fields. 
.FormGroups{
    border-radius: 4px;
    display: block;
    margin: 5px 10px 5px 0;
    padding: 5px;
    background-color: #fff;
    border: 1px solid #ddd;
}
//---centering all the elements inside FormWrapper.
.Center{
    margin: auto;
    width: 55%;
}
.InvalidFeedback{
    color: red;
    font-size: 12px;
}
.PaddingTop{
    padding-top: 20px;
}
`;

/* ---PROFILE INDEX--- */
/* File: Index.jsx */
export const ProfileWrapper = styled.div`
.Padding{
    padding: 20px;
    margin-left: 10px;
}
`;

/* ----FORM STYLE ----- */
export const GlassForm = styled.div`

.CardHeaderLogin{
    backdrop-filter: blur(10px);
    text-decoration: underline;
    text-align: center;
}
.CardBodyLogin{
    width 20rem;
    margin: auto auto;
}
`;

/* ---SIDEBAR--- */
/* Files: Nav.jsx, Sidebar.jsx */
export const SidebarWrapper = styled.div`

//Light blue backgroundcolor and width on the sidebar-menu
.Sidebar{
    margin-right:1rem;
    width: 13vw;
    height: 100%;
    display:flex;
    flex:1;
    flex-direction:column;
    align-items:center;
    border-radius:2rem;
    padding: 1rem;
    background: linear-gradient(
    to right bottom,
    rgba(255, 255, 255, 0.7),
    rgba(255, 255, 255, 0.3)
  );
}
.SideLink {
    display: block;
    color: black;
}
.SideLink:hover {
    text-decoration: none;
    font-weight: bolder;
}
.Avatar{
    width:120px;
    border-radius:20px;
}
`;



/* ---COMPANY LISTTABLE/CARDS--- */
/* Files: Company.jsx, DashboardList.jsx*/
export const ListWrapper = styled.div`
// Resource: https://www.w3schools.com/css/tryit.asp?filename=trycss_table_fancy

.card{
    flex: 3;
    background: linear-gradient(
      to right bottom,
      rgba(255, 255, 255, 0.7),
      rgba(255, 255, 255, 0.3)
        );
    width: 30%;
    height: 15%;
    margin: 0.5rem;
    margin-top: 3vh;
    display: inline-block;
    //box-shadow: right bottom fade allsides color;
    box-shadow: 0.09rem 0.19rem 0.5rem 0.1rem #38507a;
    filter: grayscale(50%);
    padding-left: 4px;
    padding-top: 4px;
    padding-right: 5px;
  }
  .card:hover{
    border: solid #38507a;
    //box-shadow: right bottom fade allsides color;
    box-shadow: 0.2rem 0.3rem 0.5rem 0.1rem #38507a;
    filter: grayscale(0%);
}
.cardTop{
    border-bottom: 0.2vh solid #bfbfbf;
    padding-bottom: 1vh;
    display: flex;
}
.cardImg{
    background-image: url("https://images.frandroid.com/wp-content/uploads/2013/01/Samsung-Logo.jpg");
    background-position: center;
    background-size: 100%;
    height: 4rem;
    width: 4.5rem;
    border-radius: 50%;
}
.companyName{
    flex: 3;
    text-aling: right;
    margin-left: 0.5vw;
    margin-top: 3vh;
    font-size: 1.3vw;
}
.cardMetric, .cardBottom{
    margin: 1rem;
}
.cardMetric{
    height: 25vh;
}
.cardBottom{
    border-top: 0.2vh solid #bfbfbf;
    text-align: center;
}
.cardBottom p, .cardBottom button{
    display: inline;
    margin-left: 0.5rem;
    margin-right: 0.5rem;
    border: 0;
    background: none;
}

  `;

/* ---COMPANY DETAILS--- */
  export const CompanyWrapper = styled.div`
  
.headerImg{
    width: 100%;
    height: 35vh;
    background-image: url("https://images.frandroid.com/wp-content/uploads/2013/01/Samsung-Logo.jpg");
    background-size: 100%;
    margin-bottom: 2vh;
}

.Box{
    padding: 4px;
    margin: 1.5%;
    border: 0.1vw solid #bfbfbf;
    background-color: #e6f2ff;
    //box-shadow: right bottom fade allsides color;
    box-shadow: 0.05rem 0.05rem 0.3rem 0.03rem #38507a;
}
.Box2{
    display:flex;
}

.MetricsBox{
    width: 50%;
}
.MetricsBox h4, .TimeLog h4, .PRbox h4{
    text-align: center;
    border-bottom: 1px solid #bfbfbf;
}
.TimeLog{
    width: 50%;
}
.PRbox{
    width: 97%;
}
  `;

