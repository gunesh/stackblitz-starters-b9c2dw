import React, { Fragment, useState } from "react";
import { Card, Nav, NavLink, TabContent, TabPane, NavItem } from "reactstrap";
import { PlusCircle, Search } from "react-feather";
import classnames from 'classnames';
// import './viewauctions.scss';
import UserList from "./userlist"
import AddUser from './addUser'
import EditUser from './editUser'
import PropTypes from "prop-types";
import '../auctions/createauctions/viewauctions.scss'
import { withRouter } from 'react-router-dom';
import { compose } from 'redux';
import { connect } from "react-redux";
import { fetchChannel, saveChannel } from '../../redux/actions/chanels/chanelAction';
import { fetchUserRoles } from '../../redux/actions/users/userActions';


// Styling
class Episodes extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            activeTab: 1,
            EditUser: "",
            reloadPage: false
        };
    }

    UerData = (data) => {
        this.setState({ EditUser: data })

        if (data) {
            this.setState({ activeTab: '2' })
        }
    }
    componentDidMount() {
        this.setState({ activeTab: '1' });
        this.props.fetchUserRoles();
    }
    reloadRoute = () => {
        if (this.state.EditUser) {
            this.setState({ EditUser: "" })
        }

    }

    render() {
        const toggle = tab => {
            if (this.state.activeTab !== tab)
                this.setState({ activeTab: tab })
        }
        return (
            <Fragment>
                <h6>Users</h6>
                <Card>
                    <div className="auctions_section">
                        <Nav tabs>
                            <NavItem>
                                <NavLink className={classnames({ active: this.state.activeTab === '1' })} onClick={() => { toggle('1'); }} >
                                    USER LIST
                            </NavLink>
                            </NavItem>
                            {this.state.EditUser && this.state.activeTab === "2" ? (
                                <NavItem>
                                    <NavLink className={classnames({ active: this.state.activeTab === '2' })} onClick={() => { toggle('2'); }} >
                                        {<PlusCircle size={21} className='pluscircle' />}EDIT USER
                            </NavLink>
                                </NavItem>) : <NavItem>
                                    <NavLink onClick={this.reloadRoute()} className={classnames({ active: this.state.activeTab === '2' })} onClick={() => { toggle('2'); }} >
                                        {<PlusCircle size={21} className='pluscircle' />}CREATE USER
                            </NavLink>
                                </NavItem>}
                        </Nav>
                        <TabContent activeTab={this.state.activeTab}>
                            <TabPane tabId="1">
                                <div className="auctionlist_content">
                                    <UserList userInfo={this.UerData} />
                                </div>
                            </TabPane>
                            {this.state.EditUser ? (<TabPane tabId="2">
                                <EditUser EditUserList={this.state.EditUser} roles={this.props.roles} />
                            </TabPane>) : <TabPane tabId="2">
                                    <AddUser />
                                </TabPane>
                            }
                        </TabContent>
                    </div>
                </Card>
            </Fragment>
        );
    }
}
const mapStateToProps = state => ({
    roles: state.userdata.roles
});


// export default Channels;
export default compose(
    withRouter,
    connect(mapStateToProps, { fetchChannel, saveChannel, fetchUserRoles })
)(Episodes);


