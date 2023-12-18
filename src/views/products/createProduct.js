import React, { Component, Fragment } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { Row, Col, Table, FormGroup, Label, Input } from "reactstrap";
import { X, Trash2 } from "react-feather";
import { saveProduct } from '../../redux/actions/product/productAction';
import { withRouter } from 'react-router-dom';
import { compose } from 'redux';
import { uploadImage } from "../../redux/actions/imageUpload/uploadImageAction";
import { store } from "../../redux/storeConfig/store";
// import {Redirect} from 'react-router-dom';
// Styling
class CreateProduct extends Component {
    constructor(props) {
        super(props);
        this.state = {
            productName: "",
            productPrice: 21,
            createdBy: JSON.parse(localStorage.getItem('user')).id,
            updatedBy: JSON.parse(localStorage.getItem('user')).id,
            productImage: "",
            productSource: "CMS",
            status: "",
            productId: "",
            description: "",
            ImgPath: "",
            errors: ""
        }

    }
    onChange = (e) => {
        //e.target.files[0]
        this.setState({ [e.target.name]: e.target.value })

    }
    SelectImg = (e) => {
        this.setState({ ImgPath: e.target.files[0].name })
        this.props.uploadImage(e.target.files[0]).then(
            (res) =>
                this.setState({ productImage: res.image.location[0] }))
    }
    onSelectStatus = (e) => {
        if (e.target.value === "Enable") {
            this.setState({ status: true })
        } else {
            this.setState({ status: false })
        }

    }
    deleteFile = () => {
        this.setState({ ImgPath: "" })
    }
    onAddProduct = (event) => {
        event.preventDefault();
        this.props.saveProduct(this.state)
            .then(function (response) {
                console.log(response);
                if (response && response.product && response.status == 201) {
                    alert('Product Added successfully');
                    window.location.reload();
                }
                else if (response && response.message) {
                    alert(response.message);
                }
            }).catch(function (error) {
                console.log(error);
            });

    }
    render() {
        // console.log(typeof (JSON.parse(localStorage.getItem('user')).id))
        console.log(this.state)
        //  console.log(">>>>>",this.state.errors)
        return (
            <Fragment>
                <form onSubmit={this.onAddProduct} required>
                    <div className="creation_content">
                        <Row>
                            <Col md="6">
                                <Row>
                                    <Col sm="5" className="text-right">
                                        <Label>Title: </Label>
                                    </Col>
                                    <Col sm="6" className="text-right">
                                        <FormGroup>
                                            <Input type="text" name="productName" placeholder="Product Title"
                                                onChange={this.onChange}
                                                required />
                                        </FormGroup>
                                    </Col>
                                </Row>

                                <Row>
                                    <Col sm="5" className="text-right">
                                        <Label>Short description</Label>
                                    </Col>
                                    <Col sm="6" className="text-right">
                                        <FormGroup>
                                            <Input type="textarea" name="description" placeholder="Short description" required
                                                onChange={this.onChange} />
                                        </FormGroup>
                                    </Col>
                                </Row>
                            </Col>
                            <Col md="6">
                                <Row>
                                    <Col sm="5" className="text-right">
                                        <Label>Product ID: </Label>
                                    </Col>
                                    <Col sm="6" className="text-right">
                                        <FormGroup>
                                            <Input type="text" name="productId" placeholder="Product ID"
                                                onChange={this.onChange} required />
                                        </FormGroup>
                                    </Col>
                                </Row>
                                <Row>
                                    <Col sm="5" className="text-right">
                                        <Label>PRICE: </Label>
                                    </Col>
                                    <Col sm="6" className="text-right">
                                        <FormGroup>
                                            <Input type="text" name="productPrice" placeholder="Price"
                                                onChange={this.onChange} required />
                                        </FormGroup>
                                    </Col>
                                </Row>
                                <Row>
                                    <Col sm="5" className="text-right">
                                        <Label>STATUS: </Label>
                                    </Col>
                                    <Col sm="6" className="text-right">
                                        <FormGroup>
                                            <Input type="select" name="status" className="custom_arrow" onChange={this.onChange} required>
                                                <option></option>
                                                <option value="true">Enable</option>
                                                <option value="false">Disable</option>
                                            </Input>
                                        </FormGroup>
                                    </Col>
                                </Row>
                                <Row className="marB0">
                                    <Col sm="5" className="text-right">
                                        <Label>UPLOAD IMAGE: </Label>
                                    </Col>
                                    <Col sm="6">
                                        <div class="upload_box">
                                            <div class="upload_input">
                                                <input type="file" id="resume" class="inputfile inputfile-2" onChange={this.SelectImg} data-multiple-caption="{count} files selected" multiple="" required />
                                                <label for="resume" className="upload_text">
                                                    <span id="file_name">Upload Images</span>
                                                </label>
                                            </div>
                                            {this.state.ImgPath ? (<div className="uploaded_img">
                                                <img src={this.state.productImage} width='100px' />
                                                <span class="delete_file" onClick={this.deleteFile}>{<X size={16} />}</span>
                                            </div>) : null}
                                        </div>

                                    </Col>
                                </Row>
                                <Row>{<div className="login_error">{this.state.errors.message}</div>}</Row>


                                <Row className="marB0">
                                    <Col sm="5"></Col>
                                    <Col sm="6" className="text-right">
                                        <button className="btn btn-primary submit_btn1"
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



CreateProduct.propTypes = {
    auctions: PropTypes.object.isRequired,
    chanels: PropTypes.object.isRequired,
    image: PropTypes.object.isRequired,
    fetchauctions: PropTypes.func.isRequired,

}

CreateProduct.contextTypes = {
    router: PropTypes.object.isRequired
}
const mapStateToProps = state => (
    console.log(state)
    //     {
    //     // auctions: state.auctionsdata.auctions,
    //     // auctionType:state.auctionsdata.auctionType,
    //     chanels: state.chaneldata.chanels,
    //   shows:state.showsdata.shows,
    //     image: state.imageData.image
    // }
);

// export default Users;

export default compose(
    withRouter,
    connect(null, { saveProduct, uploadImage })
)(CreateProduct);
