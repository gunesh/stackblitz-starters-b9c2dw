import React, { Fragment, PureComponent } from "react";
import { isEmpty } from 'lodash';
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { Calendar, DownloadCloud } from "react-feather";
import { Row, Card, Col, Label, Table, FormGroup, Input, Button } from "reactstrap";
import ReactHTMLTableToExcel from 'react-html-table-to-excel'
import '../auctions/createauctions/viewauctions.scss';
import { fetchEpisodes } from '../../redux/actions/episode/episodeAction';
import { fetchShows } from '../../redux/actions/Shows/showsAction';
import { fetchEpisodeLevel } from '../../redux/actions/reports/reportActions';
import * as moment from 'moment';
import { CSVLink, CSVDownload } from "react-csv";


import export_icon from '../../assets/img/export.png';


class EpisodeShowlevel extends PureComponent {
    constructor(props) {

        super(props);

        this.state = {
            showId: "",
            episodeIds: ""
        }
    }
    handleShowChange = evt => {
        this.setState({ showId: evt.target.value });
    };
    handleEpisodeChange = evt => {
        this.setState({ episodeIds: evt.target.value });
    };
    componentDidMount() {
        this.props.fetchEpisodes();
        this.props.fetchShows();
    }
    formatDisplayTime = (dateTime) => {
        return moment(dateTime).format('DD/MM/YYYY')
    }
    handleSubmit = () => {

        Object.keys(this.state).forEach(k => (!this.state[k] && this.state[k] !== undefined) && delete this.state[k]);
        const data = this.state;
        this.props.fetchEpisodeLevel(data)

    }
    render() {
        const { reports } = this.props.reports
        const EpisodeShowlevels = (
            <Fragment>
                <h6>Episode Show Level</h6>
                <Card>
                    <div>
                        <Row>
                            <Col sm="12">
                                <div className="aucionlist_filters">
                                    <Row>
                                        <Col sm="2">
                                            <Label for="exampleSelect">Show</Label>
                                            <div className="form-group">
                                                <select className="form-control custom_arrow" required onChange={this.handleShowChange} >                                            <option disabled selected value="">Select Show</option>
                                                    {this.props.shows.shows.map((item, index) => (
                                                        <option value={item.id} key={'SH_TYPE' + item.id}>{item.showName}</option>
                                                    ))}
                                                </select>
                                            </div>
                                        </Col>
                                        <Col sm="2">
                                            <Label for="exampleSelect">Episode Number</Label>
                                            <div className="form-group">
                                                <select className="form-control custom_arrow" required onChange={this.handleEpisodeChange} >
                                                    <option selected disabled value="">Select Episode</option>
                                                    {this.props.episode.episode.map((item, index) => (
                                                        <option value={item.id} key={'EP_TYPE' + item.id}>{item.id}</option>
                                                    ))}
                                                </select>
                                            </div>
                                        </Col>
                                        <Col sm="2">
                                            <div>&nbsp;</div>
                                            <Button color="primary" onClick={this.handleSubmit}>Submit</Button>
                                        </Col>
                                    </Row>
                                </div>
                            </Col>
                        </Row>
                        <div className="auctionlist_content">
                            <Col sm="12">
                                <Table striped id="table-to-xls">
                                    <thead>
                                        <tr>
                                            <th>#</th>
                                            <th>Channel Name</th>
                                            <th>Episode number</th>
                                            <th>Episode Date</th>
                                            <th>Product name</th>
                                            <th>Item ID</th>
                                            <th>Price</th>
                                            <th>Total Bids</th>
                                            <th>Bid winner</th>
                                            <th>Bid value</th>
                                            <th>Episode bids</th>
                                            <th>Show bids</th>
                                            <th><ReactHTMLTableToExcel table="table-to-xls"
                                                filename='Episode_Level'
                                                sheet='Episode_Level'
                                                buttonText={<img src={export_icon} width="24" height="24" alt="Export to excel" title="Export to excel" />} />
                                            </th>
                                        </tr>
                                    </thead>
                                    <tbody>{reports ? reports.map((report, index) => (
                                        <tr key={index}>
                                            <td>{index + 1}</td>
                                            <td>{report.channelName}</td>
                                            <td>{report.episodeId}</td>
                                            <td>{report.episodeDate}</td>
                                            <td>{report.productName}</td>
                                            <td>{report.itemNumber}</td>
                                            <td>{report.productPrice}</td>

                                            <td>{report.totalBids}</td>
                                            <td>{report.bidWinnerName}</td>
                                            <td>{report.bidValue}</td>
                                            <td>{report.totalBidsInEpisode}</td>
                                            <td>{report.totalBidsInShow}</td>
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
                {EpisodeShowlevels}
            </Fragment>
        );
    }
}
const mapStateToProps = state => ({
    shows: state.showsdata.shows,
    episode: state.episodedata.episode,
    reports: state.reportsdata.EpisodeLevelReports
});

export default connect(
    mapStateToProps, { fetchShows, fetchEpisodeLevel, fetchEpisodes }
)(EpisodeShowlevel);