// smhkm2 new file
import React, { Fragment, useState } from "react";
import { Card, Nav, NavLink, TabContent, TabPane, NavItem } from "reactstrap";
import { PlusCircle, Search } from "react-feather";
import classnames from 'classnames';

import SendNotification from "./SendNotification"
import ConfigNotification from "./ConfigNotification"

import PropTypes from "prop-types";
import '../auctions/createauctions/viewauctions.scss'
import { withRouter } from 'react-router-dom';
import { compose } from 'redux';
import { connect } from "react-redux";
import { fetchChannel,saveChannel } from '../../redux/actions/chanels/chanelAction';

class Notification  extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      activeTab: 1,
      reloadPage:false
    };
  }


  componentDidMount(){
      this.setState({activeTab:'1'})
  }
  
  render() {
    const toggle = tab => {
        if (this.state.activeTab !== tab)
        this.setState({activeTab:tab}) 
    }
    return (
        <Fragment>
           <Card>
                <div className="auctions_section">
                    <Nav tabs>
                        <NavItem>
                            <NavLink className={classnames({ active: this.state.activeTab === '1' })} onClick={() => { toggle('1'); }} >
                            Notification 
                            </NavLink>
                        </NavItem>
                       {/* */}<NavItem >
                            <NavLink className={classnames({ active: this.state.activeTab === '2' })} onClick={() => { toggle('2'); }} >
                                Notification Template
                            </NavLink>
                        </NavItem> 
                    </Nav>
                    <TabContent activeTab={this.state.activeTab}>
                        <TabPane tabId="1">
                            <div className="auctionlist_content">
                            <SendNotification  />
                            </div>
                        </TabPane>
                        <TabPane tabId="2">
                            <ConfigNotification  />
                         </TabPane>
                    </TabContent>

                </div>
            </Card>
       
        </Fragment>
    );
  }
}



// export default Channels;
export default compose(
  withRouter,
  connect(null, { fetchChannel,saveChannel})
)(Notification);


