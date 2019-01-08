// The types of actions that you can dispatch to modify the state of the store
export const types = {
  DID_RELOAD_EVENT_LIST: 'DID_RELOAD_EVENT_LIST',

}

// Helper functions to dispatch actions, optionally with payloads
export const actionCreators = {
  reload: content => {
    return {
        type: types.DID_RELOAD_EVENT_LIST, 
        payload: content
    }
  },
}

// Initial state of the store
const initialState = {
    schedule: [],
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

    if (action.type === types.DID_RELOAD_EVENT_LIST) {
        return {
            ...state,
            schedule: payload,
            isLoading: false
        };
    } //else if (action.type == 'persist/REHYDRATE') {
    //     return { ...state, schedule: action.payload.schedule, isLoading: false }
    // }

    return { ...state };
}

