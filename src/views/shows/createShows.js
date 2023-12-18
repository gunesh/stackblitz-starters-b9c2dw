import React, { Component, Fragment } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { Row, Col, FormGroup, Label, Input } from "reactstrap";
import { X, Calendar } from "react-feather";
import { saveShows } from '../../redux/actions/Shows/showsAction';
import { withRouter } from 'react-router-dom';
import { compose } from 'redux';
import { uploadImage } from "../../redux/actions/imageUpload/uploadImageAction";

// Styling
class CreateShows extends Component {

    constructor(props) {

        super(props);
        this.state = {
            showImage: "",
            showEndTime: "2019-10-26T11:12:03.483Z",
            status: "",
            showName: "",
            showDate: "",
            showStartTime: "2019-10-26T10:12:03.483Z",
            createdBy: JSON.parse(localStorage.getItem('user')).id,
            updatedBy: JSON.parse(localStorage.getItem('user')).id,
            channelId: "",
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
    onAddShow = (event) => {
        event.preventDefault();
        this.props.saveShows(this.state).then(function (response) {
            if (response && response.show && response.status == 201) {
                alert('Show added successfully');
                window.location.reload();
            }
            else if (response && response.message) {
                alert(response.message);
            }
        }).catch(function (error) {
            console.log(error);
        });

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
    render() {
        const { chanels } = this.props
        return (
            <Fragment>
                <form onSubmit={this.onAddShow} required>
                    <div className="creation_content">
                        <Row>
                            <Col md="6">
                                <Row>
                                    <Col sm="5" className="text-right">
                                        <Label>Show Name: </Label>
                                    </Col>
                                    <Col sm="6" className="text-right">
                                        <FormGroup>
                                            <Input type="text" name="showName" placeholder="Show Name" onChange={this.handleshowschange} required></Input>
                                        </FormGroup>
                                    </Col>
                                </Row>
                                <Row>
                                    <Col sm="5" className="text-right">
                                        <Label>Show Date: </Label>
                                    </Col>
                                    <Col sm="6" className="text-right">
                                        <FormGroup>
                                            <Input type="date" name="showDate" placeholder="Show Date" onChange={this.handleshowschange} required></Input>
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
                                                <img src={this.state.showImage} width='100px' />
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

// export default Users;
const mapStateToProps = state => ({
    shows: state.chaneldata.shows,
    chanels: state.chaneldata.chanels,
});

export default compose(
    withRouter,
    connect(mapStateToProps, { saveShows, uploadImage })
)(CreateShows);

