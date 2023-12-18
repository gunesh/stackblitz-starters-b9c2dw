import React, { Component, Fragment } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { Row, Col, FormGroup, Label, Input } from "reactstrap";
import { X, Calendar } from "react-feather";
import { withRouter } from 'react-router-dom';
import { compose } from 'redux';
import { saveEpisode } from '../../redux/actions/episode/episodeAction';
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";


// Styling
class CreateEpisode extends Component {

    constructor(props) {
        super(props);
        this.state = {
            description: "",
            episodeDate: "",
            episodeStartTime: new Date(),
            season: "2",
            channelId: "",
            showId: "",
            episodeEndTime: new Date(),
            status: "",
            createdBy: JSON.parse(localStorage.getItem('user')).id,
            updatedBy: JSON.parse(localStorage.getItem('user')).id,

        }

    }
    onChange = (e) => {

        this.setState({ [e.target.name]: e.target.value })

    }
    handleStartDateChange = date => {
        //let data = new Date();
        //  data.setHours(date.getHours() + 5, date.getMinutes() + 30, 0, 0);
        this.setState({
            episodeStartTime: date
        });
    };
    handleEndDateChange = date => {
        // let data = new Date();
        // data.setHours(date.getHours() + 5, date.getMinutes() + 30, 0, 0);
        this.setState({
            episodeEndTime: date
        });
    };
    onChangestart = (e) => {
        var d = new Date();
        const isoDate = d.toISOString().toString()
        var data = isoDate.slice(0, 11) + e.target.value + ":00.000Z";
        this.setState({ episodeStartTime: data })
    }
    onChangeEnd = (e) => {
        var d = new Date();
        const isoDate = d.toISOString().toString()
        var data = isoDate.slice(0, 11) + e.target.value + ":00.000Z";
        this.setState({ episodeEndTime: data })

    }
    onSelectStatus = (e) => {
        if (e.target.value === "Enable") {
            this.setState({ status: true })
        } else {
            this.setState({ status: false })
        }

    }
    onAddEpisode = (event) => {
        event.preventDefault();
        this.props.saveEpisode(this.state).then(function (response) {
            if (response && response.episode && response.status == 201) {
                alert('Episode added successfully');
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
        const { shows, chanels } = this.props
        return (
            <Fragment>

                <form onSubmit={this.onAddEpisode} required>
                    <div className="creation_content">
                        <Row>
                            <Col md="6">
                                <Row>
                                    <Col sm="5" className="text-right">
                                        <Label>Show Name: </Label>
                                    </Col>
                                    <Col sm="6" className="text-right">
                                        <Input type="select" name="showId" className="custom_arrow" onChange={this.onChange} required>
                                            <option></option>
                                            {shows.shows.map((item, index) => (
                                                <option value={item.id} key={'SH_TYPE' + item.id}>{item.showName}</option>
                                            ))}
                                        </Input>
                                    </Col>
                                </Row>
                                <Row>

                                    <Col sm="5" className="text-right">
                                        <Label>Channel Name: </Label>
                                    </Col>
                                    <Col sm="6" className="text-right">
                                        <Input type="select" name="channelId" className="custom_arrow" onChange={this.onChange} required>
                                            <option></option>
                                            {chanels.chanels.map((item, index) => (
                                                <option value={item.id} key={'CH_TYPE' + item.id}>{item.channelName}</option>
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
                                            <Input type="textarea" name="description" placeholder="Short description"
                                                onChange={this.onChange} required />
                                        </FormGroup>
                                    </Col>
                                </Row>
                                <Row>
                                    <Col sm="5" className="text-right">
                                        <Label>Episode Date: </Label>
                                    </Col>
                                    <Col sm="6" className="text-right">
                                        <FormGroup>
                                            <Input type="date" name="episodeDate" placeholder="Episode Date" onChange={this.onChange} required></Input>
                                            {/* {<Calendar size={21} className='calender_icon' />} */}
                                        </FormGroup>
                                    </Col>
                                </Row>
                            </Col>
                            <Col md="6">

                                <Row>
                                    <Col sm="5" className="text-right">
                                        <Label>Episode Start Time: </Label>
                                    </Col>
                                    <DatePicker
                                        selected={this.state.episodeStartTime}
                                        onChange={this.handleStartDateChange}
                                        showTimeSelect
                                        timeFormat="HH:mm"
                                        timeIntervals={15}
                                        timeCaption="time"
                                        dateFormat="MMMM d, yyyy h:mm aa"
                                    />
                                    {/* <Col sm="6" className="text-right">
                                        <FormGroup>
                                            <Input type="time" name="episodeStartTime" placeholder="Episode Date" onChange={this.onChangestart} required></Input>
                                            {<Calendar size={21} className='calender_icon' />}
                                        </FormGroup>
                                    </Col> */}
                                </Row>
                                <Row>
                                    <Col sm="5" className="text-right">
                                        <Label>Episode End Time: </Label>
                                    </Col>
                                    <DatePicker
                                        selected={this.state.episodeEndTime}
                                        onChange={this.handleEndDateChange}
                                        showTimeSelect
                                        timeFormat="HH:mm"
                                        timeIntervals={15}
                                        timeCaption="time"
                                        dateFormat="MMMM d, yyyy h:mm aa"
                                    />
                                    {/* <Col sm="6" className="text-right">
                                        <FormGroup>
                                            <Input type="time" name="episodeEndTime" placeholder="Episode Date" onChange={this.onChangeEnd} required ></Input>
                                            {<Calendar size={21} className='calender_icon' />}
                                        </FormGroup>
                                    </Col> */}
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

// export default CreateEpisode;
const mapStateToProps = state => ({
    chanels: state.chaneldata.chanels,
    shows: state.showsdata.shows,
    episode: state.episodedata.episode
});

export default compose(
    withRouter,
    connect(mapStateToProps, { saveEpisode })
)(CreateEpisode);
