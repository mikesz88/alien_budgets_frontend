import React, { useState } from 'react';
import Student from './Student';
import Adult from './Adult';

const Hero = () => {
  const [adult, setAdult] = useState(false);
  const [student, setStudent] = useState(false);

  const chooseAdult = () => {
    setStudent(false);
    setAdult(true);
  };

  const chooseStudent = () => {
    setAdult(false);
    setStudent(true);
  };

  return (
    <>
      {!adult && !student && (
        <div
          style={{
            height: '100vh',
            width: '100vw',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            flexDirection: 'column',
          }}
        >
          <div>ALIEN BUDGETS</div>
          <div>WILL YOU GO BROKE OR WILL YOU BE SUCCESSFUL?</div>
          <div>Who are you</div>
          <div>
            <button type="button" onClick={() => chooseStudent()}>
              Student
            </button>
            <button type="button" onClick={() => chooseAdult()}>
              Adult
            </button>
          </div>
        </div>
      )}
      {adult ? (
        <Adult chooseAdult={chooseAdult} chooseStudent={chooseStudent} />
      ) : (
        <Student chooseAdult={chooseAdult} chooseStudent={chooseStudent} />
      )}
    </>
  );
};

Hero.defaultProps = {
  name: 'Hero',
};

export default Hero;
