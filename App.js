/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */




 import React, { Component } from "react";
 import NavigationConfig from "./src/navigation/NavigationConfig";
 import { Provider } from "react-redux";
 import { createStore, applyMiddleware } from "redux";
 import { persistReducer, persistStore } from "redux-persist";
 import { PersistGate } from "redux-persist/integration/react";
 import FilesystemStorage from "redux-persist-filesystem-storage";
 import thunk from "redux-thunk";
 import reducers from "./src/store/reducers";
 import ErrorBoundary from "./src/utils/ErrorBoundary";
 const rootPersistConfig = {
   key: "root",
   storage: FilesystemStorage,
   whitelist: ["navigationReducer","profileReducer","syncReducer"],
 };
 
 const pReducer = persistReducer(rootPersistConfig, reducers);
 
 export const store = createStore(pReducer, applyMiddleware(thunk));
 
 export const persistor = persistStore(store);
 
 export default class App extends React.PureComponent {
  
  constructor(props) {
    super(props);
   
  }
   render() {
     return (
       <ErrorBoundary>
           <Provider store={store}>
             <PersistGate loading={null} persistor={persistor}>
               <NavigationConfig />
             </PersistGate>
           </Provider>
       </ErrorBoundary>
     );
   }
 }
 