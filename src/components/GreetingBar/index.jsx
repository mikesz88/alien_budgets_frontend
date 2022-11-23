import React from 'react';
import { useNavigate } from 'react-router-dom';
import {
  StyledAdultGreetingContainer,
  StyledTitleFont,
  StyledAdultName,
  StyledStudentGreetingContainer,
  StyledButton,
  StyledStudentTemplate,
} from './styles';
import { useAuthServiceProvider } from '../../services/AuthServiceProvider';
import Routes from '../../common/routes';

const GreetingBar = ({
  adult,
  student,
  firstName,
  lastName,
  username,
  template,
}) => {
  const { user } = useAuthServiceProvider();
  const navigate = useNavigate();

  const backToHome = () =>
    !user.isLoggedIn
      ? navigate(Routes.hero)
      : user.role === 'adult'
      ? navigate(Routes.dashboard)
      : navigate(Routes.studentDashboard);

  return (
    <>
      {adult && (
        <StyledAdultGreetingContainer>
          <StyledButton type="text" onClick={backToHome}>
            <StyledTitleFont>ALIEN BUDGETS</StyledTitleFont>
          </StyledButton>
          <StyledAdultName>
            Welcome {firstName} {lastName}
          </StyledAdultName>
        </StyledAdultGreetingContainer>
      )}
      {student && (
        <StyledStudentGreetingContainer>
          <StyledButton type="text" onClick={backToHome}>
            <StyledTitleFont>ALIEN BUDGETS</StyledTitleFont>
          </StyledButton>
          <StyledButton type="text" onClick={() => navigate(Routes.challenge)}>
            Play Game
          </StyledButton>
          <StyledStudentTemplate>{username}</StyledStudentTemplate>
        </StyledStudentGreetingContainer>
      )}
      {template && (
        <StyledAdultGreetingContainer>
          <StyledButton type="text" onClick={backToHome}>
            <StyledTitleFont>ALIEN BUDGETS</StyledTitleFont>
          </StyledButton>
          <StyledAdultName>{template}</StyledAdultName>
        </StyledAdultGreetingContainer>
      )}
    </>
  );
};

export default GreetingBar;
