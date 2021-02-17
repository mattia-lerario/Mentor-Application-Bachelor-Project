import styled from 'styled-components';  

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
.MenuBar {
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
//adding the background-color for the Admin-menu
.AdminNav{
    background-color: #e6e6e6;
}
.AdminLink:hover{
    color: black;
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
/* File: Company.jsx */
export const ListWrapper = styled.div`
// Resource: https://www.w3schools.com/css/tryit.asp?filename=trycss_table_fancy

//Frame
.ListTable{
    border-collapse: collapse;
    margin-left: 50px;
}
.ListTable th, .ListTable td{
    border: 1px solid #ddd;
    padding: 8px;
}
//every second line grey
.ListTable tr:nth-child(even){
    background-color: #f2f2f2;
}
//when hovered line turnes blue
.ListTable tr:hover {
    background-color: #38507a;
}
//Styling the first line in the table with the 'titles'
.ListTable th {
  padding-top: 10px;
  padding-bottom: 10px;
  text-align: left;
  background-color: #273855;
  color: white;
}

.card{
    flex: 3;
    border-radius: 0.5rem;
    background: linear-gradient(
      to right bottom,
      rgba(255, 255, 255, 0.7),
      rgba(255, 255, 255, 0.3)
    );
    width: 12rem;
    height: 12rem;
    padding: 0.5rem;
    margin: 0.5rem;
    display: inline-block;
  }
  .companyName{
    text-decoration: underline;
  }
  `;