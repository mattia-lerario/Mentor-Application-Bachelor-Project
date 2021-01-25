import styled from 'styled-components';  


/* ---MENU--- */
export const MenuWrapper = styled.div`
//---makes the background of the menu darkblue
.MenuBar {
    background-color: #273855;
    padding: 10px;
}
//---displays the links horizontal(inline). 
.MenuLinks{
    display: inline;
    padding: 10px;
}
//---making the menu-links white
.NavLink{
    color: white;
    padding: 10px;
}
//---gives the links a underscore and grey-color when hovered.
.NavLink:hover{
    text-decoration: underline;
    color: #6D7B93;
}
`;