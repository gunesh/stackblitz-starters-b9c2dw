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
                {/* <SideMenu.MenuSingleItem badgeColor="danger">
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
                </SideMenu.MenuSingleItem> */}
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


                <SideMenu.MenuSingleItem badgeColor="danger">
                    <NavLink to="/customers" activeclassname="active">
                        <img src={icon_customer} />
                        <span className="menu-item-text">Customer</span>
                    </NavLink>
                </SideMenu.MenuSingleItem>






            </SideMenu>
        );
    }
}

export default SideMenuContent;
