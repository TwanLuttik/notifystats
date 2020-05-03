import * as React from 'react';
import styled, { ThemeContext } from 'styled-components/native';
import { Text } from 'react-native';
import { useNavigation } from '@react-navigation/native';

interface LogsViewProps {
}

export const LogsView: React.FunctionComponent<LogsViewProps> = props => {
  const theme: any = React.useContext(ThemeContext);
  const { ...LogsViewProps } = props;
  const navgation = useNavigation();


  return (
    <LogsViewBody>
      <Text onPress={() => navgation.navigate('Settings')}>LogsView</Text>

    </LogsViewBody>
  );
};

const LogsViewBody = styled.View`
`;