import React, { Component, Fragment } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { Row, Col, Table, FormGroup, Label, Input } from "reactstrap";
import { X, Trash2 } from "react-feather";
import { withRouter } from 'react-router-dom';
import { compose } from 'redux';
import { store } from "../../../redux/storeConfig/store";
import {fetchLanguage,addAnotherLanguage} from '../../../redux/actions/language/languageAction'
// import {Redirect} from 'react-router-dom';
// Styling
class CreateLanguage extends Component {
    constructor(props) {
        super(props);
        this.state = {
            id: "1",
            languageCode: "",
            languageOrder: "0",
            location: "",
            status: true,
            createdBy: null,
            language: "",
            languageTranslation: "",
            locationType: "",
            createdAt:new Date(),
            updatedBy: null,
            updatedAt:null
        }

    }
    onLanguageChange = (e) => {
        let lastitemId;
        let language = this.props.language.language
        let lastItem = language.length - 1
         if( language[lastItem] && language[lastItem].id) {
            console.log("=-=-=-=-=>>>>?>",language[lastItem])
            lastitemId =  parseInt(language[lastItem].id) + 1
         }

        this.setState({ language: e.target.value ,
                         languageTranslation:e.target.value,
                         id:lastitemId
                        })

    }

    onLanguageCodeChange = (e) => {
        this.setState({ languageCode:e.target.value  })
    }
   
    onAddProduct = (event) => {
        console.log("=-=-=-=-))>>>",this.state)
        event.preventDefault();
        this.props.addAnotherLanguage(this.state)
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
       
       
        return (
            <Fragment>
                <form onSubmit={this.onAddProduct} required>
                    <div className="creation_content">
                        <Row>
                            <Col md="6">
                            <Row>
                                    <Col sm="5" className="text-right">
                                        <Label>Language </Label>
                                    </Col>
                                    <Col sm="6" className="text-right">
                                        <FormGroup>
                                            <Input type="text" name="language" onChange={this.onLanguageChange} required></Input>
                                            
                                        </FormGroup>
                                    </Col>
                                </Row>
                                <Row>
                                    <Col sm="5" className="text-right">
                                        <Label>Language Code </Label>
                                    </Col>
                                    <Col sm="6" className="text-right">
                                        <FormGroup>
                                            <Input type="text" name="languageCode" onChange={this.onLanguageCodeChange} required></Input>
                                            
                                        </FormGroup>
                                    </Col>
                                </Row>
                            </Col>
                            <Col md="6">
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



// CreateProduct.propTypes = {
//     auctions: PropTypes.object.isRequired,
//     chanels: PropTypes.object.isRequired,
//     image: PropTypes.object.isRequired,
//     fetchauctions: PropTypes.func.isRequired,

// }

// CreateProduct.contextTypes = {
//     router: PropTypes.object.isRequired
// }

const mapStateToProps = state => ({
    language: state.languagedata.language
});

export default connect(
    mapStateToProps, {fetchLanguage,addAnotherLanguage}
)(CreateLanguage);

