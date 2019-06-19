import Moment from 'moment';

// The types of actions that you can dispatch to modify the state of the store
export const types = {
    RELOAD_EVENT_LIST_BEGAN: 'RELOAD_EVENT_LIST_BEGAN',
    RELOAD_EVENT_LIST: 'RELOAD_EVENT_LIST',
    UPDATE_SEARCH_TERM: 'UPDATE_SEARCH_TERM',
}

// Helper functions to dispatch actions, optionally with payloads
export const actionCreators = {
    reloadEventsBegan: () => {
        return {
            type: types.RELOAD_EVENT_LIST_BEGAN,
            payload: null
        }
    },
    reloadEventsFinished: content => {
        return {
            type: types.RELOAD_EVENT_LIST, 
            payload: content
        }
    },
    updateSearch: searchTerm => {
        return {
            type: types.UPDATE_SEARCH_TERM,
            payload: searchTerm,
        }
    }
}

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

function filterSchedule(schedule, searchTerm) {
    return schedule.filter(item => {
        if (!searchTerm) return true;
        let val = item.title.toLowerCase().includes(searchTerm.toLowerCase());
        return val;
    });
}

function computeState(schedule, searchTerm) {
    let filteredSchedule = filterSchedule(schedule, searchTerm);
    let sections = sectionize(filteredSchedule);
    return {
        schedule: schedule, // pass the original schedule through. sections is the only filtered one.
        sections: sections,
        search: searchTerm
    }
}

// Initial state of the store
const initialState = {
    search: null,
    schedule: [],
    sections: [],
    isLoading: true
};

// Function to handle actions and update the state of the store.
// Notes:
// - The reducer must return a new state object. It must never modify
//   the state object. State objects should be treated as immutable.
// - We set \`state\` to our \`initialState\` by default. Redux will
//   call reducer() with no state on startup, and we are expected to
//   return the initial state of the app in this case.
export default function (state = initialState, action) {
    const { type, payload } = action

    if (action.type === types.RELOAD_EVENT_LIST_BEGAN) {
        return {
            ...state,
            isLoading: true
        };
    } else if (action.type === types.RELOAD_EVENT_LIST) {
        let newState = computeState(payload, state.search);
        return {
            ...state,
            ...newState,
            isLoading: false
        };
    } else if (action.type === types.UPDATE_SEARCH_TERM) {
        let newState = computeState(state.schedule, payload);
        return {
            ...state,
            ...newState,
            search: payload,
        }
    }
    //else if (action.type == 'persist/REHYDRATE') {
    //     return { ...state, schedule: action.payload.schedule, isLoading: false }
    // }

    return { ...state };
}
