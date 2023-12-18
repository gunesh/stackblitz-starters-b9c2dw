import React, { Fragment, } from "react";
import { Card, Nav, NavLink, TabContent, TabPane, NavItem } from "reactstrap";
import { PlusCircle } from "react-feather";
import classnames from 'classnames';
import './viewauctions.scss';
import FreeAuction from "../createauctions/freeAuctionsList"
import AddFreeAuction from "../addauctions/addFreeAuction"
import EditAuction from "../editauctions/editFreeAuction"
import { withRouter } from 'react-router-dom';
import { compose } from 'redux';
import { connect } from "react-redux";


// Styling
class Freeauction extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            activeTab: 1,
            editFreeAuction: "",
            id: "",
            reloadPage: false
        };
    }

    AuctionData = (data) => {
        console.log(">>>>,", data)
        this.setState({ editFreeAuction: data })

        if (data) {
            this.setState({ activeTab: '2' })
        }
    }
    componentDidMount() {
        this.setState({ activeTab: '1' })
    }


    reloadRoute = () => {
        if (this.state.editFreeAuction) {
            this.setState({ editFreeAuction: "" })
        }
    }

    render() {
        const toggle = tab => {
            if (this.state.activeTab !== tab)
                this.setState({ activeTab: tab })
        }

        return (
            <Fragment>
                <Card>

                    <div className="auctions_section">
                        <Nav tabs>
                            <NavItem>
                                <NavLink className={classnames({ active: this.state.activeTab === '1' })} onClick={() => { toggle('1'); }} >
                                    PRACTICE BIDS LIST
                            </NavLink>
                            </NavItem>
                            {this.state.editFreeAuction && this.state.activeTab === "2" ? (

                                <NavItem className="create_tab">
                                    <NavLink className={classnames({ active: this.state.activeTab === '2' })} onClick={() => { toggle('2'); }} >
                                        Edit PRACTICE BID
                            </NavLink>
                                </NavItem>) : <NavItem className="create_tab">
                                    <NavLink onClick={this.reloadRoute()} className={classnames({ active: this.state.activeTab === '2' })} onClick={() => { toggle('2'); }} >
                                        CREATE PRACTICE BID
                            </NavLink>
                                </NavItem>}
                        </Nav>
                        <TabContent activeTab={this.state.activeTab}>
                            <TabPane tabId="1">
                                <div className="auctionlist_content">
                                    <FreeAuction freeAuctionInfo={this.AuctionData} />
                                </div>
                            </TabPane>
                            {this.state.editFreeAuction ? (<TabPane tabId="2">
                                <EditAuction freeAuctionInfo={this.state.editFreeAuction} />
                            </TabPane>) : <TabPane tabId="2">
                                    <AddFreeAuction />
                                </TabPane>
                            }
                        </TabContent>
                    </div>
                </Card>
            </Fragment>
        );


    }

}



export default compose(
    withRouter,
    connect(null, {})
)(Freeauction);


