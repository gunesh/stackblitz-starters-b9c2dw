import React, { Fragment, PureComponent } from "react";
import { isEmpty } from 'lodash';
import PropTypes from "prop-types";
import { compose } from 'redux';
import { connect } from "react-redux";
import { withRouter } from 'react-router-dom';
import { fetchAuctionAmount } from '../../redux/actions/reports/reportActions';
import { Row, Card, Col, Label, Table, Button, FormGroup, Input } from "reactstrap";
import '../auctions/createauctions/viewauctions.scss';
import export_icon from '../../assets/img/export.png';
import * as moment from 'moment';
import ReactHTMLTableToExcel from 'react-html-table-to-excel'

class AuctionAmount extends PureComponent {
    constructor(props) {
        super(props);
        this.state = {
            fromDate: "",
            toDate: ""
        }
    }
    componentDidMount() {
        // this.props.fetchAuctionAmount(this.state);
    }

    onChangeDateTime = (e) => {
        let data = new Date(e.target.value).toISOString();
        let NewDate = new Date(data);
        NewDate.setHours(NewDate.getHours() + 5, NewDate.getMinutes() + 30, 0, 0);
        this.setState({ [e.target.name]: NewDate.toISOString() })
    }
    onFilterDate = () => {
        this.props.fetchAuctionAmount(this.state);
    }
    formatDisplayTime = (dateTime) => {
        return moment(dateTime).format('DD/MM/YYYY')
    }
    render() {

        const { reports } = this.props.reports
        console.log("reportsreports", reports)
        const AuctionAmounts = (
            <Fragment>
                <h6>Auction Amount</h6>
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
                                    <Table striped>
                                        <thead>
                                            <tr>
                                                <th>S.No</th>
                                                <th>Product name</th>
                                                <th>Product price</th>
                                                <th>Auction start time</th>
                                                <th>Auction end time</th>
                                                <th>Points received</th>
                                                <th>Amount collected</th>
                                                <th><ReactHTMLTableToExcel table="table-to-xls"
                                                    filename='Auction_Amount'
                                                    sheet='Auction_Amount'
                                                    buttonText={<img src={export_icon} width="24" height="24" alt="Export to excel" title="Export to excel" />} />
                                                </th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {reports.map((item, index) => (
                                                <tr key={index}>
                                                    <td>{index + 1}</td>
                                                    <td>{item.productName ? item.productName : "--"}</td>
                                                    <td>{item.productProce ? item.productProce : "--"}</td>
                                                    <td>{item.auctionStartTime ? this.formatDisplayTime(item.auctionStartTime) : "--"}</td>
                                                    <td>{item.auctionEndTime ? this.formatDisplayTime(item.auctionEndTime) : "--"}</td>
                                                    <td>{item.coinsReceived ? item.coinsReceived : "--"}</td>
                                                    <td>{item.amountCollected ? item.amountCollected : "--"}</td>
                                                </tr>
                                            ))}

                                        </tbody>
                                    </Table>
                                    : <p style={{ textAlign: "left" }}>Please select start date and End date / No Reports Found.</p>}
                            </Col>
                        </div>

                    </div>
                </Card>
            </Fragment>

        )

        return (
            <Fragment>
                {AuctionAmounts}
            </Fragment>
        );
    }
}

// export default AuctionAmount;
const mapStateToProps = state => ({
    reports: state.reportsdata.auctionAmount
});

export default compose(
    withRouter,
    connect(mapStateToProps, { fetchAuctionAmount })
)(AuctionAmount);