/* eslint-disable no-unused-vars */
/* eslint-disable import/no-cycle */
import React, { useState, useContext, useEffect, useMemo } from 'react';
import { Form, Input, Pagination, Radio, Modal, notification } from 'antd';
import { useNavigate } from 'react-router-dom';
import { UserContext } from '../../../App';
import Avatar from '../../../components/Avatar';
import StyledRadioButton from './styles';
import StyledButton from '../../../components/PrimaryButton';
import theme from '../../../theme';
import StyledTitle from '../../../components/Title';

const RegisterAdultPart2 = () => {
  const { avatarService, authService } = useContext(UserContext);
  const [avatarList, setAvatarList] = useState([]);
  const [avatarURL, setAvatarURL] = useState('');
  const [openAvatarModal, setOpenAvatarModal] = useState(false);
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
    avatarService
      .getAvatarList(page)
      .then((res) => {
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

  const generateBgColor = () =>
    // eslint-disable-next-line no-bitwise
    `#${((Math.random() * 0xffffff) << 0).toString(16).padStart(6, '0')}`;

  const handleBgColorChange = (value) => {
    form.setFieldsValue({
      avatarColor: value,
    });
  };

  const handleAvatarURL = () => {
    form.setFieldsValue({
      avatarURL,
    });
  };

  const handleAvatarChange = ({ target: { value } }) => {
    form.setFieldsValue({
      avatarURL: value.avatarURL,
    });
    setAvatarURL(value);
  };

  const initialBackgroundColor = () => handleBgColorChange(generateBgColor());
  const initialAvatarURL = () => handleAvatarURL();

  useEffect(() => {
    initialBackgroundColor();
    getAvatarList();
  }, []);

  useEffect(() => {
    initialAvatarURL();
  }, [avatarURL]);

  const onFinish = (values) => {
    console.log(values);
  };

  return (
    <>
      <div>Test</div>
      <div>Test</div>
    </>
  );
};

export default RegisterAdultPart2;
