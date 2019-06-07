'use strict';

import React from 'react';
import { Button, Text, View, StyleSheet } from 'react-native';
import Moment from 'moment';
import { withNavigation } from 'react-navigation';
//import { createStackNavigator, createAppContainer } from 'react-navigation';
import { RectButton, NativeViewGestureHandler } from 'react-native-gesture-handler';
import { ListItem } from 'react-native-elements';

class EventItem extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        const item = this.props.item;
        return (
            <NativeViewGestureHandler>
                <ListItem
                    key={item.id}
                    title={item.title}
                    titleStyle={styles.title}
                    subtitle={`${Moment(item.start).format('h:mm A')} - ${Moment(item.end).format('h:mm A')}`}
                    subtitleStyle={styles.description}
                    bottomDivider={true} 
                    chevron={true}//{{ type: "Ionicons", name: "ios-arrow-forward" }}
                    containerStyle={{paddingTop:7, paddingBottom:7, paddingLeft: 15, paddingRight: 15}}
                    // underlayColor="#ccc"
                    // activeOpacity={0.3}
                    onPress={() => 
                       this.props.navigation.navigate('Details', {item})
                    }
                     />
                      {/*
                    <View
                        style={{
                            padding: 16,
                        }}>
                        <Text style={ styles.title }>{item.title}</Text>
                        <Text style={ styles.description }>{Moment(item.start).format('h:mm A')} - {Moment(item.end).format('h:mm A')}</Text>
                    </View>
                </ListItem>
            */}
            </NativeViewGestureHandler>
        );
    }
}

export default withNavigation(EventItem);

const styles = StyleSheet.create({
    description: {
        paddingTop: 1,
        color: '#555',
        fontSize: 11,
    },
    title: {
        color: '#000',
        fontSize: 16,
    // fontWeight: 'bold',
},
});
