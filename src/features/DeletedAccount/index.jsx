import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Result } from 'antd';
import StyledButton from '../../components/PrimaryButton';
import HeroScreenDivWrapper from '../../components/Hero/HeroScreenDivWrapper';
import AlienImages from '../../components/AlienImages';
import Routes from '../../common/routes';

const FourOhFour = () => {
  const navigate = useNavigate();
  const backToHome = () => navigate(Routes.hero);

  return (
    <HeroScreenDivWrapper>
      <AlienImages />
      <Result
        title="You have successfully Deleted your account"
        subTitle="You must create a new account in order to access Alien Budgets again."
        extra={
          <StyledButton type="primary" onClick={backToHome}>
            Back to Home
          </StyledButton>
        }
      />
    </HeroScreenDivWrapper>
  );
};

export default FourOhFour;
