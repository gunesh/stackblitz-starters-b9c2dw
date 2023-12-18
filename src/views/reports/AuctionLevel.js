import React, { Fragment, PureComponent } from "react";
import { isEmpty } from 'lodash';
import PropTypes from "prop-types";
import { PlusCircle, DownloadCloud } from "react-feather";
import { Row, Card, Col, Label, Table, Button, FormGroup, Input } from "reactstrap";
import ReactHTMLTableToExcel from 'react-html-table-to-excel'
import '../auctions/createauctions/viewauctions.scss';
import { connect } from "react-redux";
import { fetchAuctionLevelReport } from '../../redux/actions/reports/reportActions';
import { fetchAuctionLevelReportDownload } from '../../redux/actions/reports/reportActions';


import export_icon from '../../assets/img/export.png';


class AuctionLevel extends PureComponent {
    constructor(props) {

        super(props);

        this.state = {

        }
    }
    componentDidMount() {
        this.props.fetchAuctionLevelReport();
    }
    OnclickAuctionDetail(id) {
        this.props.fetchAuctionLevelReportDownload(id)
    }

    render() {
        const { reports } = this.props.reports;
        const AuctionLevels = (
            <Fragment>
                <h6>Auction Level</h6>
                <Card>
                    <div>
                        <div className="auctionlist_content">
                            <Col sm="12">
                                <Table striped id="table-to-xls">
                                    <thead>
                                        <tr>
                                            <th>#</th>
                                            <th>Auction Id</th>
                                            <th>Product Name</th>
                                            <th>Max Bid</th>
                                            <th>Min Bid</th>
                                            <th>Won Bid id</th>
                                            <th>Won Bid Amount</th>
                                            <th>Auction Detail</th>
                                            <th><ReactHTMLTableToExcel table="table-to-xls"
                                                filename='Auction_Level'
                                                sheet='Auction_Level'
                                                buttonText={<img src={export_icon} width="24" height="24" alt="Export to excel" title="Export to excel" />} />
                                            </th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {reports ? reports.map((report, index) => (
                                            <tr key={index}>
                                                <td>{index + 1}</td>
                                                <td>{report.auction_id}</td>
                                                <td>{report.product_name}</td>
                                                <td>{report.max_bid}</td>
                                                <td>{report.min_bid}</td>
                                                <td>{report.won_bid_id}</td>
                                                <td>{report.won_bid_amount}</td>
                                                <td><button onClick={() => this.OnclickAuctionDetail(report.auction_id)}>Auction Detail</button></td>
                                                <td>&nbsp;</td>
                                            </tr>
                                        )) : <p style={{ textAlign: "center" }}>No reports found.</p>}
                                    </tbody>
                                </Table>
                            </Col>
                        </div>

                    </div>
                </Card>
            </Fragment>

        )

        return (
            <Fragment>
                {AuctionLevels}
            </Fragment>
        );
    }
}

const mapStateToProps = state => ({
    reports: state.reportsdata.AuctionLevelReports
});

export default connect(
    mapStateToProps, { fetchAuctionLevelReport, fetchAuctionLevelReportDownload }
)(AuctionLevel);