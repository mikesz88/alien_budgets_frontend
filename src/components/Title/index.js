import styled from 'styled-components';

const StyledTitle = styled.h1`
  font-family: ${({ theme }) => theme.fontFamily.creepster};
  color: ${({ theme }) => theme.colors.primaryBlue};
  font-size: 8rem;
  text-align: center;

  @media (max-width: 426px) {
    font-size: 3rem;
  }
`;

export default StyledTitle;
