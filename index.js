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