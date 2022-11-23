import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Form, Input, Result, Modal } from 'antd';
import GreetingBar from '../../components/GreetingBar';
import StyledButton from '../../components/PrimaryButton';
import {
  ERROR,
  error,
  passwordRegex,
  SUCCESS,
  success,
} from '../../common/constants';
import Notification from '../../components/Notification';
import {
  StyledDivPasswordInfo,
  StyledDivWrapper,
  StyledForm,
  StyledFormItem,
  StyledMarginTitle,
} from './styles';
import StyledCenteredFormItem from '../../components/CenteredFormItem';
import { useAuthServiceProvider } from '../../services/AuthServiceProvider';
import AlienImages from '../../components/AlienImages';
import Routes from '../../common/routes';

const ResetPasswordByEmail = () => {
  const { resetPasswordByToken } = useAuthServiceProvider();
  const { resettoken } = useParams();
  const [loading, setLoading] = useState(false);
  const [form] = Form.useForm();
  const [successResult, setSuccessResult] = useState(false);
  const navigate = useNavigate();

  const goToLogin = () => {
    setSuccessResult(false);
    navigate(Routes.adultLogin);
  };

  const resetPassword = (password) => {
    setLoading(true);
    resetPasswordByToken(resettoken, password)
      .then(() => {
        setSuccessResult(true);
        Notification(
          success,
          SUCCESS,
          'Password has been reset. Please login again.'
        );
      })
      .catch(() =>
        Notification(error, ERROR, 'Connection Error. Please try again later.')
      )
      .finally(() => setLoading(false));
  };

  const onFinish = (values) => {
    const { password } = values;
    resetPassword(password);
  };

  return (
    <StyledDivWrapper>
      <AlienImages />
      <GreetingBar template="Reset Password" />
      <StyledMarginTitle>Reset Password</StyledMarginTitle>
      <StyledForm layout="vertical" form={form} id={form} onFinish={onFinish}>
        <Form.Item noStyle>
          <StyledDivPasswordInfo>
            Your new password must be 8-20 characters, including: at least one
            capital letter, at least one small letter, one number and one
            special character - ! @ # $ % ^ & * ( ) _ +
          </StyledDivPasswordInfo>
          <StyledFormItem
            name="password"
            hasFeedback
            register="true"
            rules={[
              {
                required: true,
                message: 'Please input your Password!',
              },
              {
                min: 8,
                required: true,
                message: 'Must be a minimum of 8 characters',
              },
              {
                max: 20,
                required: true,
                message: 'Must be a maximum of 20 characters',
              },
              {
                pattern: passwordRegex,
                required: true,
                message:
                  'Password must be 8-20 characters, including: at least one capital letter, at least one small letter, one number and one special character - ! @ # $ % ^ & * ( ) _ +',
              },
            ]}
          >
            <Input.Password type="password" placeholder="Password" />
          </StyledFormItem>
        </Form.Item>
        <StyledFormItem
          name="confirm"
          dependencies={['password']}
          hasFeedback
          register="true"
          rules={[
            {
              required: true,
              message: 'Please confirm your password!',
            },
            ({ getFieldValue }) => ({
              validator(_, value) {
                if (!value || getFieldValue('password') === value) {
                  return Promise.resolve();
                }
                return Promise.reject(
                  new Error('The two passwords that you entered do not match!')
                );
              },
            }),
          ]}
        >
          <Input.Password type="password" placeholder="Confirm Password" />
        </StyledFormItem>
        <StyledCenteredFormItem>
          <StyledButton
            loading={loading}
            larger="true"
            type="primary"
            htmlType="submit"
          >
            Submit
          </StyledButton>
        </StyledCenteredFormItem>
      </StyledForm>
      <Modal
        visible={successResult}
        footer={[
          <StyledButton
            key="moveToLogin"
            larger="true"
            type="primary"
            onClick={goToLogin}
          >
            Go To Login
          </StyledButton>,
        ]}
      >
        <Result
          status="success"
          title="Successfully Changed Password"
          subTitle="You have successfully change your password. Please click close out and sign in again with your new password. Close the button below to get back to the login screen."
        />
      </Modal>
    </StyledDivWrapper>
  );
};

export default ResetPasswordByEmail;
