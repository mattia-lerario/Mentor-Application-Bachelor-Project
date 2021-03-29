import styled from 'styled-components';  

/*
slate grey - #38507a
*/

/*
List of what elements are getting styled here, in listed order:
- Menu
- Update Profile Form
- Profile Index
- Form Style
- Sidebar (menu)
- Company List Table/Cards
- Company Details
*/

/* ---MENU--- */
/* File: Nav.jsx */
export const MenuWrapper = styled.div`
//---makes the background of the menu slategrey
.MenuBar{
    display:flex;
    padding: 1rem;
}
//---displays the links horizontal(inline). 
.MenuLinks{
    display: inline;
    height: 2vw;
    padding: 0.5rem;
    margin-buttom: 0.5rem;
    margin-top: -1rem;
}
//---making the text in the menu white
.NavLink{
    color: black;
    padding: 1rem;
    margin-left: 1rem;
    border-radius: 0.3rem;
    font-size: 1.2rem;
    flex-direnction: row;
}
//---gives the links a underscore and grey-color when hovered.
.NavLink:hover{
    text-decoration: #38507a underline 0.3vw;
}
// ---ADMIN-MENU---
//adding the background-color for the Admin-menu
#AdminLink{
    color: black;
}
#AdminLink:hover{
}
.Logout{
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
    padding: 1rem;
    height: 100%;
    border-top-left-radius: 0.5rem;
    border-bottom-left-radius: 0.5rem;
    display: flex;
    flex: 1;
    flex-direction: column;
    align-items: center;
    border-right: 0.3vw solid #38507a;
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
    border-radius: 0.5rem;
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
    display: inline-block;
    //box-shadow: right bottom fade allsides color;
    box-shadow: 0.09rem 0.19rem 0.5rem 0.1rem #38507a;
    filter: grayscale(50%);
    padding-left: 4px;
    padding-top: 4px;
    padding-right: 5px;
    margin-left: 2rem;
    margin-top: 1rem;
  }
  .card:hover{
    border: solid #38507a;
    //box-shadow: right bottom fade allsides color;
    box-shadow: 0.2rem 0.3rem 0.5rem 0.1rem #38507a;
    filter: grayscale(0%);
}
.cardTop{
    border-bottom: 0.15vw solid #bfbfbf;
    padding-bottom: 0.5vw;
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
    margin-top: 1vw;
    font-size: 1.3vw;
}
.cardMetric, .cardBottom{
    margin: 1rem;
}
.cardMetric{
    height: 15vw;
}
.cardBottom{
    border-top: 0.15vw solid #bfbfbf;
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
    width: 103%;
    height: 18vw;
    background-image: url("https://images.frandroid.com/wp-content/uploads/2013/01/Samsung-Logo.jpg");
    background-size: 100%;
    margin-bottom: 1vw;
    border-top-right-radius: 0.5rem;
    margin-top: -1rem;
    margin-left: -1rem;
    margin-right: -1rem;
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
.TimeLog ul{
    margin-left: 1rem;
}
.PRbox{
    width: 97%;
}
  `;

export const PRform = styled.div`
.QuestionBox{
    margin-top: 2rem;
    width: 90%;
    border-bottom: 1px solid black;
    padding-bottom: 1.5rem;
}
.QuestionBox, .Choose{
    margin-left: 2rem;
}
.Choose label{
    font-size: 2vw;
}
.Choose label, .Ranking p, .Comment label, .DateSave label{
    font-weight: bold;
    margin-right: 1vw;
}
.Question{
    margin-bottom: 0.5rem;
}
.Ranking{
    display: flex;
    flex-direction: row;
    height: 2vw;
    margin-bottom: 0.5rem;
}
.RankingField{
    width: 3vw;
}
.CommentField{
    width: 90%;
}
.DateSave{
    margin-left: 2rem;
    margin-top: 2rem;
    width: 90%;
}
.DateField{
    width: 15%;
    margin-left: 0.5rem;
}

  `;
