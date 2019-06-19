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

// Initial state of the store
const initialState = {
    unfilteredSections: [],
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
        // let newState = computeState(payload, state.search);
        let sections = sectionize(payload);
        let filteredSections = filterScheduleSections(sections, state.search);

        return {
            ...state,
            unfilteredSections: sections, // pass the original schedule through. sections is the only filtered one.
            sections: filteredSections,
            isLoading: false
        };
    } else if (action.type === types.UPDATE_SEARCH_TERM) {
        // let newState = computeState(state.schedule, payload);
        // console.log(state);
        let filteredSections = filterScheduleSections(state.unfilteredSections, payload);
        return {
            ...state,
            sections: filteredSections,
            search: payload,
        }
    }
    //else if (action.type == 'persist/REHYDRATE') {
    //     return { ...state, schedule: action.payload.schedule, isLoading: false }
    // }

    return { ...state };
}
