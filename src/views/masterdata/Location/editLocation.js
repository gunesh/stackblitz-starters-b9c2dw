import React, { Component, Fragment } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { Row, Col, FormGroup, Label, Input } from "reactstrap";
import { X, Calendar } from "react-feather";
import {fetchLocation,EditSelectedLocation} from '../../../redux/actions/location/locationActions'
import "react-datepicker/dist/react-datepicker.css";

class EditBanner extends Component {

    constructor(props) {

        super(props);
        this.state = {
            status:true,
            updatedAt:null,
            id:this.props.EditLocationList.id,
            city:null,
            createdBy:null,
            createdAt: new Date(this.props.EditLocationList.createdAt),
            updatedBy:null,
            state:this.props.EditLocationList.state,
            country:"India"
        }
    }
   
   
    onChange = (e) => {
        this.setState({ state: e.target.value })
    }
    onEditBoarding = () => {
        console.log('on edit====', this.state)
        this.props.EditSelectedLocation(this.state);
    }
    render() {
        const { language,location} = this.props
        console.log(">>>>EditLocationList",this.props.EditLocationList.state)
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
                                            
                                            <Input type="text" name="location"  value={this.state.state} onChange={this.onChange} ></Input>

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
    location:state.locationdata.location.location

});
export default connect(
    mapStateToProps, { fetchLocation,EditSelectedLocation}
)(EditBanner);
