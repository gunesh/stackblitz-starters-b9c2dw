import React, { Component, Fragment } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { saveAuctions, fetchauctions } from '../../../redux/actions/auctions/auctionsActions';
import { Card, Button, CardBody, CardTitle, Row, Col, Table } from "reactstrap";
import DateTimePicker from "react-datetime";
import "react-datetime/css/react-datetime.css";
import { withRouter } from 'react-router-dom';
import { compose } from 'redux';
import { fetchChannel } from '../../../redux/actions/chanels/chanelAction'
import { fetchShows } from '../../../redux/actions/Shows/showsAction';
import { fetchProduct } from '../../../redux/actions/product/productAction';
import { fetchauctionsCategories } from '../../../redux/actions/auctions/auctionTypeAction';
import {fetchLocation} from '../../../redux/actions/location/locationActions'
import Select from 'react-select';
//import * as auctionFields from './auctionFields';
class AddAuctions extends Component {

    constructor(props) {
        super(props);
        this.state = {
            auctionTypeId: "",
            showId: "",
            channelId: "",
            episodeId: "",
            location: "",
            auctionsrounds: [{ round: "", productId: "", auctionBidFee: "", auctionCode: String(Math.floor(1000 + Math.random() * 9000)), auctionCategoryId: "", status: true, duration: 90 }],
            auction_start_date: new Date(),
            auction_end_date: new Date(),
            duration: 0,
            isproductreveal: false,
            isstarted: false,
            iswinreveal: false,
            status: true,
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
        this.setState({ location: selectedOption.target.value =="India"? "": selectedOption.target.value });
    };

    handleBidFeeChange = idx => evt => {
        const newAuctionRounds = this.state.auctionsrounds.map((shareholder, sidx) => {
            if (idx !== sidx) return shareholder;
            return { ...shareholder, auctionBidFee: evt.target.value };
        });

        this.setState({ auctionsrounds: newAuctionRounds });

    }
    handleRoundsChange = idx => evt => {
        const newAuctionRounds = this.state.auctionsrounds.map((shareholder, sidx) => {
            if (idx !== sidx) return shareholder;
            return { ...shareholder, round: evt.target.value };
        });

        this.setState({ auctionsrounds: newAuctionRounds });
    };
    handleKeyChange = idx => evt => {

        const newAuctionKeys = this.state.auctionsrounds.map((shareholder, sidx) => {
            if (idx !== sidx) return shareholder;
            return { ...shareholder, auctionCode: evt.target.value };
        });

        this.setState({ auctionsrounds: newAuctionKeys });
    };
    updateKeyChange = (idx, val) => {

        const newAuctionKeys = this.state.auctionsrounds.map((shareholder, sidx) => {
            if (idx !== sidx) return shareholder;
            return { ...shareholder, auctionCode: val };
        });

        this.setState({ auctionsrounds: newAuctionKeys });
    };
    handleProductChange = idx => value => {
        const newAuctionProducts = this.state.auctionsrounds.map((shareholder, sidx) => {
            if (idx !== sidx) return shareholder;
            return { ...shareholder, productId: value.value };
        });

        this.setState({ auctionsrounds: newAuctionProducts });
    };

    handleCategoryChange = idx => evt => {
        let obj = JSON.parse(evt.target.value);
        const newCategories = this.state.auctionsrounds.map((shareholder, sidx) => {
            if (idx !== sidx) return shareholder;
            return { ...shareholder, auctionCategoryId: obj.id, auctionBidFee: obj.bidPoints };
        });
        this.setState({ auctionsrounds: newCategories });
    };
    handleAddShareholder = () => {
        this.setState({
            auctionsrounds: this.state.auctionsrounds.concat([{ round: "", productId: "", auctionBidFee: "", auctionCode: String(Math.floor(1000 + Math.random() * 9000)), auctionCategoryId: "", status: true, duration: 90 }])
        });
       
    };

    handleRemoveShareholder = idx => () => {
        this.setState({
            auctionsrounds: this.state.auctionsrounds.filter((s, sidx) => idx !== sidx)
        });
    };
    handleChangeDuration = idx => evt => {
        console.log(evt.target.value);
        const newDurations = this.state.auctionsrounds.map((shareholder, sidx) => {
            if (idx !== sidx) return shareholder;
            return { ...shareholder, duration: evt.target.value };
        });

        this.setState({ auctionsrounds: newDurations });
    }
    handleSubmit = evt => {
        evt.preventDefault();
        const { auctionsrounds } = this.state;

        if (auctionsrounds.length > 1) {
            auctionsrounds.forEach(auction => {
                auction.episodeId = this.state.episodeId;
                auction.showId = this.state.showId;
                auction.auctionTypeId = 1;//this.state.auctionTypeId;
                auction.location = this.state.location;
                auction.channelId = this.state.channelId;
                auction.auction_start_date = this.state.auction_start_date;
                auction.auction_end_date = this.state.auction_end_date;
                auction.isproductreveal = this.state.isproductreveal;
                auction.isstarted = this.state.isstarted;
                auction.iswinreveal = this.state.iswinreveal;
                auction.status = this.state.status;

            });

            let response = this.props.saveAuctions(auctionsrounds).then(data => {

                // if(data && data.status && data.status==201){
                //     alert('Auction Added Successfylly');                    
                //     // window.location.reload();               

                // }else{
                //     alert('Something went wrong..');
                //     return false;
                // }
            });
            //this.props.fetchauctions();
            this.props.history.push('/auctions/viewAuctionPage')
            window.location.reload()
        }
        else {
            let singleobj = this.state.auctionsrounds[0];
            singleobj.auctionTypeId = 1;//this.state.auctionTypeId;
            singleobj.channelId = this.state.channelId;
            singleobj.showId = this.state.showId;
            singleobj.episodeId = this.state.episodeId;
            singleobj.location = this.state.location;
            singleobj.auction_start_date = this.state.auction_start_date;
            singleobj.auction_end_date = this.state.auction_end_date;
            singleobj.isproductreveal = this.state.isproductreveal;
            singleobj.isstarted = this.state.isstarted;
            singleobj.iswinreveal = this.state.iswinreveal;
            singleobj.status = this.state.iswinreveal;

            let response = this.props.saveAuctions([singleobj]).then(data => {
                if (data && data.status && data.status == 201) {
                    alert('Auction Added Successfyll');
                    window.location.reload();

                } else {
                    alert('Something went wrong..');
                    return false;
                }
            });

            // this.props.fetchauctions();

        }
        this.props.history.push('/auctions/viewAuctionPage')
    };

    render() {
        const { chanels, shows, auctionType, episode, product ,location} = this.props;
        let auctionCats = auctionType.auctionsCategories;

        let prs = [];
        product.products.map((item, index) => (
            prs.push({ 'label': item.productName, 'value': item.id })
        ));
        let auctionCat = [];
        auctionCats.map((item, index) => (
            auctionCat.push({ 'label': item.auctionCategory, 'value': item.id })
        ));

            // console.log("=-=-=->>>>>/",location)
        

        return (
            <Fragment>
                <form onSubmit={this.handleSubmit}>
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
                                            {
                                                    <select className="form-control custom_arrow" onChange={this.handleLocationChange} >
                                                         <option value="">All</option>
                                                         {
                                                             location.map((item, index)=>{
                                                                return <option key={index} value={item.state}>{item.state}</option>
                                                             })
                                                         }

                                                  </select>
                                            }
                                        </div>
                                    </Col>
                                </Row>
                            </Col>
                        </Row>
                        <div className="auction_search">
                            <Table>
                                <thead>
                                    <tr>
                                        <th>Round</th>
                                        <th>Product Name</th>
                                        <th>Auction Key</th>
                                        <th>Auction Category</th>
                                        <th>Bid Fee</th>
                                        <th>Duration</th>

                                        <th>Actions</th>
                                        <th><Button color='primary' type="button" onClick={this.handleAddShareholder} className="btn btn-default marB0"> Add Rounds</Button></th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {this.state.auctionsrounds.map((auctionround, idx) => {
                                        // let auctionKey =  String(Math.floor(1000 + Math.random() * 9000));
                                        // auctionround.auctionCode=auctionKey;

                                        return (
                                            <tr key={idx}>
                                                <td>
                                                    <div className="form-group">
                                                        {/* <label>Rounds:  </label> */}
                                                        {idx + 1}
                                                        <input
                                                            type="text"
                                                            className="d-none"
                                                            value={idx + 1}
                                                            onChange={this.handleRoundsChange(idx)}
                                                        />
                                                    </div>
                                                </td>
                                                <td>
                                                    <div className="form-group">
                                                        {/* <label>Product:  </label> */}
                                                        <Select options={prs} onChange={this.handleProductChange(idx)} required />
                                                        {/* <Select  className="custom-select"  value={auctionround.productId}  onChange={this.handleProductChange(idx)} required>
                                                        <option></option>
                                                    {product.products.map((item,index)=>( 
                                                        <option value={item.id}  key={'PRODUCT_TYPE'+item.id}>{item.productName+'('+item.id+')'}</option>
                                                ))}
                                                    </Select> */}

                                                    </div>
                                                </td>
                                                <td>
                                                    <div className="form-group">
                                                        {/* <label>Auction Key:  </label> */}
                                                        <input
                                                            type="text"
                                                            className="form-control"
                                                            defaultValue={String(Math.floor(1000 + Math.random() * 9000))}//auctionround.auctionCode
                                                            onChange={this.handleKeyChange(idx)}
                                                            placeholder="Auction Key"
                                                            required
                                                        />
                                                    </div>
                                                </td>
                                                <td>
                                                    <div className="form-group">
                                                        <select className="form-control" required onChange={this.handleCategoryChange(idx)}>
                                                            <option disabled defaultValue>Choose Category</option>
                                                            {auctionCats.map((item) => (
                                                                <option value={JSON.stringify(item)} key={'AC_' + item.id}>{item.auctionCategoryName}</option>
                                                            ))}
                                                        </select>
                                                    </div>
                                                </td>
                                                <td>
                                                    <div className="form-group">
                                                        {/* <label>Auction Key:  </label> */}
                                                        <input
                                                            type="text"
                                                            className="form-control"
                                                            defaultValue={auctionround.auctionBidFee}
                                                            onChange={this.handleBidFeeChange(idx)}
                                                            placeholder="Bid Fee"
                                                            required
                                                        />
                                                    </div>
                                                </td>
                                                <td>
                                                    <select className="form-control" required onChange={this.handleChangeDuration(idx)}>
                                                        <option></option>
                                                        <option value="30">30</option>
                                                        <option value="60">60(1 Minute)</option>
                                                        <option value="90">90</option>
                                                        <option value="120">120(2 Minutes)</option>
                                                        <option value="150">150</option>
                                                        <option value="180">180(3 Minutes)</option>
                                                    </select>
                                                </td>
                                                <td colSpan="2">
                                                    <Button className="btn btn-remove marB0" type="button" onClick={this.handleRemoveShareholder(idx)}>Remove</Button>
                                                </td>
                                            </tr>
                                        )
                                    })}
                                </tbody>
                            </Table>
                        </div>
                        {/* onClick={this.handleSubmit} */}
                        <div className="form-group text-right">
                            <input type="submit" value="Add Auction" className="btn btn-primary submit_btn1" />
                        </div>
                    </div>
                </form>
            </Fragment>
        );
    }
}
AddAuctions.propTypes = {
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
    connect(mapStateToProps, { saveAuctions, fetchChannel, fetchShows, fetchProduct, fetchauctionsCategories, fetchauctions ,fetchLocation})
)(AddAuctions);