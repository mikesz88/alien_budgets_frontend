import React, { useState } from 'react';
import Student from './Student';
import Adult from './Adult';
import Introduction from './Introduction';
import theme from '../../theme';

const Hero = () => {
  const [adult, setAdult] = useState(false);
  const [student, setStudent] = useState(false);
  const [intro, setIntro] = useState(true);

  const chooseAdult = () => {
    setStudent(false);
    setIntro(false);
    setAdult(true);
  };

  const chooseStudent = () => {
    setAdult(false);
    setIntro(false);
    setStudent(true);
  };

  const chooseIntro = () => {
    setAdult(false);
    setStudent(false);
    setIntro(true);
  };

  return (
    <div
      style={{
        backgroundColor: theme.colors.lightGrey,
        height: '100vh',
        width: '100vw',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        flexDirection: 'column',
        padding: '1rem',
      }}
    >
      {intro && (
        <Introduction chooseAdult={chooseAdult} chooseStudent={chooseStudent} />
      )}
      {adult && <Adult chooseStudent={chooseStudent} intro={chooseIntro} />}
      {student && <Student chooseAdult={chooseAdult} intro={chooseIntro} />}
    </div>
  );
};

Hero.defaultProps = {
  name: 'Hero',
};

export default Hero;
