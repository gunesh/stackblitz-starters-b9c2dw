import React, { Fragment, Component } from "react";
import { isEmpty } from 'lodash';
import PropTypes from "prop-types";
import { Card, CardBody, CardTitle, FormGroup, Nav, NavLink, TabContent, TabPane, Row, NavItem, Col, Input, Label, Button, Table } from "reactstrap";
import { connect } from "react-redux";
import PaidAuctionsTable from './paidAuctionsTable';
import FreeAuctionsTable from './FreeAuctionsTable';
import { fetchauctions } from '../../../redux/actions/auctions/auctionsActions';
import { fetchChannel } from '../../../redux/actions/chanels/chanelAction'
import { fetchShows } from '../../../redux/actions/Shows/showsAction'
import { fetchEpisodes } from '../../../redux/actions/episode/episodeAction';
import Pagination from "./pagination"

class FreeAuctionsList extends Component {
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
        this.props.freeAuctionInfo(data)
    }
    componentDidMount() {
        this.props.fetchauctions({ "auctionTypeId": 3 })
            .then(
                (result) => {
                    this.setState({
                        loading: false
                    });
                });
        this.props.fetchChannel();
        this.props.fetchEpisodes();
        this.props.fetchShows();
    }
    render() {
        // console.log(this.props)
        const { auctionType, episode } = this.props
        const auctionsdata = this.props.auctions.auctions;
        const indexOfLastPost = this.state.currentPage + this.state.postPerPage
        const indexOfFirstPost = indexOfLastPost - this.state.postPerPage
        const curreAuctionData = auctionsdata.slice(indexOfFirstPost, indexOfLastPost)
        const errorMessage = (
            <p>There are no Auctions.</p>
        );
        const usersList = (


            <>

                <Col sm="12">
                    <Table>
                        <thead>
                            <tr>
                                <th>#</th>
                                <th>Product</th>
                                <th>Product Name</th>
                                <th>Location</th>
                                {/* <th>Show</th>
                                <th>Episode</th>
                                <th>Auction Key</th> */}
                                <th>Category</th>
                                <th>Winner</th>
                                <th>Display Start Time / Start Time
                                / End Time</th>
                                <th className="text-center">Total Bids</th>
                                {/* <th>Edit</th> */}
                            </tr>
                        </thead>
                        <tbody>
                            {auctionsdata.map((auction, index) => <FreeAuctionsTable auction={auction} index={index} key={index} freePaidAuctionInfo={this.editInfo} />)}
                        </tbody>
                    </Table>
                </Col>

            </>
        )

        return (
            <Fragment>
                {isEmpty(this.props.auctions) ? errorMessage : usersList}
            </Fragment>
        );
    }
}
FreeAuctionsList.propTypes = {
    // auctions: PropTypes.object.isRequired,
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
)(FreeAuctionsList);
