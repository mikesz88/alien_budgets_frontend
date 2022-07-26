import React from 'react';
import StyledTitle from '../../../components/Title';
import StyledLink from '../../../components/Hero/HeroLink';
import StyledButton from '../../../components/PrimaryButton';
import HeroButtonWrapper from '../../../components/Hero/HeroButtonWrapper';
import HeroDivContainer from '../../../components/Hero/HeroDivContainer';

const Adult = ({ chooseStudent, intro }) => (
  <HeroDivContainer>
    <StyledTitle>Alien Budgets</StyledTitle>
    <StyledLink to="/login/adult">Returning Adult?</StyledLink>
    <StyledLink to="/create/adult">New Adult?</StyledLink>
    <HeroButtonWrapper>
      <StyledButton type="primary" onClick={chooseStudent}>
        Student
      </StyledButton>
      <StyledButton type="primary" onClick={intro}>
        Go Back
      </StyledButton>
    </HeroButtonWrapper>
  </HeroDivContainer>
);

export default Adult;
