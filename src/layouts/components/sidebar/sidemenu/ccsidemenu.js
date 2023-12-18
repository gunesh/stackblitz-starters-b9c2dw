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
                    <NavLink to="/customers" activeclassname="active">
                        <img src={icon_customer} />
                        <span className="menu-item-text">Customer</span>
                    </NavLink>
                </SideMenu.MenuSingleItem>
                <SideMenu.MenuSingleItem badgeColor="danger">
                    <NavLink to="/masterdata/faqccagent" activeclassname="active">
                        <img src={icon_masterdata} />
                        <span className="menu-item-text">FAQ</span>
                    </NavLink>
                </SideMenu.MenuSingleItem>
                <SideMenu.MenuSingleItem badgeColor="danger">
                    <NavLink to="/callhistory" activeclassname="active">
                        <img src={icon_masterdata} />
                        <span className="menu-item-text">Call History</span>
                    </NavLink>
                </SideMenu.MenuSingleItem>
            </SideMenu>
        );
    }
}

export default SideMenuContent;
