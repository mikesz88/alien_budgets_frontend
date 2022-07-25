import React from 'react';
import StyledButton from '../../../components/PrimaryButton';
import StyledTitle from '../../../components/Title';
import { StyledSubtitle, StyledCaption } from './styles';

const Introduction = ({ chooseAdult, chooseStudent }) => (
  <div
    style={{
      height: '100%',
      width: '100%',
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      flexDirection: 'column',
    }}
  >
    <StyledTitle>ALIEN BUDGETS</StyledTitle>
    <StyledSubtitle>
      WILL YOU GO BROKE <div /> OR <div /> WILL YOU BE SUCCESSFUL?
    </StyledSubtitle>
    <StyledCaption>Who are you</StyledCaption>
    <div
      style={{
        display: 'flex',
        justifyContent: 'space-evenly',
        flexWrap: 'wrap',
        maxWidth: '500px',
      }}
    >
      <StyledButton type="primary" onClick={() => chooseStudent()}>
        Student
      </StyledButton>
      <StyledButton type="primary" onClick={() => chooseAdult()}>
        Adult
      </StyledButton>
    </div>
  </div>
);

export default Introduction;
