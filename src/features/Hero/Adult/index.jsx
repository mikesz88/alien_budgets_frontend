import React from 'react';
import StyledTitle from '../../../components/Title';
import StyledLink from '../../../components/Hero/HeroLink';
import StyledButton from '../../../components/PrimaryButton';
import HeroButtonWrapper from '../../../components/Hero/HeroButtonWrapper';
import HeroDivContainer from '../../../components/Hero/HeroDivContainer';
import Routes from '../../../common/routes';

const Adult = ({ chooseStudent, intro }) => (
  <HeroDivContainer>
    <StyledTitle>Alien Budgets</StyledTitle>
    <StyledLink to={Routes.adultLogin}>Returning Adult?</StyledLink>
    <StyledLink to={Routes.registerAdultPart1}>New Adult?</StyledLink>
    <HeroButtonWrapper>
      <StyledButton type="primary" onClick={intro}>
        Go Back
      </StyledButton>
      <StyledButton type="primary" onClick={chooseStudent}>
        Student
      </StyledButton>
    </HeroButtonWrapper>
  </HeroDivContainer>
);

export default Adult;
