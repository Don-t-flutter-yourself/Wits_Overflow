import { combineReducers } from "redux";
import authReducer from "./authReducer";
//import postReducer from "./postReducer";
//import { firestoreReducer } from "redux-firestore";
import { firebaseReducer } from "react-redux-firebase";

const rootReducer = combineReducers({
    auth: authReducer,
//     post: postReducer,
//     fstore: firestoreReducer,
    firebase: firebaseReducer       //includes authentication
});

export default rootReducer;
