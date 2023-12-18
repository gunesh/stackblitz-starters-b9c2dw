import React, { Fragment, PureComponent } from "react";
import PropTypes from "prop-types";
import { Smartphone } from "react-feather";
import { Row, Card, CardBody, Col, Button, FormGroup, Input, Label, CustomInput } from "reactstrap";
import '../auctions/createauctions/viewauctions.scss';
import { fetchCustomerProfile, updateWallet, updateNotes } from '../../redux/actions/customers/customerProfileAction';
import { withRouter } from 'react-router-dom';
import { compose } from 'redux';
import { connect } from "react-redux";
import { Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";




class ProfilePage extends PureComponent {
    constructor() {
        super();
        this.state = {
            modal: false,
            creditedCoins: "",
            balanceCoins: "",
            status: true,
            userId: "",
            callStatus: "",
            notes: "",
            isRescheduled: false,
            callcenterReferenceId: "",
            rescheduled_time: new Date(),
            createdBy: JSON.parse(localStorage.getItem('user')).id,
            callcenterUserId: JSON.parse(localStorage.getItem('user')).id
        };

    }
    componentDidMount() {
        const custometid = this.props.match.params.custometid
        this.setState({ userId: custometid })
        this.props.fetchCustomerProfile(custometid)

    }
    toggle = () => {
        this.setState({ modal: !this.state.modal });
    }
    onCredit = (e) => {
        this.setState({ [e.target.name]: e.target.value })
        this.setState({ balanceCoins: e.target.value })
    }
    onAddCoins = () => {
        const data = {
            creditedCoins: this.state.creditedCoins,
            balanceCoins: this.state.balanceCoins,
            status: true,
            userId: this.state.userId
        }
        this.setState({ modal: !this.state.modal });
        this.props.updateWallet(data).then(function (response) {

            window.location.reload();
        }).catch(function (error) {
            console.log(error);
        });

    }
    handleRescheduledChange = date => {
        // let data = new Date();
        //  data.setHours(date.getHours() + 5, date.getMinutes() + 30, 0, 0);
        this.setState({
            rescheduled_time: date
        });
    };
    onChange = (e) => {
        if (e.target.value === 'CALL_RESCHEDULED') {
            this.setState({ isRescheduled: true })
        }
        else {
            this.setState({ isRescheduled: false })
        }
        this.setState({ [e.target.name]: e.target.value })


    }
    onNoteSubmit = () => {
        const data1 = {
            userId: this.state.userId,
            notes: this.state.notes,
            callStatus: this.state.callStatus,
            createdBy: this.state.createdBy,
            callcenterReferenceId: this.state.callcenterReferenceId
        }
        this.props.updateNotes(data1).then(function (response) {

            window.location.reload();
        }).catch(function (error) {
            console.log(error);
        });
    }
    onBackPage = () => {
        window.location.assign("/#/customers")

    }
    onHistoryPage = (id) => {
        window.location.assign("/#/purchasehistory/" + id)

    }
    onUserHistoryPage = (id) => {
        window.location.assign("/#/usersummary/" + id)

    }
    render() {
        console.log(this.state)
        const { customers } = this.props.customer
        const ProfilePages = (
            <Fragment>
                <Card>
                    <CardBody>
                        <Row className="marB0">
                            <Col sm="5">
                                <button sm="6" className="text-right"
                                    className="btn btn-primary submit_btn1 marT0"
                                    onClick={this.onBackPage}>Back
                                </button>
                            </Col>
                            <Col sm="7" className="text-right">
                                <button sm="7" className="text-right"
                                    className="btn btn-primary submit_btn1 marT0"
                                    onClick={this.onHistoryPage.bind(this, customers.id)}>Purchase History
                                </button>
&nbsp;
                                <button sm="7" className="text-right"
                                    className="btn btn-primary submit_btn1 marT0"
                                    onClick={this.onUserHistoryPage.bind(this, customers.id)}>Coin Summary
                                </button>
                            </Col>
                        </Row>
                        <Row>
                            <Col sm="12">
                                <div className="profile_details">
                                    <div className="profile_pic">
                                        <div className="user_active"><img src={customers.profilePicture} /></div>
                                    </div>
                                    <div className="profile_deta profile_active">
                                        <h5>{customers.firstName}</h5>

                                        <p>{<Smartphone size={18} />} {customers.mobile}</p>
                                    </div>
                                </div><br />
                            </Col>
                            <Col sm="12">
                                <Row>

                                    <Col sm="6">

                                        <div className="marB15">
                                            <div className="label_text">Address</div>
                                            {customers.address ? <div className="label_text1">{customers.address.addressLine1 + " " + customers.address.addressLine2}</div> : <div>---</div>}

                                        </div>
                                        <div className="marB15">
                                            <div className="label_text">Login Source</div>
                                            <div className="label_text1">{customers.loginSource}</div>
                                        </div>
                                        <div className="marB15">
                                            <div className="label_text">User defualt language</div>
                                            <div className="label_text1">{customers.userLanguage}</div>
                                        </div>
                                        <div className="marB15">
                                            <div className="label_text">Total Bids participated</div>
                                            <div className="label_text1">{customers.totalbids}</div>
                                        </div>
                                    </Col>
                                    <Col sm="6">

                                        <div className="marB15">
                                            <div className="label_text">Total prizes won</div>
                                            <div className="label_text1">{customers.totalPrizes}</div>
                                        </div>
                                        <div className="marB15">
                                            <div className="label_text">Wallet Points</div>
                                            <div className="label_text1">{customers.totalBalanceCoins}</div>
                                        </div>

                                        <Button className="submit_btn1" onClick={this.toggle}>Add coins</Button>
                                    </Col>
                                </Row>
                                <Row className="callcenter_content">
                                    <Col md="6">
                                        <FormGroup>
                                            <Label for="exampleSelect">Call Center ReferenceId</Label>
                                            <Input type="text" name="callcenterReferenceId" value={this.state.callcenterReferenceId} onChange={this.onChange} ></Input>
                                        </FormGroup>
                                        <FormGroup>
                                            <Label for="exampleSelect">Your Message</Label>
                                            <Input type="textarea" rows="4" cols="120" placeholder="Type Your Message here..." name="notes" onChange={this.onChange} required />
                                        </FormGroup>
                                        <FormGroup>
                                            <div className="custome_radio">
                                                <CustomInput type="radio" name="callStatus" value="CALL_SUCCESSFULL" onClick={this.onChange} label="Call Successfully Done" id="callSuccsess" />

                                                <CustomInput type="radio" name="callStatus" value="CALL_DISCONNECTED" onClick={this.onChange} label="Call Decline" id="callDecline" />
                                                <CustomInput type="radio" name="callStatus" value="CALL_RESCHEDULED" onClick={this.onChange} label="Rescheduled Request" id="callRescheduled " /> <span>{this.state.isRescheduled === true ? <div>Reschedule Time :<DatePicker
                                                    selected={this.state.rescheduled_time}
                                                    onChange={this.handleRescheduledChange}
                                                    showTimeSelect
                                                    timeFormat="HH:mm"
                                                    timeIntervals={15}
                                                    timeCaption="time"
                                                    dateFormat="MMMM d, yyyy h:mm aa"
                                                /> </div> : null}</span>
                                            </div>
                                        </FormGroup>
                                        <FormGroup className="text-right">
                                            <Button onClick={this.onNoteSubmit} className="submit_btn1 marT0">Submit</Button>
                                        </FormGroup>
                                    </Col>
                                </Row>
                                <div>
                                    <Modal isOpen={this.state.modal} toggle={this.toggle} >
                                        <ModalHeader toggle={this.toggle}>Add Coins</ModalHeader>
                                        <ModalBody>
                                            <FormGroup>
                                                <Input type="number" name="creditedCoins" placeholder=""
                                                    onChange={this.onCredit} required />
                                            </FormGroup>
                                        </ModalBody>
                                        <ModalFooter>
                                            <Button color="primary" className="submit_btn1" onClick={this.onAddCoins}>ADD</Button>{' '}
                                        </ModalFooter>
                                    </Modal>
                                </div>
                            </Col>
                        </Row>
                    </CardBody>
                </Card>
            </Fragment>

        )

        return (
            <Fragment>
                {ProfilePages}
            </Fragment>
        );
    }
}
ProfilePage.contextTypes = {
    router: PropTypes.object.isRequired
}
const mapStateToProps = state => ({
    customer: state.customerData.customerProfile
});

export default compose(
    withRouter,
    connect(mapStateToProps, { fetchCustomerProfile, updateWallet, updateNotes })
)(ProfilePage);