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

class AddFreeAuction extends Component {

    constructor(props) {
        super(props);
        this.state = {
            auctionTypeId: "",
            showId: null,
            channelId: null,
            episodeId: null,
            location: "",
            round: "",
            productId: "",
            auctionCode: String(Math.floor(1000 + Math.random() * 9000)),
            auctionCategoryId: "",
            auction_start_date: new Date(),
            auction_end_date: new Date(),
            auction_start_time: '',
            auction_end_time: '',
            status: true,
            displayStartDateTime: new Date(),
            displayOrder: 0
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
        this.setState({ location: selectedOption.target.value=="India"? "" :selectedOption.target.value });
    };


    handleKeyChange = evt => {



        this.setState({ auctionCode: evt.target.value });
    };
    handleProductChange = evt => {
        // const newAuctionProducts = this.state.auctionsrounds.map((shareholder, sidx) => {
        //     if (idx !== sidx) return shareholder;
        //     return { ...shareholder, productId:value.value };
        // });

        this.setState({ productId: evt.value });
    };
    handleCategoryChange = evt => {
        this.setState({ auctionCategoryId: evt.target.value });
    };


    handleRemoveShareholder = idx => () => {
        this.setState({
            auctionsrounds: this.state.auctionsrounds.filter((s, sidx) => idx !== sidx)
        });
    };
    // handleStartDateChange = moment=>{              
    //    this.setState({auction_start_date:moment.toDate().toISOString()});
    // }
    // handleEndDateChange = (moment)=>{
    //     this.setState({auction_end_date:moment.toDate().toISOString()});
    //  }
    //  handledisplayStartDateTime = (moment)=>{
    //     this.setState({displayStartDateTime:moment.toDate().toISOString()});
    //  }

    handleDisplayOrderChange = (evt) => {
        this.setState({ displayOrder: evt.target.value });
    }
    onChangeDateTime = (e) => {
        let data = new Date(e.target.value.replace('T', ' ').replace('-', '/'));
        data.setHours(data.getHours() + 5, data.getMinutes() + 30, 0, 0);
        this.setState({ [e.target.name]: data })
    }
    handleStartDateChange = date => {
        // let data = new Date();
        // data.setHours(date.getHours() + 5, date.getMinutes() + 30, 0, 0);
        this.setState({
            auction_start_date: date
        });
    };
    handleEndDateChange = date => {
        // let data = new Date();
        // data.setHours(date.getHours() + 5, date.getMinutes() + 30, 0, 0);
        this.setState({
            auction_end_date: date
        });
    };
    handleDisplayStartChange = date => {
        // let data = new Date();
        //  data.setHours(date.getHours() + 5, date.getMinutes() + 30, 0, 0);
        this.setState({
            displayStartDateTime: date
        });
    };
    handleSubmit = evt => {
        evt.preventDefault();

        let singleobj = {};//this.state.auctionsrounds[0];
        singleobj.auctionTypeId = 3;//this.state.auctionTypeId;
        singleobj.channelId = this.state.channelId;
        singleobj.showId = this.state.showId;
        singleobj.episodeId = this.state.episodeId;
        singleobj.location = this.state.location;
        singleobj.auctionStartTime = this.state.auction_start_date;
        singleobj.auctionEndTime = this.state.auction_end_date;
        singleobj.auctionCode = this.state.auctionCode;
        singleobj.auctionCategoryId = this.state.auctionCategoryId;
        singleobj.productId = this.state.productId;
        singleobj.displayStartDateTime = this.state.displayStartDateTime;
        singleobj.displayOrder = this.state.displayOrder;
        singleobj.status = this.state.status;
        console.log(singleobj);
        let response = this.props.saveAuctions([singleobj]).then(data => {
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
        const { chanels, shows, auctionType, episode, product,location } = this.props;
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
                <form onSubmit={this.handleSubmit}
                >
                    <div className="creation_content">
                        <Row>
                            <Col sm="6">
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
                                                    <option value={item.id} key={'AC_' + item.id}>{item.auctionCategoryName}</option>
                                                ))}
                                            </select>
                                        </div>
                                    </Col>
                                </Row>
                                <Row>
                                    <Col sm="5" className="text-right">
                                        <label>Order to Display</label>
                                    </Col>
                                    <Col sm="6" className="text-right">
                                        <div className="form-group">
                                            <select required onChange={this.handleDisplayOrderChange} className="form-control">
                                                <option ></option>
                                                <option value="0">1</option>
                                                <option value="1">2</option>
                                                <option value="2">3</option>
                                                <option value="3">4</option>
                                                <option value="4">5</option>
                                                <option value="5">6</option>
                                                <option value="6">7</option>
                                                <option value="7">8</option>
                                                <option value="8">9</option>
                                                <option value="9">10</option>
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
                            </Col>

                            <Col sm="6">
                                {/* <Row>
                                    <Col sm="5" className="text-right">
                                        <label>Episode</label>
                                    </Col>
                                    <Col sm="6" className="text-right">
                                        <div className="form-group">                                
                                            <select className="form-control custom_arrow"  onChange={this.handleEpisodeChange} >
                                                <option value="">Episode</option>
                                            {episode.episode.map((item,index)=>( 
                                                <option value={item.id}  key={'EP_TYPE'+item.id}>{item.id} ({item.episodeStartTime.slice(0,-5)})</option>
                                                    ))}
                                            </select>
                                        </div>
                                    </Col>
                                </Row> */}

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
                                    {/* <Col sm="6" className="text-right">
                                        <div className="form-group">                                
                                            <Input type="datetime-local" name="auction_start_date" placeholder="Episode Date" onChange={this.onChangeDateTime} required></Input>
                                        </div>
                                    </Col> */}
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
                                    {/* <Col sm="6" className="text-right">
                                        <div className="form-group">                                
                                          <Input type="datetime-local" name="auction_end_date" placeholder="Episode Date" onChange={this.onChangeDateTime} required></Input>
                                        </div>
                                    </Col> */}
                                </Row>
                                <Row>
                                    <Col sm="5" className="text-right">
                                        <label>Display Start Date and Time</label>
                                    </Col>
                                    <DatePicker
                                        selected={this.state.displayStartDateTime}
                                        onChange={this.handleDisplayStartChange}
                                        showTimeSelect
                                        timeFormat="HH:mm"
                                        timeIntervals={15}
                                        timeCaption="time"
                                        dateFormat="MMMM d, yyyy h:mm aa"
                                    />
                                    {/* <Col sm="6" className="text-right">
                                        <div className="form-group">                                
                                            <Input type="datetime-local" name="displayStartDateTime" placeholder="Episode Date" onChange={this.onChangeDateTime} required></Input>
                                        </div>
                                    </Col> */}
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
AddFreeAuction.propTypes = {
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
)(AddFreeAuction);