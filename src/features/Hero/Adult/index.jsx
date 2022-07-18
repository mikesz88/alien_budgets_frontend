import React from 'react';

const Adult = ({ chooseAdult, chooseStudent }) => (
  <div>
    <div>Adult</div>
    <div>
      <button type="button" onClick={chooseStudent}>
        Student
      </button>
      <button type="button" onClick={chooseAdult}>
        Adult
      </button>
    </div>
  </div>
);

export default Adult;
