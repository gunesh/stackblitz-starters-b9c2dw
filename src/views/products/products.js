import React, { Fragment, useState } from "react";
import { Card, Nav, NavLink, TabContent, TabPane, NavItem } from "reactstrap";
import { PlusCircle, Search } from "react-feather";
import classnames from 'classnames';
// import './viewauctions.scss';
import ProductList from "./productList"
import CreateProduct from "./createProduct"
import PropTypes from "prop-types";
import '../auctions/createauctions/viewauctions.scss'
import EditProduct from './editProduct'
import { withRouter } from 'react-router-dom';
import { compose } from 'redux';
import { connect } from "react-redux";
import { fetchChannel, saveChannel } from '../../redux/actions/chanels/chanelAction';


// Styling
class Episodes extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            activeTab: 1,
            EditProduct: "",
            reloadPage: false
        };
    }

    ProductData = (data) => {
        this.setState({ EditProduct: data })

        if (data) {
            this.setState({ activeTab: '2' })
        }
    }
    componentDidMount() {
        this.setState({ activeTab: '1' })
    }
    reloadRoute = () => {
        if (this.state.EditProduct) {
            this.setState({ EditProduct: "" })
        }

    }

    render() {
        const toggle = tab => {
            if (this.state.activeTab !== tab)
                this.setState({ activeTab: tab })
        }
        return (
            <Fragment>

                <Card>
                    <div className="auctions_section">
                        <Nav tabs>
                            <NavItem>
                                <NavLink className={classnames({ active: this.state.activeTab === '1' })} onClick={() => { toggle('1'); }} >
                                    PRODUCT LIST
                            </NavLink>
                            </NavItem>
                            {this.state.EditProduct && this.state.activeTab === "2" ? (
                                <NavItem className="create_tab">
                                    <NavLink className={classnames({ active: this.state.activeTab === '2' })} onClick={() => { toggle('2'); }} >
                                        EDIT PRODUCT
                            </NavLink>
                                </NavItem>) : <NavItem className="create_tab">
                                    <NavLink onClick={this.reloadRoute()} className={classnames({ active: this.state.activeTab === '2' })} onClick={() => { toggle('2'); }} >
                                        CREATE PRODUCT
                            </NavLink>
                                </NavItem>}
                        </Nav>
                        <TabContent activeTab={this.state.activeTab}>
                            <TabPane tabId="1">
                                <div className="auctionlist_content">
                                    <ProductList ProductInfo={this.ProductData} />
                                </div>
                            </TabPane>
                            {this.state.EditProduct ? (<TabPane tabId="2">
                                <EditProduct EditProductList={this.state.EditProduct} />
                            </TabPane>) : <TabPane tabId="2">
                                    <CreateProduct />
                                </TabPane>
                            }
                        </TabContent>
                    </div>
                </Card>
            </Fragment>
        );
    }
}



// export default Channels;
export default compose(
    withRouter,
    connect(null, { fetchChannel, saveChannel })
)(Episodes);


