import React, { Component, Fragment } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { Row, Col, Table, FormGroup, Label, Input } from "reactstrap";
import { X, Trash2 } from "react-feather";
import { saveUser } from '../../redux/actions/users/userActions'
import { withRouter } from 'react-router-dom';
import { compose } from 'redux';
import { uploadImage } from "../../redux/actions/imageUpload/uploadImageAction";
import { fetchUserRoles } from '../../redux/actions/users/userActions';
import { store } from "../../redux/storeConfig/store";
// import {Redirect} from 'react-router-dom';
// Styling
class AddUser extends Component {
    constructor(props) {
        super(props);
        this.state = {
            firstName: "",
            username: "",
            gender: "",
            mobile: "",
            status: true,
            profilePicture: "",
            email: "",
            createdBy: JSON.parse(localStorage.getItem('user')).id,
            lastName: "",
            updatedBy: JSON.parse(localStorage.getItem('user')).id,
            roleId: "",
            ImgPath: "",
            password: "",
        }

    }
    onChange = (e) => {
        this.setState({ [e.target.name]: e.target.value })

    }
    componentDidMount() {
        this.props.fetchUserRoles();
    }
    SelectImg = (e) => {
        this.setState({ ImgPath: e.target.files[0].name })
        this.props.uploadImage(e.target.files[0]).then(
            (res) =>
                this.setState({ profilePicture: res.image.location[0] }))
    }
    onSelectStatus = (e) => {
        if (e.target.value === "Enable") {
            this.setState({ status: true })
        } else {
            this.setState({ status: false })
        }

    }
    deleteFile = () => {
        this.setState({ ImgPath: "" })
    }
    onEditUser = (event) => {
        event.preventDefault();
        this.props.saveUser(this.state).then(function (response) {
            if (response && response.status == 201) {
                alert('User added successfully');
                window.location.reload();
            }
            else if (response && response.message) {
                alert(response.message);
            }
        }).catch(function (error) {
            alert(error);
        });
    }
    render() {
        const rolesdata = this.props.roles.roles;
        let rolesOptions = rolesdata.map((role) =>
            <option value={role.id} key={role.id}>{role.role}</option>
        );
        return (
            <Fragment>
                <form onSubmit={this.onEditUser} required>
                    <div className="creation_content">
                        <Row>
                            <Col md="6">
                                <Row>
                                    <Col sm="5" className="text-right">
                                        <Label>User Name: </Label>
                                    </Col>
                                    <Col sm="6" className="text-right">
                                        <FormGroup>
                                            <Input type="text" name="username" placeholder="User Name"
                                                onChange={this.onChange} required />
                                        </FormGroup>
                                    </Col>
                                </Row>
                                <Row>
                                    <Col sm="5" className="text-right">
                                        <Label>Password: </Label>
                                    </Col>
                                    <Col sm="6" className="text-right">
                                        <FormGroup>
                                            <Input type="password" name="password" placeholder="Password"
                                                onChange={this.onChange} required />
                                        </FormGroup>
                                    </Col>
                                </Row>
                                <Row>
                                    <Col sm="5" className="text-right">
                                        <Label>First Name: </Label>
                                    </Col>
                                    <Col sm="6" className="text-right">
                                        <FormGroup>
                                            <Input type="text" name="firstName" placeholder="First Name"
                                                onChange={this.onChange} required />
                                        </FormGroup>
                                    </Col>
                                </Row>
                                <Row>
                                    <Col sm="5" className="text-right">
                                        <Label>Last Name: </Label>
                                    </Col>
                                    <Col sm="6" className="text-right">
                                        <FormGroup>
                                            <Input type="text" name="lastName" placeholder="Last Name"
                                                onChange={this.onChange} required />
                                        </FormGroup>
                                    </Col>
                                </Row>
                                <Row>
                                    <Col sm="5" className="text-right">
                                        <Label>Email: </Label>
                                    </Col>
                                    <Col sm="6" className="text-right">
                                        <FormGroup>
                                            <Input type="email" name="email" placeholder="Email"
                                                onChange={this.onChange} required />
                                        </FormGroup>
                                    </Col>
                                </Row>                               </Col>
                            <Col md="6">

                                <Row>
                                    <Col sm="5" className="text-right">
                                        <Label>Mobile: </Label>
                                    </Col>
                                    <Col sm="6" className="text-right">
                                        <FormGroup>
                                            <Input type="text" name="mobile" placeholder="Mobile"
                                                onChange={this.onChange} required />
                                        </FormGroup>
                                    </Col>
                                </Row>
                                <Row>
                                    <Col sm="5" className="text-right">
                                        <Label>Gender: </Label>
                                    </Col>
                                    <Col sm="6" className="text-right">
                                        <FormGroup>
                                            <Input type="select" name="gender" className="custom_arrow" onChange={this.onChange} required>
                                                <option disabled selected value="">Select Gender</option>
                                                <option>Male</option>
                                                <option>Female</option>
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
                                            <Input type="select" name="status" className="custom_arrow" onChange={this.onSelectStatus} required>
                                                <option disabled selected value="">Select Status</option>
                                                <option value="Enable">Enable</option>
                                                <option value="Disable">Disable</option>
                                            </Input>
                                        </FormGroup>
                                    </Col>
                                </Row>
                                <Row>
                                    <Col sm="5" className="text-right">
                                        <Label>ROLES: </Label>
                                    </Col>
                                    <Col sm="6" className="text-right">
                                        <FormGroup>
                                            <select name="roleId" className="form-control" onChange={this.onChange} required >
                                                <option disabled selected value="">Select Role</option>
                                                {rolesOptions}
                                            </select>
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
                                                <img src={this.state.profilePicture} width='100px' />
                                                <span class="delete_file" onClick={this.deleteFile}>{<X size={16} />}</span>
                                            </div>) : null}
                                        </div>

                                    </Col>
                                </Row>
                                <Row>
                                    <Col sm="5" className="text-right">
                                        &nbsp;
                                    </Col>
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
    roles: state.userdata.roles
});
export default compose(
    withRouter,
    connect(mapStateToProps, { saveUser, uploadImage, fetchUserRoles })
)(AddUser);
