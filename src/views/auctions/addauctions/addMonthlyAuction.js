import React, { Component, Fragment } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { saveAuctions } from '../../../redux/actions/auctions/auctionsActions';
import { Card, Button, CardBody, CardTitle, Row, Col, Table, Input } from "reactstrap";
import { withRouter } from 'react-router-dom';
import { compose } from 'redux';
import { fetchChannel } from '../../../redux/actions/chanels/chanelAction'
import { fetchShows } from '../../../redux/actions/Shows/showsAction';
import { fetchProduct } from '../../../redux/actions/product/productAction';
import { fetchauctionsCategories } from '../../../redux/actions/auctions/auctionTypeAction';
import {fetchLocation} from '../../../redux/actions/location/locationActions'
import Select from 'react-select';
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

class AddMonthlyAuction extends Component {

    constructor(props) {
        super(props);
        this.state = {
            auctionTypeId: "",
            showId: "",
            channelId: "",
            episodeId: "",
            location: "",
            round: "",
            productId: "",
            auctionCategoryId: "",
            status: true,
            auction_start_date: new Date(),
            auction_end_date: new Date(),
            auction_start_time: '',
            auction_end_time: '',
            auctionBidFee: ""
        }


    }

    componentDidMount() {
        this.props.fetchShows();
        this.props.fetchChannel();
        this.props.fetchProduct();
        this.props.fetchauctionsCategories();
        this.props.fetchLocation()

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
    handleLocationChange = selectedOption => {
        this.setState({ location: selectedOption.target.value == "India"?"":selectedOption.target.value });
    };


    handleKeyChange = evt => {



        this.setState({ auctionCode: evt.target.value });
    };
    handleProductChange = evt => {
        this.setState({ productId: evt.value });
    };
    handleCategoryChange = evt => {
        let obj = JSON.parse(evt.target.value);
        console.log(obj)
        this.setState({ auctionCategoryId: obj.id });
        this.setState({ auctionBidFee: obj.bidPoints });
    };
    handleBidFeeChange = evt => {
        this.setState({ auctionBidFee: evt.target.value });
    };

    handleRemoveShareholder = idx => () => {
        this.setState({
            auctionsrounds: this.state.auctionsrounds.filter((s, sidx) => idx !== sidx)
        });
    };

    onChangeDateTime = (e) => {
        let data = new Date(e.target.value.replace('T', ' ').replace('-', '/'));
        data.setHours(data.getHours() + 5, data.getMinutes() + 30, 0, 0);
        console.log('hey', data)
        this.setState({ [e.target.name]: data })
    }
    handleStartDateChange = date => {

        this.setState({
            auction_start_date: date
        });
    };
    handleEndDateChange = date => {
        this.setState({
            auction_end_date: date
        });
    };

    handleSubmit = evt => {
        evt.preventDefault();

        let singleobj = {};
        singleobj.auctionTypeId = 5;
        singleobj.channelId = this.state.channelId;
        singleobj.showId = this.state.showId;
        singleobj.auctionBidFee = this.state.auctionBidFee;
        singleobj.episodeId = this.state.episodeId;
        singleobj.location = this.state.location;
        singleobj.auctionStartTime = this.state.auction_start_date;
        singleobj.auctionEndTime = this.state.auction_end_date;
        singleobj.auctionCategoryId = this.state.auctionCategoryId;
        singleobj.productId = this.state.productId;
        singleobj.status = this.state.status;



        let response = this.props.saveAuctions([singleobj])
            .then(data => {
                if (data && data.status && data.status == 201) {
                    alert('Auction Added Successfully');
                    window.location.reload();

                } else {
                    alert('Something went wrong..');
                    return false;
                }
            });

    };

    render() {
        const { chanels, shows, auctionType, episode, product,location} = this.props;
        let auctionCats = auctionType.auctionsCategories;
        let prs = [];
        product.products.map((item, index) => (
            prs.push({ 'label': item.productName, 'value': item.id })
        ));
        let auctionCat = [];
        auctionCats.map((item, index) => (
            auctionCat.push({ 'label': item.auctionCategoryName, 'value': item.id })
        ));
        return (
            <Fragment>
                <form
                    onSubmit={this.handleSubmit}
                >
                    <div className="creation_content">
                        <Row>
                            <Col sm="6">
                                <Row>
                                    <Col sm="5" className="text-right">
                                        <label>Channel</label>
                                    </Col>
                                    <Col sm="6" className="text-right">
                                        <div className="form-group">
                                            <select className="form-control custom_arrow" required onChange={this.handleChannelChange} >
                                                <option value="">Select chanel</option>
                                                {chanels.chanels.map((item, index) => (
                                                    <option value={item.id} key={'CH_TYPE' + item.id}>{item.channelName}</option>
                                                ))}
                                            </select>
                                        </div>
                                    </Col>
                                </Row>
                                <Row>
                                    <Col sm="5" className="text-right">
                                        <label>Show</label>
                                    </Col>
                                    <Col sm="6" className="text-right">
                                        <div className="form-group">
                                            <select className="form-control custom_arrow" required onChange={this.handleShowChange} >
                                                <option value="">Select show</option>
                                                {shows.shows.map((item, index) => (
                                                    <option value={item.id} key={'SH_TYPE' + item.id}>{item.showName}</option>
                                                ))}
                                            </select>
                                        </div>
                                    </Col>
                                </Row>
                                <Row>
                                    <Col sm="5" className="text-right">
                                        <label>Product Name</label>
                                    </Col>
                                    <Col sm="6" className="text-right">
                                        <div className="form-group">
                                            <Select options={prs} onChange={this.handleProductChange} required />
                                        </div>
                                    </Col>
                                </Row>
                                <Row>
                                    <Col sm="5" className="text-right">
                                        <label>Auction Category</label>
                                    </Col>
                                    <Col sm="6" className="text-right">
                                        <div className="form-group">
                                            <select className="form-control custom_arrow" required onChange={this.handleCategoryChange}>
                                                <option> Auction Category</option>
                                                {auctionCats.map((item) => (
                                                    <option value={JSON.stringify(item)} key={'AC_' + item.id}>{item.auctionCategoryName}</option>
                                                ))}
                                            </select>
                                        </div>
                                    </Col>
                                </Row>
                                <Row>
                                    <Col sm="5" className="text-right">
                                        <label>Bid Fee</label>
                                    </Col>
                                    <Col sm="6" className="text-right">
                                        <div className="form-group">
                                            <Input type="text" name="bid_fee" value={this.state.auctionBidFee} placeholder="Bid Fee" onChange={this.handleBidFeeChange} required></Input>
                                        </div>
                                    </Col>
                                </Row>
                            </Col>

                            <Col sm="6">
                                <Row>
                                    <Col sm="5" className="text-right">
                                        <label>Episode</label>
                                    </Col>
                                    <Col sm="6" className="text-right">
                                        <div className="form-group">
                                            <select className="form-control custom_arrow" required onChange={this.handleEpisodeChange} >
                                                <option value="">Episode</option>
                                                {episode.episode.map((item, index) => (
                                                    <option value={item.id} key={'EP_TYPE' + item.id}>{item.id} ({item.episodeStartTime.slice(0, -5)})</option>
                                                ))}
                                            </select>
                                        </div>
                                    </Col>
                                </Row>
                                <Row>
                                    <Col sm="5" className="text-right">
                                        <label>Location</label>
                                    </Col>
                                    <Col sm="6" className="text-right">
                                        <div className="form-group">
                                            <select className="form-control custom_arrow" onChange={this.handleLocationChange} >
                                            <option value="">All</option>
                                                         {
                                                             location.map((item)=>{
                                                                return <option value={item.state}>{item.state}</option>
                                                             })
                                                         }
                                            </select>
                                        </div>
                                    </Col>
                                </Row>
                                <Row>
                                    <Col sm="5" className="text-right">
                                        <label>Start Date and Time</label>
                                    </Col>
                                    <DatePicker
                                        selected={this.state.auction_start_date}
                                        onChange={this.handleStartDateChange}
                                        showTimeSelect
                                        timeFormat="HH:mm"
                                        timeIntervals={15}
                                        timeCaption="time"
                                        dateFormat="MMMM d, yyyy h:mm aa"
                                    />
                                </Row>
                                <Row>
                                    <Col sm="5" className="text-right">
                                        <label>End Date and Time</label>
                                    </Col>
                                    <DatePicker
                                        selected={this.state.auction_end_date}
                                        onChange={this.handleEndDateChange}
                                        showTimeSelect
                                        timeFormat="HH:mm"
                                        timeIntervals={15}
                                        timeCaption="time"
                                        dateFormat="MMMM d, yyyy h:mm aa"
                                    />
                                </Row>
                                <Row>
                                    <Col sm="5" className="text-right">
                                        <label>&nbsp;</label>
                                    </Col>
                                    <Col sm="6" className="text-right">
                                        <div className="form-group">
                                            &nbsp;
                                        </div>
                                    </Col>
                                </Row>
                                <Row className="marB0">
                                    <Col sm="5"></Col>
                                    <Col sm="6" className="text-right">
                                        <button sm="6" className="text-right"
                                            className="btn btn-primary submit_btn1"
                                        >Submit
                                    </button>
                                    </Col>
                                </Row>
                            </Col>
                        </Row>
                    </div>
                </form>
            </Fragment>
        );
    }
}
AddMonthlyAuction.propTypes = {
    auctions: PropTypes.object.isRequired,
    chanels: PropTypes.object.isRequired,
    shows: PropTypes.object.isRequired,
    fetchChannel: PropTypes.func.isRequired,
    fetchShows: PropTypes.func.isRequired,
    fetchProduct: PropTypes.func.isRequired
}

const mapStateToProps = state => ({
    auctions: state.auctionsdata.auctions,
    chanels: state.chaneldata.chanels,
    shows: state.showsdata.shows,
    auctionType: state.auctionsdata.auctionType,
    episode: state.episodedata.episode,
    product: state.productdata.product,
    auctionCategories: state.auctionsdata.auctionType.auctionCategories,
    location:state.locationdata.location.location
});

export default compose(
    withRouter,
    connect(mapStateToProps, { saveAuctions, fetchChannel, fetchShows, fetchProduct, fetchauctionsCategories,fetchLocation})
)(AddMonthlyAuction);