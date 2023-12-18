import React, { Component, Fragment } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { Row, Col, FormGroup, Label, Input } from "reactstrap";
import { X, Calendar } from "react-feather";
import {fetchLanguage,EditSelectedLanguage} from '../../../redux/actions/language/languageAction'
import "react-datepicker/dist/react-datepicker.css";

class EditBanner extends Component {

    constructor(props) {

        super(props);
        this.state = {
            id: this.props.EditLanguageList.id,
            languageCode: this.props.EditLanguageList.languageCode,
            languageOrder: "0",
            location: "",
            status: true,
            createdBy: null,
            language:this.props.EditLanguageList.language,
            languageTranslation:this.props.EditLanguageList.languageTranslation,
            locationType: "",
            createdAt:new Date(),
            updatedBy: null,
            updatedAt:null
        }
    }
    onLanguageChange = (e) => {
        this.setState({ language: e.target.value ,
                         languageTranslation:e.target.value
                        })
    }

    onLanguageCodeChange = (e) => {
        this.setState({ languageCode:e.target.value  })
    }
    onEditBoarding = () => {
        console.log('on edit====', this.state)
        this.props.EditSelectedLanguage(this.state);
    }
    render() {
        const { language,location} = this.props
        // console.log(">>>>EditLocationList",this.props.EditLanguageList)
        console.log(">>>>EditLocationList",this.state.language)
        return (
            <Fragment>
                <form>
                    <div className="creation_content">
                        <Row>
                            <Col md="6">
                            <Row>
                                    <Col sm="5" className="text-right">
                                        <Label>Language </Label>
                                    </Col>
                                    <Col sm="6" className="text-right">
                                        <FormGroup>
                                            <Input type="text" name="language" defaultValue={this.state.language} onChange={this.onLanguageChange} required></Input>
                                        </FormGroup>
                                    </Col>
                                </Row>
                                <Row>
                                    <Col sm="5" className="text-right">
                                        <Label>Language Code </Label>
                                    </Col>
                                    <Col sm="6" className="text-right">
                                        <FormGroup>
                                            <Input type="text" name="languageCode" defaultValue={this.state.languageCode} onChange={this.onLanguageCodeChange} required></Input>
                                            
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
    language: state.languagedata.language

});
export default connect(
    mapStateToProps, { fetchLanguage,EditSelectedLanguage}
)(EditBanner);
