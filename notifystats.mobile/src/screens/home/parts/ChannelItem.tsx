import * as React from 'react';
import styled, { ThemeContext } from 'styled-components/native';
import { Text, Image, TouchableOpacity } from 'react-native';
import FastImage from 'react-native-fast-image';

interface ChannelItemProps {
  username?: string;
  avatar?: string;
  index?: number;
  subs?: number;
  onPress?: () => void;
}

export const ChannelItem: React.FunctionComponent<ChannelItemProps> = props => {
  const theme: any = React.useContext(ThemeContext);
  const { ...ChannelItemProps } = props;

  return (
    <ChannelItemBody activeOpacity={0.8} onPress={props.onPress}>
      <ChannelItemContainer>
        <Number>#{props.index + 1}</Number>
        <Avatar 
          source={{
            uri: props.avatar
          }}
          resizeMode={FastImage.resizeMode.contain}
        />
        <Username>{props.username}</Username>
        <Text style={{ color: 'gray', fontStyle: 'italic' }}>subs: {props.subs}</Text>
      </ChannelItemContainer>
    </ChannelItemBody>
  );
};

const ChannelItemBody = styled(TouchableOpacity)<any>`
  padding: 5px 15px;
`;

const ChannelItemContainer = styled.View`
  flex-direction: row;
  align-items: center;

`;

const Avatar = styled(FastImage)<any>`
  height: 50px;
  width: 50px;
  border-radius: 50px;
  margin: 0 40px;
`;

const Number = styled(Text)<any>`
  font-weight: bold;
`;

const Username = styled(Text)<any>`
  font-size: 16px;
  margin-right: 15px;
`;