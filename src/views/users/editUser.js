import React, { Component, Fragment } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { Row, Col, Table, FormGroup, Label, Input } from "reactstrap";
import { X, Trash2 } from "react-feather";
import { updateUser } from '../../redux/actions/users/userActions'
import { withRouter } from 'react-router-dom';
import { compose } from 'redux';
import { uploadImage } from "../../redux/actions/imageUpload/uploadImageAction";
import { store } from "../../redux/storeConfig/store";
// import {Redirect} from 'react-router-dom';
// Styling
class EditUser extends Component {
    constructor(props) {
        super(props);
        this.state = {
            firstName: this.props.EditUserList.firstName,
            username: this.props.EditUserList.username,
            gender: this.props.EditUserList.gender,
            id: this.props.EditUserList.id,
            mobile: this.props.EditUserList.mobile,
            status: this.props.EditUserList.status,
            profilePicture: this.props.EditUserList.profilePicture,
            email: this.props.EditUserList.email,
            createdBy: this.props.EditUserList.createdBy,
            lastName: this.props.EditUserList.lastName,
            updatedBy: this.props.EditUserList.updatedBy,
            roleId: this.props.EditUserList.roleId,
            ImgPath: ""
        }

    }
    onChange = (e) => {
        this.setState({ [e.target.name]: e.target.value })

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
    componentWillReceiveProps(nextProps) {

        // You don't have to do this check first, but it can help prevent an unneeded render
        if (nextProps.EditUserList.id !== this.state.id) {
            this.setState({
                firstName: nextProps.EditUserList.firstName,
                username: nextProps.EditUserList.username,
                gender: nextProps.EditUserList.gender,
                id: nextProps.EditUserList.id,
                mobile: nextProps.EditUserList.mobile,
                status: nextProps.EditUserList.status,
                profilePicture: nextProps.EditUserList.profilePicture,
                email: nextProps.EditUserList.email,
                createdBy: nextProps.EditUserList.createdBy,
                lastName: nextProps.EditUserList.lastName,
                updatedBy: nextProps.EditUserList.updatedBy,
                roleId: nextProps.EditUserList.roleId
            })
        }
    }
    deleteFile = () => {
        this.setState({ ImgPath: "" })
    }

    onEditUser = (event) => {
        event.preventDefault();
        console.log(this.state, "this iddd")
        this.props.updateUser(this.state);
        // this.props.history.push('/Products')
    }
    render() {
        const rolesdata = this.props.roles.roles;
        let rolesOptions = rolesdata.map((role) =>
            <option value={role.id} selected={this.state.roleId === role.id ? 'selected' : null} key={role.id}>{role.role}</option>
        );
        const { EditUserList } = this.props
        return (
            <Fragment>
                <form>
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
                                                value={EditUserList.username}
                                                onChange={this.onChange} />
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
                                                value={this.state.firstName}
                                                onChange={this.onChange} />
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
                                                value={this.state.lastName}
                                                onChange={this.onChange} />
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
                                                value={this.state.email}
                                                onChange={this.onChange} />
                                        </FormGroup>
                                    </Col>
                                </Row>
                            </Col>
                            <Col md="6">

                                <Row>
                                    <Col sm="5" className="text-right">
                                        <Label>Mobile: </Label>
                                    </Col>
                                    <Col sm="6" className="text-right">
                                        <FormGroup>
                                            <Input type="text" name="mobile" placeholder="Mobile"
                                                value={this.state.mobile}
                                                onChange={this.onChange} />
                                        </FormGroup>
                                    </Col>
                                </Row>
                                {/* <Row>
                                    <Col sm="5" className="text-right">
                                        <Label>Gender: </Label>
                                    </Col>
                                    <Col sm="6" className="text-right">
                                        <FormGroup>
                                               <Input type="select" name="gender"className="custom_arrow" onChange={this.onChange}>
                                               {this.props.EditUserList.gender === 'Male' ? <option>Male</option>:<option>Female</option>}
                                                {this.props.EditUserList.status ==='Female'  ?<option>Male</option>: <option>Female</option>}
                                            </Input>
                                        </FormGroup>
                                    </Col>
                                </Row>   */}
                                <Row>
                                    <Col sm="5" className="text-right">
                                        <Label>STATUS: </Label>
                                    </Col>
                                    <Col sm="6" className="text-right">
                                        <FormGroup>
                                            <Input type="select" name="status" className="custom_arrow" onChange={this.onSelectStatus}>
                                                {this.props.EditUserList.status ? <option>Enable</option> : <option>Disable</option>}
                                                {this.props.EditUserList.status ? <option>Disable</option> : <option>Enable</option>}
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
                                                <input type="file" id="resume" class="inputfile inputfile-2" onChange={this.SelectImg} data-multiple-caption="{count} files selected" multiple="" />
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
                                            onClick={this.onEditUser}>Submit
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






export default compose(
    withRouter,
    connect(null, { updateUser, uploadImage })
)(EditUser);
