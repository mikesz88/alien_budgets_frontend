import React from 'react';
import StyledLink from '../../../components/HeroLink';
import StyledButton from '../../../components/PrimaryButton';
import StyledTitle from '../../../components/Title';

const Student = ({ chooseAdult, intro }) => (
  <div
    style={{
      width: '100%',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
    }}
  >
    <StyledTitle>Alien Budgets</StyledTitle>
    <StyledLink to="/login/student">Returning Alien?</StyledLink>
    <StyledLink to="/create/student">New Alien</StyledLink>
    <StyledLink to="/guestUser">Visiting Alien</StyledLink>
    <div>
      <StyledButton type="primary" onClick={intro}>
        Go Back
      </StyledButton>
      <StyledButton type="primary" onClick={chooseAdult}>
        Adult
      </StyledButton>
    </div>
  </div>
);

export default Student;
