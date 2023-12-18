import React, { Component, Fragment } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { Row, Col, FormGroup, Label, Input } from "reactstrap";
import { X, Calendar } from "react-feather";
import { updateonBoarding } from '../../../../redux/actions/masterDataFiles/bannerActions';
import {fetchLocation} from '../../../../redux/actions/location/locationActions'
import { fetchLanguage } from '../../../../redux/actions/language/languageAction'
import { uploadImage } from "../../../../redux/actions/imageUpload/uploadImageAction";
// Styling
class EditBanner extends Component {
    constructor(props) {
        super(props);
        this.state = {
            id: this.props.EditBannerList.id,
            contentValue: this.props.EditBannerList.contentValue,
            images: this.props.EditBannerList.images,
            status: this.props.EditBannerList.status,
            type: "ONBOARDING",
            language: this.props.EditBannerList.language.language,
            location: this.props.EditBannerList.location,

        }
    }
    componentWillReceiveProps(nextProps) {
        if (nextProps.EditBannerList.id !== this.state.id) {
            this.setState({
                id: nextProps.EditBannerList.id,
                contentValue: nextProps.EditBannerList.contentValue,
                images: nextProps.EditBannerList.images,
                status: nextProps.EditBannerList.status,
                language: nextProps.EditBannerList.language.language,
                location: nextProps.EditBannerList.location,
            })
        }
    }
    SelectImg = (e) => {
        this.setState({ ImgPath: e.target.files[0].name })
        this.props.uploadImage(e.target.files[0]).then(
            (res) =>
                this.setState({ images: res.image.location[0] }))
    }
    componentDidMount() {
        this.props.fetchLanguage();
        this.props.fetchLocation()
    }
    deleteFile = () => {
        this.setState({ ImgPath: "" })
    }
    onChange = (e) => {
        this.setState({ [e.target.name]: e.target.value })
    }
    onEditBoarding = () => {
        this.props.updateonBoarding(this.state);
    }
    render() {
        console.log(">>>>", this.props.EditBannerList)
        const { language,location } = this.props
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
                                            <Input type="select" name="location" className="custom_arrow" name="location" onChange={this.onChange}>
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
                                            <Input type="select" className="custom_arrow" name="Language" onChange={this.onChange}>
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
                                            <Input type="textarea" placeholder="Description" name='contentValue'
                                                value={this.state.contentValue} onChange={this.onChange} ></Input>
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
                                                    <img src={this.state.images} width='100px' />
                                                    <span class="delete_file" onClick={this.deleteFile}>{<X size={16} />}</span>
                                                </div>
                                            ) : <div className="uploaded_img">
                                                    <img src={this.props.EditBannerList.images} width='100px' />
                                                </div>}
                                        </div>
                                    </Col>
                                </Row>


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
    language: state.languagedata.language,
    location:state.locationdata.location.location

});
export default connect(
    mapStateToProps, { fetchLanguage, uploadImage, updateonBoarding,fetchLocation }
)(EditBanner);
