import React, { Component, Fragment } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { Row, Col, FormGroup, Label, Input } from "reactstrap";
import { X, Calendar } from "react-feather";
import { updateAuctionCategory } from '../../../redux/actions/masterDataFiles/auctionCategoryActions'
import { withRouter } from 'react-router-dom';
import { compose } from 'redux';

// Styling
class EditChannel extends Component {

    constructor(props) {
        super(props);
        this.state = {
            id: this.props.CategoryList.id,
            auctionCategoryName: this.props.CategoryList.auctionCategoryName,
            auctionDescription: this.props.CategoryList.auctionDescription,
            status: this.props.CategoryList.status,
            bidPoints: this.props.CategoryList.bidPoints
        }
    }

    handleChange = (e) => {
        this.setState({ [e.target.name]: e.target.value })

    }

    componentWillReceiveProps(nextProps) {
        if (nextProps.CategoryList.id !== this.state.id) {
            this.setState({
                id: nextProps.CategoryList.id,
                auctionCategoryName: nextProps.CategoryList.auctionCategoryName,
                auctionDescription: nextProps.CategoryList.auctionDescription,
                status: nextProps.CategoryList.status,
                bidPoints: nextProps.CategoryList.bidPoints
            })
        }
    }

    onaddAuctionCategory = () => {
        this.props.updateAuctionCategory(this.state)

    }

    render() {
        const { chanels } = this.props
        return (
            <Fragment>
                <form onSubmit={this.onaddAuctionCategory} required >
                    <div className="creation_content">
                        <Row>
                            <Col md="6">
                                <Row>
                                    <Col sm="5" className="text-right">
                                        <Label>Auction Category Name: </Label>
                                    </Col>
                                    <Col sm="6" className="text-right">
                                        <Input type="text" placeholder="Auction Category Name" name="auctionCategoryName"
                                            value={this.state.auctionCategoryName}
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
                                            value={this.state.bidPoints}
                                            onChange={this.handleChange} required></Input>
                                    </Col>
                                </Row>
                            </Col>
                            <Col md="6">
                                <Row>
                                    <Col sm="5" className="text-right">
                                        <Label>Auction Description: </Label>
                                    </Col>
                                    <Col sm="6" className="text-right">
                                        <FormGroup>
                                            <Input type="textarea" placeholder="Enter description" name="auctionDescription"
                                                value={this.state.auctionDescription}
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
                                                {this.state.status ? <option>Enable</option> : <option>Disable</option>}
                                                {this.state.status ? <option>Disable</option> : <option>Enable</option>}
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


const mapStateToProps = state => ({
    chanels: state.chaneldata.chanels
});

export default compose(
    withRouter,
    connect(mapStateToProps, { updateAuctionCategory })
)(EditChannel);
