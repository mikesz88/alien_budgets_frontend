import React from 'react';
import { Form, Input, Select } from 'antd';
import StyledTitle from '../../../components/Title';
import StyledButton from '../../../components/PrimaryButton';

const RegisterStudent = () => {
  const [form] = Form.useForm();

  const forgotPassQuestionCHange = (value) => {
    switch (value) {
      case 'Test1':
        form.setFieldsValue({
          note: 'Test1',
        });
        break;
      case 'Test2':
        form.setFieldsValue({
          note: 'Test2',
        });
        break;
      case 'Test3':
        form.setFieldsValue({
          note: 'Test3',
        });
        break;

      default:
        break;
    }
  };

  const onFinish = (values) => {
    console.log('Received values of form: ', values);
  };

  const passwordRegex =
    /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[-#$^+_!*()@%&]).{8,20}$/gm;

  return (
    <>
      <StyledTitle>NEW ALIEN</StyledTitle>
      <Form form={form} name="registerStudent" onFinish={onFinish}>
        <Form.Item
          name="firstName"
          hasFeedback
          rules={[
            {
              type: 'text',
              required: true,
              message: 'Please input your first name.',
            },
            {
              pattern: /[a-zA-Z]{3,}/gm,
              required: true,
              message: 'Must be minimum 3 letters.',
            },
          ]}
        >
          <Input type="text" placeholder="First Name" />
        </Form.Item>
        <Form.Item
          name="lastInitial"
          hasFeedback
          rules={[
            {
              type: 'text',
              required: true,
              message: 'Please input your last initial.',
            },
            {
              pattern: /^[a-zA-Z]{1}$/gm,
              required: true,
              message: 'Please only write one letter.',
            },
          ]}
        >
          <Input type="text" placeholder="Last Initial" />
        </Form.Item>
        <Form.Item noStyle>
          <div>
            Password must be 8-20 characters, including: at least one capital
            letter, at least one small letter, one number and one special
            character - ! @ # $ % ^ & * ( ) _ +
          </div>
          <Form.Item
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
          </Form.Item>
        </Form.Item>
        <Form.Item
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
        </Form.Item>
        <Form.Item
          name="forgotPasswordQuestion"
          rules={[
            {
              required: true,
              message: 'Please select your question',
            },
          ]}
        >
          <Select
            placeholder="Forgot Password Question"
            onChange={forgotPassQuestionCHange}
            allowClear
          >
            <Select.Option key="test1" value="test1">
              Test1
            </Select.Option>
            <Select.Option key="test2" value="test2">
              Test2
            </Select.Option>
            <Select.Option key="test3" value="test3">
              Test3
            </Select.Option>
          </Select>
        </Form.Item>
        <Form.Item
          name="forgotPasswordAnswer"
          register="true"
          rules={[
            {
              required: true,
              message: 'Please write your answer.',
            },
          ]}
        >
          <Input type="text" placeholder="Forgot Password Answer" />
        </Form.Item>
        {/* Classroom Code */}
        {/* Avatar and Username */}
        <Form.Item register="true" style={{ textAlign: 'center' }}>
          <div>By signing up you agree to our terms and policies.</div>
          <StyledButton
            larger="true"
            type="primary"
            htmlType="submit"
            className="login-form-button"
          >
            Register
          </StyledButton>
        </Form.Item>
      </Form>
    </>
  );
};

export default RegisterStudent;
