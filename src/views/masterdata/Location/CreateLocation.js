import React, { Component, Fragment } from "react";
import { connect } from "react-redux";
// import PropTypes from "prop-types";
import { Row, Col, FormGroup, Label, Input } from "reactstrap";
import { X, Calendar } from "react-feather";
import {fetchLocation,addAnotherLocation} from '../../../redux/actions/location/locationActions'
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
// Styling
class CreateBanner extends Component {

    constructor(props) {

        super(props);
        this.state = {
            status:true,
            updatedAt:null,
            id:"",
            city:null,
            createdBy:null,
            createdAt: new Date(),
            updatedBy:null,
            state:"",
            country:"India"
        }
    }


    componentDidMount() {
        this.props.fetchLocation()
    }

    onChange = (e) => {

        let lastitemId ;
        let location = this.props.location
        let lastItem =  location.length - 1
         if( location[lastItem] && location[lastItem].id) {
            console.log("=-=-=-=-=>>>>?>",location[lastItem].id) 
            lastitemId =  parseInt(location[lastItem].id) + 1
         }
        this.setState({
            state: e.target.value,
            id: lastitemId
            })
    }
    

    onSubmitOnboarding = (event) => {
        console.log("=-=-=->>",this.state)
        event.preventDefault();
        this.props.addAnotherLocation(this.state)
            .then(function (response) {
                if (response && response.banner && response.status == 201) {
                    alert('Location added successfully');
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
                                            <Input type="text" name="location" onChange={this.onChange} required></Input>
                                            
                                        </FormGroup>
                                    </Col>
                                </Row>

                               
                            </Col>
                            <Col md="6">
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
    location:state.locationdata.location.location


});
export default connect(
    mapStateToProps, {fetchLocation,addAnotherLocation}
)(CreateBanner);