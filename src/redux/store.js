import { combineReducers, createStore } from "redux";
import { gameReducer } from './tile-game-reducer';


let reducers = combineReducers({
    tiles: gameReducer
})

const store = createStore(reducers);
export default store;