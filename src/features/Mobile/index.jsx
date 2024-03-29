/* eslint-disable no-undef */
/* eslint-disable no-unused-vars */
import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { Result } from 'antd';
import StyledButton from '../../components/PrimaryButton';
import HeroScreenDivWrapper from '../../components/Hero/HeroScreenDivWrapper';
import { useAuthServiceProvider } from '../../services/AuthServiceProvider';
import AlienImages from '../../components/AlienImages';
import Routes from '../../common/routes';

const Mobile = () => {
  const { user } = useAuthServiceProvider();
  const navigate = useNavigate();
  const location = useLocation();
  const [width, setWidth] = useState(null);

  const backToHome = () =>
    user.role === 'adult'
      ? navigate(Routes.dashboard)
      : user.role === 'student'
      ? navigate(Routes.studentDashboard)
      : navigate(Routes.hero);

  const checkWidth = () => setWidth(window.screen.width);

  useEffect(() => {
    checkWidth();
    window.addEventListener('resize', checkWidth);
  }, [window.screen.width, location]);

  return (
    <HeroScreenDivWrapper style={{ flexDirection: 'column' }}>
      <AlienImages />
      <div>Current Width: {width}</div>
      <div>Minimum Width to continue: 768</div>
      <Result
        status="error"
        title="Screen Width Too Small"
        subTitle="To produce the best results, your screen width must be at least 768. Please adjust your screen to be able to continue."
        extra={
          <StyledButton
            disabled={width < 768}
            type="primary"
            onClick={backToHome}
          >
            {width < 768 ? 'Fix the width of your screen' : 'Back to Dashboard'}
          </StyledButton>
        }
      />
    </HeroScreenDivWrapper>
  );
};

export default Mobile;
