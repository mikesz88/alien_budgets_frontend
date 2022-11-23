import { Form } from 'antd';
import styled from 'styled-components';
import StyledTitle from '../../components/Title';

export const StyledMarginTitle = styled(StyledTitle)`
  padding-top: 6rem;
`;

export const StyledDivWrapper = styled.div`
  min-height: 100vh;
  background-color: ${({ theme }) => theme.colors.lightGrey};
`;

export const StyledForm = styled(Form)`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  margin: 0 auto;
  width: 300px;
`;

export const StyledDivPasswordInfo = styled.div`
  text-align: justify;
  margin-bottom: 1rem;
`;

export const StyledFormItem = styled(Form.Item)`
  width: 100%;
`;
