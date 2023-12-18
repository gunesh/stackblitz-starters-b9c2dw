import React, { Fragment, PureComponent } from "react";

import PropTypes from "prop-types";
import { isEmpty } from 'lodash';
import { Smartphone } from "react-feather";
import { Row, Card, FormGroup, Col, Input, Label, Button, Table } from "reactstrap";
import '../auctions/createauctions/viewauctions.scss'
import { fetchCustomerPurchase,fetchCustomerSummary } from '../../redux/actions/customers/customerProfileAction';
import { withRouter } from 'react-router-dom';
import { compose } from 'redux';
import { connect } from "react-redux";
import { Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';




class ProfilePage extends PureComponent {
    constructor() {
        super();
        this.state = {
            modal: false,
            creditedCoins: "",
            balanceCoins: "",
            status: true,
            userId: "",
            callStatus: "",
            notes: "",
            createdBy: JSON.parse(localStorage.getItem('user')).id,
            callcenterUserId: JSON.parse(localStorage.getItem('user')).id
        };

    }
    componentDidMount() {
        const id = this.props.match.params.id
        this.setState({ userId: id })
        this.props.fetchCustomerSummary(id)

    }
    toggle = () => {
        this.setState({ modal: !this.state.modal });
    }


    onChange = (e) => {
        this.setState({ [e.target.name]: e.target.value })

    }
    onBackPage = () => {
        window.location.assign("/#/customers")

    }
    render() {
        const { purchasehistory } = this.props.purchasehistory;
        console.log(purchasehistory)
        const PurchaseLists = (
            <Fragment>
                <h6>User Coin Summary</h6>
                <Card>
                    <div>
                        <div>
                            <Col sm="5">
                                <button sm="6" className="text-right"
                                    className="btn btn-primary submit_btn1 marT15"
                                    onClick={this.onBackPage}>Back
                                    </button>
                            </Col>
                        </div>
                        <div className="purchase_history"> 
                            <Col sm="12">
                           
                                <Table striped>
                                    <thead>
                                        <tr>
                                            <th>Credited Coins</th>
                                            <th>Balance Coins</th>
                                            <th>Credit Type</th>
                                            <th>Coin Type</th>
                                            <th>Credited Date</th>
                                            <th>Expired Date</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {purchasehistory.map((item, index) => (
                                            <tr key={index}>
                                                <td>{item.creditedCoins}</td>
                                                <td>{item.balanceCoins}</td>
                                                <td>{item.creditType}</td>
                                                <td>{item.coinType}</td>
                                                <td>{item.creditedDate}</td>
                                                <td>{item.expiredDate}</td>

                                            </tr>
                                        )
                                        )}
                                    </tbody>
                                </Table>
                            </Col>
                        </div>
                    </div>
                </Card>
            </Fragment>

        );
        const errorMessage = (
            <Card>
                <p className="text-center">There is no purchase history.</p>
            </Card>
        );

        return (
            <Fragment>
                {purchasehistory.length > 0 ? PurchaseLists : errorMessage}
            </Fragment>
        );
    }
}
ProfilePage.contextTypes = {
    router: PropTypes.object.isRequired
}
const mapStateToProps = state => ({
    purchasehistory: state.customerData.purchasehistory
});

export default compose(
    withRouter,
    connect(mapStateToProps, { fetchCustomerPurchase,fetchCustomerSummary })
)(ProfilePage);