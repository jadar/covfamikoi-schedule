import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import Moment from 'moment';
import { Ionicons } from '@expo/vector-icons';



export class LocationIcon extends React.Component {
  render() {
    return (
      //<Ionicons name="location-pin" size={32} color="green" />
      <Ionicons 
          name="ios-pin" 
          style={{
            color: "#666",
            paddingRight: 10,
          }}
      />
    );
  }
}

export class CalendarIcon extends React.Component {
  render() {
    return (
      //<Ionicons name="location-pin" size={32} color="green" />
      <Ionicons 
        name="ios-calendar"
        style={{
            color: "#666",
            paddingRight: 10,
        }}
      />
    );
  }
}

export default class DetailsScreen extends React.Component {
  render() {
    const { navigation } = this.props;
    const item = navigation.getParam('item', {});
    const start = Moment(item.start);
    const end = Moment(item.end);
    return (
      <View style={{ flex: 1, alignItems: 'left', margin: 20, justifyContent: 'top' }}>
        <Text style={styles.title}>
        {item.title}
        </Text>
        <Text style={styles.subtitle}>{item.subtitle}</Text>
        <Text>
            <CalendarIcon />
            {start.format("dddd, MMMM Do YYYY, h:mm a")}-{end.format("h:mm a")}</Text>
        <Text>
            <LocationIcon />
            {item.full_location}
        </Text>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  title: {
    fontFamily: 'Cochin',
    fontSize: 20,
    fontWeight: 'bold',
  },
  subtitle: {
    fontSize: 10,
  },
});
