import React from 'react';

import { string } from 'prop-types';

const StyledLi = styled.li`
  & >= h2 {
    font-weight: 900;
    font-size: 4rem;
  }
`;

const CompanyItem = ({ companyName, companyNumber, email, salesRevenue, companyDescription }) => (

    <StyledLi>
      <span>
        <h1>{companyName}</h1>
        <h2>{companyNumber}</h2>
        <h3>{email}</h3>
      </span>
      <p>{companyDescription}</p>
      <p>{salesRevenue}</p>

      </StyledLi>
  ); 

CompanyItem.propTypes = {
  companyName: string.isRequired,
  companyNumber: string,
  salesRevenue: string,
  companyDescription: string, 
  email: string,
};

export default CompanyItem; 