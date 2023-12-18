import React, { Component, Fragment } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { Row, Col, FormGroup, Label, Input } from "reactstrap";
import { X, Calendar } from "react-feather";
import { fetchLanguage } from '../../../../redux/actions/language/languageAction'
import {fetchLocation} from '../../../../redux/actions/location/locationActions'
import { uploadImage } from "../../../../redux/actions/imageUpload/uploadImageAction";
import { addOnboarding } from '../../../../redux/actions/masterDataFiles/bannerActions'
// Styling
class CreateBanner extends Component {

    constructor(props) {

        super(props);
        this.state = {
            ImgPath: "",
            contentValue: "",
            type: "ONBOARDING",
            images: "",
            location: "",
            languageId: ""
        }
    }
    SelectImg = (e) => {
        this.setState({ ImgPath: e.target.files[0].name })
        this.props.uploadImage(e.target.files[0]).then(
            (res) =>
                this.setState({ images: res.image.location[0] }))
    }
    deleteFile = () => {
        this.setState({ ImgPath: "" })
    }
    componentDidMount() {
        this.props.fetchLanguage();
        this.props.fetchLocation()
    }
    onChange = (e) => {
        this.setState({ [e.target.name]: e.target.value })
    }
    onSubmitOnboarding = (event) => {
        event.preventDefault();
        // console.log(">>",this.state)
        this.props.addOnboarding(this.state)
            .then(function (response) {
                if (response && response.onboarding && response.status == 201) {
                    alert('Onboarding added successfully');
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
        const { language,location} = this.props
        return (
            <Fragment>
                <form
                    onSubmit={this.onSubmitOnboarding}
                    required>
                    <div className="creation_content">
                        <Row>
                            <Col md="6">
                                <Row>
                                    <Col sm="5" className="text-right">
                                        <Label>Location </Label>
                                    </Col>
                                    <Col sm="6" className="text-right">
                                        <FormGroup>
                                            <Input type="select" className="custom_arrow" name="location" onChange={this.onChange}>
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
                                        <Label>Language </Label>
                                    </Col>
                                    <Col sm="6" className="text-right">
                                        <FormGroup>
                                            <Input type="select" className="custom_arrow" name="languageId" onChange={this.onChange}>
                                            <option value="">No Language</option>
                                                {language.language.map((item, index) => (
                                                    <option value={item.id} key={'CH_TYPE' + item.id}>{item.language}</option>
                                                ))}
                                            </Input>
                                        </FormGroup>
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
                                            <Input type="textarea" name="contentValue" placeholder="Description"
                                                onChange={this.onChange} required></Input>
                                        </FormGroup>
                                    </Col>
                                </Row>
                                <Row>
                                    <Col sm="5" className="text-right">
                                        <Label>STATUS: </Label>
                                    </Col>
                                    <Col sm="6" className="text-right">
                                        <FormGroup>
                                            <Input type="select" name="status" className="custom_arrow" onChange={this.onChange} required>
                                                <option></option>
                                                <option value="true">Enable</option>
                                                <option value="false">Disable</option>
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
                                                <img src={this.state.images} width='100px' />
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
    language: state.languagedata.language,
    location:state.locationdata.location.location

});
export default connect(
    mapStateToProps, { fetchLanguage, uploadImage, addOnboarding,fetchLanguage,fetchLocation}
)(CreateBanner);