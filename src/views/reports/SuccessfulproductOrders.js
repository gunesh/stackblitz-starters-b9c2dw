import React, { Fragment, PureComponent } from "react";
import { isEmpty } from 'lodash';
import PropTypes from "prop-types";
import { Calendar, DownloadCloud } from "react-feather";
import { Row, Card, Col, Label, Table, Button, FormGroup, Input } from "reactstrap";
import { fetchSuccessProductOrders,fetchSuccessfulOrderPdf } from '../../redux/actions/reports/reportActions';
import { connect } from "react-redux";
import '../auctions/createauctions/viewauctions.scss'
import ReactHTMLTableToExcel from 'react-html-table-to-excel'
import * as moment from 'moment';
import export_icon from '../../assets/img/export.png';
import pdfLogo  from  "../../assets/img/pdf_logo.png"
import { CSVLink, CSVDownload } from "react-csv";
var FileSaver  = require('file-saver');

class SuccessfulOrders extends PureComponent {
    constructor(props) {
        super(props);
        this.state = {
            fromDate: "",
            toDate: "" 
        }
    }
    componentDidMount() {
        // this.props.fetchSuccessOrders(this.state);
    }
    onChangeDateTime = (e) => {
        let data = new Date(e.target.value).toISOString();
        let NewDate = new Date(data);
        NewDate.setHours(NewDate.getHours() + 5, NewDate.getMinutes() + 30, 0, 0);
        this.setState({ [e.target.name]: NewDate.toISOString() })
    }
    formatDisplayTime = (dateTime) => {
        return moment(dateTime).format('DD/MM/YYYY')
    }
    // handleInvoiceChangeChange =(e) =>{
    //     this.setState({
    //         invoiceType:e.target.value
    //     })
    // }
    OnclickOrderDetail = (orderNumber,userId,invoiceType) =>{
   
       this.props.fetchSuccessfulOrderPdf(orderNumber,userId,invoiceType).then((response)=>{
           console.log("=-$$$=->>",response)
           
            var download = document.createElement("a");
            download.href = response.data;
            download.setAttribute("download",  "successfulorder.pdf");
            download.click();
           
       })
    }
    onFilterDate = () => {
        this.props.fetchSuccessProductOrders(this.state).then(function (response) {
            console.log("=-=-)))",response)
            if (response.status === 200) {
                alert(response.message)
            }
        }).catch(function (error) {
            console.log(error);
        });
    }
    render() {
        const { reports } = this.props.reports
        console.log(">>>>THIS.P",reports)
        const SuccessfulOrderss = (
            <Fragment>
                <h6>Successful Product Orders</h6>
                <Card>
                    <div>
                        <Row>
                            <Col sm="12">
                                <div className="aucionlist_filters">
                                    <Row>
                                        <Col sm="3">
                                            <FormGroup>
                                                <Label for="exampleSelect">From Date</Label>
                                                <Input type="date" id="fromDate" name="fromDate" data-toggle="tooltip" data-trigger="hover" data-placement="top" data-title="Date Opened" onChange={this.onChangeDateTime} />
                                            </FormGroup>
                                        </Col>
                                        <Col sm="3">
                                            <FormGroup>
                                                <Label for="exampleSelect">To Date</Label>
                                                <Input type="date" id="toDate" name="toDate" data-toggle="tooltip" data-trigger="hover" data-placement="top" data-title="Date Opened" onChange={this.onChangeDateTime} />
                                            </FormGroup>
                                        </Col>
                                        {/* <Col sm="2">
                                            <FormGroup>
                                                <Label for="exampleSelect">Invoice Type</Label>
                                                <Input type="select" className="custom_arrow" required onChange={this.handleInvoiceChangeChange}>
                                                    <option value="coin">Coin</option>
                                                    <option value="product">Product</option>
                                                </Input>
                                            </FormGroup>
                                        </Col> */}
                                        <Col sm="2">
                                            <div>&nbsp;</div>
                                            <Button color="primary" className="btn123" onClick={this.onFilterDate}>Submit</Button>
                                        </Col>
                                    </Row>
                                </div>
                            </Col>
                        </Row>
                        <div className="auctionlist_content">
                            <Col sm="12">
                                {this.props.reports && reports.length>0 ?
                                    <Table striped id="table-to-xls">
                                        <thead>
                                            <tr>
                                                <th>S.No</th>
                                                <th>Order date</th>  
                                                <th>Product Name</th>                                           
                                                <th>Order number</th>
                                                <th>User Name</th>
                                                <th>Price</th>
                                                {/* <th>Points purchased</th> */}
                                                {/*  <th>
                                         <CSVLink data={reports}>
                                        <img src={export_icon} width="24" height="24" alt="Export to excel" title="Export to excel" />
                                        </CSVLink></th> */}
                                              <th><ReactHTMLTableToExcel table="table-to-xls"
                                                    filename='SuccessFull_Order'
                                                    sheet='SuccessFull_Order'
                                                    buttonText={<img src={export_icon} width="24" height="24" alt="Export to excel" title="Export to excel" />} />
                                                </th>
                                            </tr>
                                        </thead>
                                        <tbody>{reports.map((SuccessfulOrders, index) => (
                                            <tr key={index}>
                                                <td>{index + 1}</td>
                                                <td>{this.formatDisplayTime(SuccessfulOrders.created_at)}</td>
                                                 <td>{SuccessfulOrders.product_name}</td> 
                                              <td>{SuccessfulOrders.order_number}</td>
                                                <td><a href={`/#/customersUserprofile/${SuccessfulOrders.user_id}`}>
                                                    {(SuccessfulOrders.first_name ? SuccessfulOrders.first_name : "") + " " + (SuccessfulOrders.last_name ? SuccessfulOrders.last_name : "")}</a></td>
                                                <td>{SuccessfulOrders.Price}</td>
                                                 {/* <td>{SuccessfulOrders.coins_credited}</td> */}
                                                 <td><button onClick={() => this.OnclickOrderDetail({orderNumber:SuccessfulOrders.order_number,
                                                                                                    userId:SuccessfulOrders.user_id,
                                                                                                    invoiceType:"product"
                                                        })}><img src={pdfLogo} alt={'PDFLOGO'}></img></button></td>
                                            </tr>
                                        ))}
                                        </tbody>
                                    </Table>
                                  : <p style={{ textAlign: "left" }}>Please select start date and End date.</p>}
                            </Col>
                        </div>

                    </div>
                </Card>
            </Fragment>

        )

        return (
            <Fragment>
                {SuccessfulOrderss}
            </Fragment>
        );
    }
}
const mapStateToProps = state => ({
    shows: state.showsdata.shows,
    reports: state.reportsdata.successProductOrder
});
export default connect(
    mapStateToProps, { fetchSuccessProductOrders,fetchSuccessfulOrderPdf}
)(SuccessfulOrders);
