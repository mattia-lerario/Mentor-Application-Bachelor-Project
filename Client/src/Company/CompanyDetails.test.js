import React, { useState, useEffect } from 'react';
// import { companyService } from '@/_services';


let totalHours = 0;
const  {CompanyDetails}  = require('./CompanyDetails.jsx');
/*
 function sumHours(timeLogList) {
  const reducer = (hr, currentValue) => hr + currentValue.hours;   
  const hours = (timeLogList.reduce(reducer, 0));
  totalHours = hours;
}
*/
const timeLogList = [{id:1, hours:1},{id:2, hours:1}]

test('List should have a total of 2 hours', () => {
  CompanyDetails.sumHours(timeLogList)
  expect(totalHours).toBe(2);
});