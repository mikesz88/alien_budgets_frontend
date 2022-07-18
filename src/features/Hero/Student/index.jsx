import React from 'react';

const Student = ({ chooseAdult, chooseStudent }) => (
  <div>
    <div>Student</div>
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

export default Student;
