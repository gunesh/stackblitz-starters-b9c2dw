// import external modules
import React from "react";
import { Route, Redirect } from "react-router-dom";

// import internal(own) modules
import MainLayout from "../mainLayout";

const ErrorLayoutRoute = ({ render, ...rest }) => {
   const JwTtoken = window.localStorage.getItem('token');
   return (
      <Route
         {...rest}
         render={matchProps =>
            JwTtoken ?
               <Redirect to="/auctions/viewAuctionPage" /> :
               <MainLayout>{render(matchProps)}</MainLayout>}
      />
   );
};

export default ErrorLayoutRoute;
