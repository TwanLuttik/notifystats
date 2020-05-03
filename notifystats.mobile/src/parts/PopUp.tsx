import React, { useState, useEffect } from 'react';
import { Text, TouchableOpacity, Animated, Easing, AppState, FlatList, DeviceEventEmitter } from 'react-native';
import styled, { ThemeContext } from 'styled-components/native';

interface ButtonAction {
  title?: string;
  subText?: string;
  action?: () => void;
  show?: boolean;
  highlight?: boolean;
}
interface OptionsMenu {
  title?: string;
  buttons?: Array<ButtonAction>;
  cancel?: boolean;
}

interface NotifyOptionsMenuProps {}

export const NotifyOptionsMenu: React.FunctionComponent<NotifyOptionsMenuProps> = props => {
  const theme: any = React.useContext(ThemeContext);
  const { ...NotifyOptionsMenuProps } = props;
  const [translateY] = useState(new Animated.Value(500));
  const [opacity] = useState(new Animated.Value(0));
  const [show, setShow] = useState(false)
  const [data, setData] = useState<OptionsMenu>({});


  // twan fix this function later
  function AnimationHandler(data: any) {
    console.log('popup');

    // set data if we receive data
    if (data) setData(data);  

    // Check for [show] state
    if (!show) {
      // show the component and delay the animation
      setShow(true);
      setTimeout(() => {
        Animated.timing(opacity, {
          toValue: 1,
          duration: 200,
          easing: Easing.ease,
          useNativeDriver: true,
        }).start();
        Animated.timing(translateY, {
          toValue: 0,
          duration: 200,
          easing: Easing.ease,
          useNativeDriver: true,
        }).start(); 
      }, 100);

    } else {

      // delay hiding the component after the animation 
      const duration = 200;
      Animated.timing(opacity, {
        toValue: 0,
        duration,
        easing: Easing.ease,
        useNativeDriver: true,
      }).start();
      Animated.timing(translateY, {
        toValue: 300,
        duration: 200,
        easing: Easing.ease,
        useNativeDriver: true,
      }).start(); 

      setTimeout(() => {
        setShow(false)
      }, duration);
    }
  }

  // Closing the modal without any execution after closing
  async function Close() {
    return new Promise((resolve, reject) => {
      const duration = 200;
      Animated.timing(opacity, {
        toValue: 0,
        duration,
        easing: Easing.ease,
        useNativeDriver: true,
      }).start();
      Animated.timing(translateY, {
        toValue: 300,
        duration,
        easing: Easing.ease,
        useNativeDriver: true
      }).start(); 

      setTimeout(() => {
        setShow(false)
      }, duration);
      return resolve();
    })
  }

  // This is for a button that execute an function after closing the model 
  async function buttonPressHandler(func: () => void) {
    await Close();
    func();
  }

  useEffect(() => {
    DeviceEventEmitter.addListener('popup', AnimationHandler);
    DeviceEventEmitter.addListener('CloseOptionMenu', Close);

    return function() {
      DeviceEventEmitter.removeListener('popup', () => {});
      DeviceEventEmitter.removeListener('CloseOptionMenu', () => {});
    }
  }, []);

  if (!show) return <></>;

  return (
    <>
    {/* <BackgroundContainer onTouchStart={Close} style={{ opacity }} /> */}
      <NotifyOptionsMenuBody style={{ transform: [{ translateY }] }}  onTouchStart={Close}>
      {data.title ? <NotifyOptionsTitle colax regular>{data.title}</NotifyOptionsTitle> : null}
        <FlatList
          data={data.buttons}
          scrollEnabled={false} 
          renderItem={({ item, index }) => <Text>{item.title}</Text>
            // <NotifyOptionsButton title={item.title} subText={item.subText} highlight={item.highlight} onPress={() => buttonPressHandler(item.action)} />
          }
        />
        {data.cancel ? <Line /> : null}
        {/* {data.cancel ? <NotifyOptionsButton title="Cancel" onPress={Close} /> : null} */}
      </NotifyOptionsMenuBody>
    </>
  );
};

const BackgroundContainer = styled(Animated.View)<any>`
  background-color: #00000060;
  position: absolute;
  height: 100%;
  z-index: -100;
  width: 100%;
  z-index: 50;
  opacity: 1;
`;

const NotifyOptionsMenuBody = styled(Animated.View)<any>`
  background: white;
  padding: 10px;
  width: 100%;
  position: absolute;
  z-index: 51;
  bottom: 0;
  border-radius: 33px;
  /* margin: 0 10px; */
  min-height: 200px;
`;

const Line = styled.View<any>`
  background: #F4F4F4;
  border-radius: 7px;
  height: 4px;
  width: 60%;
  margin: 15px auto;
`;

const NotifyOptionsTitle = styled(Text)<any>`
  text-align: center;
  font-size: 16px;
  padding-top: 5px;
  margin: 15px 0px;
  margin-bottom: 20px;
`;