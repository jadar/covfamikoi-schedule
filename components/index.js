import React from 'react';
import Moment from 'moment';
import EventList from './EventList';
import { ScrollView, ActivityIndicator, View } from 'react-native';
import { connect } from 'react-redux';
import { actionCreators } from '../reducers/eventList';
import { SearchBar } from '@rn-vui/base';

Moment.locale('en');

const mapStateToProps = state => {
    // console.log("Mapping state: " + JSON.stringify(state));
    // console.log("Is loading: " + state.eventList.isLoading);
    const { eventList } = state;
    return {
        schedule: eventList.schedule,
        isLoading: eventList.isLoading,
        sections: eventList.sections,
        search: eventList.search,
    };
};

class Schedule extends React.Component {
    onFetch = responseJson => {
        const { dispatch } = this.props;
        dispatch(actionCreators.reloadEventsFinished(responseJson));
    }

    async fetchFromServer() {
        const { dispatch } = this.props;
        dispatch(actionCreators.reloadEventsBegan());

        let url = 'https://1jptdh2d70.execute-api.us-east-1.amazonaws.com/default/covfamikoi-schedule'
        return fetch(url)
            .then(response => response.json())
            .then(this.onFetch)
            .catch(error => {
                console.log(error);
                const { dispatch } = this.props;
                dispatch(actionCreators.reloadEventsFailed());
            });
    }

    componentDidMount() {
        this.fetchFromServer();
    }

    updateSearch = searchTerm => {
        const { dispatch } = this.props;
        dispatch(actionCreators.updateSearch(searchTerm));
    }


    render() {
        const { isLoading, search, sections, navigation } = this.props;
        // console.log(Object.keys(this.props));
        return (
            <View style={{flex: 1}}>
                <SearchBar
                    lightTheme={true}
                    placeholder="Search"
                    onChangeText={this.updateSearch}
                    round={true}
                    value={search}
                />
                <EventList
                      navigation={navigation}
                      sections={sections}
                      isLoading={isLoading}
                      style={{flex: 1}}
                      reload={() => this.fetchFromServer()}
                  />
            </View>
        );
    }
};

export default connect(mapStateToProps)(Schedule);
