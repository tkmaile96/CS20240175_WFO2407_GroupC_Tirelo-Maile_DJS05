// Store Implementation
class Store {
    constructor(reducer, initialState) {
        this.reducer =reducer;
        this.state = initialState;
        this.listeners = [];
    }

    //return the current state
    getState() {
        console.log("Current State:", this.state);
        return this.state;
    }
    // Registers a new listener (observer)
    subscribe(listener) {
        this.listeners.push(listener);
        // Unsubscribe function to remove listener
        return () => {
            this.listeners = this.listeners.filter(l => l !== listener);
        };
    }

    // Dispatch an action and update state
    dispatch(action) {
        this.state = this.reducer(this.state, action);
        this.listeners.forEach(listener => listener(this.state)); //Notify all listeners

    }
}

// Reducer function to handle actions
function tallyReducer(state = { count: 0 }, action) {
    switch (action.type) {
        case 'ADD':
            return { ...state, count: state.count + 1 };
        case 'SUBTRACT':
            return { ...state, count: state.count - 1 };
        case 'RESET':
            return { ...state, count: 0 };
        default:
            return state;
    }
}

// Create a store with the reducer and initial state
const store = new Store(tallyReducer, { count: 0 });

// Subscribe to the store
store.subscribe((state) => console.log("State after action:", state));

// User stories

//SCENERIO 1: Inital state
store.getState(); // Current State: { count: 0 }

// SCENARIO 2: Incrementing the Counter
store.dispatch({ type: 'ADD' }); //  State after action: { count: 1 }
store.dispatch({ type: 'ADD' }); //  State after action: { count: 2 }

// SCENARIO 3: Decrementing the Counter
store.dispatch({ type: 'SUBTRACT' }); // State after action: { count: 1 }

// SCENARIO 4: Resetting the Counter
store.dispatch({ type: 'RESET' }); // State after action: { count: 0 }