import React from 'react';
import Moment from 'moment';
import EventList from './EventList';
import { AppRegistry, AsyncStorage, SectionList, ScrollView, ActivityIndicator, Text, View } from 'react-native';
import { connect } from 'react-redux';
import { reducers } from '../reducers';
import { actionCreators } from '../reducers/eventList';

const mapStateToProps = state => {
    // console.log("state", state);
    return {
        schedule: state.eventList.schedule,
        isLoading: state.eventList.isLoading,
    };
};

class Schedule extends React.Component {
    onFetch = responseJson => {
        const { dispatch } = this.props;
        dispatch(actionCreators.reload(responseJson));
    }

    fetchFromServer() {
        let url = 'https://covfamikoiregistration.com/registration/schedule/';
        return fetch(url)
            .then(response => response.json())
            .then(this.onFetch)
            .catch(error => {

                // console.error(error);
            });
    }

    componentDidMount() {
        this.fetchFromServer();
    }

    render() {
        const { isLoading, schedule } = this.props;

        console.log("schedule", this.props["schedule"].slice(0,2), "...");

        if (isLoading) {
            return (
                <View style={{flex: 1}}>
                    <ActivityIndicator/>
                </View>
            )
        }

        Moment.locale('en');

        let days = schedule.map(item => Moment(item.start).format('YYYY-MM-DD'));
        days = [...new Set(days)];  // unique

        let sections = [];
        for (let i = 0; i < days.length; i++) {
            let day = days[i];
            let data = schedule.filter(item => Moment(item.start).format('YYYY-MM-DD') == day);
            sections.push({
                title: Moment(day).format("dddd, MMM Do"),
                data,
            });
        }

        return (
            <ScrollView>
                <EventList
                      sections={sections}
                  />
            </ScrollView>
        );
    }
};

export default connect(mapStateToProps)(Schedule);
