import React, { Component, Fragment } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { Row, Col, FormGroup, Label, Input } from "reactstrap";
import { X, Calendar } from "react-feather";
import { updateonBoarding } from '../../redux/actions/masterDataFiles/bannerActions'
import { fetchLanguage } from '../../redux/actions/language/languageAction'
import {fetchLocation} from '../../redux/actions/location/locationActions'
import { uploadImage } from "../../redux/actions/imageUpload/uploadImageAction";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
// Styling
class EditBanner extends Component {

    constructor(props) {

        super(props);
        this.state = {
            id: this.props.EditBannerList.id,
            description: this.props.EditBannerList.description,
            auctionForegroundImage: this.props.EditBannerList.auctionForegroundImage,
            status: this.props.EditBannerList.status,
            // language: this.props.EditBannerList.language.id,
            location: this.props.EditBannerList.location,
            displayStartTime: new Date(this.props.EditBannerList.displayStartTime),
            displayEndTime: new Date(this.props.EditBannerList.displayEndTime),
        }
    }
    componentWillReceiveProps(nextProps) {
        if (nextProps.EditBannerList.id !== this.state.id) {
            this.setState({
                id: nextProps.EditBannerList.id,
                description: nextProps.EditBannerList.description,
                auctionForegroundImage: nextProps.EditBannerList.auctionForegroundImage,
                status: nextProps.EditBannerList.status,
                language: nextProps.EditBannerList.language.language,
                location: nextProps.EditBannerList.location,
            })
        }
    }
    SelectImg = (e) => {
        this.setState({ ImgPath: e.target.files[0].name })
        this.props.uploadImage(e.target.files[0]).then(
            (res) =>
                this.setState({ auctionForegroundImage: res.image.location[0] }))
    }
    deleteFile = () => {
        this.setState({ ImgPath: "" })
    }
    handleStartDateChange = date => {
        this.setState({
            displayStartTime: date
        });
    };
    handleEndDateChange = date => {
        console.log(date)
        this.setState({
            displayEndTime: date
        });
    };
    componentDidMount() {
        this.props.fetchLanguage();
        this.props.fetchLocation()
    }
    onChange = (e) => {
        this.setState({ [e.target.name]: e.target.value })
    }
    onEditBoarding = () => {
        console.log('on edit====', this.state)
        this.props.updateonBoarding(this.state);
    }
    render() {
        const { language,location} = this.props
        console.log(">>>>EditBannerList",this.props.EditBannerList)
        return (
            <Fragment>
                <form>
                    <div className="creation_content">
                        <Row>
                            <Col md="6">
                                <Row>
                                    <Col sm="5" className="text-right">
                                        <Label>Location </Label>
                                    </Col>
                                    <Col sm="6" className="text-right">
                                        <FormGroup>
                                            <Input type="select" className="custom_arrow">
                                            <option value="">All</option>
                                                         {
                                                             location.map((item)=>{
                                                                return <option value={item.state}>{item.state}</option>
                                                             })
                                                         }
                                                
                                                {/* <option>Kerala</option> */}
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
                                            <Input type="select" className="custom_arrow" name="languageId" onChange={this.onChange} required>
                                                <option selected>No Language</option>
                                                {language.language.map((item, index) => (
                                                    <option value={item.id} key={'CH_TYPE' + item.id}>{item.language}</option>
                                                ))}
                                            </Input>
                                        </FormGroup>
                                    </Col>
                                </Row>
                                <Row className="marB0">
                                    <Col sm="5" className="text-right">
                                        <Label>Upload Banner: </Label>
                                    </Col>
                                    <Col sm="6">
                                        <div class="upload_box">
                                            <div class="upload_input">
                                                <input type="file" id="resume" class="inputfile inputfile-2" onChange={this.SelectImg} data-multiple-caption="{count} files selected" multiple="" />
                                                <label for="resume" className="upload_text">
                                                    <span id="file_name">Upload Image</span>
                                                </label>
                                            </div>
                                            {this.state.auctionForegroundImage ? (
                                                <div className="uploaded_img">
                                                    <img src={this.state.auctionForegroundImage} width='100px' />
                                                    <span class="delete_file" onClick={this.deleteFile}>{<X size={16} />}</span>
                                                </div>
                                            ) : <div className="uploaded_img">
                                                    <img src={this.props.EditBannerList.images} width='100px' />
                                                </div>}
                                        </div>
                                    </Col>
                                </Row>

                            </Col>
                            <Col md="6">
                                <Row>
                                    <Col sm="5" className="text-right">
                                        <Label>Description: </Label>
                                    </Col>
                                    <Col sm="6" className="text-right">
                                        <FormGroup>
                                            <Input type="textarea" placeholder="Description" name='description'
                                                value={this.state.description} onChange={this.onChange} ></Input>
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
                                        <Label>UPLOAD BACKGROUND IMAGE:</Label>
                                    </Col>
                                  <Col sm="6">
                                        <div class="upload_box">
                                            <div class="upload_input">
                                                <input type="file"  id="resume" class="inputfile inputfile-2" onChange={this.SelectImg} data-multiple-caption="{count} files selected" multiple="" />
                                                <label for="resume" className="upload_text">
                                                    <span id="file_name">Upload Images</span>
                                                </label>                                                
                                            </div>
                                            {this.state.ImgPath?(
                                                 <div className="uploaded_img">
                                                 <img src={this.state.images}width='100px'/>
                                                <span class="delete_file" onClick={this.deleteFile}>{<X size={16} />}</span>
                                            </div> 
                                            ):<div className="uploaded_img">
                                            <img src={this.props.EditBannerList.images}width='100px'/>
                                            </div> }
                                         </div>
                                    </Col>
                                </Row>                          */}


                                <Row className="marB0">
                                    <Col sm="5"></Col>
                                    <Col sm="6" className="text-right">
                                        <button sm="6" className="text-right"
                                            className="btn btn-primary submit_btn1"
                                            onClick={this.onEditBoarding} >Submit
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
    location:state.locationdata.location.location

});
export default connect(
    mapStateToProps, { fetchLanguage, uploadImage, updateonBoarding,fetchLocation }
)(EditBanner);
