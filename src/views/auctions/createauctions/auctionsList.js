import React, { Fragment, Component } from "react";
import { isEmpty } from 'lodash';
import PropTypes from "prop-types";
import { Card, CardBody, CardTitle, FormGroup, Nav, NavLink, TabContent, TabPane, Row, NavItem, Col, Input, Label, Button, Table } from "reactstrap";
import { connect } from "react-redux";
import AuctionsTable from './auctionsTable';
import { fetchauctions } from '../../../redux/actions/auctions/auctionsActions';
import { fetchChannel } from '../../../redux/actions/chanels/chanelAction'
import { fetchShows } from '../../../redux/actions/Shows/showsAction'
import { fetchEpisodes } from '../../../redux/actions/episode/episodeAction';
import Pagination from "./pagination"

class AuctionsList extends Component {
    constructor(props) {

        super(props);

        this.state = {
            auctionTypeId: "1",
            showId: "",
            channelId: "",
            episodeId: "",
            loading: true,
            currentPage: 1,
            postPerPage: 30,
            auctionInfo: []
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
        const data = this.state;
        delete data.auctionInfo;
        delete data.currentPage;
        delete data.postPerPage;
        console.log(data)
        this.props.fetchauctions(data)

    }
    componentDidMount() {
        this.forceUpdate()
        this.props.fetchauctions({ "auctionTypeId": 1 })
            .then(
                (result) => {
                    this.setState({
                        loading: false,
                        auctionInfo: result.auctions
                    });
                })
        this.props.fetchChannel();
        this.props.fetchEpisodes();
        this.props.fetchShows();
    }
    paginate = (data) => {
        this.setState({ currentPage: data })

    }
    render() {

        const { auctionType, episode } = this.props
        const auctionsdata = this.props.auctions.auctions;

        const errorMessage = (
            <p>There is no Auction.</p>
        );
        const auctionList = (

            <>

                <Col sm="12">
                    <Table>
                        <thead>
                            <tr>
                                <th>#</th>
                                <th>Product</th>
                                <th>Product Name</th>
                                <th>Auction Key</th>
                                <th>Category</th>
                                <th>Product Reveal</th>
                                <th>Start Auction</th>
                                <th>Winner Reveal</th>
                                <th>Winner</th>
                                <th>Location</th>
                                <th>Show</th>
                                <th className="text-center">Total Bids</th>
                                <th>Episode</th>
                            </tr>
                        </thead>
                        <tbody>
                            {auctionsdata.map((auction, index) => <AuctionsTable auction={auction} index={index} key={index} />)}
                        </tbody>
                    </Table>
                    {/* {auctionsdata.map((auction, index) => <Pagination postPerPage={this.state.postPerPage} totalPosts={auctionsdata}/>)} */}


                </Col>
                {/* {!this.state.loading ?
                    <Pagination postPerPage={this.state.postPerPage} totalPosts={this.state.auctionInfo.length} paginate={this.paginate}/>
                    :null}
                */}
            </>
        )

        return (
            <Fragment>
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
                {isEmpty(auctionsdata) ? errorMessage : auctionList}
            </Fragment>
        );
    }
}
AuctionsList.propTypes = {
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
)(AuctionsList);
