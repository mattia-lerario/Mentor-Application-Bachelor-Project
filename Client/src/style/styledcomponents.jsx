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

.MenuBar{
    display:flex;
    padding: 1rem;
    width: 100%;
}
//---displays the links horizontal(inline). 
.MenuLinks{
    width: 100%;
    display: inline;
    height: 2vw;
    padding: 0.5rem;
    margin-buttom: 0.5rem;
}
//---making the text in the menu white
.NavLink{
    color: black;
    padding: 1rem;
    margin-left: 1rem;
    border-radius: 0.3rem;
    font-size: 1.2rem;
}
//---gives the links a underscore and grey-color when hovered.
.NavLink:hover{
    text-decoration: #38507a underline 0.3vw;
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

/* ----FORM STYLE ----- */
export const GlassForm = styled.div`
.CardHeaderLogin{
    text-decoration: underline;
    text-align: center;
    z-index: 1;
}
.CardBodyLogin, .Email{
    width 20rem;
    margin: auto auto;
}
`;

/* ---SIDEBAR--- */
/* Files: Nav.jsx, Sidebar.jsx */
export const SidebarWrapper = styled.div`

z-index: 1;
height: 3vw;
display: flex;
justify-content: start;
align-items: center; 
box-sizing: border-box;
margin: 0;
padding 0;

.menu-bars{
    margin-left: 2vw;
    font-size: 2vw;
    background: none;
    color: black;
}
//Light blue backgroundcolor and width on the sidebar-menu
.Sidebar{
    z-index: 1;
    background-color: #38507a;
    width: 20%;
    height: 100%;
    display: flex;
    justify-content: center;
    position: fixed;
    top: 0;
    left: -100%;
    transition: 850ms;
}
.Sidebar.active{
    left: 0;
    transition: 350ms;
}
.Sidebar.active li{
    display: flex;
    justify-content: start;
    align-items: center;
    padding: 8px 5px;
    list-style: none;
    height: 5vw;
}
.Sidebar li{
    border-radius: 4px;
}
.SideLink {
    text-decoration: none;
    color: white;
    font-size: 1.5vw;
    display: flex;
    align-items: center;
    padding: 0px 16px;
}
.Sidebar li:hover {
    text-decoration: none;
    background-color: #7d97b2;
}
`;



/* ---COMPANY LISTTABLE/CARDS--- */
/* Files: Company.jsx, DashboardList.jsx*/
export const ListWrapper = styled.div`
// Resource: https://www.w3schools.com/css/tryit.asp?filename=trycss_table_fancy

.card{
    flex: 3;
    width: 25%;
    height: 15%;
    margin: 0.5rem;
    display: inline-block;
    background: linear-gradient(
      to right bottom,
      rgba(255, 255, 255, 0.7),
      rgba(255, 255, 255, 0.3)
        );
    //box-shadow: right bottom fade allsides color;
    box-shadow: 0.05rem 0.1rem 0.3rem 0.01rem #38507a;
    padding-left: 4px;
    padding-top: 4px;
    padding-right: 5px;
    margin-left: 2rem;
    margin-top: 1rem;
    border-radius: 0;
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
    height: 25vw;
    background-size: 100%;
    margin-bottom: 1vw;
    border-top-right-radius: 0.5rem;
    margin-top: -1rem;
    margin-right: -1rem;
}
.BoxWrapper{
    display:flex;
    width: 100%;
}
.MainBox{
    display: flex;
    width: 70%;
    display: initial;
}
.Sidebox{
    float: right;
    margin-left: 1rem;
    width: 30%;
}
.Box{
    padding: 0.5rem;
    background-color: #ecf2f9;
    border-radius: 3px;
}
.PeopleBox table tr td, .PeopleBox table tr th{
    padding-left: 1rem;
    padding-right: 1rem;
    text-align:center;
}
.PeopleBox table tr th{
    color: #38507a;
    font-size: 3vw;
}
.PRbox, .TimeLog, .MetricsBox, .Feed, .Team{
    margin-top: 1rem;
}
.Box h4{
    text-align: center;
    border-bottom: 1px solid #bfbfbf;
}
.TimeLog ul{
    margin-left: 1rem;
}
.Feed .Tooltip .TooltipText {
    position:relative;
    margin-right: 0.5rem;
}
.Feed h4{
    padding-bottom: 0.5rem;
}
.Feed .TooltipText{
    right: -2vw;
    top: 2vw;
}
.Feed Link{
    float: right;
}
.Post{
    background-color: #ffffff;
    padding: 1rem;
    margin-top: 1rem;
}
#Date{
    float: right;
    font-size: 0.7vw;
}
#PosterInfo{
    display: inline-block;
}
#PostedBy{
    font-size: 0.9vw;
}
.ProfilePic{
    border-radius: 50%;
    width: 5vw;
}
.Team{
}
.TeamMember{
    display: inline-block;
    background-color: #fff;
    padding: 0.5rem;
    width: 27%;
    margin: 0.5rem;
    border-radius: 4px;
    height: 80%;
    text-align: center;
}
.TeamMember:hover{
    //box-shadow: right bottom fade allsides color;
    box-shadow: 0.1rem 0.1rem 0.3rem 0.04rem #38507a;
}
.TeamMember img{
    width: 100%;
}
  `;

/* ---POWER RANKING FORM--- */
/* File: Company/PowerRanking.jsx*/
export const StepFormWrapper = styled.div`
.Margin{
    margin-bottom: 1rem;
    margin-left: auto;
    margin-right: auto;
}
.Question{
    width: 80%;
    text-align: center;
}
.DropDown{
    width: 100%;
    border-radius: 4px;
    display: block;
    margin: 5px 10px 5px 0;
    padding: 5px;
    background-color: #fff;
    border: 1px solid #ddd;
}
.DropDown option{
    height: 5rem;
}
.Comment{
    text-align: center;
    width: 80%;
}
.Email, .Number{
    width: 30%;
}
.Date{
    width: 15%;
    margin-top: 2rem;
}
.Rating{
    width:10%;
}
.Step{
    text-align:center;
    justify-content: center;
    margin-right: auto;
    margin-left:auto;
}
.Next{
    display:flex;
    float: right;
}
  `;

  
/* ---POWER RANKING FORM--- */
/* File: Company/PowerRanking.jsx*/
export const StepFormButtonsWrapper = styled.div`
    .Button{
        float: right;
        color: white;
        background-color: #38507a;
        margin: 0.5rem;
    }
    .Button:hover{
        background-color: #283957;
    }
    .Next{
        float: right;
        text-align: right;
    }

`;

/* ---PROFILE INFO WRAPPER--- */
/* File: Profile/Details.jsx */
export const ProfileWrapper = styled.div`
.ProfileWrapper{
    display: flex;
    margin-top: 1vw;
}
.MentorInfoBox{
    border-radius: 3px;
    background-color: #ecf2f9;
    width: 70%;
    padding: 1vw;
}
.Section{
    margin-top: 2rem;
}
.Section h5{
    border-bottom: 1px solid #48679d;
}
.Section ul{
    margin-left: 1rem;
}
img{
    border-radius: 50%;
    width: 20vw;
}
.ProfileInfo{
    float: right;
    margin-left: 1vw;
}
.Center{
    display: block;
    margin-left: auto;
    margin-right: auto;
    text-align: center;
}
.ContactDetails p{
    margin: 0;
}
.ContactDetails button{
    border: none;
    background: none;
}
.AreaExpertise{
    display: inline-block;
    background-color: #38507a;
    color: white;
    border-radius: 1px;
    width: auto;
    margin: 0.2rem;
    padding-left: 1rem;
    padding-right: 1rem;
}
.teamMemberCard{
    background-color: #afb9c9;
    width: 20%;
    text-align: center;
    padding: 10px;
    border-radius: 1px;
    margin: 5px;
    //box-shadow: right bottom fade allsides color;
    box-shadow: 1px 1px 3px 0.3px #38507a;
}
.teamMemberCard img{
    width: 5rem;
    border-radius: 50%;
    margin: 7%;
}
.teamMemberCard dd, .teamMemberCard dt, .teamMemberCard p{
    overflow-wrap: break-word;
}
.Team{
    display: flex;
    flex-wrap: wrap;
}
`;