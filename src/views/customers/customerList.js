import React, { Fragment, PureComponent } from "react";
import { PlusCircle, DownloadCloud } from "react-feather";
import { Row, Card, FormGroup, Col, Input, Label, Button, Table } from "reactstrap";
import { fetchCustomer, searchCustomer, changeStatusCustomer,filterCustomer} from '../../redux/actions/customers/customersAction'
import { withRouter } from 'react-router-dom';
import { compose } from 'redux';
import { connect } from "react-redux";
import ReactHTMLTableToExcel from 'react-html-table-to-excel'
import export_icon from '../../assets/img/export.png';
import '../auctions/createauctions/viewauctions.scss';

class CustomerList extends PureComponent {
    constructor() {
        super();
        this.state = {
            firstName: "",
            lastName: "",
            email: "",
            mobile: "",
            id: "",
            fromDate: "",
            toDate: "" 
        };

    }
    onChangeDateTime = (e) => {
        let data = new Date(e.target.value).toISOString();
        let NewDate = new Date(data);
        NewDate.setHours(NewDate.getHours() + 5, NewDate.getMinutes() + 30, 0, 0);
        this.setState({ [e.target.name]: NewDate.toISOString() })
    }
    componentDidMount() {
        this.props.fetchCustomer();
        //   window.location.reload();
    }
    handleChange = (value, event) => {
        this.setState({
            id: value.id,
            status: value.status,
        })
        var data = { id: value.id, status: !value.status }
        this.props.changeStatusCustomer(data)
        //   window.location.reload();
    }
    onChange = (e) => {
            var phoneno = /^\d{10}$/;
            if(e.target.value.match(phoneno)){
                this.setState({mobile: e.target.value })
            }
            else if(e.target.value ===""){
                this.props.fetchCustomer();
                }
            else{
                this.setState({firstName: e.target.value }) 
            }
    }
    onFilterDate =(event)=>{
        event.preventDefault();
       var data={
            startDate:this.state.fromDate,
            endDate:this.state.toDate

        }
        if(data){
            this.props.filterCustomer(data)
        }
            
    }
    onSearchCustomer = (event) => {
        event.preventDefault();
        Object.keys(this.state).forEach(k => (!this.state[k] && this.state[k] !== undefined) && delete this.state[k]);
        const data = this.state;
        if (data.mobile === undefined && data.firstName === undefined  ) {
            this.props.fetchCustomer();
        }
        else if(data.mobile){
            this.props.searchCustomer(data.mobile,"mobile")
        }
        else{
            this.props.searchCustomer(data.firstName,"firstName"); 
        }
          
    }
    render() {
        const { customers } = this.props.customer
        const CustomerLists = (
            <Fragment>
                <h6>Customers</h6>

                <Card>
                    <div>
                        <Row>
                            <Col sm="12">
                                <div className="aucionlist_filters">
                                    <Row>
                                        <Col sm="4">
                                            <FormGroup>
                                                <Label for="exampleSelect">Search Customers</Label>
                                                <Input  name="firstName" placeholder="Phone Number / Name" onChange={this.onChange} ></Input>
                                            </FormGroup>
                                        </Col>
                                       
                                        <Col sm="2">
                                            <div>&nbsp;</div>
                                            <Button
                                                onClick={this.onSearchCustomer}
                                                color="primary">Search</Button>
                                        </Col>
                                    </Row>
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
                                        <Col sm="2">
                                            <div>&nbsp;</div>
                                            <Button
                                               onClick={this.onFilterDate}
                                                color="primary">Submit</Button>
                                        </Col>
                                    </Row>
                                </div>
                            </Col>
                        </Row>
                        <div className="auctionlist_content">
                            <Col sm="12">
                                <Table striped id="table-to-xls">
                                    <thead>
                                        <tr>
                                            <th>First Name</th>
                                            <th>Email ID</th>
                                            <th>Mobile</th>
                                            <th>Status</th>
                                            <th><ReactHTMLTableToExcel table="table-to-xls"
                                                    filename='Customer_List'
                                                    sheet='Customer_List'
                                                    buttonText={<img src={export_icon} width="24" height="24" alt="Export to excel" title="Export to excel" />} />
                                                </th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {customers.length > 0 ? customers.map((item, index) => (
                                            <tr key={index}>
                                                <td><a href={`/#/customersUserprofile/${item.id}`}>{item.firstName ? item.firstName : "--"}</a></td>
                                                <td>{item.email ? item.email : "--"}</td>
                                                <td>{item.mobile ? item.mobile : "--"}</td>
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
                                                <td></td>
                                            </tr>
                                        )
                                        ) : <p style={{ textAlign: "right" }}>No Customers Found</p>}
                                        {}
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
                {CustomerLists}
            </Fragment>
        );
    }
}

const mapStateToProps = state => ({
    customer: state.customerData.customers
});

export default compose(
    withRouter,
    connect(mapStateToProps, { fetchCustomer, searchCustomer, changeStatusCustomer,filterCustomer})
)(CustomerList);


