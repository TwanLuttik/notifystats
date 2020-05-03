import * as React from 'react';
import styled, { ThemeContext } from 'styled-components/native';
import { Text } from 'react-native';
interface SettingsViewProps {
}

export const SettingsView: React.FunctionComponent<SettingsViewProps> = props => {
  const theme: any = React.useContext(ThemeContext);
  const { ...SettingsViewProps } = props;

  return (
    <SettingsViewBody>
      <Text>Settings</Text>

    </SettingsViewBody>
  );
};

const SettingsViewBody = styled.View`
  flex: 1;
`;