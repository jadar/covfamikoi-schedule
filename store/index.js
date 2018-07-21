// The types of actions that you can dispatch to modify the state of the store
export const types = {
  FETCH: 'FETCH',
}

// Helper functions to dispatch actions, optionally with payloads
export const actionCreators = {
  fetch: content => {
    return {
        type: types.FETCH, 
        payload: content
    }
  },
}

// Initial state of the store
const initialState = {
    schedule: [],
    isLoading: true,
}

// Function to handle actions and update the state of the store.
// Notes:
// - The reducer must return a new state object. It must never modify
//   the state object. State objects should be treated as immutable.
// - We set \`state\` to our \`initialState\` by default. Redux will
//   call reducer() with no state on startup, and we are expected to
//   return the initial state of the app in this case.
export const reducer = (state = initialState, action) => {
    // const { todos } = state
    const { type, payload } = action

    switch (type) {
        case types.FETCH: {
            const s = {
                ...state,
                schedule: payload,
                isLoading: false,
            }
            return s;
        }
        default:
            return {
                ...state
            };
    }
}

