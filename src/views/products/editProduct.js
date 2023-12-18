import React, { Component, Fragment } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { Row, Col, Table, FormGroup, Label, Input } from "reactstrap";
import { X, Trash2 } from "react-feather";
import { updateProduct } from '../../redux/actions/product/productAction';
import { withRouter } from 'react-router-dom';
import { compose } from 'redux';
import { uploadImage } from "../../redux/actions/imageUpload/uploadImageAction";
import { store } from "../../redux/storeConfig/store";
// import {Redirect} from 'react-router-dom';
// Styling
class EditProduct extends Component {
    constructor(props) {
        super(props);
        this.state = {
            productName: this.props.EditProductList.productName,
            productPrice: this.props.EditProductList.productPrice,
            createdBy: this.props.EditProductList.createdBy,
            updatedBy: JSON.parse(localStorage.getItem('user')).id,
            productImage: this.props.EditProductList.productImage,
            productSource: this.props.EditProductList.productSource,
            status: this.props.EditProductList.status,
            productId: this.props.EditProductList.productId,
            description: this.props.EditProductList.description,
            id: this.props.EditProductList.id,
            ImgPath: ""
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
    componentWillReceiveProps(nextProps) {

        // You don't have to do this check first, but it can help prevent an unneeded render
        if (nextProps.EditProductList.id !== this.state.id) {
            this.setState({
                productName: nextProps.EditProductList.productName,
                productPrice: nextProps.EditProductList.productPrice,
                createdBy: nextProps.EditProductList.createdBy,
                updatedBy: nextProps.EditProductList.updatedBy,
                productImage: nextProps.EditProductList.productImage,
                productSource: nextProps.EditProductList.productSource,
                status: nextProps.EditProductList.status,
                productId: nextProps.EditProductList.productId,
                description: nextProps.EditProductList.description,
                id: nextProps.EditProductList.id
            })
        }
    }
    onEditProduct = (event) => {
        // event.preventDefault();
        //  console.log("nextProps",this.state)
        this.props.updateProduct(this.state);
        this.props.history.push('/Products')
    }
    render() {
        return (
            <Fragment>
                <form>
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
                                                value={this.state.productName}
                                                onChange={this.onChange}
                                            />
                                        </FormGroup>
                                    </Col>
                                </Row>

                                <Row>
                                    <Col sm="5" className="text-right">
                                        <Label>Short description</Label>
                                    </Col>
                                    <Col sm="6" className="text-right">
                                        <FormGroup>
                                            <Input type="textarea" name="description" placeholder="Short description"
                                                value={this.state.description}
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
                                                value={this.state.productId}
                                                onChange={this.onChange} />
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
                                                value={this.state.productPrice}
                                                onChange={this.onChange} />
                                        </FormGroup>
                                    </Col>
                                </Row>
                                <Row>
                                    <Col sm="5" className="text-right">
                                        <Label>STATUS: </Label>
                                    </Col>
                                    <Col sm="6" className="text-right">
                                        <FormGroup>
                                            <Input type="select" name="status" className="custom_arrow" onChange={this.onSelectStatus} >
                                                {this.props.EditProductList.status ? <option>Enable</option> : <option>Disable</option>}
                                                {this.props.EditProductList.status ? <option>Disable</option> : <option>Enable</option>}
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
                                                <input type="file" id="resume" class="inputfile inputfile-2" onChange={this.SelectImg} data-multiple-caption="{count} files selected" multiple="" />
                                                <label for="resume" className="upload_text">
                                                    <span id="file_name">Upload Images</span>
                                                </label>
                                            </div>
                                            {this.state.ImgPath ? (
                                                <div className="uploaded_img">
                                                    <img src={this.state.productImage} width='100px' />
                                                    <span class="delete_file" onClick={this.deleteFile}>{<X size={16} />}</span>
                                                </div>
                                            ) : <div className="uploaded_img">
                                                    <img src={this.props.EditProductList.productImage} width='100px' />
                                                </div>}
                                        </div>
                                    </Col>
                                </Row>
                                <Row className="marB0">
                                    <Col sm="9"></Col>
                                    <button sm="6" className="text-right"
                                        className="btn btn-primary submit_btn1"
                                        onClick={this.onEditProduct}>Submit
                                    </button>
                                </Row>
                            </Col>
                        </Row>
                    </div>
                </form>
            </Fragment>
        );
    }
}



EditProduct.propTypes = {
    auctions: PropTypes.object.isRequired,
    chanels: PropTypes.object.isRequired,
    image: PropTypes.object.isRequired,
    fetchauctions: PropTypes.func.isRequired,

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
    connect(null, { updateProduct, uploadImage })
)(EditProduct);
