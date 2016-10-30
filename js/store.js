var redux = require("redux");
var createStore = redux.createStore; 
var applyMiddleware = redux.applyMiddleware;
var thunk = require("redux-thunk").default;

var appReducer = require("./reducers/app-reducer");
var store = createStore(appReducer, applyMiddleware(thunk));

module.exports = store;