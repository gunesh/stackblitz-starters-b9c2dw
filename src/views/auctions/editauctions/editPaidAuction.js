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

class AddPaidAuction extends Component {

    constructor(props) {
        super(props);
        this.state = {
            id: this.props.PaidAuctionInfo.id,
            auctionTypeId: "2",
            // showId:this.props.PaidAuctionInfo.show.showName  ,
            // channelId:"",
            // episodeId: this.props.PaidAuctionInfo.episodeId,
            location: this.props.PaidAuctionInfo.location,
            round: "",
            auctionBidFee: this.props.PaidAuctionInfo.auctionBidFee,
            productId: this.props.PaidAuctionInfo.product.id,
            productImage: this.props.PaidAuctionInfo.product.productImage,
            auctionCode: this.props.PaidAuctionInfo.auctionCode,
            auctionCategoryId: this.props.PaidAuctionInfo.auctionCategoryId,
            auctionCategoryName: this.props.PaidAuctionInfo.auctionsCategory.auctionCategoryName,
            status: true,
            auctionStartTime: new Date(this.props.PaidAuctionInfo.auctionStartTime),
            auctionEndTime: new Date(this.props.PaidAuctionInfo.auctionEndTime),
            displayStartDateTime: new Date(this.props.PaidAuctionInfo.displayStartDateTime),
            displayOrder: this.props.PaidAuctionInfo.order,
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
    handleBidFeeChange = evt => {
        this.setState({ auctionBidFee: evt.target.value });
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

        //  let data = new Date(date);
        //  data.setTime(data.getTime() + (330 * 60 * 1000));
        //  let StartDate=data.toISOString()

        this.setState({
            auctionStartTime: date
        });
    };
    handleEndDateChange = date => {
        // let data = new Date(date);
        //  data.setTime(data.getTime() + (330 * 60 * 1000));
        //  let EndDate=data.toISOString()
        this.setState({
            auctionEndTime: date
        });
    };
    handleDisplayStartChange = date => {
        //  let data = new Date(date);
        //      data.setTime(data.getTime() + (330 * 60 * 1000));
        //      let DisplayDate=data.toISOString()
        this.setState({
            displayStartDateTime: date
        });
    };

    handleSubmit = evt => {
        evt.preventDefault();
        let updateObj = this.state;
        updateObj.order = this.state.displayOrder;
        delete updateObj['displayOrder'];

        let response = this.props.updateAuction(updateObj).then(data => {
            if (data && data.status && data.status == 200) {
                alert('Auction updated successfully');
                window.location.reload();

            } else {
                alert('Something went wrong..');
                return false;
            }
        });
    };
    // handleSubmit=(evt)=>{
    //     evt.preventDefault();
    //     console.log('[FreeAuction Info]:',this.state)
    // }


    render() {
        console.log(this.props.PaidAuctionInfo, '1')

        // { console.log('[editPaidAuction]', this.props.PaidAuctionInfo) }
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
                                                placeholder={this.props.PaidAuctionInfo.product.productName}
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
                                            <select className="form-control custom_arrow"  onChange={this.handleLocationChange} >
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
                                        <label>Bid Fee</label>
                                    </Col>
                                    <Col sm="6" className="text-right">
                                        <div className="form-group">
                                            <Input type="text" name="bid_fee" value={this.state.auctionBidFee} onChange={this.handleBidFeeChange} required></Input>
                                        </div>
                                    </Col>
                                </Row>
                                <Row>
                                    <Col sm="5" className="text-right">
                                        <label>Order to Display</label>
                                    </Col>
                                    {console.log("=-=-=>>>",this.state.displayOrder)}
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
                                        <label>Show</label>
                                    </Col>
                                    <Col sm="6" className="text-right">
                                        <div className="form-group">                                
                                            <select className="form-control custom_arrow" required onChange={this.handleShowChange} >
                                            <option value={this.state.showId}>{this.state.showId}</option>
                                                {shows && shows.shows.map((item,index)=>( 
                                                <option value={item?item.id:"-"}  key={'SH_TYPE'+item.id}>{item?item.showName:"-"}</option>
                                                ))}
                                            </select>
                                        </div>
                                    </Col>
                                </Row>
                                <Row>
                                    <Col sm="5" className="text-right">
                                        <label>Episode</label>
                                    </Col>
                                    <Col sm="6" className="text-right">
                                        <div className="form-group">                                
                                            <select className="form-control custom_arrow" required onChange={this.handleEpisodeChange} >
                                            <option value={this.state.episodeId}>{this.state.episodeId}</option>
                                            {episode.episode.map((item,index)=>( 
                                                <option value={item.id}  key={'EP_TYPE'+item.id}>{item.id} ({item.episodeStartTime.slice(0,-5)})</option>
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
                                {/* <Row>
                                    <Col sm="5" className="text-right">
                                        <label>Auction Category</label>
                                    </Col>
                                    <Col sm="6" className="text-left">
                                        {this.props.PaidAuctionInfo.auctionCategoryId}
                                        <div className="form-group">
                                            <select className="form-control custom_arrow" required onChange={this.handleCategoryChange}>
                                                <option value={this.state.auctionCategoryId}>{this.state.auctionCategoryId}</option>
                                                {auctionCats.map((item) => (
                                                    <option value={item.id} key={'AC_' + item.id}>{item.auctionCategory}</option>
                                                ))}
                                            </select>
                                        </div>
                                    </Col>
                                </Row> */}

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

                                {/* <Row className="marB0">
                                    <Col sm="5" className="text-right">
                                        <Label>UPLOAD IMAGE: </Label>
                                    </Col>
                                    <Col sm="6">
                                        <div class="upload_box">
                                            <div class="upload_input">
                                                <input type="file" id="resume" class="inputfile inputfile-2" onChange={this.SelectImg} data-multiple-caption="{count} files selected" multiple="" />
                                                <label for="resume" className="upload_text">
                                                    <span id="file_name">Upload Images</span>
                                                </label>
                                            </div>
                                            {this.state.ImgPath ? (
                                                <div className="uploaded_img">
                                                    <img src={this.state.productImage} width='100px' />
                                                    <span class="delete_file" onClick={this.deleteFile}>{<X size={16} />}</span>
                                                </div>
                                            ) : <div className="uploaded_img">
                                                    <img src={this.props.PaidAuctionInfo.product.productImage} width='100px' />
                                                </div>}
                                        </div>
                                    </Col>
                                </Row> */}
                                <Row>
                                    <Col sm="5" className="text-right">
                                        <label>&nbsp;</label>
                                    </Col>
                                    <Col sm="6" className="text-right">
                                        <div className="form-group">
                                            <input type="submit" value="Update Auction" className="btn btn-primary submit_btn1" />
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
AddPaidAuction.propTypes = {
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
)(AddPaidAuction);