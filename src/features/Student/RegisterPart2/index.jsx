import React, { useState, useEffect, useMemo } from 'react';
import { Form, Input, Modal, Spin } from 'antd';
import { faker } from '@faker-js/faker';
import { useNavigate } from 'react-router-dom';
import Avatar from '../../../components/Avatar';
import StyledRadioButton from '../../../components/RadioButton';
import StyledButton from '../../../components/PrimaryButton';
import theme from '../../../theme';
import StyledTitle from '../../../components/Title';
import {
  ERROR,
  error,
  generateBgColor,
  passwordRegex,
  SUCCESS,
  success,
} from '../../../common/constants';
import Notification from '../../../components/Notification';
import HeroDivContainer from '../../../components/Hero/HeroDivContainer';
import StyledBasicDiv from '../../../components/BasicDiv';
import StyledCenteredFormItem from '../../../components/CenteredFormItem';
import StyledRadioGroup from '../../../components/RadioGroup';
import StyledPagination from '../../../components/Pagination';
import { useAuthServiceProvider } from '../../../services/AuthServiceProvider';
import { useAvatarServiceProvider } from '../../../services/AvatarServiceProvider';
import { useClassroomServiceProvider } from '../../../services/ClassroomServiceProvider';
import AlienImages from '../../../components/AlienImages';
import {
  Styled2ndRowContainer,
  StyledAvatarBGColorWrapper,
  StyledButton300,
  StyledDivFlex,
  StyledDivWrapper,
  StyledFormItem,
  StyledPasswordContainer,
  StyledPasswordRules,
  StyledUsernameWrapper,
} from './style';
import Routes from '../../../common/routes';

const RegisterStudentPart2 = () => {
  const { registerStudent } = useAuthServiceProvider();
  const {
    getAvatarList: getListOfAvatars,
    getRandomAdjective: getOneRandomAdjective,
    getRandomAvatar: getOneRandomAvatar,
  } = useAvatarServiceProvider();
  const { addStudentToClassroom: addOneStudentToClassroom } =
    useClassroomServiceProvider();
  const [loading, setLoading] = useState(false);
  const [avatarLoading, setAvatarLoading] = useState(false);
  const [avatarList, setAvatarList] = useState([]);
  const [userAvatar, setUserAvatar] = useState({});
  const [userAdjective, setUserAdjective] = useState('');
  const [userBackgroundColor, setUserBackgroundColor] = useState('');
  const [openAvatarModal, setOpenAvatarModal] = useState(false);
  const [userNumbers, setUserNumbers] = useState();
  const [pagination, setPagination] = useState({
    total: '',
    totalPages: '',
    page: '',
    prevPage: '',
    nextPage: '',
  });
  const [form] = Form.useForm();
  const navigate = useNavigate();

  const openModal = () => setOpenAvatarModal(true);
  const closeModal = () => setOpenAvatarModal(false);

  const getAvatarList = (page) => {
    setAvatarLoading(true);
    getListOfAvatars(page)
      .then((res) => {
        setAvatarList(res.data);
        setPagination({
          total: res.pagination.total,
          totalPages: res.pagination.totalPages,
          page: res.pagination.page,
          prevPage: res.pagination.prev ? res.pagination.prev.page : 10,
          nextPage: res.pagination.next ? res.pagination.next.page : 1,
        });
        Notification(success, SUCCESS, 'Avatar list found!');
      })
      .catch(() => {
        setAvatarList([]);
        Notification(
          error,
          ERROR,
          'Connection Error. No avatar list found. Please refresh and try again later!'
        );
      })
      .finally(() => setAvatarLoading(false));
  };

  const getRandomAdjective = () =>
    getOneRandomAdjective()
      .then((res) => setUserAdjective(res))
      .catch(() =>
        Notification(
          error,
          ERROR,
          'Connection Error. Unable to get random adjective. Please refresh and try again later!'
        )
      );

  const getRandomAvatar = () => {
    getOneRandomAvatar()
      .then((res) => {
        setUserAvatar(res);
        Notification(success, SUCCESS, 'Random avatar chosen.');
      })
      .catch(() => {
        setUserAvatar({});
        Notification(
          error,
          ERROR,
          'Connection Error. Unable to retrieve a random avatar. Please refresh and try again later.'
        );
      });
  };

  const selectUsernameNumbers = () => {
    const numbers = faker.random.numeric(3);
    if (numbers === 666) {
      selectUsernameNumbers();
    } else {
      setUserNumbers(numbers);
    }
  };

  const handleUsername = (value) => {
    form.setFieldsValue({
      username: value,
    });
  };

  const handleBgColorChange = (value) => {
    setUserBackgroundColor(value);
    form.setFieldsValue({
      avatarColor: value,
    });
  };

  const handleAvatarURL = () => {
    form.setFieldsValue({
      avatarURL: userAvatar.avatarURL,
    });
  };

  const username = useMemo(
    () => `${userAdjective}_${userAvatar.title}${userNumbers}`,
    [userAdjective, userAvatar.title, userNumbers]
  );

  const initialBackgroundColor = () => handleBgColorChange(generateBgColor());
  const initialUsername = () => handleUsername(username);
  const initialAvatarURL = () => handleAvatarURL();

  const handleAvatarChange = ({ target: { value } }) => {
    form.setFieldsValue({
      avatarURL: value.avatarURL,
    });
    setUserAvatar(value);
  };

  const addStudentToClassroom = (userData) => {
    addOneStudentToClassroom(userData)
      .then(() => {
        Notification(
          success,
          'Student added',
          'The student has officially been added to the classroom.'
        );
      })
      .catch(() => {
        Notification(
          error,
          ERROR,
          'There was an issue with adding the student. The student was not added to the class.'
        );
      });
  };

  const onFinish = (values) => {
    setLoading(true);
    registerStudent(values)
      .then((res) => {
        Notification(
          success,
          'Sign Up Successful',
          'You are now currently logged in.'
        );
        addStudentToClassroom(res.user);
        navigate(Routes.studentDashboard);
        form.resetFields();
      })
      .catch(() =>
        Notification(error, ERROR, 'You made a mistake. Please try again.')
      )
      .finally(() => setLoading(false));
  };

  useEffect(() => {
    initialBackgroundColor();
    getAvatarList();
    getRandomAdjective();
    getRandomAvatar();
    selectUsernameNumbers();
  }, []);

  useEffect(
    () => initialUsername(),
    [userAdjective, userAvatar.title, userNumbers]
  );

  useEffect(() => {
    initialAvatarURL();
  }, [userAvatar]);

  return (
    <StyledDivWrapper>
      <AlienImages />
      <StyledTitle>NEW ALIEN</StyledTitle>
      <Form form={form} id={form} onFinish={onFinish}>
        <HeroDivContainer>
          <StyledAvatarBGColorWrapper>
            <Form.Item noStyle>
              <StyledButton
                style={{ width: '300px' }}
                onClick={openModal}
                type="primary"
                placeholder="Select Avatar"
              >
                Choose Avatar
              </StyledButton>
            </Form.Item>
            <Form.Item
              name="avatarColor"
              rules={[
                {
                  required: true,
                  message: 'Please select a color!',
                },
              ]}
            >
              <StyledButton300
                onClick={() => handleBgColorChange(generateBgColor())}
                type="primary"
              >
                Choose Random Background Color
              </StyledButton300>
            </Form.Item>
          </StyledAvatarBGColorWrapper>
          <Form.Item noStyle>
            <Avatar
              avatar={{
                avatarName: userAvatar.avatarURL,
                avatarColor: userBackgroundColor,
              }}
              size="large"
            />
          </Form.Item>
        </HeroDivContainer>
        <Form.Item
          name="username"
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
          <StyledUsernameWrapper>
            <Form.Item noStyle>
              <>
                <StyledButton300
                  onClick={getRandomAdjective}
                  type="primary"
                  placeholder="Username"
                >
                  Choose Adjective
                </StyledButton300>
                <StyledButton
                  style={{ width: '300px' }}
                  onClick={selectUsernameNumbers}
                  type="primary"
                  placeholder="Username"
                >
                  Choose Random Numbers
                </StyledButton>
              </>
              <StyledDivFlex>
                <Styled2ndRowContainer margin="right">
                  Username:
                </Styled2ndRowContainer>
                <Styled2ndRowContainer margin="left">
                  {username}
                </Styled2ndRowContainer>
              </StyledDivFlex>
            </Form.Item>
          </StyledUsernameWrapper>
        </Form.Item>
        <StyledPasswordContainer>
          <Form.Item noStyle>
            <StyledPasswordRules>
              Password must be 8-20 characters, including: at least one capital
              letter, at least one small letter, one number and one special
              character - ! @ # $ % ^ & * ( ) _ +
            </StyledPasswordRules>
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
                    new Error(
                      'The two passwords that you entered do not match!'
                    )
                  );
                },
              }),
            ]}
          >
            <Input.Password type="password" placeholder="Confirm Password" />
          </StyledFormItem>
        </StyledPasswordContainer>
        <StyledCenteredFormItem register="true">
          <StyledBasicDiv>
            By signing up you agree to our terms and policies.
          </StyledBasicDiv>
          <StyledButton
            loading={loading}
            larger="true"
            type="primary"
            htmlType="submit"
          >
            Register
          </StyledButton>
        </StyledCenteredFormItem>
        <Form.Item name="avatarURL">
          <Form.Item noStyle>
            <Modal
              visible={openAvatarModal}
              width={1000}
              closable
              destroyOnClose
              onCancel={closeModal}
              footer={null}
            >
              <Spin spinning={avatarLoading}>
                <StyledRadioGroup onChange={handleAvatarChange}>
                  {avatarList.map((avatarIcon) => (
                    <StyledRadioButton
                      key={avatarIcon.avatarURL}
                      value={avatarIcon}
                      onClick={() => setUserAvatar(avatarIcon)}
                    >
                      <Avatar
                        key={avatarIcon.avatarURL}
                        avatar={{
                          avatarName: avatarIcon.avatarURL,
                          avatarColor: theme.colors.lightGrey,
                        }}
                        size="large"
                      />
                    </StyledRadioButton>
                  ))}
                </StyledRadioGroup>
              </Spin>
              <StyledPagination
                total={pagination.total}
                simple
                pageSize={10}
                showSizeChanger={false}
                current={pagination.page}
                onChange={(page) => getAvatarList(page)}
              />
            </Modal>
          </Form.Item>
        </Form.Item>
      </Form>
    </StyledDivWrapper>
  );
};

export default RegisterStudentPart2;
