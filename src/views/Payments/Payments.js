import React, { Fragment, PureComponent } from "react";
import { isEmpty } from 'lodash';
import PropTypes from "prop-types";
import { PlusCircle, DownloadCloud } from "react-feather";
import { Row, Card, FormGroup, Col, Input, Label, Button, Table } from "reactstrap";
import { connect } from "react-redux";
import '../auctions/createauctions/viewauctions.scss'
import {fetchPayment} from '../../redux/actions/payments/payments'

// import download_invoice from '../../assets/img/pdf1.svg';
// import add_coin from '../../assets/img/add_coin.svg';

class Payments extends PureComponent {
    render() {

        const Paymentss = (
            <Fragment>
                <h6>Payments</h6>
                <Card>
                <div>
                    <Row>
                        <Col sm="12">
                            <div className="aucionlist_filters">
                                <Row>
                                    <Col sm="2">
                                        <FormGroup>
                                            <Label for="exampleSelect">User Name</Label>
                                            <Input type="text" placeholder="User Name" ></Input>
                                        </FormGroup>
                                    </Col>
                                    <Col sm="2">
                                        <FormGroup>
                                            <Label for="exampleSelect">Reference ID</Label>
                                            <Input type="text" placeholder="Enter Reference ID" ></Input>
                                        </FormGroup>
                                    </Col>
                                    <Col sm="2">
                                        <Label for="exampleSelect">Reference ID</Label>                                    
                                        <div className="form-group">                                
                                            <select className="form-control custom_arrow" >
                                                <option value="">Select Type</option>
                                                <option value="1">Success</option>
                                                <option value="2">Failed</option>
                                            </select>
                                        </div>
                                    </Col>
                                    <Col sm="2">
                                        <div>&nbsp;</div>
                                        <Button color="primary">Submit</Button>
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
                                        <th>User Name</th>
                                        <th>Payment Gateway</th>
                                        <th>Reference ID</th>
                                        <th>Package</th>
                                        <th>Amount</th>
                                        <th>Status</th>
                                        <th>&nbsp;</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr>
                                        <td><a href="">Amritha</a></td>
                                        <td>Paypal</td>
                                        <td>5879</td>
                                        <td>Gold</td>
                                        <td>542</td>
                                        <td className="success_text">Success</td>
                                        <td>
                                            {/* <img src={add_coin} width="24" className="marR10" />
                                            <img src={download_invoice} width="24" /> */}
                                        </td>
                                    </tr>
                                    <tr>
                                        <td><a href="">Amritha</a></td>
                                        <td>Paypal</td>
                                        <td>5879</td>
                                        <td>Gold</td>
                                        <td>542</td>
                                        <td className="success_text">Success</td>
                                        <td>                                        
                                            {/* <img src={add_coin} width="24" className="marR10" />
                                            <img src={download_invoice} width="24" /> */}
                                        </td>
                                    </tr>
                                    <tr>
                                        <td><a href="">Amritha</a></td>
                                        <td>Paypal</td>
                                        <td>5879</td>
                                        <td>Gold</td>
                                        <td>542</td>
                                        <td className="failed_text">Failed</td>
                                        <td>                                        
                                            {/* <img src={add_coin} width="24" className="marR10" />
                                            <img src={download_invoice} width="24" /> */}
                                        </td>
                                    </tr>
                                    <tr>
                                        <td><a href="">Amritha</a></td>
                                        <td>Paypal</td>
                                        <td>5879</td>
                                        <td>Gold</td>
                                        <td>542</td>
                                        <td className="success_text">Success</td>
                                        <td>                                        
                                            {/* <img src={add_coin} width="24" className="marR10" />
                                            <img src={download_invoice} width="24" /> */}
                                        </td>
                                    </tr>
                                </tbody>
                            </Table>
                        </Col>
                    </div>

                </div>
                </Card>
            </Fragment>
                
        )

        return (
            <Fragment>
                {Paymentss}
            </Fragment>
        );
    }
}
Payments.propTypes = {
    fetchPayment: PropTypes.func.isRequired,
}

const mapStateToProps = state => ({
    payment: state.paymentdata.payment,
   
});
export default 
 
  connect(mapStateToProps, { fetchPayment }
)(Payments);

// export default Payments;