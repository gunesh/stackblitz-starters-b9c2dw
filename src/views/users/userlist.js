import React, { Fragment, PureComponent } from "react";
import { isEmpty } from 'lodash';
import PropTypes from "prop-types";
import { PlusCircle, DownloadCloud } from "react-feather";
import { Row, Card, FormGroup, Col, Input, Label, Button, Table } from "reactstrap";
import { Edit2 } from "react-feather";
import { connect } from "react-redux";
import img_thumb from '../../assets/img/avatar-s-1.png';
import { fetchUsers, changeStatusUser } from '../../redux/actions/users/userActions'

class UserList extends PureComponent {
    constructor() {
        super();
        this.state = {
            status: '',
            id: "",
        };
        this.handleChange = this.handleChange.bind(this);
    }


    componentDidMount() {
        this.props.fetchUsers();
    }
    handleChange = (value, event) => {
        this.setState({
            id: value.id,
            status: value.status,
        })
        var data = { id: value.id, status: !value.status }
        this.props.changeStatusUser(data)
    }

    EditUser = (event) => {
        this.props.userInfo(event)
    }

    render() {
        const { users } = this.props;
        const UsersLists = (
            <div>

                <div className="auctionlist_content">
                    <Col sm="12">
                        <Table striped>
                            <thead>
                                <tr>
                                    <th>User Name</th>
                                    <th>First Name</th>
                                    <th>Last Name</th>
                                    <th>Email</th>
                                    <th>Mobile</th>
                                    <th>Role</th>
                                    <th>Gender</th>
                                    <th>Status</th>
                                    <th>Edit</th>
                                </tr>
                            </thead>
                            <tbody>
                                {users.users.map((item, index) => (
                                    <tr key={index}>
                                        <td>{item.username}</td>
                                        {/* <td><img src={item.showImage} width="40" height="40" /></td> */}
                                        <td>{item.firstName}</td>
                                        <td>{item.lastName}</td>
                                        <td>{item.email}</td>
                                        <td>{item.mobile}</td>
                                        <td>{item.roleId ? item.cmsRole.role : "--"}</td>
                                        <td>{item.gender}</td>
                                        <td>
                                            {this.state.id === item.id ? (<div className="custom-control custom-switch">
                                                <input type="checkbox" className="custom-control-input"
                                                    onChange={(event) => this.handleChange({ id: item.id, status: item.status }, event)}
                                                    defaultChecked={this.state.status} id={"customSwitch" + index}
                                                    onClick={this.clickSwitch}
                                                />
                                                <label className="custom-control-label" for={"customSwitch" + index} ></label>
                                            </div>) :
                                                (<div className="custom-control custom-switch">
                                                    <input type="checkbox" className="custom-control-input"
                                                        onChange={(event) => this.handleChange({ id: item.id, status: item.status }, event)}
                                                        defaultChecked={item.status} id={"customSwitch" + index}
                                                    />

                                                    <label onClick={this.clickSwitch} onChange={(event) => this.handleChange({ id: item.id, status: item.status }, event)} className="custom-control-label" for={"customSwitch" + index} ></label>
                                                </div>)
                                            }
                                        </td>
                                        <td>{<Edit2 size={21} className='pluscircle' onClick={() => this.EditUser(item)} />}</td>
                                    </tr>
                                ))}

                            </tbody>

                        </Table>
                    </Col>
                </div>

            </div>

        )

        return (
            <Fragment>
                {UsersLists}
            </Fragment>
        );
    }
}

const mapStateToProps = state => ({
    users: state.userdata.users,
});

// export default Users;

export default connect(
    mapStateToProps, { fetchUsers, changeStatusUser }
)(UserList);
