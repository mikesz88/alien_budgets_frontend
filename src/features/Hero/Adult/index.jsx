import React from 'react';
import { Link } from 'react-router-dom';

const Adult = ({ chooseStudent, intro }) => (
  <div>
    <div>Adult</div>
    <div>New User?</div>
    <Link to="/login/adult">Returning Adult</Link>
    <div>
      <button type="button" onClick={chooseStudent}>
        Student
      </button>
      <button type="button" onClick={intro}>
        Go Back
      </button>
    </div>
  </div>
);

export default Adult;
