import * as React from 'react';
import styled, { ThemeContext } from 'styled-components/native';

interface HeaderProps {
}

export const Header: React.FunctionComponent<HeaderProps> = props => {
  const theme: any = React.useContext(ThemeContext);
  const { ...HeaderProps } = props;

  return (
    <HeaderBody>
    </HeaderBody>
  );
};

const HeaderBody = styled.View`
  background: white;
  height: 35px;
  width: 100%;
  z-index: 50;
`;