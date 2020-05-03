import * as React from 'react';
import styled, { ThemeContext } from 'styled-components/native';
import { LogsView } from '../screens/logs/LogsView';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

import { SettingsView } from '../screens/settings/SettingsView';


const Stack = createStackNavigator();


interface RootNavigationProps {
}

export const RootNavigation: React.FunctionComponent<RootNavigationProps> = props => {
  const theme: any = React.useContext(ThemeContext);
  const { ...RootNavigationProps } = props;

  return (
    <NavigationContainer>
      <Stack.Navigator
      screenOptions={{
        headerShown: false,
        gestureEnabled: true,
        cardOverlayEnabled: true
      }}>
        <Stack.Screen
          name="Channel"
          component={LogsView}
        />
        <Stack.Screen
          name="Settings"
          component={SettingsView}
        />
      </Stack.Navigator>
    </NavigationContainer>

  );
};

const RootNavigationBody = styled.View`
  flex: 1;
`;