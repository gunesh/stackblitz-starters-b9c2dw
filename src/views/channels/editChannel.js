import React, { Component, Fragment } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { Row, Col, FormGroup, Label, Input } from "reactstrap";
import { X, Calendar } from "react-feather";
import { fetchChannel, saveChannel, updateChannel } from '../../redux/actions/chanels/chanelAction';
import { fetchLanguage } from '../../redux/actions/language/languageAction';
import {fetchLocation} from '../../redux/actions/location/locationActions'
import { uploadImage } from "../../redux/actions/imageUpload/uploadImageAction";
import { withRouter } from 'react-router-dom';
import { compose } from 'redux';

// Styling
class EditChannel extends Component {

    constructor(props) {
        super(props);
        this.state = {
            id: this.props.id,
            channelName: this.props.ChannelList.channelName,
            channelLanguage: this.props.ChannelList.channelLanguage,
            status: this.props.ChannelList.status,
            logo: this.props.ChannelList.logo,
            channelDescription: this.props.ChannelList.channelDescription,
            location: this.props.ChannelList.location,
            createdBy: this.props.ChannelList.createdBy,
            updatedBy: JSON.parse(localStorage.getItem('user')).id,
            ImgPath: "",
        }
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
    componentDidMount() {
        this.props.fetchLanguage();
        this.props.fetchLocation()
    }
    deleteFile = () => {
        this.setState({ ImgPath: "" });
    }
    componentWillReceiveProps(nextProps) {
        console.log("nextProps", nextProps)
        // You don't have to do this check first, but it can help prevent an unneeded render
        if (nextProps.ChannelList.id !== this.state.id) {
            this.setState({
                id: nextProps.ChannelList.id,
                channelName: nextProps.ChannelList.channelName,
                channelLanguage: nextProps.ChannelList.channelLanguage,
                status: nextProps.ChannelList.status,
                logo: nextProps.ChannelList.logo,
                channelDescription: nextProps.ChannelList.channelDescription,
                location: nextProps.ChannelList.location,
                createdBy: nextProps.ChannelList.createdBy,
                updatedBy: nextProps.ChannelList.updatedBy,
            })
        }
    }

    EditChannel = (event) => {
        // event.preventDefault();
        //console.log("chanelll", this.state)
        this.props.updateChannel(this.state)
        this.props.history.push('/channels');
    }

    render() {
        const { chanels ,language,location} = this.props
        return (
            <Fragment>
                <form >
                    <div className="creation_content">
                        <Row>
                            <Col md="6">
                                <Row>
                                    <Col sm="5" className="text-right">
                                        <Label>Channel Name: </Label>
                                    </Col>
                                    <Col sm="6" className="text-right">
                                        <FormGroup>
                                            <Input type="text" name="channelName" value={this.state.channelName}
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
                                                defaultValue={this.props.ChannelList.channelDescription}
                                                onChange={this.handleChannelChange} />
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
                                            <Input type="select" name="location" className="custom_arrow" onChange={this.handleChannelChange}>
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
                                            <Input type="select" name="status" className="custom_arrow" onChange={this.onSelectStatus}>
                                                {this.props.ChannelList.status ? <option>Enable</option> : <option>Disable</option>}
                                                {this.props.ChannelList.status ? <option>Disable</option> : <option>Enable</option>}

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
                                                <input type="file" id="resume" class="inputfile inputfile-2" onChange={this.SelectImg} data-multiple-caption="{count} files selected" multiple="" />
                                                <label for="resume" className="upload_text">
                                                    <span id="file_name">Upload Images</span>
                                                </label>
                                            </div>
                                            {this.state.ImgPath ? (
                                                <div className="uploaded_img">
                                                    <img src={this.state.logo} width='100px' />
                                                    <span class="delete_file" onClick={this.deleteFile}>{<X size={16} />}</span>
                                                </div>
                                            ) : <div className="uploaded_img">
                                                    <img src={this.props.channelLogo} width='100px' />
                                                </div>}
                                        </div>
                                    </Col>
                                </Row>
                                <Row className="marB0">
                                    <Col sm="5"></Col>
                                    <Col sm="6" className="text-right">
                                        <button sm="6" className="text-right"
                                            className="btn btn-primary submit_btn1"
                                            //   onClick={()=>this.EditChannel(this.props.ChannelList)}
                                            onClick={this.EditChannel}>Submit
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
    connect(mapStateToProps, { fetchChannel, saveChannel, uploadImage, updateChannel,fetchLanguage,fetchLocation})
)(EditChannel);
