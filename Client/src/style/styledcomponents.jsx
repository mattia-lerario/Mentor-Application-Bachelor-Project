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
    display: inline;
    padding: 0.5rem;
}
//---making the text in the menu white
.NavLink{
    color: white;
    padding: 0.5rem;
    border-radius: 0.3rem;
}
//---gives the links a underscore and grey-color when hovered.
.NavLink:hover{
    text-decoration: none;
    background-color: #38507a;
}
// ---ADMIN-MENU---
//adding the background-color for the Admin-menu
#AdminLink{
    color: black;
}
#AdminLink:hover{
}
`;


/* ---BUTTONS--- */
/* Files: Details.jsx, Update.jsx, List.jsx, Overview.jsx */
export const BtnWrapper = styled.div`
//---Button with same background-color as the menu, and white text.
.Btn {
    background-color: #273855;
    border-radius: 3px;
    height: 35px;
    color: white;
    margin: 2px;
    padding: 5px;
}
.CancelBtn{
    margin: 15px;
    color: black;
}
.MainBtn{
    border: 1px solid #182234;
}
//---Red Delete Button
.DeleteBtn{
    background-color: #800000;
    border: 1px solid #4d0000;
}
//---lighter color when hovered
.MainBtn:hover{
    background-color: #38507a;
}
.DeleteBtn:hover{
    background-color: #b30000;
}
//---makes the link-text white(because of link-tag)
.LinkBtn{
    color:white;
}
//---removes underscore on link when hovered(because of link-tag)
.LinkBtn:hover{
    text-decoration: none;
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
    max-width:240px;
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
    display: inline-block;
    //box-shadow: right bottom fade allsides color;
    box-shadow: 0.09rem 0.19rem 0.5rem 0.1rem #38507a;
    filter: grayscale(50%);
  }
  .card:hover{
    border: solid #38507a;
    //box-shadow: right bottom fade allsides color;
    box-shadow: 0.2rem 0.3rem 0.5rem 0.1rem #38507a;
    filter: grayscale(0%);
}
.cardImg{
    background-image: url("https://images.frandroid.com/wp-content/uploads/2013/01/Samsung-Logo.jpg");
    background-position: center;
    background-size: 100%;
    height: 5rem;
    border-radius: 0.1rem;
}
.cardMetric, .cardBottom{
    margin: 1rem;
}
.cardMetric{
    height: 7rem;
}
.cardBottom{
    border-top: solid #38507a;
    text-align: center;
}
.cardBottom p{
    display: inline;
    margin-left: 0.5rem;
    margin-right: 0.5rem;
}

  `;