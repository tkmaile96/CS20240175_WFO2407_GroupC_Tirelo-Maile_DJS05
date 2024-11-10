// Store Implementation
class Store {
    constructor(reducer, initialState) {
        this.reducer =reducer;
        this.state = initialState;
        this.listener = [];
    }

    //return the current state
    getState() {
        console.log("Current State:", this.state);
        return this.state;
    }
}