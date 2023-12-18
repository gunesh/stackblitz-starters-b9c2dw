import React, { Component, Fragment } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { X } from "react-feather";
import { updateAuction } from '../../../redux/actions/auctions/auctionsActions';
import { Card, Button, CardBody, CardTitle, Label, Row, Col, Table, Input } from "reactstrap";
import { withRouter } from 'react-router-dom';
import { compose } from 'redux';
import { fetchChannel } from '../../../redux/actions/chanels/chanelAction'
import { fetchShows } from '../../../redux/actions/Shows/showsAction';
import { fetchProduct } from '../../../redux/actions/product/productAction'
import {fetchLocation} from '../../../redux/actions/location/locationActions'
import { fetchauctionsCategories } from '../../../redux/actions/auctions/auctionTypeAction';
import Select from 'react-select';
import { uploadImage } from "../../../redux/actions/imageUpload/uploadImageAction";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

class AddFreeAuction extends Component {

    constructor(props) {
        super(props);
        this.state = {
            id: this.props.freeAuctionInfo.id,
            auctionTypeId: "3",
            channelId: "",
            episodeId: this.props.freeAuctionInfo.episodeId,
            location: this.props.freeAuctionInfo.location,
            round: "",
            productId: this.props.freeAuctionInfo.product.id,
            productImage: this.props.freeAuctionInfo.product.productImage,
            auctionCode: this.props.freeAuctionInfo.auctionCode,
            auctionCategoryId: this.props.freeAuctionInfo.auctionCategoryId,
            auctionCategoryName: this.props.freeAuctionInfo.auctionsCategory.auctionCategoryName,
            status: true,
            auction_start_date: new Date(),
            auction_end_date: new Date(),
            auctionStartTime: new Date(this.props.freeAuctionInfo.auctionStartTime),
            auctionEndTime: new Date(this.props.freeAuctionInfo.auctionEndTime),
            displayStartDateTime: new Date(this.props.freeAuctionInfo.displayStartDateTime),
            displayOrder: this.props.freeAuctionInfo.order,
            updatedStartDate: '',
            updatedEndDate: '',
            updatedisplayingTime: '',
            ImgPath: ''
        }
    }


    SelectImg = (e) => {
        this.setState({ ImgPath: e.target.files[0].name })
        this.props.uploadImage(e.target.files[0]).then(
            (res) =>
                this.setState({ productImage: res.image.location[0] }))
    }

    deleteFile = () => {
        this.setState({ ImgPath: "" })
    }

    componentDidMount() {
        this.props.fetchShows();
        this.props.fetchChannel();
        this.props.fetchProduct();
        this.props.fetchauctionsCategories();
        this.props.fetchLocation()
        // let updateStart = this.state.auction_start_time.split('.', '4');
        // let updateEnd = this.state.auction_end_time.split('.', '4');
        // let updatedisplayTime = this.state.displayStartDateTime.split('.', '4')
        // this.setState({
        //     updatedStartDate: updateStart[0],
        //     updatedEndDate: updateEnd[0],
        //     updatedisplayingTime: updatedisplayTime[0]
        // })
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
        this.setState({ location: selectedOption.target.value });
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

    handleDisplayOrderChange = (evt) => {
        this.setState({ displayOrder: evt.target.value });
    }

    onChangeDateTime = (e) => {
        this.setState({
            [e.target.name]: e.target.value
        })
    }

    handleStartDateChange = date => {
        //let data = new Date();
        //  data.setHours(date.getHours() + 5, date.getMinutes() + 30, 0, 0);
        this.setState({
            auctionStartTime: date
        });
    };

    handleEndDateChange = date => {
        //let data = new Date();
        // data.setHours(date.getHours() + 5, date.getMinutes() + 30, 0, 0);
        this.setState({
            auctionEndTime: date
        });
    };

    handleDisplayStartChange = date => {
        // let data = new Date();
        // data.setHours(date.getHours() + 5, date.getMinutes() + 30, 0, 0);
        this.setState({
            displayStartDateTime: date
        });
    };

    handleSubmit = evt => {
        evt.preventDefault();
        // let singleobj = {};//this.state.auctionsrounds[0];
        // singleobj.auctionTypeId=3;//this.state.auctionTypeId;
        // singleobj.channelId =this.state.channelId;
        // singleobj.showId= this.state.showId ;
        // singleobj.episodeId= this.state.episodeId;
        // singleobj.location=this.state.location;
        // singleobj.auctionStartTime=this.state.auction_start_date;
        // singleobj.auctionEndTime=this.state.auction_end_date;
        // singleobj.auctionCode = this.state.auctionCode;
        // singleobj.auctionCategoryId = this.state.auctionCategoryId;
        // singleobj.productId= this.state.productId;
        // singleobj.displayStartDateTime = this.state.displayStartDateTime;
        // singleobj.displayOrder = this.state.displayOrder;
        let updateObj = this.state;
        updateObj.order = this.state.displayOrder;
        delete updateObj['displayOrder'];
        
        let response = this.props.updateAuction(updateObj).then(data => {
            // console.log('updateObj ===', updateObj);
            // console.log('return data from updateAuctions => ', data);
            if (data && data.status && data.status == 200) {
                alert('Auction updated successfully');
                window.location.reload();
            } else {
                alert('Something went wrong..');
                return false;
            }
        });
        console.log('[FreeAuction Info]:', this.state)
    };
    // handleSubmit=(evt)=>{
    //     evt.preventDefault();
    //     console.log('[FreeAuction Info]:',this.state)
    // }


    render() {

        // { console.log('[editFreeAuction]', this.props.freeAuctionInfo) }
        { console.log('[editFreeAuction]', this.props.language) }
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
                <form onSubmit={this.handleSubmit}>
                    <div className="creation_content">
                        <Row>
                            <Col sm="6">
                                <Row>
                                    <Col sm="5" className="text-right">
                                        <label>Product Name</label>
                                    </Col>
                                    <Col sm="6" className="text-right">
                                        <div className="form-group">
                                            <Select
                                                options={prs}
                                                placeholder={this.props.freeAuctionInfo.product.productName}
                                                label={this.state.productId ? this.state.productId : ""}
                                                onChange={this.handleProductChange}
                                                required />
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
                                        <label>Order to Display</label>
                                    </Col>
                                    {console.log("=-=-=>>>", this.state.displayOrder)}
                                    <Col sm="6" className="text-right">
                                        <div className="form-group">
                                            <select required onChange={this.handleDisplayOrderChange} className="form-control">
                                                <option value={this.state.displayOrder}>{this.state.displayOrder}</option>
                                                <option value="1">1</option>
                                                <option value="2">2</option>
                                                <option value="3">3</option>
                                                <option value="4">4</option>
                                                <option value="5">5</option>
                                                <option value="6">6</option>
                                                <option value="7">7</option>
                                                <option value="8">8</option>
                                                <option value="9">9</option>
                                                <option value="10">10</option>
                                            </select>
                                        </div>
                                    </Col>
                                </Row>
                                {/* <Row>
                                    <Col sm="5" className="text-right">
                                        <label>Episode</label>
                                    </Col>
                                    <Col sm="6" className="text-right">
                                        <div className="form-group">
                                            <select className="form-control custom_arrow" required onChange={this.handleEpisodeChange} >
                                                <option value={this.state.episodeId}>{this.state.episodeId}</option>
                                                {episode.episode.map((item, index) => (
                                                    <option value={item.id} key={'EP_TYPE' + item.id}>{item.id} ({item.episodeStartTime.slice(0, -5)})</option>
                                                ))}
                                            </select>
                                        </div>
                                    </Col>
                                </Row> */}
                                <Row>
                                    <Col sm="5" className="text-right">
                                        <label>Auction Category</label>
                                    </Col>
                                    <Col sm="6" className="text-right">
                                        <div className="form-group">
                                            <select className="form-control custom_arrow" required onChange={this.handleCategoryChange}

                                            >
                                                {auctionCats.map((item) => (
                                                    <option value={item.id} key={'AC_' + item.id} selected={this.state.auctionCategoryName == item.auctionCategoryName}>{item.auctionCategoryName}</option>
                                                ))}
                                            </select>
                                        </div>
                                    </Col>
                                </Row>


                            </Col>

                            <Col sm="6">


                                <Row>
                                    <Col sm="5" className="text-right">
                                        <label>Start Date and Time</label>
                                    </Col>
                                    <DatePicker
                                        selected={this.state.auctionStartTime}
                                        onChange={this.handleStartDateChange}
                                        showTimeSelect
                                        timeFormat="HH:mm"
                                        timeIntervals={15}
                                        timeCaption="time"
                                        dateFormat="MMMM d, yyyy h:mm aa"
                                    />
                                    {/* <Col sm="6" className="text-right">
                                        <div className="form-group">
                                            <Input type="datetime-local" defaultValue={this.state.updatedStartDate} name="auction_start_date" placeholder="Episode Date" onChange={this.onChangeDateTime} required></Input>
                                        </div>
                                    </Col> */}
                                </Row>
                                <Row>
                                    <Col sm="5" className="text-right">
                                        <label>End Date and Time</label>
                                    </Col>
                                    <DatePicker
                                        selected={this.state.auctionEndTime}
                                        onChange={this.handleEndDateChange}
                                        showTimeSelect
                                        timeFormat="HH:mm"
                                        timeIntervals={15}
                                        timeCaption="time"
                                        dateFormat="MMMM d, yyyy h:mm aa"
                                    />
                                    {/* <Col sm="6" className="text-right">
                                        <div className="form-group">
                                            <Input type="datetime-local" defaultValue={this.state.updatedEndDate} name="auction_end_date" placeholder="Episode Date" onChange={this.onChangeDateTime} required></Input>
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
                                            <Input type="datetime-local" defaultValue={this.state.updatedisplayingTime} name="displayStartDateTime" placeholder="Episode Date" onChange={this.onChangeDateTime} required></Input>
                                        </div>
                                    </Col> */}
                                </Row>
                                <Row>
                                    <Col sm="5" className="text-right">
                                        <label>&nbsp;</label>
                                    </Col>
                                    <Col sm="6" className="text-right">
                                        <div className="form-group">
                                            <input type="submit" value="Update Bid" className="btn btn-primary submit_btn1" />
                                        </div>
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
    fetchProduct: PropTypes.func.isRequired,
    updateAuction: PropTypes.func.isRequired
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
    connect(mapStateToProps, { uploadImage, updateAuction, fetchChannel, fetchShows, fetchProduct, fetchauctionsCategories,fetchLocation})
)(AddFreeAuction);