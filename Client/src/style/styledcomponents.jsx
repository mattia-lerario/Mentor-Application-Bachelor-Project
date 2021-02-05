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
    background-color: #273855;
    padding: 10px;
}
//---displays the links horizontal(inline). 
.MenuLinks{
    display: inline;
    padding: 10px;
}
//---making the text in the menu white
.NavLink{
    color: white;
    padding: 10px;
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
    flex-flow: row wrap;
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

/* ---SIDEBAR--- */
/* Files: Nav.jsx, Sidebar.jsx */
export const SidebarWrapper = styled.div`

//Light blue backgroundcolor and width on the sidebar-menu
.Sidebar{
    float: left;
    //same background-color as the admin-menu.
    background-color: #e6e6e6;
    margin-right: 15px;
}
//Changing the background-color when hovering an item in the sidebar.
.SidebarItem:hover{
    color: white;
    background-color: #38507a;
}
`;

/* ---COMPANY LISTTABLE--- */
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

`;
