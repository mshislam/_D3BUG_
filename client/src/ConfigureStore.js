import { applyMiddleware, createStore, compose } from "redux";

import thunk from "redux-thunk";

import rootReducer from "./reducers/rootReducer";


import jwtDecode from 'jwt-decode';



function saveToLocalStorage(state){
 try{
 const serializedstate = JSON.stringify(state)
 localStorage.setItem('state',serializedstate)
 } catch(e){
console.log(e)
 }
}

function loadFromLocalStorage(){
try{
    const serializedstate = localStorage.getItem('state')
    if(serializedstate==null) return undefined
 
    console.log(JSON.parse(serializedstate))
    return JSON.parse(serializedstate)

}catch(e){
console.log(e)
return undefined
}
}






const initialState = {};

const middleware = [thunk];
const presistedstate = loadFromLocalStorage()
const store = createStore(rootReducer,presistedstate,applyMiddleware(thunk));

store.subscribe(()=>saveToLocalStorage(store.getState()))
export default store;
