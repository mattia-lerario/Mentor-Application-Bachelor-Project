import styled from 'styled-components';  

/*
List of what elements are getting styled here, in listed order:
- Menu
- Buttons
*/


/* ---MENU--- */
/* Nav.jsx */
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
//---Giving space inbetween the different paramenters(eg. Title, Name etc.)
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

`;
