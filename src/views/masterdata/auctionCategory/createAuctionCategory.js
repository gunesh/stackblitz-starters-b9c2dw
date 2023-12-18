import React, { Component, Fragment } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { Row, Col, FormGroup, Label, Input } from "reactstrap";
import { X, Calendar } from "react-feather";
import { AddAuctionCategory } from '../../../redux/actions/masterDataFiles/auctionCategoryActions'


class CreateAuctionCategory extends Component {

    constructor(props) {

        super(props);
        this.state = {
            auctionCategoryName: "",
            auctionDescription: "",
            status: "",
            bidPoints: ""
        }
    }
    handleChange = (e) => {

        this.setState({ [e.target.name]: e.target.value })
    }
    onaddAuctionCategory = (event) => {
        this.props.AddAuctionCategory(this.state)
        console.log(">>", this.state)
    }
    render() {

        return (
            <Fragment>
                <form onSubmit={this.onaddAuctionCategory} required>
                    <div className="creation_content">
                        <Row>
                            <Col md="6">
                                <Row>
                                    <Col sm="5" className="text-right">
                                        <Label>Auction Category Name: </Label>
                                    </Col>
                                    <Col sm="6" className="text-right">
                                        <Input type="text" placeholder="Auction Category Name" name="auctionCategoryName"
                                            onChange={this.handleChange} required></Input>
                                    </Col>
                                </Row>
                                <Row>
                                    <Col sm="5" className="text-right">
                                        <Label>Bid Points: </Label>
                                    </Col>
                                    <Col sm="6" className="text-right">
                                        <Input type="text" placeholder="Bid Points"
                                            name="bidPoints"
                                            onChange={this.handleChange} required></Input>
                                    </Col>
                                </Row>
                                {/* <Row>
                                    <Col sm="5" className="text-right">
                                        <Label>Created at: </Label>
                                    </Col>
                                    <Col sm="6" className="text-right">
                                        <FormGroup>
                                            <Input type="date" placeholder="Select Date" ></Input>
                                            {<Calendar size={21} className='calender_icon' />}
                                        </FormGroup>
                                    </Col>
                                </Row>  */}
                            </Col>
                            <Col md="6">
                                <Row>
                                    <Col sm="5" className="text-right">
                                        <Label>Auction Description: </Label>
                                    </Col>
                                    <Col sm="6" className="text-right">
                                        <FormGroup>
                                            <Input type="textarea" placeholder="Enter description" name="auctionDescription"
                                                onChange={this.handleChange} required></Input>
                                        </FormGroup>
                                    </Col>
                                </Row>
                                <Row>
                                    <Col sm="5" className="text-right">
                                        <Label>STATUS: </Label>
                                    </Col>
                                    <Col sm="6" className="text-right">
                                        <FormGroup>
                                            <Input type="select" className="custom_arrow" name="status"
                                                onChange={this.handleChange} required>
                                                <option></option>
                                                <option value="true">Enable</option>
                                                <option value="false">Disable</option>
                                            </Input>
                                        </FormGroup>
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

// export default Users;

export default connect(
    null, { AddAuctionCategory }
)(CreateAuctionCategory);
