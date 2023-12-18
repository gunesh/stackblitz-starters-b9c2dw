import React, { Fragment, PureComponent } from "react";
import { isEmpty } from 'lodash';
import PropTypes from "prop-types";
import { Calendar, DownloadCloud } from "react-feather";
import { Row, Card, Col, Label, Table, Button, FormGroup, Input } from "reactstrap";
import ReactHTMLTableToExcel from 'react-html-table-to-excel'
import '../auctions/createauctions/viewauctions.scss'
import { fetchSuccessOrders } from '../../redux/actions/reports/reportActions';
import { connect } from "react-redux";

import * as moment from 'moment';
import export_icon from '../../assets/img/export.png';


class PaymentGateway extends PureComponent {
    constructor(props) {
        super(props);
        this.state = {
            fromDate: "",
            toDate: "",
            gateway_type: ""
        }
    }
    componentDidMount() {
        //  this.props.fetchSuccessOrders(this.state);
    }
    formatDisplayTime = (dateTime) => {
        return moment(dateTime).format('DD/MM/YYYY')
    }
    onChangeDateTime = (e) => {
        let data = new Date(e.target.value).toISOString();
        let NewDate = new Date(data);
        NewDate.setHours(NewDate.getHours() + 5, NewDate.getMinutes() + 30, 0, 0);
        this.setState({ [e.target.name]: NewDate.toISOString() })
    }
    displayTime = (dateTime) => {
        var t = moment.utc(dateTime).format("HH:mm a")
        return t
    }
    handleChange = (e) => {
        this.setState({ gateway_type: e.target.value })
    }
    onFilterDate = () => {
        this.props.fetchSuccessOrders(this.state);
    }
    render() {
        const { reports } = this.props.reports
        const PaymentGateways = (
            <Fragment>
                <h6>Payment Gateway</h6>
                <Card>
                    <div>
                        <Row>
                            <Col sm="12">
                                <div className="aucionlist_filters">
                                    <Row>
                                        <Col sm="3">
                                            <FormGroup>
                                                <Label for="exampleSelect">From Date</Label>
                                                <Input type="date" id="fromDate" name="fromDate" data-toggle="tooltip" data-trigger="hover" data-placement="top" data-title="Date Opened" onChange={this.onChangeDateTime} />
                                            </FormGroup>
                                        </Col>
                                        <Col sm="3">
                                            <FormGroup>
                                                <Label for="exampleSelect">To Date</Label>
                                                <Input type="date" id="toDate" name="toDate" data-toggle="tooltip" data-trigger="hover" data-placement="top" data-title="Date Opened" onChange={this.onChangeDateTime} />
                                            </FormGroup>
                                        </Col>
                                        <Col sm="2">
                                            <FormGroup>
                                                <Label for="exampleSelect">Payment option</Label>
                                                <Input type="select" className="custom_arrow" required onChange={this.handleChange}>
                                                    <option value="">Select Payment</option>
                                                    <option value="payU">payU</option>
													<option value="payTM">payTM</option>
                                                </Input>
                                            </FormGroup>
                                        </Col>

                                        <Col sm="2">
                                            <div>&nbsp;</div>
                                            <Button color="primary" className="btn123" onClick={this.onFilterDate}>Submit</Button>
                                        </Col>
                                    </Row>
                                </div>
                            </Col>
                        </Row>
                        <div className="auctionlist_content">
                            <Col sm="12">
                                {reports ?
                                    <Table striped id="table-to-xls">

                                        <thead >
                                            <tr>
                                                <th>S.No</th>
                                                <th>Date</th>
                                                <th>Time</th>
                                                <th>User</th>
                                                <th>Payment gateway</th>
                                                <th>Order Number</th>
                                                <th>Amount collected</th>
                                                <th>Points purchased</th>
                                                <th><ReactHTMLTableToExcel table="table-to-xls"
                                                    filename='Payment_Gateway'
                                                    sheet='Payment_Gateway'
                                                    buttonText={<img src={export_icon} width="24" height="24" alt="Export to excel" title="Export to excel" />} />
                                                </th>
                                            </tr>
                                        </thead>
                                        <tbody>{reports.map((SuccessfulOrders, index) => (
                                            <tr key={index}>
                                                <td>{index + 1}</td>
                                                <td>{this.formatDisplayTime(SuccessfulOrders.created_at)}</td>
                                                <td>{this.displayTime(SuccessfulOrders.created_at)}</td>
                                                <td><a href={`/#/customersUserprofile/${SuccessfulOrders.user_id}`}>
                                                    {(SuccessfulOrders.first_name ? SuccessfulOrders.first_name : "") + " " + (SuccessfulOrders.last_name ? SuccessfulOrders.last_name : "")}</a></td>
                                                <td>{SuccessfulOrders.gateway_type}</td>
                                                <td>{SuccessfulOrders.order_number}</td>
                                                <td>{SuccessfulOrders.price}</td>
                                                <td>{SuccessfulOrders.coins_credited}</td>
                                                {/* <td>{<img src={pdfLogo} alt={'PDFLOGO'}></img>}</td> */}
                                            </tr>
                                        ))}
                                        </tbody>

                                    </Table>
                                    : <p style={{ textAlign: "left" }}>Please select start date and End date / No Reports</p>}
                            </Col>
                        </div>

                    </div>
                </Card>
            </Fragment>

        )

        return (
            <Fragment>
                {PaymentGateways}
            </Fragment>
        );
    }
}


const mapStateToProps = state => ({
    shows: state.showsdata.shows,
    reports: state.reportsdata.successOrderReports
});
export default connect(
    mapStateToProps, { fetchSuccessOrders }
)(PaymentGateway);
