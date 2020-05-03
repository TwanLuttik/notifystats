/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import 'react-native-gesture-handler';
import React, { useEffect } from 'react';
import {
  SafeAreaView,
  StyleSheet,
  ScrollView,
  View,
  Text,
  StatusBar,
  Button
} from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import styled from 'styled-components';
import { HomeView } from './screens/home/HomeView';
import { NotifyOptionsMenu } from './parts/PopUp';
import { Header } from './parts/root/Header';
import { RootNavigation } from './routers/RootNavigation';


console.disableYellowBox = true;

const App: () => React$Node = () => {

  return (
    <>
      <NavigationContainer>
        <RootNavigation/>
        {/* <Header />
        <Button 
          title="test"
          onPress={() => {
            navigation.navigate('channel');
          }}
        /> */}


        {/* <NotifyOptionsMenu /> */}
        {/* <StatusBar barStyle="dark-content" /> */}
          {/* <SafeAreaView > */}
        {/* <HomeView /> */}
        {/* <NavigationContainer> </NavigationContainer>     */}
      </NavigationContainer>

    
        

          {/* <View style={styles.body}>
            <View style={styles.sectionContainer}>
              <Text style={styles.sectionTitle}>Step One</Text>
              <Text style={styles.sectionDescription}>
                Edit <Text style={styles.highlight}>App.js</Text> to change this
                screen and then come back to see your edits.
              </Text>
            </View>
            <View style={styles.sectionContainer}>
              <Text style={styles.sectionTitle}>See Your Changes</Text>
              <Text style={styles.sectionDescription}>
                <ReloadInstructions />
              </Text>
            </View>
            <View style={styles.sectionContainer}>
              <Text style={styles.sectionTitle}>Debug</Text>
              <Text style={styles.sectionDescription}>
                <DebugInstructions />
              </Text>
            </View>
            <View style={styles.sectionContainer}>
              <Text style={styles.sectionTitle}>Learn More</Text>
              <Text style={styles.sectionDescription}>
                Read the docs to discover what to do next:
              </Text>
            </View>
            <LearnMoreLinks />
          </View> */}
      {/* </SafeAreaView> */}
    </>
  );
};



export default App;
