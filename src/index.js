// import external modules
import React, { Suspense, lazy } from "react";
import ReactDOM from "react-dom";
import { Provider } from "react-redux";

// import internal(own) modules
import registerServiceWorker from "./registerServiceWorker";
import { store } from "./redux/storeConfig/store";
import ReduxToastr from 'react-redux-toastr'

import "font-awesome/css/font-awesome.min.css";

import "./index.scss";
import Spinner from "./components/spinner/spinner";
import setAuthorizationToken from "./redux/actions/auth/setAuthorizationToken";
import jwtDecode from 'jwt-decode';
import { setCurrentUser } from '../src/redux/actions/auth/authActions';

const LazyApp = lazy(() => import("./app/app"));
if (localStorage.jwtToken) {
   setAuthorizationToken(localStorage.jwtToken)
   store.dispatch(setCurrentUser(jwtDecode(localStorage.jwtToken)));
}

ReactDOM.render(
   <Provider store={store}>
      <Suspense fallback={<Spinner />}>
         <LazyApp />
         <ReduxToastr
            timeOut={4000}
            newestOnTop={false}
            preventDuplicates
            position="top-left"
            transitionIn="fadeIn"
            transitionOut="fadeOut"
            progressBar
            closeOnToastrClick />
      </Suspense>
   </Provider>,
   document.getElementById("root")
);
registerServiceWorker();
