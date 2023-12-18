// import external modules
import React, { Component } from "react";
import { Users } from "react-feather";
import { ChevronRight, FileText } from "react-feather";
import { NavLink } from "react-router-dom";

// Styling
import "../../../../assets/scss/components/sidebar/sidemenu/sidemenu.scss";
// import internal(own) modules
import SideMenu from "../sidemenuHelper";




import icon_products from '../../../../assets/img/icon_product.svg';
import icon_channel from '../../../../assets/img/icon_channel.svg';
import icon_shows from '../../../../assets/img/icon_shows.svg';
import icon_episodes from '../../../../assets/img/icon_episodes.svg';
import icon_auctions from '../../../../assets/img/icon_auctions.svg';
import icon_customer from '../../../../assets/img/icon_customer.svg';
import icon_payments from '../../../../assets/img/icon_payments.svg';
import icon_report from '../../../../assets/img/icon_report.svg';
import icon_masterdata from '../../../../assets/img/icon_masterdata.svg';

class SideMenuContent extends Component {
   render() {
      return (
         <SideMenu className="sidebar-content" toggleSidebarMenu={this.props.toggleSidebarMenu}>
            <SideMenu.MenuSingleItem badgeColor="danger">
               <NavLink to="/Products" activeclassname="">
                  <img src={icon_products} />
                  <span className="menu-item-text">Products</span>
               </NavLink>
            </SideMenu.MenuSingleItem>
            <SideMenu.MenuSingleItem badgeColor="danger">
               <NavLink to="/channels" activeclassname="">
                  <img src={icon_channel} />
                  <span className="menu-item-text">Channels</span>
               </NavLink>
            </SideMenu.MenuSingleItem>
            <SideMenu.MenuSingleItem badgeColor="danger">
               <NavLink to="/shows" activeclassname="">
                  <img src={icon_shows} />
                  <span className="menu-item-text">Shows</span>
               </NavLink>
            </SideMenu.MenuSingleItem>
            <SideMenu.MenuSingleItem badgeColor="danger">
               <NavLink to="/episode" activeclassname="">
                  <img src={icon_episodes} />
                  <span className="menu-item-text">Episodes</span>
               </NavLink>
            </SideMenu.MenuSingleItem>
            <SideMenu.MenuMultiItems
               name="Auctions"
               Icon={<img src={icon_auctions} />}
               ArrowRight={<ChevronRight size={16} />}
               collapsedSidebar={this.props.collapsedSidebar}
            >
               <NavLink to="/auctions/viewAuctionPage" exact className="item" activeclassname="active">
                  <span className="menu-item-text">Live Auctions</span>
               </NavLink>

               <NavLink to="/auctions/viewWeeklyAuctions" exact className="item" activeclassname="active">
                  <span className="menu-item-text">Weekly Auctions</span>
               </NavLink>


               <NavLink to="/auctions/viewMonthlyAuctions" exact className="item" activeclassname="active">
                  <span className="menu-item-text">Monthly Auctions</span>
               </NavLink>
               <NavLink to="/auctions/viewPaidAuctions" exact className="item" activeclassname="active">
                  <span className="menu-item-text">Paid Auctions</span>
               </NavLink>
               <NavLink to="/auctions/viewFreeAuctions" exact className="item" activeclassname="active">
                  <span className="menu-item-text">Practice Bids</span>
               </NavLink>
            </SideMenu.MenuMultiItems>
            <SideMenu.MenuMultiItems
               name="Report"
               Icon={<img src={icon_report} />}
               ArrowRight={<ChevronRight size={16} />}
               collapsedSidebar={this.props.collapsedSidebar}
            >
               <NavLink to="/reports/Liveauction" exact className="item" activeclassname="active">
                  <span className="menu-item-text">Live Auction</span>
               </NavLink>
               <NavLink to="/reports/EpisodeShowlevel" exact className="item" activeclassname="active">
                  <span className="menu-item-text">Episode / Show Level</span>
               </NavLink>
               <NavLink to="/reports/AuctionLevel" exact className="item" activeclassname="active">
                  <span className="menu-item-text">Auction Level</span>
               </NavLink>
               <NavLink to="/reports/AuctionAmount" exact className="item" activeclassname="active">
                  <span className="menu-item-text">Auction Amount</span>
               </NavLink>
               <NavLink to="/reports/PaymentGateway" exact className="item" activeclassname="active">
                  <span className="menu-item-text">Payment Gateway</span>
               </NavLink>
               <NavLink to="/reports/SuccessfulCoinOrders" exact className="item" activeclassname="active">
                  <span className="menu-item-text">Successful Coin Orders</span>
               </NavLink>
               <NavLink to="/reports/SuccessfulProductOrders" exact className="item" activeclassname="active">
                  <span className="menu-item-text">Successful Product Orders</span>
               </NavLink>
               <NavLink to="/reports/FailedOrders" exact className="item" activeclassname="active">
                  <span className="menu-item-text">Failed Orders</span>
               </NavLink>
            </SideMenu.MenuMultiItems>



            <SideMenu.MenuSingleItem badgeColor="danger">
               <NavLink to="/customers" activeclassname="active">
                  <img src={icon_customer} />
                  <span className="menu-item-text">Customer</span>
               </NavLink>
            </SideMenu.MenuSingleItem>
            {/* <SideMenu.MenuSingleItem badgeColor="danger">
               <NavLink to="/warehousemanagement" activeclassname="">
                  <img src={icon_payments} />
                  <span className="menu-item-text">WareHouse Management</span>
               </NavLink>
            </SideMenu.MenuSingleItem> */}
            <SideMenu.MenuSingleItem badgeColor="danger">
               <NavLink to="/banner" activeclassname="">
                  <img src={icon_payments} />
                  <span className="menu-item-text">Banner</span>
               </NavLink>
            </SideMenu.MenuSingleItem>

            <SideMenu.MenuSingleItem badgeColor="danger">
               <NavLink to="/notification" activeclassname="">
                  <img src={icon_payments} />
                  <span className="menu-item-text">Notification</span>
               </NavLink>
            </SideMenu.MenuSingleItem>

            <SideMenu.MenuMultiItems
               name="Master Data"
               Icon={<img src={icon_masterdata} />}
               ArrowRight={<ChevronRight size={16} />}
               collapsedSidebar={this.props.collapsedSidebar}
            >

               <SideMenu toggleSidebarMenu={this.props.toggleSidebarMenu}>
                  <SideMenu.MenuMultiItems
                     name="Content"
                     ArrowRight={<ChevronRight size={16} />}
                     collapsedSidebar={this.props.collapsedSidebar}
                  >
                     <NavLink to="/masterdata/faq" exact className="item" activeclassname="active">
                        <span className="menu-item-text">FAQ</span>
                     </NavLink>

                     <NavLink to="/masterdata/termsAndConditions" exact className="item" activeclassname="active">
                        <span className="menu-item-text">Terms and Conditions</span>
                     </NavLink>
                     <NavLink to="/masterdata/contactUs" exact className="item" activeclassname="active">
                        <span className="menu-item-text">Contact Us</span>
                     </NavLink>
                     <NavLink to="/masterdata/aboutbzinga" exact className="item" activeclassname="active">
                        <span className="menu-item-text">About Bzinga</span>
                     </NavLink>
                     <NavLink to="/masterdata/privacypolicy" exact className="item" activeclassname="active">
                        <span className="menu-item-text">Privacy Policy</span>
                     </NavLink>
                     <NavLink to="/masterdata/howToPlay" exact className="item" activeclassname="active">
                        <span className="menu-item-text">How to play</span>
                     </NavLink>
                     <NavLink to="/masterdata/onboarding" exact className="item" activeclassname="active">
                        <span className="menu-item-text">Onboarding</span>
                     </NavLink>
                  </SideMenu.MenuMultiItems>
               </SideMenu>
               <NavLink to="/masterdata/setting" exact className="item" activeclassname="active">
                  <span className="menu-item-text">Settings</span>
               </NavLink>
               <NavLink to="/masterdata/languageTranslate" exact className="item" activeclassname="active">
                  <span className="menu-item-text">Language Translate</span>
               </NavLink>
               <NavLink to="/masterdata/location" exact className="item" activeclassname="active">
                  <span className="menu-item-text">Location</span>
               </NavLink>
               <NavLink to="/masterdata/language" exact className="item" activeclassname="active">
                  <span className="menu-item-text">Language</span>
               </NavLink>
               <NavLink to="/masterdata/packages" exact className="item" activeclassname="active">
                  <span className="menu-item-text">Packages</span>
               </NavLink>
               <NavLink to="/masterdata/user" exact className="item" activeclassname="active">
                  <span className="menu-item-text">User</span>
               </NavLink>
               <NavLink to="/masterdata/auctionCategory" exact className="item" activeclassname="active">
                  <span className="menu-item-text">Auction Category</span>
               </NavLink>
            </SideMenu.MenuMultiItems>



         </SideMenu>
      );
   }
}

export default SideMenuContent;
