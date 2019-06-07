'use strict';

import React from 'react';
import { Button, Text, View } from 'react-native';
import Moment from 'moment';
import { withNavigation } from 'react-navigation';
//import { createStackNavigator, createAppContainer } from 'react-navigation';
import { RectButton, NativeViewGestureHandler } from 'react-native-gesture-handler';

class Event extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        const item = this.props.item;
        return (
            <NativeViewGestureHandler>
                <RectButton
                        key={item.id}
                        underlayColor="#ccc"
                        activeOpacity={0.3}
                        onPress={() => 
                           this.props.navigation.navigate('Details', {item})
                        }
                      >
                    <View
                        style={{
                            padding: 16,
                        }}>
                        <Text>{item.title}</Text>
                        <Text>{item.full_location}</Text>
                        <Text>{Moment(item.start).format('h:mm A')} - {Moment(item.end).format('h:mm A')}</Text>
        {/*
                        // <Button
                        //   title="Go to Details"
                        //   onPress={() => 
                        //       this.props.navigation.navigate('Details', {item})
                        //   }
                        // />
        */}
                    </View>
                </RectButton>
            </NativeViewGestureHandler>
        );
    }
}

export default withNavigation(Event);