import React from 'react';
import StyledLink from '../../../components/Hero/HeroLink';
import StyledButton from '../../../components/PrimaryButton';
import StyledTitle from '../../../components/Title';
import HeroButtonWrapper from '../../../components/Hero/HeroButtonWrapper';
import HeroDivContainer from '../../../components/Hero/HeroDivContainer';
import Routes from '../../../common/routes';

const Student = ({ chooseAdult, intro }) => (
  <HeroDivContainer>
    <StyledTitle>Alien Budgets</StyledTitle>
    <StyledLink to={Routes.studentLogin}>Returning Alien?</StyledLink>
    <StyledLink to={Routes.registerStudentPart1}>New Alien?</StyledLink>
    <HeroButtonWrapper>
      <StyledButton type="primary" onClick={intro}>
        Go Back
      </StyledButton>
      <StyledButton type="primary" onClick={chooseAdult}>
        Adult
      </StyledButton>
    </HeroButtonWrapper>
  </HeroDivContainer>
);

export default Student;
