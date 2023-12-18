import React, { Fragment, PureComponent, Component } from "react";
import PropTypes from "prop-types";
import { toastr } from 'react-redux-toastr';
import { Edit2 } from "react-feather";
import { Row, FormGroup, Col, Input, Label, Modal, ModalHeader, ModalBody, Button, Table, Pagination, PaginationItem, PaginationLink } from "reactstrap";
import { fetchProduct, changeStatusProduct, importData } from '../../../redux/actions/product/productAction';
import { connect } from "react-redux";
import ProductModal from '../../modal/modal';
import * as moment from 'moment';
import { fetchLanguage } from '../../../redux/actions/language/languageAction';

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
        this.props.fetchLanguage();
    }
    onChangeData = (e) => {
        this.setState({ [e.target.name]: e.target.value })
    }
    EditLanguage = (event) => {
        this.props.LangInfo(event)
    }
    
  
    render() {

        const { language } = this.props.language
        console.log(">>>language",language)


        const LanguageLists = (
            <div>
                <div className="auctionlist_content">
                    <Col sm="12">
                        <Table striped>
                            <thead>
                                <tr>
                                    <th>Language ID</th>
                                    <th>Language</th>
                                    <th>Language Code</th>
                                    <th>Created At</th>
                                    <th>Edit</th>
                                </tr>
                            </thead>
                            <tbody>
                                {language.map((item, index) => (
                                    <tr key={index}>
                                        <td>{item.id ? item.id : '---'}</td>
                                        <td>{item.language ? item.language : '---'}</td>
                                        <td>{item.languageCode ? item.languageCode : '---'}</td>
                                        <td>{item.createdAt ? moment(item.createdAt).format('DD/MM/YYYY') : '---'}</td>
                                        <td>{<Edit2 style={{ cursor: "pointer" }} size={21} className='pluscircle' onClick={() => this.EditLanguage(item)} />}</td>
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
                {LanguageLists}
            </Fragment>
        );
    }
}
ProductList.propTypes = {
    fetchLanguage: PropTypes.func.isRequired,
    changeStatusProduct: PropTypes.func.isRequired,
}
const mapStateToProps = state => ({
    language:state.languagedata.language
});

export default
    connect(mapStateToProps, {fetchLanguage}
    )(ProductList);





