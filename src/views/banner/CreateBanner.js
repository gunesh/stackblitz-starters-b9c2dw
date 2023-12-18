import React, { Component, Fragment } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { Row, Col, FormGroup, Label, Input } from "reactstrap";
import { X, Calendar } from "react-feather";
import { fetchLanguage } from '../../redux/actions/language/languageAction'
import { uploadImage } from "../../redux/actions/imageUpload/uploadImageAction";
import { addOnboarding } from '../../redux/actions/masterDataFiles/bannerActions'
import { fetchChannel } from '../../redux/actions/chanels/chanelAction'
import { fetchShows } from '../../redux/actions/Shows/showsAction';
import {fetchLocation} from '../../redux/actions/location/locationActions'
import { fetchEpisodes } from '../../redux/actions/episode/episodeAction';
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
// Styling
class CreateBanner extends Component {

    constructor(props) {

        super(props);
        this.SelectBannerImg = this.SelectBannerImg.bind(this);
        this.SelectBackGroundImg = this.SelectBackGroundImg.bind(this);
        this.state = {
            BannerImgPath: "",
            description: "",
            backGroundImgPath: "",
            discription: "",
            auctionBackgroundImage: "",
            auctionForegroundImage: "",
            location: "",
            status:true,
            displayStartTime: new Date(),
            displayEndTime: new Date()
        }
    }
    SelectBackGroundImg(e) {
        console.log(e.target.files[0].name)
        this.setState({ backGroundImgPath: e.target.files[0].name })
        this.props.uploadImage(e.target.files[0]).then(
            (res) =>
                this.setState({ auctionBackgroundImage: res.image.location[0] }))
    }
    handleStartDateChange = date => {
        this.setState({
            displayStartTime: date
        });
    };
    handleEndDateChange = date => {
        // console.log(date)
        this.setState({
            displayEndTime: date
        });
    };

    SelectBannerImg(e) {
        console.log(e.target.files[0].name)
        this.setState({ BannerImgPath: e.target.files[0].name })
        this.props.uploadImage(e.target.files[0]).then(
            (res) =>
                this.setState({ auctionForegroundImage: res.image.location[0] }))
    }

    deleteBackgroundImgFile = () => {
        this.setState({ backGroundImgPath: "" })
    }

    deleteBannerFile = () => {
        this.setState({ BannerImgPath: "" })
    }

    componentDidMount() {
        this.props.fetchLanguage();
        this.props.fetchEpisodes();
        this.props.fetchChannel();
        this.props.fetchShows();
        this.props.fetchLocation()
    }

    onChange = (e) => {
        this.setState({ [e.target.name]: e.target.value  =="India"?"":e.target.value })
    }
    

    onSubmitOnboarding = (event) => {
        console.log("=-=-=->>",this.state)
        event.preventDefault();
        this.props.addOnboarding(this.state)
            .then(function (response) {
                if (response && response.banner && response.status == 201) {
                    alert('Banner added successfully');
                    window.location.reload();
                }
                else if (response && response.message) {
                    console.log(response)
                }
            }).catch(function (error) {
                console.log(error);
            });
    }

    render() {
        const { language, chanels, shows, episode,location} = this.props
        console.log()
        return (
            <Fragment>
                <form onSubmit={this.onSubmitOnboarding} required>
                    <div className="creation_content">
                        <Row>
                            <Col md="6">
                                <Row>
                                    <Col sm="5" className="text-right">
                                        <Label>Location </Label>
                                    </Col>
                                    <Col sm="6" className="text-right">
                                        <FormGroup>
                                            <Input type="select" className="custom_arrow" name="location" onChange={this.onChange} >
                                            <option value="">All</option>
                                                         {
                                                             location.map((item)=>{
                                                                return <option value={item.state}>{item.state}</option>
                                                             })
                                                         }
                                            </Input>
                                        </FormGroup>
                                    </Col>
                                </Row>

                                <Row>
                                    <Col sm="5" className="text-right">
                                        <Label>Language </Label>
                                    </Col>
                                    <Col sm="6" className="text-right">
                                        <FormGroup>
                                            <Input type="select" className="custom_arrow" name="languageId" onChange={this.onChange}>
                                                <option value=""  selected>No Language</option>
                                                {language.language.map((item, index) => (
                                                    <option value={item.id} key={'CH_TYPE' + item.id}>{item.language}</option>
                                                ))}
                                            </Input>
                                        </FormGroup>
                                    </Col>
                                </Row>
                                {/* <Row>
                                    <Col sm="5" className="text-right">
                                        <Label>Channel</Label>
                                    </Col>
                                    <Col sm="6" className="text-right">
                                        <FormGroup>
                                            <Input type="select" className="custom_arrow">
                                                <option></option>
                                        {chanels.chanels.map((item,index)=>( 
                                          <option key={'CH_'+item.id} value={item.channelLanguage}>{item.channelLanguage}</option>
                                              ))}
                                            </Input>
                                        </FormGroup>
                                    </Col>
                                </Row>   */}
                                <Row className="marB0">
                                    <Col sm="5" className="text-right">
                                        <Label>Upload Banner: </Label>
                                    </Col>
                                    <Col sm="6">
                                        <div class="upload_box">
                                            <div class="upload_input">
                                                <input type="file" id="image1" name="image1" onChange={this.SelectBannerImg} />
                                                <label for="image1" className="upload_text">
                                                    <span id="file_name">Upload Banner</span>
                                                </label>
                                            </div>
                                            {this.state.BannerImgPath ? (<div className="uploaded_img">
                                                <img src={this.state.auctionForegroundImage} width='100px' />
                                                <span class="delete_file" onClick={this.deleteBannerFile}>{<X size={16} />}</span>
                                            </div>) : null}
                                        </div>

                                    </Col>
                                </Row>


                            </Col>
                            <Col md="6">

                                {/* <Row>
                                    <Col sm="5" className="text-right">
                                        <Label>Show</Label>
                                    </Col>
                                    <Col sm="6" className="text-right">
                                        <FormGroup>
                                            <Input type="select" className="custom_arrow">
                                               <option></option>
                                        {shows.shows.map((item,index)=>( 
                                          <option value={item.id}  key={'SH_TYPE'+item.id}>{item.showName}</option>
                                              ))}
                                            </Input>
                                        </FormGroup>
                                    </Col>
                                </Row>                               */}
                                {/* <Row>
                                    <Col sm="5" className="text-right">
                                        <Label>Episode</Label>
                                    </Col>
                                    <Col sm="6" className="text-right">
                                        <FormGroup>
                                            <Input type="select" className="custom_arrow">
                                               <option></option>
                                        {episode.episode.map((item,index)=>( 
                                          <option value={item.id}  key={'SH_TYPE'+item.id}>{item.id}</option>
                                              ))}
                                            </Input>
                                        </FormGroup>
                                    </Col>
                                </Row> */}
                                <Row>
                                    <Col sm="5" className="text-right">
                                        <Label>Description: </Label>
                                    </Col>
                                    <Col sm="6" className="text-right">
                                        <FormGroup>
                                            <Input type="textarea" name="description" placeholder="Description"
                                                onChange={this.onChange} required></Input>
                                        </FormGroup>
                                    </Col>
                                </Row>
                                <Row>
                                    <Col sm="5" className="text-right">
                                        <label>Start Date and Time</label>
                                    </Col>
                                    <DatePicker
                                        selected={this.state.displayStartTime}
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
                                        selected={this.state.displayEndTime}
                                        onChange={this.handleEndDateChange}
                                        showTimeSelect
                                        timeFormat="HH:mm"
                                        timeIntervals={15}
                                        timeCaption="time"
                                        dateFormat="MMMM d, yyyy h:mm aa"
                                    />
                                </Row>




                                {/* <Row className="marB0">
                                    <Col sm="5" className="text-right">
                                        <Label>UPLOAD BACKGROUND IMAGE: </Label>
                                    </Col>
                                    <Col sm="6">
                                        <div class="upload_box">
                                            <div class="upload_input">
                                                <input type="file" id="image2" name="image2" onChange={this.SelectBackGroundImg}/>
                                                <label for="image2" className="upload_text">
                                                    <span id="file_name">UPLOAD BACKGROUND IMAGE</span>
                                                </label>
                                            </div>
                                            {this.state.backGroundImgPath ? (<div className="uploaded_img">
                                                <img src={this.state.auctionBackgroundImage} width='100px' />
                                                <span class="delete_file" onClick={this.deleteBackgroundImgFile}>{<X size={16} />}</span>
                                            </div>) : null}
                                        </div>

                                    </Col>
                                </Row> */}


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

const mapStateToProps = state => ({
    language: state.languagedata.language,
    episode: state.episodedata.episode,
    chanels: state.chaneldata.chanels,
    shows: state.showsdata.shows,
    location:state.locationdata.location.location


});
export default connect(
    mapStateToProps, { fetchLanguage, uploadImage, addOnboarding, fetchChannel, fetchShows, fetchEpisodes,fetchLocation}
)(CreateBanner);