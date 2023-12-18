import React, { Fragment, PureComponent } from "react";
import { isEmpty } from 'lodash';
import PropTypes from "prop-types";
import { Calendar, DownloadCloud } from "react-feather";
import { Row, Card, Col, Label, Table, Button, FormGroup, Input } from "reactstrap";
import { fetchFailedOrders } from '../../redux/actions/reports/reportActions';
import { connect } from "react-redux";
import '../auctions/createauctions/viewauctions.scss';
import ReactHTMLTableToExcel from 'react-html-table-to-excel'
import export_icon from '../../assets/img/export.png';
import * as moment from 'moment';


class FailedOrders extends PureComponent {

    constructor(props) {
        super(props);
        this.state = {
            fromDate: "",
            toDate: ""
        }
    }
    componentDidMount() {
        // this.props.fetchFailedOrders(this.state);
    }

    onChangeDateTime = (e) => {
        let data = new Date(e.target.value).toISOString();
        let NewDate = new Date(data);
        NewDate.setHours(NewDate.getHours() + 5, NewDate.getMinutes() + 30, 0, 0);
        this.setState({ [e.target.name]: NewDate.toISOString() })
    }
    onFilterDate = () => {
        this.props.fetchFailedOrders(this.state).then(function (response) {
            if (response.status === 200) {
                alert(response.message)
            }
        }).catch(function (error) {
            console.log(error);
        });

    }
    formatDisplayTime = (dateTime) => {
        return moment(dateTime).format('DD/MM/YYYY')
    }
    render() {
        const { reports } = this.props.reports
        const FailedOrderss = (
            <Fragment>
                <h6>Failed Orders</h6>
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
                                    <Table striped id="table-to-xls">
                                        <thead>
                                            <tr>
                                                <th>S.No</th>
                                                <th>Payment gateway</th>
                                                <th>Transaction failure Date</th>
                                                <th>Amount</th>
                                                <th>User name</th>
                                                <th><ReactHTMLTableToExcel table="table-to-xls"
                                                    filename='Failed_Order'
                                                    sheet='Failed_Order'
                                                    buttonText={<img src={export_icon} width="24" height="24" alt="Export to excel" title="Export to excel" />} />
                                                </th>
                                            </tr>
                                        </thead>
                                        <tbody>{this.props.reports && reports.map((failReports, index) => (
                                            <tr key={index}>
                                                <td>{index + 1}</td>
                                                <td>{failReports.gateway_type}</td>
                                                <td>{this.formatDisplayTime(failReports.created_at)}</td>
                                                <td>{failReports.price}</td>
                                                <td><a href={`/#/customersUserprofile/${failReports.user_id}`}>
                                                    {(failReports.first_name ? failReports.first_name : "") + " " + (failReports.last_name ? failReports.last_name : "")}</a>
                                                </td>
                                                <td>&nbsp;</td>
                                            </tr>
                                        ))}
                                        </tbody>
                                    </Table>
                                    : <p style={{ textAlign: "left" }}>Please select start date and End date / No Reports.</p>}
                            </Col>
                        </div>

                    </div>
                </Card>
            </Fragment>

        )

        return (
            <Fragment>
                {FailedOrderss}
            </Fragment>
        );
    }
}
const mapStateToProps = state => ({
    shows: state.showsdata.shows,
    reports: state.reportsdata.failOrderReports
});
export default connect(
    mapStateToProps, { fetchFailedOrders }
)(FailedOrders);
