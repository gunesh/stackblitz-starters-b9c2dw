import React, { Component, Fragment } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { Row, Col, FormGroup, Label, Input } from "reactstrap";
import { X, Calendar } from "react-feather";
import { updateShows } from '../../redux/actions/Shows/showsAction';
import { withRouter } from 'react-router-dom';
import { compose } from 'redux';
import { uploadImage } from "../../redux/actions/imageUpload/uploadImageAction";

// Styling
class EditShows extends Component {

    constructor(props) {

        super(props);
        this.state = {
            id: this.props.EditshowList.id,
            showImage: this.props.EditshowList.showImage,
            showEndTime: this.props.EditshowList.showEndTime,
            status: this.props.EditshowList.status,
            showName: this.props.EditshowList.showName,
            showDate: this.props.EditshowList.showDate,
            showStartTime: this.props.EditshowList.showStartTime,
            createdBy: this.props.EditshowList.createdBy,
            updatedBy: JSON.parse(localStorage.getItem('user')).id,

            channelId: this.props.EditshowList.channelId,
            ImgPath: ""
        }
    }
    SelectImg = (e) => {
        this.setState({ ImgPath: e.target.files[0].name })
        this.props.uploadImage(e.target.files[0]).then(
            (res) =>
                this.setState({ showImage: res.image.location[0] }))
    }
    deleteFile = () => {
        this.setState({ ImgPath: "" })
    }


    onSelectStatus = (e) => {
        if (e.target.value === "Enable") {
            this.setState({ status: true })
        } else {
            this.setState({ status: false })
        }

    }
    handleshowschange = (e) => {
        this.setState({ [e.target.name]: e.target.value })
    }
    componentWillReceiveProps(nextProps) {
        console.log("nextProps", nextProps)
        // You don't have to do this check first, but it can help prevent an unneeded render
        if (nextProps.EditshowList.id !== this.state.id) {
            this.setState({
                showImage: nextProps.EditshowList.showImage,
                showEndTime: nextProps.EditshowList.showEndTime,
                status: nextProps.EditshowList.status,
                showName: nextProps.EditshowList.showName,
                showDate: nextProps.EditshowList.showDate,
                showStartTime: nextProps.EditshowList.showStartTime,
                createdBy: nextProps.EditshowList.createdBy,
                updatedBy: nextProps.EditshowList.updatedBy,
                id: nextProps.EditshowList.id,
                channelId: nextProps.EditshowList.channelId,
                ImgPath: ""
            })
        }
    }

    onEditShow = (event) => {
        // event.preventDefault();   
        // console.log(">>>this.state",this.state)
        this.props.updateShows(this.state);
        this.props.history.push('/shows');
    }
    render() {
        const { chanels } = this.props
        return (
            <Fragment>
                <form>
                    <div className="creation_content">
                        <Row>
                            <Col md="6">
                                <Row>
                                    <Col sm="5" className="text-right">
                                        <Label>Show Name: </Label>
                                    </Col>
                                    <Col sm="6" className="text-right">
                                        <FormGroup>
                                            <Input type="text" name="showName" placeholder="Show Name"
                                                defaultValue={this.props.EditshowList.showName}
                                                onChange={this.handleshowschange}></Input>
                                        </FormGroup>
                                    </Col>
                                </Row>
                                <Row>
                                    <Col sm="5" className="text-right">
                                        <Label>Show Date: </Label>
                                    </Col>
                                    <Col sm="6" className="text-right">
                                        <FormGroup>
                                            <Input type="date" name="showDate" placeholder="Show Date"
                                                value={this.props.EditshowList.showDate}
                                                onChange={this.handleshowschange}></Input>
                                            {/* {<Calendar size={21} className='calender_icon' />} */}
                                        </FormGroup>
                                    </Col>
                                </Row>
                            </Col>
                            <Col md="6">
                                <Row>
                                    <Col sm="5" className="text-right">
                                        <Label>STATUS: </Label>
                                    </Col>
                                    <Col sm="6" className="text-right">
                                        <FormGroup>
                                            <Input type="select" name="status" className="custom_arrow" onChange={this.onSelectStatus} >
                                                {this.props.EditshowList.status ? <option>Enable</option> : <option>Disable</option>}
                                                {this.props.EditshowList.status ? <option>Disable</option> : <option>Enable</option>}
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
                                                    <img src={this.state.showImage} width='100px' />
                                                    <span class="delete_file" onClick={this.deleteFile}>{<X size={16} />}</span>
                                                </div>
                                            ) : <div className="uploaded_img">
                                                    <img src={this.props.EditshowList.showImage} width='100px' />
                                                </div>}
                                        </div>
                                    </Col>
                                </Row>
                                <Row className="marB0">
                                    <Col sm="5"></Col>
                                    <Col sm="6" className="text-right">
                                        <button sm="6" className="text-right"
                                            className="btn btn-primary submit_btn1"
                                            onClick={this.onEditShow}>Submit
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

// export default Users;
const mapStateToProps = state => ({
    shows: state.chaneldata.shows,
    chanels: state.chaneldata.chanels,
});

export default compose(
    withRouter,
    connect(mapStateToProps, { updateShows, uploadImage })
)(EditShows);

