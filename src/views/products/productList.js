import React, { Fragment, PureComponent, Component } from "react";
import PropTypes from "prop-types";
import { toastr } from 'react-redux-toastr';
import { Edit2 } from "react-feather";
import { Row, FormGroup, Col, Input, Label, Modal, ModalHeader, ModalBody, Button, Table, Pagination, PaginationItem, PaginationLink } from "reactstrap";
import { fetchProduct, changeStatusProduct, importData } from '../../redux/actions/product/productAction';
import { connect } from "react-redux";
import ProductModal from '../modal/modal';
import * as moment from 'moment';

class ProductList extends PureComponent {
    constructor(props) {

        super(props);

        this.state = {
            productId: "",
            status: "",
            productName: "",
            prodImage: '',
            ProdName: '',
            modal: false,
        }
    }
    componentDidMount() {
        this.props.fetchProduct([]);
    }
    onChangeData = (e) => {
        this.setState({ [e.target.name]: e.target.value })
    }
    EditProduct = (event) => {
        this.props.ProductInfo(event)
    }
    onChangeStatus = (e) => {
        console.log(">>>>", e.target.value)
        if (e.target.value === "Enable") {
            this.setState({ status: true })
        }
        else {
            this.setState({ status: false })
        }
    }
    handleChange = (value, event) => {
        this.setState({
            id: value.id,
            status: value.status,
        })
        var data = { id: value.id, status: !value.status }
        this.props.changeStatusProduct(data)
        //   window.location.reload();
    }
    onFilterProduct = () => {
        if (this.state.status === false) {
            Object.keys(this.state).forEach(k => (!this.state[k] && this.state[k] !== undefined) && delete this.state[k]);
            this.state["status"] = "false"
            const data = this.state
            this.props.fetchProduct(data)
        }
        else {
            Object.keys(this.state).forEach(k => (!this.state[k] && this.state[k] !== undefined) && delete this.state[k]);
            const data = this.state
            this.props.fetchProduct(data)
        }

    }

    importProducts = () => {

        this.props.importData()
            .then(function (response) {
                console.log(response);
                if (response && response.product && response.status === 201) {
                    toastr.success('Import Successfull', response.count + ' Products Added Successfully', { transitionIn: 'bounceInDown', transitionOut: 'bounceOutUp', position: 'top-right' })
                    window.location.reload();
                }
                else if (response.status === 200) {
                    //alert('Nothing to Add');
                    toastr.error('Nothing to Add', 'products are upto date', { transitionIn: 'bounceInDown', transitionOut: 'bounceOutUp', position: 'top-right' })
                    // window.location.reload();
                }
                else if (response && response.message) {
                    toastr.error("error", response.message, { transitionIn: 'bounceInDown', transitionOut: 'bounceOutUp', position: 'top-right' })
                    //  alert(response.message);
                }
            }).catch(function (error) {
                console.log(error);
            });
    }

    toggle = (name, img) => {

        this.setState({
            modal: !this.state.modal,
            prodImage: img,
            ProdName: name

        });

    }

    render() {

        const { products } = this.props.products


        const ProductLists = (
            <div>
                <Row>
                    <Col sm="12">
                        <div className="aucionlist_filters">
                            <Row>
                                <Col sm="2">
                                    <FormGroup>
                                        <Label for="exampleSelect">Product ID</Label>
                                        <Input type="text" placeholder="Product ID" name="productId"
                                            onChange={this.onChangeData}
                                        ></Input>
                                    </FormGroup>
                                </Col>
                                <Col sm="2">
                                    <FormGroup>
                                        <Label for="exampleSelect">Product Name</Label>
                                        <Input type="text" placeholder="Product Name" name="productName"
                                            onChange={this.onChangeData}
                                        ></Input>
                                    </FormGroup>
                                </Col>
                                <Col sm="2">
                                    <FormGroup>
                                        <Label for="exampleSelect">Status</Label>
                                        <Input type="select" className="custom_arrow" name="status"
                                            onChange={this.onChangeStatus}
                                        >
                                            <option></option>
                                            <option>Enable</option>
                                            <option>Disable</option>
                                        </Input>
                                    </FormGroup>
                                </Col>
                                <Col sm="2">
                                    <div>&nbsp;</div>
                                    <Button color="primary" onClick={this.onFilterProduct}>Submit</Button>
                                </Col>
                                {/* <Col sm="2">
                                    <div>&nbsp;</div>
                                    <Button color="primary" onClick={this.importProducts}>Import from Ezmall</Button>
                                </Col> */}
                            </Row>
                        </div>
                    </Col>
                </Row>
                <div className="auctionlist_content">
                    <Col sm="12">
                        <Table striped>
                            <thead>
                                <tr>
                                    <th>Product ID</th>
                                    <th>Product Name</th>
                                    <th>Price</th>
                                    <th>Image</th>
                                    <th>Status</th>
                                    <th>Created At</th>
                                    <th>Edit</th>
                                </tr>
                            </thead>
                            <tbody>
                                {products.map((item, index) => (
                                    <tr key={index}>
                                        <td>{item.productId ? item.productId : '---'}</td>
                                        <td>{item.productName ? item.productName : '---'}</td>
                                        <td>{item.productPrice ? item.productPrice : '---'}</td>
                                        <td><img src={item.productImage} style={{ cursor: 'pointer' }} onClick={() => this.toggle(item.productName, item.productImage)} height="40" /></td>

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
                                        <td>{item.createdAt ? moment(item.createdAt).format('DD/MM/YYYY') : '---'}</td>
                                        <td>{<Edit2 style={{ cursor: "pointer" }} size={21} className='pluscircle' onClick={() => this.EditProduct(item)} />}</td>
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
                {ProductLists}
                {this.state.modal ? <ProductModal
                    name={this.state.ProdName}
                    img={this.state.prodImage}
                    modal={this.state.modal}
                    toggle={this.toggle} /> : ''}
            </Fragment>
        );
    }
}
ProductList.propTypes = {

    fetchProduct: PropTypes.func.isRequired,
    importData: PropTypes.func.isRequired,
    changeStatusProduct: PropTypes.func.isRequired,
}
const mapStateToProps = state => ({
    auctions: state.auctionsdata.auctions,
    products: state.productdata.product,

});

export default
    connect(mapStateToProps, { fetchProduct, changeStatusProduct, importData }
    )(ProductList);





