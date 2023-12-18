import React, { Fragment, PureComponent } from "react";
import { isEmpty } from 'lodash';
import PropTypes from "prop-types";
import { PlusCircle, DownloadCloud } from "react-feather";
import { Card, CardBody, CardTitle, FormGroup, Nav, NavLink, TabContent, TabPane, Row, NavItem, Col, Input, Label, Button, Table } from "reactstrap";

import ReactHTMLTableToExcel from 'react-html-table-to-excel'
//..................
import { connect } from "react-redux";
import { fetchLiveAuction } from '../../redux/actions/reports/reportActions';
// import { fetchChannel } from '../../redux/actions/chanels/chanelAction'
// import {fetchShows} from '../../redux/actions/Shows/showsAction'
// import {fetchEpisodes} from '../../redux/actions/episode/episodeAction';
import * as moment from 'moment';
import '../auctions/createauctions/viewauctions.scss';
// import ReactHTMLTableToExcel from 'react-html-table-to-excel'
import export_icon from '../../assets/img/export.png';

class LiveAuction extends PureComponent {
    constructor(props) {
        super(props);
        this.state = {
            fromDate: "",
            toDate: ""
        }
    }
    componentDidMount() {
        //  this.props.fetchLiveAuction(this.state);
    }

    onChangeDateTime = (e) => {
        let data = new Date(e.target.value).toISOString();
        let NewDate = new Date(data);
        NewDate.setHours(NewDate.getHours() + 5, NewDate.getMinutes() + 30, 0, 0);
        this.setState({ [e.target.name]: NewDate.toISOString() })
    }
    onFilterDate = () => {
        this.props.fetchLiveAuction(this.state).then(function (response) {
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
    //     displayTime=(dateTime)=>{
    //        var time24 = moment.utc(dateTime).format("HH:mm ")
    //         var ts = time24;
    //   var H = +ts.substr(0, 2);
    //   var h = (H % 12) || 12;
    //   h = (h < 10)?("0"+h):h;  // leading 0 at the left for 1 digit hours
    //   var ampm = H < 12 ? " AM" : " PM";
    //   ts = h + ts.substr(2, 3) + ampm;
    // return ts
    // }
    render() {
        const { reports } = this.props.reports
        const errorMessage = (
            <p>There is no Auction Records.</p>
        );
        const LiveAuctions = (
            <Fragment>
                <h6>Live Auction</h6>
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
                            {reports ?
                                <Col sm="12">
                                    <Table striped id="table-to-xls">
                                        <thead>
                                            <tr>
                                                <th>Show</th>
                                                <th>Channel</th>
                                                <th>Episode number</th>
                                                <th>Episode Date</th>
                                                {/* <th>Rounds</th> */}
                                                <th>Product details</th>
                                                <th>Product Key</th>
                                                <th>Key Generation Time</th>
                                                <th>Auction Category</th>
                                                <th><ReactHTMLTableToExcel table="table-to-xls"
                                                    filename='Auction_Amount'
                                                    sheet='Auction_Amount'
                                                    buttonText={<img src={export_icon} width="24" height="24" alt="Export to excel" title="Export to excel" />} />
                                                </th>
                                            </tr>

                                        </thead>
                                        <tbody>

                                            {reports ?
                                                this.props.reports && reports.map((item, index) => {
                                                    return <tr key={index} >
                                                        <td>{item.showName ? item.showName : "--"}</td>
                                                        <td>{item.channelName ? item.channelName : "--"}</td>
                                                        <td>{item.episodeNumber ? item.episodeNumber : "--"}</td>
                                                        <td>{item.episodeDate ? item.episodeDate : "--"}</td>
                                                        {/* <td>{'--'}</td> */}
                                                        <td>{item.productName ? item.productName : "--"}</td>
                                                        <td>{item.productKey ? item.productKey : "--"}</td>
                                                        <td>{item.keyGenerationTime ? item.keyGenerationTime : "--"}</td>
                                                        <td>{item.auctionCategory ? item.auctionCategory : "--"}</td>
                                                        {/* <td>{item.auctionCategory.auctionCategory}</td> */}
                                                    </tr>
                                                }) : <p style={{ textAlign: "left" }}>Please select start date and End date.</p>}

                                        </tbody>


                                    </Table>
                                </Col>
                                : <p style={{ textAlign: "left" }}>Please select start date and End date / No Reports.</p>}
                        </div>

                    </div>
                </Card>
            </Fragment>

        )

        return (
            <Fragment>
                {isEmpty(LiveAuctions) ? errorMessage : LiveAuctions}
            </Fragment>
        );
    }
}

LiveAuction.propTypes = {
    fetchLiveAuction: PropTypes.func.isRequired,

}
//..............
const mapStateToProps = state => ({
    reports: state.reportsdata.liveAuction

});

//....................
export default connect(mapStateToProps, { fetchLiveAuction })(LiveAuction);

