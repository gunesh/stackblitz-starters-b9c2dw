import React, { Fragment, Component } from "react";
import { isEmpty } from 'lodash';
import PropTypes from "prop-types";
import { Card, CardBody, CardTitle, FormGroup, Nav, NavLink, TabContent, TabPane, Row, NavItem, Col, Input, Label, Button, Table } from "reactstrap";
import { connect } from "react-redux";
import WeeklyAuctionsTable from './weeklyAuctionsTable';
import MonthlyAuctionsTable from './MonthlyAuctionsTable';
import { fetchauctions } from '../../../redux/actions/auctions/auctionsActions';
import { fetchChannel } from '../../../redux/actions/chanels/chanelAction'
import { fetchShows } from '../../../redux/actions/Shows/showsAction'
import { fetchEpisodes } from '../../../redux/actions/episode/episodeAction';
import Pagination from "./pagination"

class MonthlyAuctionsList extends Component {
    constructor(props) {

        super(props);

        this.state = {
            auctionTypeId: "",
            showId: "",
            channelId: "",
            episodeId: "",
            loading: true,
            currentPage: 1,
            postPerPage: 30,
        }
    }
    handleActionTypeChange = evt => {
        this.setState({ auctionTypeId: evt.target.value });
    };
    handleChannelChange = evt => {
        this.setState({ channelId: evt.target.value });
    };
    handleShowChange = evt => {
        this.setState({ showId: evt.target.value });
    };
    handleEpisodeChange = evt => {
        this.setState({ episodeId: evt.target.value });
    };

    handleSubmit = () => {

        Object.keys(this.state).forEach(k => (!this.state[k] && this.state[k] !== undefined) && delete this.state[k]);
        const data = {
            auctionTypeId: this.state.auctionTypeId,
            showId: this.state.showId,
            channelId: this.state.channelId,
            episodeId: this.state.episodeId,
        }
        this.props.fetchauctions(data)

    }
    editInfo = (data) => {
        console.log(">>>>data", data)
        this.props.MonthlyAuctionInfo(data)
    }

    componentDidMount() {

        this.props.fetchauctions({ "auctionTypeId": 5 })
            .then(
                (result) => {
                    this.setState({
                        loading: false
                    });
                });
        this.props.fetchChannel();
        this.props.fetchEpisodes();
        this.props.fetchShows();
        this.forceUpdate();
    }
    render() {
        // console.log(this.props)
        const { auctionType, episode } = this.props
        const auctionsdata = this.props.auctions.auctions;
        const indexOfLastPost = this.state.currentPage + this.state.postPerPage
        const indexOfFirstPost = indexOfLastPost - this.state.postPerPage
        const curreAuctionData = auctionsdata.slice(indexOfFirstPost, indexOfLastPost)
        const errorMessage = (
            <p>There are no users.</p>
        );
        const usersList = (
            <>
                <Row>
                    <Col sm="12">
                        <div className="aucionlist_filters">
                            <Row>
                                {/* <Col sm="2">
                                    <FormGroup>
                                        <Label for="exampleSelect">AUCTION TYPE</Label>
                                        <Input type="select" className="custom_arrow" required onChange={this.handleActionTypeChange}>
                                            <option value="">Select Auction type</option>
                            {auctionType.auctionType.map((item,index)=>( 
                                <option value={item.id} key={'AU_TYPE'+item.id}>{item.auctionType}</option>
                                    ))}
                                        </Input>
                                    </FormGroup>
                                </Col> */}
                                <Col sm="2">
                                    <FormGroup>
                                        <Label for="exampleSelect">CHANNEL</Label>
                                        <Input type="select" className="custom_arrow" required onChange={this.handleChannelChange} >
                                            <option value="">Select Channel</option>
                                            {this.props.chanels.chanels.map((item, index) => (
                                                <option value={item.id} key={'CH_TYPE' + item.id}>{item.channelName}</option>
                                            ))}
                                        </Input>
                                    </FormGroup>
                                </Col>
                                <Col sm="2">
                                    <FormGroup>
                                        <Label for="exampleSelect">SHOW</Label>
                                        <Input type="select" className="custom_arrow" required onChange={this.handleShowChange}>
                                            <option value="">Select Show</option>
                                            {this.props.shows.shows.map((item, index) => (
                                                <option value={item.id} key={'SH_TYPE' + item.id}>{item.showName}</option>
                                            ))}
                                        </Input>
                                    </FormGroup>
                                </Col>
                                <Col sm="2">
                                    <FormGroup>
                                        <Label for="exampleSelect">EPISODE</Label>
                                        <Input type="select" className="custom_arrow" required onChange={this.handleEpisodeChange}>
                                            <option value="">Select Episode</option>
                                            {episode.episode.map((item, index) => (
                                                <option value={item.id} key={'EP_TYPE' + item.id}>{item.id}</option>
                                            ))}
                                        </Input>
                                    </FormGroup>
                                </Col>
                                <Col sm="2">
                                    <div>&nbsp;</div>
                                    <Button color="primary" onClick={this.handleSubmit}>Submit</Button>
                                </Col>
                            </Row>
                        </div>
                    </Col>
                </Row>

                <Col sm="12">
                    <Table>
                        <thead>
                            <tr>
                                <th>#</th>
                                <th>Product</th>
                                <th>Product Name</th>
                                <th>Location</th>
                                <th>Show</th>
                                <th>Episode</th>
                                <th>Category</th>
                                <th>Winners Reveal</th>
                                <th>Winner</th>
                                <th>Start Time/ End Time</th>
                                <th className="text-center">Total Bids</th>
                                <th>Actions</th>

                            </tr>
                        </thead>
                        <tbody>
                            {auctionsdata.map((auction, index) => <MonthlyAuctionsTable auction={auction} index={index} key={index} monthlyWeeklyAuctionInfo={this.editInfo} />)}
                        </tbody>
                    </Table>
                </Col>
                {/* {!this.state.loading && (this.state.auctionsdata.length>this.state.postPerPage)?
                    <Pagination postPerPage={this.state.postPerPage} totalPosts={this.state.auctionsdata.length} paginate={this.paginate}/>
                    :null} */}
            </>
        )

        return (
            <Fragment>
                {isEmpty(this.props.auctions) ? errorMessage : usersList}
            </Fragment>
        );
    }
}
MonthlyAuctionsList.propTypes = {
    auctions: PropTypes.object.isRequired,
    chanels: PropTypes.object.isRequired,
    shows: PropTypes.object.isRequired,
    fetchauctions: PropTypes.func.isRequired,
    fetchChannel: PropTypes.func.isRequired,
    fetchShows: PropTypes.func.isRequired,
    fetchEpisodes: PropTypes.func.isRequired,

}

const mapStateToProps = state => ({
    auctions: state.auctionsdata.auctions,
    auctionType: state.auctionsdata.auctionType,
    chanels: state.chaneldata.chanels,
    shows: state.showsdata.shows,
    episode: state.episodedata.episode
});

// export default Users;

export default connect(
    mapStateToProps, { fetchauctions, fetchChannel, fetchShows, fetchEpisodes }
)(MonthlyAuctionsList);
