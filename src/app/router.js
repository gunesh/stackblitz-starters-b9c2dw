// import external modules
import React, { Component, Suspense, lazy } from "react";
import { HashRouter, Switch, Redirect } from "react-router-dom";
import Spinner from "../components/spinner/spinner";

// import internal(own) modules
import MainLayoutRoutes from "../layouts/routes/mainRoutes";
import FullPageLayout from "../layouts/routes/fullpageRoutes";
import ErrorLayoutRoute from "../layouts/routes/errorRoutes";

// Main Layout
const LazyAddAuctions = lazy(() => import("../views/auctions/addauctions/addAuctions"));
const LazyCreateAuctions = lazy(() => import("../views/auctions/createauctions/createAuctions"));
const LazyViewAuctionsPage = lazy(() => import("../views/auctions/createauctions/auctionPage"));
const LazyViewWeeklyauction = lazy(() => import("../views/auctions/createauctions/weeklyAuction"));
const LazyViewMonthlyauction = lazy(() => import("../views/auctions/createauctions/monthlyAuction"));
const LazyViewPaidauction = lazy(() => import("../views/auctions/createauctions/paidAuction"));
const LazyViewFreeauction = lazy(() => import("../views/auctions/createauctions/freeAuction"));
const LazyViewPackagesPage = lazy(() => import("../views/masterdata/packages/Packages"));
const LazyviewProduct = lazy(() => import("../views/products/products"));
const LazyPayment = lazy(() => import("../views/Payments/Payments"));
const LazyChanel = lazy(() => import("../views/channels/channels"));
const LazyEpisode = lazy(() => import("../views/episodes/episodes"));
const LazyShows = lazy(() => import("../views/shows/shows"));
const LazyViewLiveauction = lazy(() => import("../views/reports/LiveAuction"));
const LazyViewEpisodeShowlevel = lazy(() => import("../views/reports/EpisodeShowlevel"));
const LazyViewAuctionLevel = lazy(() => import("../views/reports/AuctionLevel"));
const LazyViewAuctionAmount = lazy(() => import("../views/reports/AuctionAmount"));
const LazyViewPaymentGateway = lazy(() => import("../views/reports/PaymentGateway"));
const LazyViewSuccessfulOrders = lazy(() => import("../views/reports/SuccessfulOrders"));
const LazyViewSuccessfulProductOrders =lazy(() => import("../views/reports/SuccessfulproductOrders"));
const LazyViewFailedOrders = lazy(() => import("../views/reports/FailedOrders"));
const LazyUsers = lazy(() => import("../views/users/users"));
const LazyCallCentre = lazy(() => import("../views/history/historyList"));
const LazyCustomer = lazy(() => import("../views/customers/customerList"));
const LazyUserProfile = lazy(() => import("../views/customers/profile"));
const LazyContentFaq = lazy(() => import("../views/masterdata/content/faq"));
const LazyContentFaq1 = lazy(() => import("../views/masterdata/content/faqlatest"));
const LazyContentHowToPlay = lazy(() => import("../views/masterdata/content/howToPlay"));
const LazyBanner = lazy(() => import("../views/banner/Banner"));
const LazyWarehouse = lazy(() => import("../views/warehouse/warehouse"));
const LazyPurchaseHistory = lazy(() => import("../views/customers/purchasehistory"));
const LazyUserSummary = lazy(() => import("../views/customers/usersummary"));
const LazyLanguageTranslate = lazy(() => import("../views/masterdata/languageTranslate/laguageTranslate"));
const LazyLanguage = lazy(() => import("../views/masterdata/Language/language"));
const LazyLocation = lazy(() => import("../views/masterdata/Location/Location"));
const LazyContentContactus = lazy(() => import("../views/masterdata/content/contactUs"));
const LazyAboutBzinga = lazy(() => import("../views/masterdata/content/aboutbzinga"));
const LazyPrivacyPolicy = lazy(() => import("../views/masterdata/content/privacypolicy"));
const LazyAuctionCategory = lazy(() => import("../views/masterdata/auctionCategory/auctionCategory"));
const LazyOnboarding = lazy(() => import("../views/masterdata/content/onboarding/onboarding"));
const LazyTermsAndConditions = lazy(() => import("../views/masterdata/content/termsAndConditions"));
const LazySettingsPage = lazy(() => import("../views/masterdata/settingPage/setting"));
// Full Layout
const LazyLogin = lazy(() => import("../views/pages/login"));
const LazyRegister = lazy(() => import("../views/pages/register"));

// Error Pages
const LazyErrorPage = lazy(() => import("../views/pages/error"));

const LazyNotification = lazy(() => import("../views/Notification/Notification"));  // smhkm2 new changes

class Router extends Component {
   render() {
      return (
         // Set the directory path if you are deplying in sub-folder
         <HashRouter basename="/">
            <Switch>
               {/* Dashboard Views */}
               <ErrorLayoutRoute
                  exact
                  path="/"
                  render={() => <Redirect to='/pages/login' />}
               />

               <MainLayoutRoutes
                  exact
                  path="/masterdata/packages"
                  render={matchprops => (
                     <Suspense fallback={<Spinner />}>
                        <LazyViewPackagesPage {...matchprops} />
                     </Suspense>
                  )}
               />
               <MainLayoutRoutes
                  exact
                  path="/Products"
                  render={matchprops => (
                     <Suspense fallback={<Spinner />}>
                        <LazyviewProduct {...matchprops} />
                     </Suspense>
                  )}
               />
               <MainLayoutRoutes
                  exact
                  path="/banner"
                  render={matchprops => (
                     <Suspense fallback={<Spinner />}>
                        <LazyBanner {...matchprops} />
                     </Suspense>
                  )}
               />
{/* smhkm2 new changes */}
               <MainLayoutRoutes
                  exact
                  path="/notification"
                  render={matchprops => (
                     <Suspense fallback={<Spinner />}>
                        <LazyNotification {...matchprops} />
                     </Suspense>
                  )}
               />

               <MainLayoutRoutes
                  exact
                  path="/masterdata/onboarding"
                  render={matchprops => (
                     <Suspense fallback={<Spinner />}>
                        <LazyOnboarding {...matchprops} />
                     </Suspense>
                  )}
               />
                 <MainLayoutRoutes
                  exact
                  path="/masterdata/location"
                  render={matchprops => (
                     <Suspense fallback={<Spinner />}>
                        <LazyLocation {...matchprops} />
                     </Suspense>
                  )}
               />
                 <MainLayoutRoutes
                  exact
                  path="/masterdata/language"
                  render={matchprops => (
                     <Suspense fallback={<Spinner />}>
                        <LazyLanguage {...matchprops} />
                     </Suspense>
                  )}
               />
               <MainLayoutRoutes
                  exact
                  path="/masterdata/languageTranslate"
                  render={matchprops => (
                     <Suspense fallback={<Spinner />}>
                        <LazyLanguageTranslate {...matchprops} />
                     </Suspense>
                  )}
               />
               <MainLayoutRoutes
                  exact
                  path="/masterdata/termsAndConditions"
                  render={matchprops => (
                     <Suspense fallback={<Spinner />}>
                        <LazyTermsAndConditions {...matchprops} />
                     </Suspense>
                  )}
               />
                <MainLayoutRoutes
                  exact
                  path="/masterdata/setting"
                  render={matchprops => (
                     <Suspense fallback={<Spinner />}>
                        <LazySettingsPage {...matchprops} />
                     </Suspense>
                  )}
               />
               
               <MainLayoutRoutes
                  exact
                  path="/masterdata/contactUs"
                  render={matchprops => (
                     <Suspense fallback={<Spinner />}>
                        <LazyContentContactus {...matchprops} />
                     </Suspense>
                  )}
               />
               <MainLayoutRoutes
                  exact
                  path="/masterdata/aboutbzinga"
                  render={matchprops => (
                     <Suspense fallback={<Spinner />}>
                        <LazyAboutBzinga {...matchprops} />
                     </Suspense>
                  )}
               />
               <MainLayoutRoutes
                  exact
                  path="/masterdata/privacypolicy"
                  render={matchprops => (
                     <Suspense fallback={<Spinner />}>
                        <LazyPrivacyPolicy {...matchprops} />
                     </Suspense>
                  )}
               />
               <MainLayoutRoutes
                  exact
                  path="/masterdata/howToPlay"
                  render={matchprops => (
                     <Suspense fallback={<Spinner />}>
                        <LazyContentHowToPlay {...matchprops} />
                     </Suspense>
                  )}
               />
               <MainLayoutRoutes
                  exact
                  path="/warehousemanagement"
                  render={matchprops => (
                     <Suspense fallback={<Spinner />}>
                        <LazyWarehouse {...matchprops} />
                     </Suspense>
                  )}
               />


               <MainLayoutRoutes
                  exact
                  path="/customers"
                  render={matchprops => (
                     <Suspense fallback={<Spinner />}>
                        <LazyCustomer {...matchprops} />
                     </Suspense>
                  )}
               />
               <MainLayoutRoutes
                  exact
                  path="/customersUserprofile/:custometid"
                  render={matchprops => (
                     <Suspense fallback={<Spinner />}>
                        <LazyUserProfile {...matchprops} />
                     </Suspense>
                  )}
               />
               



               <MainLayoutRoutes
                  exact
                  path="/masterdata/faq"
                  render={matchprops => (
                     <Suspense fallback={<Spinner />}>
                        <LazyContentFaq {...matchprops} />
                     </Suspense>
                  )}
               />
               <MainLayoutRoutes
                  exact
                  path="/masterdata/faqccagent"
                  render={matchprops => (
                     <Suspense fallback={<Spinner />}>
                        <LazyContentFaq1 {...matchprops} />
                     </Suspense>
                  )}
               />

               <MainLayoutRoutes
                  exact
                  path="/payment"
                  render={matchprops => (
                     <Suspense fallback={<Spinner />}>
                        <LazyPayment {...matchprops} />
                     </Suspense>
                  )}
               />
               <MainLayoutRoutes
                  exact
                  path="/masterdata/auctionCategory"
                  render={matchprops => (
                     <Suspense fallback={<Spinner />}>
                        <LazyAuctionCategory {...matchprops} />
                     </Suspense>
                  )}
               />

               <MainLayoutRoutes
                  exact
                  path="/shows"
                  render={matchprops => (
                     <Suspense fallback={<Spinner />}>
                        <LazyShows {...matchprops} />
                     </Suspense>
                  )}
               />
               <MainLayoutRoutes
                  exact
                  path="/episode"
                  render={matchprops => (
                     <Suspense fallback={<Spinner />}>
                        <LazyEpisode {...matchprops} />
                     </Suspense>
                  )}
               />
               <MainLayoutRoutes
                  exact
                  path="/masterdata/user"
                  render={matchprops => (
                     <Suspense fallback={<Spinner />}>
                        <LazyUsers {...matchprops} />
                     </Suspense>
                  )}
               />
               <MainLayoutRoutes
                  exact
                  path="/channels"
                  render={matchprops => (
                     <Suspense fallback={<Spinner />}>
                        <LazyChanel {...matchprops} />
                     </Suspense>
                  )}
               />
               <MainLayoutRoutes
                  exact
                  path="/auctions/viewWeeklyAuctions"
                  render={matchprops => (
                     <Suspense fallback={<Spinner />}>
                        <LazyViewWeeklyauction {...matchprops} />
                     </Suspense>
                  )}
               />
               <MainLayoutRoutes
                  exact
                  path="/auctions/viewMonthlyAuctions"
                  render={matchprops => (
                     <Suspense fallback={<Spinner />}>
                        <LazyViewMonthlyauction {...matchprops} />
                     </Suspense>
                  )}
               />
               <MainLayoutRoutes
                  exact
                  path="/auctions/viewPaidAuctions"
                  render={matchprops => (
                     <Suspense fallback={<Spinner />}>
                        <LazyViewPaidauction {...matchprops} />
                     </Suspense>
                  )}
               />

               <MainLayoutRoutes
                  exact
                  path="/auctions/viewFreeAuctions"
                  render={matchprops => (
                     <Suspense fallback={<Spinner />}>
                        <LazyViewFreeauction  {...matchprops} />
                     </Suspense>
                  )}
               />

               <MainLayoutRoutes
                  exact
                  path="/auctions/addauctions"
                  render={matchprops => (
                     <Suspense fallback={<Spinner />}>
                        <LazyAddAuctions {...matchprops} />
                     </Suspense>
                  )}
               />
               <MainLayoutRoutes
                  exact
                  path="/reports/LiveAuction"
                  render={matchprops => (
                     <Suspense fallback={<Spinner />}>
                        <LazyViewLiveauction {...matchprops} />
                     </Suspense>
                  )}
               />


               <MainLayoutRoutes
                  exact
                  path="/auctions/createauctions"
                  render={matchprops => (
                     <Suspense fallback={<Spinner />}>
                        <LazyCreateAuctions {...matchprops} />
                     </Suspense>
                  )}
               />
               <MainLayoutRoutes
                  exact
                  path="/auctions/viewAuctionPage"
                  render={matchprops => (
                     <Suspense fallback={<Spinner />}>
                        <LazyViewAuctionsPage {...matchprops} />
                     </Suspense>
                  )}
               />
               <MainLayoutRoutes
                  exact
                  path="/auctions/addauctions"
                  render={matchprops => (
                     <Suspense fallback={<Spinner />}>
                        <LazyAddAuctions {...matchprops} />
                     </Suspense>
                  )}
               />
               <MainLayoutRoutes
                  exact
                  path="/reports/LiveAuction"
                  render={matchprops => (
                     <Suspense fallback={<Spinner />}>
                        <LazyViewLiveauction {...matchprops} />
                     </Suspense>
                  )}
               />
               <MainLayoutRoutes
                  exact
                  path="/reports/EpisodeShowlevel"
                  render={matchprops => (
                     <Suspense fallback={<Spinner />}>
                        <LazyViewEpisodeShowlevel {...matchprops} />
                     </Suspense>
                  )}
               />
               <MainLayoutRoutes
                  exact
                  path="/reports/AuctionLevel"
                  render={matchprops => (
                     <Suspense fallback={<Spinner />}>
                        <LazyViewAuctionLevel {...matchprops} />
                     </Suspense>
                  )}
               />
               <MainLayoutRoutes
                  exact
                  path="/reports/AuctionAmount"
                  render={matchprops => (
                     <Suspense fallback={<Spinner />}>
                        <LazyViewAuctionAmount {...matchprops} />
                     </Suspense>
                  )}
               />
               <MainLayoutRoutes
                  exact
                  path="/reports/PaymentGateway"
                  render={matchprops => (
                     <Suspense fallback={<Spinner />}>
                        <LazyViewPaymentGateway {...matchprops} />
                     </Suspense>
                  )}
               />
               <MainLayoutRoutes
                  exact
                  path="/reports/SuccessfulCoinOrders"
                  render={matchprops => (
                     <Suspense fallback={<Spinner />}>
                        <LazyViewSuccessfulOrders {...matchprops} />
                     </Suspense>
                  )}
               />
                 <MainLayoutRoutes
                  exact
                  path="/reports/SuccessfulProductOrders"
                  render={matchprops => (
                     <Suspense fallback={<Spinner />}>
                        <LazyViewSuccessfulProductOrders {...matchprops} />
                     </Suspense>
                  )}
               />
               <MainLayoutRoutes
                  exact
                  path="/reports/FailedOrders"
                  render={matchprops => (
                     <Suspense fallback={<Spinner />}>
                        <LazyViewFailedOrders {...matchprops} />
                     </Suspense>
                  )}
               />
               <MainLayoutRoutes
                  exact
                  path="/callhistory"
                  render={matchprops => (
                     <Suspense fallback={<Spinner />}>
                        <LazyCallCentre {...matchprops} />
                     </Suspense>
                  )}
               />
               <MainLayoutRoutes
                  exact
                  path="/usersummary/:id"
                  render={matchprops => (
                     <Suspense fallback={<Spinner />}>
                        <LazyUserSummary {...matchprops} />
                     </Suspense>
                  )}
               />
               <MainLayoutRoutes
                  exact
                  path="/purchasehistory/:id"
                  render={matchprops => (
                     <Suspense fallback={<Spinner />}>
                        <LazyPurchaseHistory {...matchprops} />
                     </Suspense>
                  )}
               />


               {/* Saperate Pages Views */}
               <FullPageLayout
                  exact
                  path="/pages/login"
                  render={matchprops => (
                     <Suspense fallback={<Spinner />}>
                        <LazyLogin {...matchprops} />
                     </Suspense>
                  )}
               />
               <FullPageLayout
                  exact
                  path="/pages/register"
                  render={matchprops => (
                     <Suspense fallback={<Spinner />}>
                        <LazyRegister {...matchprops} />
                     </Suspense>
                  )}
               />
               <ErrorLayoutRoute
                  exact
                  path="/pages/error"
                  render={matchprops => (
                     <Suspense fallback={<Spinner />}>
                        <LazyErrorPage {...matchprops} />
                     </Suspense>
                  )}
               />

               <ErrorLayoutRoute
                  render={matchprops => (
                     <Suspense fallback={<Spinner />}>
                        <LazyErrorPage {...matchprops} />
                     </Suspense>
                  )}
               />
            </Switch>
         </HashRouter>
      );
   }
}

export default Router;
