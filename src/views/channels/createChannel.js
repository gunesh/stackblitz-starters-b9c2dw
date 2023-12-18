import React, { Component, Fragment } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { Row, Col, FormGroup, Label, Input } from "reactstrap";
import { X, Calendar } from "react-feather";
import { fetchChannel, saveChannel } from '../../redux/actions/chanels/chanelAction';
import { fetchLanguage } from '../../redux/actions/language/languageAction';
import {fetchLocation} from '../../redux/actions/location/locationActions'
import { uploadImage } from "../../redux/actions/imageUpload/uploadImageAction";
import { withRouter } from 'react-router-dom';
import { compose } from 'redux';

// Styling
class CreateChannel extends Component {

    constructor(props) {

        super(props);
        this.state = {
            channelName: "",
            channelLanguage: "",
            status: "",
            logo: "",
            channelDescription: "",
            location: "",
            createdBy: JSON.parse(localStorage.getItem('user')).id,
            updatedBy: JSON.parse(localStorage.getItem('user')).id,
            ImgPath: ""
        }
    }
    componentDidMount() {
        this.props.fetchLanguage();
        this.props.fetchLocation()
    }
    handleChannelChange = (e) => {
        this.setState({ [e.target.name]: e.target.value })
    }
    SelectImg = (e) => {
        this.setState({ ImgPath: e.target.files[0].name })
        this.props.uploadImage(e.target.files[0]).then(
            (res) =>
                this.setState({ logo: res.image.location[0] }))
    }
    onSelectStatus = (e) => {
        if (e.target.value === "Enable") {
            this.setState({ status: true })
        } else {
            this.setState({ status: false })
        }

    }
    deleteFile = () => {
        this.setState({ ImgPath: "" })
    }
    onAddChannel = (event) => {
        event.preventDefault();
        this.props.saveChannel(this.state).then(function (response) {
            if (response && response.channel && response.status == 201) {
                alert('Channel added successfully');
                window.location.reload();
            }
            else if (response && response.message) {
                alert(response.message);
            }
        }).catch(function (error) {
            console.log(error);
        });
    }

    render() {
        const { chanels, language,location} = this.props
        return (
            <Fragment>
                <form onSubmit={this.onAddChannel} required>
                    <div className="creation_content">
                        <Row>
                            <Col md="6">
                                <Row>
                                    <Col sm="5" className="text-right">
                                        <Label>Channel Name: </Label>
                                    </Col>
                                    <Col sm="6" className="text-right">
                                        <FormGroup>
                                            <Input type="text" name="channelName"
                                                onChange={this.handleChannelChange}
                                                required />
                                        </FormGroup>
                                    </Col>
                                </Row>
                                <Row>
                                    <Col sm="5" className="text-right">
                                        <Label>Channel Language: </Label>
                                    </Col>
                                    <Col sm="6" className="text-right">
                                        <Input type="select" name="channelLanguage" className="custom_arrow" onChange={this.handleChannelChange} required>
                                            <option value={""} disabled required selected>No Language</option>
                                            {language.language.map((item, index) => (
                                                <option value={item.id} key={'CH_TYPE' + item.id}>{item.language}</option>
                                            ))}
                                        </Input>
                                    </Col>
                                </Row>
                                <Row>
                                    <Col sm="5" className="text-right">
                                        <Label>Short description</Label>
                                    </Col>
                                    <Col sm="6" className="text-right">
                                        <FormGroup>
                                            <Input type="textarea" name="channelDescription" placeholder="Short description"
                                                onChange={this.handleChannelChange} required />
                                        </FormGroup>
                                    </Col>
                                </Row>
                            </Col>
                            <Col md="6">
                                <Row>
                                    <Col sm="5" className="text-right">
                                        <Label>Location: </Label>
                                    </Col>
                                    <Col sm="6" className="text-right">
                                        <FormGroup>
                                            <Input type="select" name="location" className="custom_arrow" onChange={this.handleChannelChange} required>
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
                                        <Label>STATUS: </Label>
                                    </Col>
                                    <Col sm="6" className="text-right">
                                        <FormGroup>
                                            <Input type="select" name="status" className="custom_arrow" onChange={this.onSelectStatus} required>
                                                <option></option>
                                                <option>Enable</option>
                                                <option>Disable</option>
                                            </Input>
                                        </FormGroup>
                                    </Col>
                                </Row>
                                <Row className="marB0">
                                    <Col sm="5" className="text-right">
                                        <Label>UPLOAD IMAGE: </Label>
                                    </Col>
                                    <Col sm="6">
                                        <div class="upload_box">
                                            <div class="upload_input">
                                                <input type="file" id="resume" class="inputfile inputfile-2" onChange={this.SelectImg} data-multiple-caption="{count} files selected" multiple="" required />
                                                <label for="resume" className="upload_text">
                                                    <span id="file_name">Upload Images</span>

                                                </label>
                                            </div>
                                            {this.state.ImgPath ? (<div className="uploaded_img">
                                                <img src={this.state.logo} width='100px' />
                                                {/* <span class="delete_file" onClick={this.deleteFile}>{<X size={16} />}</span>
                                                <span>{this.state.ImgPath}</span> */}
                                                <span class="delete_file" onClick={this.deleteFile}>{<X size={16} />}</span>
                                            </div>) : null}
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


const mapStateToProps = state => ({
    chanels: state.chaneldata.chanels,
    language: state.languagedata.language,
    location:state.locationdata.location.location
});

export default compose(
    withRouter,
    connect(mapStateToProps, { fetchChannel, fetchLanguage, saveChannel, uploadImage,fetchLocation})
)(CreateChannel);
