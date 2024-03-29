import { Form } from 'antd';
import styled from 'styled-components';

export const StyledDivWrapper = styled.div`
  width: 100vw;
  min-height: 100vh;
  background-color: ${({ theme }) => theme.colors.lightGrey};
`;

export const StyledRegisterPart2Container = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

export const StyledGradeLevelContainer = styled(Form.Item)`
  margin: 1rem auto;
  font-weight: bold;
  font-size: 2rem;
`;

export const StyledCenteredFormItem = styled(Form.Item)`
  text-align: center;
`;

export const StyledGradeLevelWrapper = styled.div`
  display: flex;
  justify-content: center;
`;
