import React, { Component, Fragment } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { Input, FormGroup, Row, Col, Label } from "reactstrap";
import { PlusCircle, Edit2 } from "react-feather";
import {savePackage} from '../../../redux/actions/masterDataFiles/packagesActions'
import "./viewauctions.scss";
import { withRouter } from 'react-router-dom';
import { compose } from 'redux';

class PackagesCreate extends Component {
       constructor(props) {
        super(props);
        this.state = {
            packageName:"",
            bonusPercentage:"",
            price:"",
            totalCoins: 0,
            coins:0,
            gratitudeCoins:0,
            status:true,
            gstPercentage:"",
            gstAmount:"",
            packAmount:"",
            pricePerUnit:"",

        }
    }
onChange=(e)=>{   
this.setState({ [e.target.name] : e.target.value})
// this.setState({totalCoins:Number(this.state.gratitudeCoins) + Number(this.state.coins)})
    }

    onAddPayment=(e)=>{
        
        //  let path = `/#/masterdata/packages`;
     this.props.savePackage(this.state);
    // this.props.history.push(path);  
    window.location.reload(); 
    }
    render() {
        return (
            <Fragment>
             <form onSubmit={this.onAddPayment} required>
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
                                                <Input  name="packageName" type="text" placeholder="Package Name"
                                                 onChange={this.onChange} required/>
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
                                                onChange={this.onChange} required/>
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
                                                <Input type="text" name="gratitudeCoins"  placeholder="Gratitude Coins"
                                                 onChange={this.onChange} required/>
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
                                                <Input  name="gstPercentage" type="text" placeholder="Gst %"
                                                 onChange={this.onChange} required/>
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
                                                <Input  name="gstAmount" type="text" placeholder="Gst Amount"
                                                 onChange={this.onChange} required/>
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
                                                <Input type="text" name="price"  placeholder="Price"
                                                 onChange={this.onChange} required/>
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
  connect(null, { savePackage })
)(PackagesCreate);

