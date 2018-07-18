import React from 'react';
import Moment from 'moment';
import { AsyncStorage, SectionList, ScrollView, ActivityIndicator, Text, View } from 'react-native';
import EventList from './components/EventList';
import BaseApp from './components/BaseApp';

export default class FetchExample extends React.Component {

    constructor(props){
        super(props);
        this.state = {isLoading: true};
    }

    fetchFromServer() {
        let url = 'https://covfamikoiregistration.com/registration/schedule/';
        return fetch(url)
            .then(response => response.json())
            .then(responseJson => {
                this.setState({
                    isLoading: false,
                    schedule: responseJson,
                }, async function() {
                    try {
                        await AsyncStorage.setItem('schedule', JSON.stringify(responseJson));
                    } catch (error) {
                        console.log(error);
                    }
                });
            })
            .catch(error => {
                console.error(error);
            });
    }

    async retrieveData() {
        try {
            console.log("ATTEMPTING TO RETRIEVE FROM LOCAL STORAGE");
            let schedule = await AsyncStorage.getItem('schedule');
            schedule = JSON.parse(schedule);
            if (schedule !== null) {
                console.log("SCHEDULE IN LOCAL STORAGE NOT NULL");
                return this.setState({
                    isLoading: false,
                    schedule,
                });
            }
            console.log("SCHEDULE WAS NULL");
            return this.fetchFromServer();
        } catch (error) {
            // Error retrieving data
            console.log("ATTEMPTING TO RETRIEVE FROM LOCAL STORAGE FAILED");
            console.log(error);
            return this.fetchFromServer();
        }
    }

    componentDidMount() {
        this.retrieveData();
    }


    render() {
        if (this.state.isLoading){
            return(
                <View style={{flex: 1, padding: 50}}>
                    <ActivityIndicator/>
                </View>
            )
        }

        Moment.locale('en');

        let days = this.state.schedule.map(item => Moment(item.start).format('YYYY-MM-DD'));
        days = [...new Set(days)];  // unique

        let sections = [];
        for (let i = 0; i < days.length; i++) {
            let day = days[i];
            let data = this.state.schedule.filter(item => Moment(item.start).format('YYYY-MM-DD') == day);
            sections.push({
                title: Moment(day).format("dddd, MMM Do"),
                data,
            });
        }

        return (
            <BaseApp>
              <ScrollView>
                  <EventList
                      sections={sections}
                  />
              </ScrollView>
            </BaseApp>
        );
    }
}
