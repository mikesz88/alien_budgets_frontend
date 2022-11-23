import { Form } from 'antd';
import styled from 'styled-components';
import StyledTitle from '../../../components/Title';

export const StyledFormItem = styled(Form.Item)`
  margin-top: 1rem;
`;

export const StyledDivWrapper = styled.div`
  padding-top: 6rem;
`;

export const StyledExtraTitle = styled(StyledTitle)`
  font-size: 4rem;
`;

export const StyledWidthFormItem = styled(Form.Item)`
  width: 100%;
`;

export const StyledForm = styled(Form)`
  width: 300px;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  margin: 2rem auto 0;
`;

export const StyledDivContainer = styled.div`
  background-color: ${({ theme }) => theme.colors.lightGrey};
  min-height: 100vh;
`;

export const StyledButtonContainer = styled.div`
  display: flex;
  justify-content: center;
`;

export const StyledDivInput = styled.div`
  width: 300px;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  margin: 2rem auto 0;
`;
