import { Form } from 'antd';
import styled from 'styled-components';

export const StyledDivWrapper = styled.div`
  padding-top: 6rem;
`;

export const StyledFormItem = styled(Form.Item)`
  margin-top: 1rem;
  text-align: center;
`;

export const StyledDivContainer = styled.div`
  background-color: ${({ theme }) => theme.colors.lightGrey};
  min-height: 100vh;
`;

export const StyledForm = styled(Form)`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  width: 300px;
  margin: 0 auto;
`;
