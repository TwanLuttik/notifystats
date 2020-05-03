import React, { useEffect, useState } from 'react';
import styled, { ThemeContext } from 'styled-components/native';
import { Text, FlatList, DeviceEventEmitter, TouchableOpacity,  } from 'react-native';
import a from '../../etc/list';
import { ChannelItem } from './parts/ChannelItem';
import { useNavigation } from '@react-navigation/native';

interface HomeViewProps {
}

export const HomeView: React.FunctionComponent<HomeViewProps> = props => {
  const theme: any = React.useContext(ThemeContext);
  const { ...HomeViewProps } = props;
  const [list, setList] = useState([]);
  const navigate = useNavigation();

  useEffect(() => {
    setList(a)
    console.log(list)
  }, [])

  return (
    <HomeViewBody>
      <Text style={{ textAlign: 'center', fontWeight: 'bold', fontSize: 16 }}>TOP 50</Text>
      <FlatList 
        data={list}
        initialNumToRender={50}
        showsVerticalScrollIndicator={false}
        ItemSeparatorComponent={({}) => <LineSeperator />}
        renderItem={({ item, index }) => 
          <ChannelItem 
            {...item} 
            index={index} 
            onPress={() =>  {
              navigate.navigate('Home');
            }}
          />
        }
      />
      
    </HomeViewBody>
  );
};

const HomeViewBody = styled.View`
  height: 100%;
  align-items: center;
`;

const TopList = styled(FlatList)<any>`
 flex: 1;
 width: 100%;
`;

const LineSeperator = styled.View`
  width: 70%;
  background-color: #EBEBEB40;
  height: 3px;
  margin: 5px auto;
  border-radius: 5px;
`;
