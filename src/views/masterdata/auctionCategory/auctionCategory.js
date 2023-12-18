import React, { Fragment, useState } from "react";
import { Card, Nav, NavLink, TabContent, TabPane, NavItem } from "reactstrap";
import { PlusCircle, Search } from "react-feather";
import classnames from 'classnames';
// import './viewauctions.scss';
import AuctuionCategoryList from "./auctuionCategoryList"
import CreateAuctionCategory from "./createAuctionCategory"
import PropTypes from "prop-types";
import '../../auctions/createauctions/viewauctions.scss'
import EditAuctionCategory from './editAuctionCategory'
import { withRouter } from 'react-router-dom';
import { compose } from 'redux';
import { connect } from "react-redux";
import { fetchChannel, saveChannel } from '../../../redux/actions/chanels/chanelAction';

// Styling
class Channels extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            activeTab: 1,
            EditAuctionCategory: "",
            channelLogo: "",
            id: "",
            reloadPage: false
        };
    }

    AuctionCategoryData = (data) => {
        this.setState({ EditAuctionCategory: data, channelLogo: data.logo, id: data.id })

        if (data) {
            this.setState({ activeTab: '2' })
        }
    }
    componentDidMount() {
        this.setState({ activeTab: '1' })
    }
    reloadRoute = () => {
        if (this.state.EditAuctionCategory) {
            this.setState({ EditAuctionCategory: "" })
        }

    }

    render() {
        const toggle = tab => {
            if (this.state.activeTab !== tab)
                this.setState({ activeTab: tab })
        }
        return (
            <Fragment>
                <h6>Aucion Category</h6>
                <Card>
                    <div className="auctions_section">
                        <Nav tabs>
                            <NavItem>
                                <NavLink className={classnames({ active: this.state.activeTab === '1' })} onClick={() => { toggle('1'); }} >
                                    AUCTION CATEGORY LIST
                            </NavLink>
                            </NavItem>
                            {this.state.EditAuctionCategory && this.state.activeTab === "2" ? (

                                <NavItem className="create_tab">
                                    <NavLink className={classnames({ active: this.state.activeTab === '2' })} onClick={() => { toggle('2'); }} >
                                        EDIT AUCTION CATEGORY
                            </NavLink>
                                </NavItem>) : <NavItem className="create_tab">
                                    <NavLink onClick={this.reloadRoute()} className={classnames({ active: this.state.activeTab === '2' })} onClick={() => { toggle('2'); }} >
                                        CREATE AUCTION CATEGORY
                            </NavLink>
                                </NavItem>}
                        </Nav>
                        <TabContent activeTab={this.state.activeTab}>
                            <TabPane tabId="1">
                                <div className="auctionlist_content">
                                    <AuctuionCategoryList AuctionCategoryInfo={this.AuctionCategoryData} />
                                </div>
                            </TabPane>
                            {this.state.EditAuctionCategory ? (<TabPane tabId="2">
                                <EditAuctionCategory CategoryList={this.state.EditAuctionCategory} channelLogo={this.state.channelLogo} id={this.state.id} />
                            </TabPane>) : <TabPane tabId="2">
                                    <CreateAuctionCategory />
                                </TabPane>
                            }
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
    connect(null, { fetchChannel, saveChannel })
)(Channels);


