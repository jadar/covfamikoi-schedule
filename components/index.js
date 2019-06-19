import React from 'react';
import Moment from 'moment';
import EventList from './EventList';
import { ScrollView, ActivityIndicator, View } from 'react-native';
import { connect } from 'react-redux';
import { reducers } from '../reducers';
import { actionCreators } from '../reducers/eventList';
import { SearchBar } from 'react-native-elements';

Moment.locale('en');

const mapStateToProps = state => {
    // console.log("Mapping state: ");
    // console.log("Is loading: " + state.eventList.isLoading);
    return {
        schedule: state.eventList.schedule,
        isLoading: state.eventList.isLoading,
        sections: state.eventList.sections,
        search: state.eventList.search,
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
        // Eventually
        // https://schedule.covfamikoiregistration.com/default/covfamikoi-schedule
        // should work, but hasn't finished propogating
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
        const { isLoading, search, sections } = this.props;

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
