import Moment from 'moment';
import { createSlice } from '@reduxjs/toolkit';

function sectionize(schedule) {
    let days = schedule.map(item => Moment(item.start).format('YYYY-MM-DD'));
    days = [...new Set(days)];  // unique

    let sections = [];

    for (let i = 0; i < days.length; i++) {
        let day = days[i];
        let data = schedule.filter(item => Moment(item.start).format('YYYY-MM-DD') == day);
        if (data.length) {
            sections.push({
                title: Moment(day).format("dddd, MMM D"),
                data,
            });
        }
    }

    return sections;
}

function filterScheduleSections(sections, searchTerm) {
    if (!searchTerm)
        return sections;

    const lowCasedTerm = searchTerm.toLowerCase()

    let filteredSections = sections.map(section => {
        return {
            ...section,
            data: section.data.filter(item => {
                let val = item.title.toLowerCase().includes(lowCasedTerm);
                return val;
            })
        }
    }).filter(section => { return section.data.length > 0 })
    // console.log(filteredSections.map(section => { return section.title }));
    return filteredSections;//filteredSections.filter(section => { section.length > 0 })
}

// Create slice using Redux Toolkit
const eventListSlice = createSlice({
    name: 'eventList',
    initialState: { 
        unfilteredSections: [],
        sections: [],
        isLoading: false,
        search: null,
        schedule: [],
    },
    reducers: {
        reloadEventsBegan: (state) => {
            state.isLoading = true;
        },
        reloadEventsFailed: (state) => {
            state.isLoading = false;
        },
        reloadEventsFinished: (state, action) => {
            const sections = sectionize(action.payload);
            const filteredSections = filterScheduleSections(sections, state.search);
            
            state.unfilteredSections = sections;
            state.sections = filteredSections;
            state.isLoading = false;
        },
        updateSearch: (state, action) => {
            const filteredSections = filterScheduleSections(state.unfilteredSections, action.payload);
            state.sections = filteredSections;
            state.search = action.payload;
        }
    },
    extraReducers: (builder) => {
        builder.addCase('persist/REHYDRATE', (state, action) => {
            if (!action.payload || !action.payload.eventList) {
                return state;
            } else {
                return {
                    ...state,
                    ...action.payload.eventList,
                    isLoading: false
                };
            }
        });
    }
});

// Export actions
export const { reloadEventsBegan, reloadEventsFailed, reloadEventsFinished, updateSearch } = eventListSlice.actions;

// Export action creators for backward compatibility
export const actionCreators = {
    reloadEventsBegan,
    reloadEventsFinished,
    reloadEventsFailed,
    updateSearch
};

// Export types for backward compatibility
export const types = {
    RELOAD_EVENT_LIST_BEGAN: 'eventList/reloadEventsBegan',
    RELOAD_EVENT_LIST_FAILED: 'eventList/reloadEventsFailed',
    RELOAD_EVENT_LIST: 'eventList/reloadEventsFinished',
    UPDATE_SEARCH_TERM: 'eventList/updateSearch',
};

// Export the reducer
export default eventListSlice.reducer;
