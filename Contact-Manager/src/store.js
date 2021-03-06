import { createStore, combineReducers, compose } from 'redux';
import firebase from 'firebase';
import 'firebase/firestore';
import { reactReduxFirebase, firebaseReducer } from 'react-redux-firebase';
import { reduxFirestore, firestoreReducer } from 'redux-firestore';

// Reducers

// ToDos

const firebaseConfig = {
    apiKey: 'XXXXXXXXXX',
    authDomain: 'XXXXXXXXXX',
    databaseURL: 'XXXXXXXXXX',
    projectId: 'XXXXXXXXXX',
    storageBucket: 'XXXXXXXXXX',
    messagingSenderId: 'XXXXXXXXXX'
};

// react-redux-firebase config
const rrfConfig = {
    userProfile: 'users',
    useFirestoreForProfile: true // Firestore for Profile instead of Realtime DB
};
// init firbase instance
firebase.initializeApp(firebaseConfig);
// init firestore
const firestore = firebase.firestore();
const settings = { timestampsInSnapshots: true };
firestore.settings(settings);

// Add reactReduxFirebase enhancer when making store creator
const createStoreWithFirebase = compose(
    reactReduxFirebase(firebase, rrfConfig), // firebase instance as first argument
    reduxFirestore(firebase) // <- needed if using firestore
)(createStore);

// Add firebase to reducers
const rootReducer = combineReducers({
    firebase: firebaseReducer,
    firestore: firestoreReducer // <- needed if using firestore
});

// Create initial state
const initialState = {};

// Create store
const store = createStoreWithFirebase(
    rootReducer,
    initialState,
    compose(reactReduxFirebase(firebase))
);

export default store;