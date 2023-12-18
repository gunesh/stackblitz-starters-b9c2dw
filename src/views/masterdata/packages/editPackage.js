import React, { Component, Fragment } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { Input, FormGroup, Row, Col, Label } from "reactstrap";
import { PlusCircle, Edit2 } from "react-feather";
import { updatePackage, } from '../../../redux/actions/masterDataFiles/packagesActions'
import "./viewauctions.scss";
import { withRouter } from 'react-router-dom';
import { compose } from 'redux';

class PackagesEdit extends Component {
    constructor(props) {
        super(props);
        this.state = {
            id: this.props.editPackageList.id,
            packageName: this.props.editPackageList.packageName,
            bonusPercentage: this.props.editPackageList.bonusPercentage,
            price: this.props.editPackageList.price,
            totalCoins: this.props.editPackageList.totalCoins,
            coins: this.props.editPackageList.coins,
            gratitudeCoins: this.props.editPackageList.gratitudeCoins,
            status: this.props.editPackageList.status,
            gstPercentage: this.props.editPackageList.gstPercentage,
            gstAmount: this.props.editPackageList.gstAmount,
            packAmount: this.props.editPackageList.packAmount,
            pricePerUnit: this.props.editPackageList.pricePerUnit,
        }
    }
    componentWillReceiveProps(nextProps) {
        if (nextProps.editPackageList.id !== this.state.id) {
            this.setState({
                id: nextProps.editPackageList.id,
                packageName: nextProps.editPackageList.packageName,
                bonusPercentage: nextProps.editPackageList.bonusPercentage,
                price: nextProps.editPackageList.price,
                totalCoins: nextProps.editPackageList.totalCoins,
                coins: nextProps.editPackageList.coins,
                gratitudeCoins: nextProps.editPackageList.gratitudeCoins,
                status: nextProps.editPackageList.status,
                gstPercentage: nextProps.editPackageList.gstPercentage,
                gstAmount: nextProps.editPackageList.gstAmount,
                packAmount: nextProps.editPackageList.packAmount,
                pricePerUnit: nextProps.editPackageList.pricePerUnit,

            })
        }
    }

    onChange = (e) => {
        this.setState({ [e.target.name]: e.target.value })
        this.setState({ totalCoins: Number(this.state.gratitudeCoins) + Number(this.state.coins) })
    }

    onAddPayment = (e) => {
        e.preventDefault();
        this.props.updatePackage(this.state)
            .then(function (response) {
                if (response && response.package && response.status == 202) {
                    alert('Package Updated successfully');
                    window.location.reload();
                }
                else if (response && response.message) {
                    alert(response.message);
                }
            }).catch(function (error) {
                console.log(error);
            })
            ;

    }
    render() {

        const { editPackageList } = this.props
        return (
            <Fragment>
                <form
                    //  onSubmit={this.onAddPayment}
                    required>
                    <div className="packages_section">
                        <Col sm="12">
                            <div className="creation_content">
                                <Row>
                                    <Col md="6">
                                        <Row>
                                            <Col md="5" className="text-right">
                                                <FormGroup>
                                                    <Label
                                                        for="exampleSelect">PACKAGE NAME</Label>
                                                </FormGroup>
                                            </Col>
                                            <Col md="6">
                                                <FormGroup>
                                                    <Input name="packageName" type="text" placeholder="Package Name"
                                                        value={this.state.packageName}
                                                        onChange={this.onChange} required />
                                                </FormGroup>
                                            </Col>
                                        </Row>
                                        <Row>
                                            <Col md="5" className="text-right">
                                                <FormGroup>
                                                    <Label for="exampleSelect">BONUS PERCENTAGE</Label>
                                                </FormGroup>
                                            </Col>
                                            <Col md="6">
                                                <FormGroup>
                                                    <Input type="text" name="bonusPercentage" placeholder="Bonus Percentage"
                                                        onChange={this.onChange.bonusPercentage}
                                                        value={this.state.bonusPercentage} required />
                                                </FormGroup>
                                            </Col>
                                        </Row>
                                        <Row>
                                            <Col md="5" className="text-right">
                                                <FormGroup>
                                                    <Label for="exampleSelect">GRATITUDE COINS</Label>
                                                </FormGroup>
                                            </Col>
                                            <Col md="6">
                                                <FormGroup>
                                                    <Input type="text" name="gratitudeCoins" placeholder="Gratitude Coins"
                                                        value={this.state.gratitudeCoins}
                                                        onChange={this.onChange} required />
                                                </FormGroup>
                                            </Col>
                                        </Row>
                                        <Row>
                                            <Col md="5" className="text-right">
                                                <FormGroup>
                                                    <Label
                                                        for="exampleSelect">GST Percentage</Label>
                                                </FormGroup>
                                            </Col>
                                            <Col md="6">
                                                <FormGroup>
                                                    <Input name="gstPercentage" type="text" placeholder="Gst %"
                                                        value={this.state.gstPercentage}
                                                        onChange={this.onChange} required />
                                                </FormGroup>
                                            </Col>
                                        </Row>
                                        <Row>
                                            <Col md="5" className="text-right">
                                                <FormGroup>
                                                    <Label
                                                        for="exampleSelect">GST Amount</Label>
                                                </FormGroup>
                                            </Col>
                                            <Col md="6">
                                                <FormGroup>
                                                    <Input name="gstAmount" type="text" placeholder="Gst Amount"
                                                        value={this.state.gstAmount}
                                                        onChange={this.onChange} required />
                                                </FormGroup>
                                            </Col>
                                        </Row>
                                    </Col>
                                    <Col md="6">
                                        <Row>
                                            <Col md="5" className="text-right">
                                                <FormGroup>
                                                    <Label for="exampleSelect">PRICE</Label>
                                                </FormGroup>
                                            </Col>
                                            <Col md="6">
                                                <FormGroup>
                                                    <Input type="text" name="price" placeholder="Price"
                                                        value={this.state.price}
                                                        onChange={this.onChange} required />
                                                </FormGroup>
                                            </Col>
                                        </Row>
                                        <Row>
                                            <Col md="5" className="text-right">
                                                <FormGroup>
                                                    <Label for="exampleSelect">COINS</Label>
                                                </FormGroup>
                                            </Col>
                                            <Col md="6">
                                                <FormGroup>
                                                    <Input type="text" name="coins" placeholder="Coins"
                                                        value={this.state.coins}
                                                        onChange={this.onChange} required />
                                                </FormGroup>
                                            </Col>
                                        </Row>
                                        <Row>
                                            <Col md="5" className="text-right">
                                                <FormGroup>
                                                    <Label for="exampleSelect">Pack Amount</Label>
                                                </FormGroup>
                                            </Col>
                                            <Col md="6">
                                                <FormGroup>
                                                    <Input type="text" name="packAmount" placeholder="Pack Amount"
                                                        value={this.state.packAmount}
                                                        onChange={this.onChange} />
                                                </FormGroup>
                                            </Col>
                                        </Row>
                                        <Row>
                                            <Col md="5" className="text-right">
                                                <FormGroup>
                                                    <Label for="exampleSelect">Total Coins</Label>
                                                </FormGroup>
                                            </Col>
                                            <Col md="6">
                                                <FormGroup>
                                                    <Input type="text" name="totalCoins" placeholder="Total Coins"
                                                        value={this.state.totalCoins}
                                                        onChange={this.onChange} />
                                                </FormGroup>
                                            </Col>
                                        </Row>
                                        <Row>
                                            <Col md="5" className="text-right">
                                                <FormGroup>
                                                    <Label for="exampleSelect">Price per unit</Label>
                                                </FormGroup>
                                            </Col>
                                            <Col md="6">
                                                <FormGroup>
                                                    <Input type="text" name="pricePerUnit" placeholder="Price per Unit"
                                                        value={this.state.pricePerUnit}
                                                        onChange={this.onChange} />
                                                </FormGroup>
                                            </Col>
                                        </Row>
                                        <Row>
                                            <Col sm="5">&nbsp;</Col>
                                            <Col sm="6" className="text-right"></Col>
                                        </Row>
                                        <Row>
                                            <Col sm="5"></Col>
                                            <Col sm="6" className="text-right">
                                                <button sm="6" className="text-right"
                                                    className="btn btn-primary submit_btn1"
                                                    onClick={this.onAddPayment}
                                                >Submit
                                        </button>
                                            </Col>
                                        </Row>
                                    </Col>
                                </Row>
                            </div>
                        </Col>
                    </div>
                </form>
            </Fragment>

        );
    }


}

export default compose(
    withRouter,
    connect(null, { updatePackage })
)(PackagesEdit);

