import React from 'react';

const Pagination = ({ issuesLimit, totalIssues, paginate }) => {
  const pageNumbers = [];

  for (let i = 1; i <= Math.ceil(totalIssues / issuesLimit); i++) {
    pageNumbers.push(i);
  }
  console.log(pageNumbers.length);

  return (
    <nav class='outer-page'>
      <ul className='pagination'>
        {pageNumbers.map(number => (
          <li key={number} className='page-item'>
            <a onClick={() => paginate(number)} href='!#' className='page-link'>
              {number}
            </a>
          </li>
        ))}
      </ul>
    </nav>
  );
};

export default Pagination;