import React, { Fragment, useState } from "react";
import { Card, FormGroup, Nav, NavLink, TabContent, TabPane, Row, NavItem, Col, Input, Label, Button, Table } from "reactstrap";
import { PlusCircle, Search } from "react-feather";
import classnames from 'classnames';
import './viewauctions.scss';
import CreateAuctions from "./createAuctions"
import AddAuctions from "../addauctions/addAuctions"
import PropTypes from "prop-types";


// Styling

const AuctionPage = (props) => {
    const [activeTab, setActiveTab] = useState('1');

    const toggle = tab => {
        if (activeTab !== tab) setActiveTab(tab);

    }
    // const auctionsdata = this.props.auctions.auctions;
    return (
        <Fragment>
          
            <Card>
                <div className="auctions_section">
                    <Nav tabs>
                        <NavItem>
                            <NavLink className={classnames({ active: activeTab === '1' })} onClick={() => { toggle('1'); }} >
                                LIVE AUCTION LIST
                                    </NavLink>
                        </NavItem>
                        <NavItem className="create_tab">
                            <NavLink className={classnames({ active: activeTab === '2' })} onClick={() => { toggle('2'); }} >
                                CREATE LIVE AUCTION
                                    </NavLink>
                        </NavItem>
                    </Nav>
                    <TabContent activeTab={activeTab}>
                        <TabPane tabId="1">
                            <div className="auctionlist_content">
                               <CreateAuctions auctionTypeId="1"/>
                            </div>
                        </TabPane>
                        <TabPane tabId="2">
                        <AddAuctions/>
                         </TabPane>
                    </TabContent>
                </div>
            </Card>
        </Fragment>
    );


}








// export default Users;
export default AuctionPage;
