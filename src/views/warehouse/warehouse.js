import React, { Fragment, PureComponent } from "react";
import { isEmpty } from 'lodash';
import PropTypes from "prop-types";
import { PlusCircle, DownloadCloud } from "react-feather";
import { Row, Card, FormGroup, Col, Input, Label, Button, Table } from "reactstrap";
import { fetchCustomer, searchCustomer, changeStatusCustomer } from '../../redux/actions/customers/customersAction'
import { withRouter } from 'react-router-dom';
import { compose } from 'redux';
import { connect } from "react-redux";

import '../auctions/createauctions/viewauctions.scss'

import img_thumb from '../../assets/img/avatar-s-1.png';

class Warehouse extends PureComponent {
    constructor() {
        super();
        this.state = {
            firstName: "",
            lastName: "",
            email: "",
            mobile: "",
            id: ""
        };

    }

    componentDidMount() {
        this.props.fetchCustomer();
        //   window.location.reload();
    }
    handleChange = (value, event) => {
        this.setState({
            id: value.id,
            status: value.status,
        })
        var data = { id: value.id, status: !value.status }
        this.props.changeStatusCustomer(data)
        //   window.location.reload();
    }
    onChange = (e) => {
        this.setState({ [e.target.name]: e.target.value })
    }
    onSearchCustomer = (event) => {
        event.preventDefault();
        Object.keys(this.state).forEach(k => (!this.state[k] && this.state[k] !== undefined) && delete this.state[k]);
        const data = this.state
        this.props.searchCustomer(data.firstName)
    }
    render() {
        const { customers } = this.props.customer

        const CustomerLists = (
            <Fragment>
                <h6>Warehouse Management</h6>
                <Card>
                    <h1 style={{ color: 'red' }}>Server Error in '/' Application.</h1>
                    <h4 style={{ color: 'maroon' }}>The resource cannot be found.</h4>
                    <p>Description: HTTP 404. The resource you are looking for (or one of its dependencies) could have been removed, had its name changed, or is temporarily unavailable.  Please review the following URL and make sure that it is spelled correctly.</p>
                    <p>Requested URL: /coname/service.asmx</p>
                </Card>
            </Fragment >

        )

        return (
            <Fragment>
                {CustomerLists}
            </Fragment>
        );
    }
}

const mapStateToProps = state => ({
    customer: state.customerData.customers
});

export default compose(
    withRouter,
    connect(mapStateToProps, { fetchCustomer, searchCustomer, changeStatusCustomer })
)(Warehouse);
