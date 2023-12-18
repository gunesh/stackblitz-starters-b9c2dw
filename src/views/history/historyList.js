import React, { Fragment, PureComponent } from "react";
import { Row, Card, FormGroup, Col, Input, Label, Button, Table } from "reactstrap";
import { getCallHistory, searchHistory } from '../../redux/actions/customers/customersAction';
import { withRouter } from 'react-router-dom';
import { compose } from 'redux';
import { connect } from "react-redux";
import '../auctions/createauctions/viewauctions.scss';
import ViewDetails from '../history/viewDetails';

class HistoryList extends PureComponent {
    constructor() {
        super();
        this.state = {
            userId: "",
            callStatus: "",
            rescheduledTime: "",
            status: "",
            id: "",
            callcenterUsesrId: "",
            callcenterReferenceId: "",
            notes: ""
        };

    }

    componentDidMount() {
        this.props.getCallHistory();
    }
    handleChange = (value, event) => {
        this.setState({
            id: value.id,
            status: value.status,
        })
        var data = { id: value.id, status: !value.status }
        this.props.changeStatusCustomer(data)
    }
    onChange = (e) => {
        this.setState({ [e.target.name]: e.target.value })
    }
    onSearchCustomer = (event) => {
        event.preventDefault();
        Object.keys(this.state).forEach(k => (!this.state[k] && this.state[k] !== undefined) && delete this.state[k]);
        const data = this.state;
        if (Object.keys(data).length === 0) {
            this.props.getCallHistory();
        }
        else {
            this.props.searchHistory(data.firstName)
        }

    }
    render() {
        const { callhistory } = this.props.callHistory;

        const CustomerLists = (
            <Fragment>
                <h6>Call History</h6>
                <Card>
                    <div>
                        <Row>
                            <Col sm="12">
                                <div className="aucionlist_filters">
                                    <Row>
                                        <Col sm="6">
                                            <FormGroup>
                                                <Label for="exampleSelect">Enter Name / Number</Label>
                                                <Input type="text" name="firstName" placeholder="Enter Contact Number" onChange={this.onChange} ></Input>
                                            </FormGroup>
                                        </Col>
                                        <Col sm="2">
                                            <div>&nbsp;</div>
                                            <Button
                                                onClick={this.onSearchCustomer}
                                                color="primary">Submit</Button>
                                        </Col>
                                    </Row>
                                </div>
                            </Col>
                        </Row>
                        <div className="auctionlist_content">
                            <Col sm="12">
                                <Table striped>
                                    <thead>
                                        <tr>
                                            <th>Customer Full Name</th>
                                            <th>Call Time</th>
                                            <th>Contact Number</th>
                                            <th>Call Details</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {callhistory.length > 0 ? callhistory.map((item, index) => (
                                            <tr key={index}>
                                                <td><a href={`/#/customersUserprofile/${item.userId}`}>{item.userId ? item.user.firstName : "--"}</a></td>
                                                <td>{item.createdAt ? item.createdAt : "--"}</td>
                                                <td>{item.userId ? item.user.mobile : "--"}</td>
                                                <td>{<ViewDetails notesdata={item} />}</td>
                                            </tr>
                                        )
                                        ) : <p style={{ textAlign: "right" }}>No CallHistory Found</p>}
                                    </tbody>
                                </Table>
                            </Col>
                        </div>
                    </div>
                </Card>
            </Fragment >

        )

        return (
            <Fragment>
                {CustomerLists}
            </Fragment>
        );
    }
}

const mapStateToProps = state => ({
    callHistory: state.customerData.callHistory
});

export default compose(
    withRouter,
    connect(mapStateToProps, { getCallHistory, searchHistory })
)(HistoryList);
