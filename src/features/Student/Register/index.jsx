/* eslint-disable import/no-cycle */
import React, { useState, useContext, useEffect } from 'react';
import { Form, Input, Modal, Pagination, Radio, Select } from 'antd';
import StyledTitle from '../../../components/Title';
import StyledButton from '../../../components/PrimaryButton';
import Avatar from '../../../components/Avatar';
import { UserContext } from '../../../App';

const RegisterStudent = () => {
  const { avatarService } = useContext(UserContext);
  const [avatarUsernameModal, setAvatarUsernameModal] = useState(false);
  const [avatarModal, setAvatarModal] = useState(false);
  const [avatarList, setAvatarList] = useState([]);
  const [userAvatar, setUserAvatar] = useState({});
  const [pagination, setPagination] = useState({
    total: '',
    totalPages: '',
    page: '',
    prevPage: '',
    nextPage: '',
  });
  const [form] = Form.useForm();

  const getAvatarList = (page) => {
    avatarService
      .getAvatarList(page)
      .then((res) => {
        console.log(res);
        setAvatarList(res.data);
        setPagination({
          total: res.pagination.total,
          totalPages: res.pagination.totalPages,
          page: res.pagination.page,
          prevPage: res.pagination.prev ? res.pagination.prev.page : 10,
          nextPage: res.pagination.next ? res.pagination.next.page : 1,
        });
        // Notification
      })
      .catch((error) => {
        setAvatarList(error);
        throw error;
        // Notification
      });
  };

  useEffect(() => {
    getAvatarList();
    avatarService
      .getRandomAvatar()
      .then((res) => {
        setUserAvatar(res);
      })
      .catch((error) => {
        setUserAvatar(error);
        throw error;
      });
  }, []);

  const forgotPassQuestionChange = (value) => {
    form.setFieldsValue({
      note: value,
    });
  };

  const handleAvatarChange = ({ target: { value } }) => {
    form.setFieldsValue({
      avatar: value,
    });
    setUserAvatar((prevState) => ({
      ...prevState,
      avatarURL: value,
    }));
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
          hasFeedback
          rules={[
            {
              required: true,
              message: 'Please select your question',
            },
          ]}
        >
          <Select
            placeholder="Forgot Password Question"
            onChange={forgotPassQuestionChange}
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
          hasFeedback
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
        <Form.Item>
          <StyledButton
            onClick={() => setAvatarUsernameModal(!avatarUsernameModal)}
            type="primary"
          >
            Choose Avatar & Username
          </StyledButton>
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
      <Modal
        title="Choose Avatar and Username"
        visible={avatarUsernameModal}
        onCancel={() => setAvatarUsernameModal(false)}
        footer={[
          <StyledButton
            key="ok"
            type="primary"
            onClick={() => setAvatarUsernameModal(false)}
          >
            OK
          </StyledButton>,
        ]}
      >
        <>
          <Avatar
            avatar={{
              avatarName: userAvatar.avatarURL,
              avatarColor: 'rgb(122, 60, 13)',
            }}
            size="large"
          />
          <StyledButton
            type="primary"
            onClick={() => setAvatarModal(!avatarModal)}
          >
            Choose Avatar
          </StyledButton>
          <Form form={form}>
            <Form.Item
              name="username"
              hasFeedback
              rules={[
                {
                  type: 'text',
                  required: true,
                  message: 'Please input your username.',
                },
                {
                  pattern: /[a-zA-Z]{3,}/gm,
                  required: true,
                  message: 'Must be minimum 3 letters.',
                },
              ]}
            >
              <Input type="text" placeholder="Username" />
            </Form.Item>
          </Form>
        </>
      </Modal>
      <Modal
        title="Choose Avatar"
        visible={avatarModal}
        onCancel={() => setAvatarModal(false)}
        width={1000}
        footer={[
          <StyledButton
            key="ok"
            type="primary"
            onClick={() => setAvatarModal(false)}
          >
            Done
          </StyledButton>,
        ]}
      >
        <Form form={form}>
          <Form.Item name="avatar" initialValue={userAvatar.avatarURL}>
            <Radio.Group
              onChange={handleAvatarChange}
              style={{
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                flexWrap: 'wrap',
              }}
            >
              {avatarList.map((avatarIcon) => (
                <Radio.Button
                  style={{ height: '100%', margin: '1rem' }}
                  key={avatarIcon.avatarURL}
                  value={avatarIcon.avatarURL}
                  onClick={() => setUserAvatar(avatarIcon.avatarURL)}
                >
                  <Avatar
                    key={avatarIcon.avatarURL}
                    avatar={{
                      avatarName: avatarIcon.avatarURL,
                      avatarColor: 'rgb(122, 60, 13)',
                    }}
                    size="large"
                  />
                </Radio.Button>
              ))}
            </Radio.Group>
            <Pagination
              total={pagination.total}
              pageSize={10}
              showSizeChanger={false}
              current={pagination.page}
              onChange={(page) => getAvatarList(page)}
            />
          </Form.Item>
        </Form>
      </Modal>
    </>
  );
};

export default RegisterStudent;
