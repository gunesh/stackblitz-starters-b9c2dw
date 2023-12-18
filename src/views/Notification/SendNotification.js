// smhkm2 new file
import React, { Component, Fragment } from "react";
import { connect } from "react-redux";
import { NavLink } from "react-router-dom";

import PropTypes from "prop-types";
import { Row, Col, FormGroup, Label, Input } from "reactstrap";
import { X, Calendar } from "react-feather";
import { fetchLanguage } from '../../redux/actions/language/languageAction'
import { uploadImage } from "../../redux/actions/imageUpload/uploadImageAction";
import { sendNotificationAction } from '../../redux/actions/notification/notificationActions'
import { fetchChannel } from '../../redux/actions/chanels/chanelAction'
import { fetchShows } from '../../redux/actions/Shows/showsAction';
import { fetchLocation } from '../../redux/actions/location/locationActions'
import { fetchEpisodes } from '../../redux/actions/episode/episodeAction';
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

//----ck editor 4
import CKEditor from 'ckeditor4-react';

//-----Jodit Editor
import JoditEditor from "jodit-react";

// Styling
class SendNotification extends Component {

    constructor(props) {

        super(props);

        this.state = {
            isEnable: false,
            contentValue: '',
            notificationMessage: '',
            title:''
        }
    }



    contentUpdateHandler = (event) => {
        const data = event;
        this.setState({
            isEnable: true,
            contentValue: data
        })
    }




    componentDidMount() {
        this.props.fetchLanguage();
        this.props.fetchEpisodes();
        this.props.fetchChannel();
        this.props.fetchShows();
        this.props.fetchLocation()
    }

    onChange = (e) => {
        this.setState({ [e.target.name]: e.target.value == "India" ? "" : e.target.value })
    }


    onSubmitOnboarding = (event) => {
        console.log("=-=-=->>", this.state)
        event.preventDefault();
        this.props.sendNotificationAction(this.state)
            .then(function (response) {
                if (response && response.banner && response.status == 201) {
                    alert('Notification sent successfully');
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
        const { language, chanels, shows, episode, location } = this.props
        console.log()
        return (
            <Fragment>
                <form onSubmit={this.onSubmitOnboarding} required>
                    <div className="creation_content">
                        <Row>
                            <Col md="12">
                                <Row>
                                    <Col sm="2" className="text-right">
                                        <Label>Title </Label>
                                    </Col>
                                    <Col sm="8" >
                                        <FormGroup>
                                            <Input type="text" name="title" onChange={this.onChange} required></Input>

                                        </FormGroup>
                                    </Col>
                                </Row>
                                <Row>
                                    <Col sm="2" className="text-right">
                                        <Label>Message: </Label>
                                    </Col>
                                    <Col sm="8" >
                                        <FormGroup>

                                            <JoditEditor
                                                value={this.state.notificationMessage}
                                                onBlur={newContent => this.contentUpdateHandler(newContent)}
                                                onChange={newContent => this.contentUpdateHandler(newContent)}
                                            />
                                        </FormGroup>
                                    </Col>
                                </Row>


                                <Row className="marB0">
                                    <Col sm="2"></Col>
                                    <Col sm="8" className="text-right">
                                        <button sm="6" className="text-right"
                                            className="btn btn-primary submit_btn1"
                                        >Send
                                    </button>
                                    </Col>
                                </Row>
                                <Row className="marB0">
                                    <Col sm="2"></Col>
                                    <Col sm="8" >
                                        <NavLink to="/masterdata/setting" exact >
                                            <span className="menu-item-text">Update Notification Rule</span>
                                        </NavLink>
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

});
export default connect(
    mapStateToProps, { fetchLanguage, uploadImage, sendNotificationAction, fetchChannel, fetchShows, fetchEpisodes, fetchLocation }
)(SendNotification);