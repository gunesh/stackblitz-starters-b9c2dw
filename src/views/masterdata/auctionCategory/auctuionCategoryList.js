import React, { Fragment, PureComponent } from "react";
import { isEmpty } from 'lodash';
import PropTypes from "prop-types";
import { PlusCircle, DownloadCloud } from "react-feather";
import { Row, Card, FormGroup, Col, Input, Label, Button, Table } from "reactstrap";
import { Calendar, Edit2 } from "react-feather";
import { fetchauctionCategory, changeStatusAuctionCategory } from '../../../redux/actions/masterDataFiles/auctionCategoryActions'
import { connect } from "react-redux";
import img_thumb from '../../../assets/img/avatar-s-1.png';
import Switch from 'react-switch'


class ChannelList extends PureComponent {
    constructor() {
        super();
        this.state = {
            status: false,
            id: ""
        };
        this.handleChange = this.handleChange.bind(this);
    }
    componentDidMount() {
        this.props.fetchauctionCategory();
    }
    EditAuctionCategory = (event) => {
        this.props.AuctionCategoryInfo(event);
    }
    handleChange = (value) => {

        this.setState({
            id: value.id,
            status: value.status,
        })
        var data = { id: value.id, status: !value.status }
        console.log(data)
        this.props.changeStatusAuctionCategory(data)
        //  window.location.reload();
    }

    render() {
        const errorMessage = (
            <p>There are no chanels.</p>
        );
        const { auctionCategory } = this.props
        console.log(">>>>>>this.state.status", auctionCategory)
        const ChannelLists = (
            <div>
                <div className="auctionlist_content">
                    <Col sm="12">
                        <Table striped>
                            <thead>
                                <tr>
                                    <th>Auction Category Name</th>
                                    <th>Auction Description</th>
                                    <th>Bid Point</th>
                                    <th>Status</th>
                                    <th>Edit</th>
                                </tr>
                            </thead>
                            {auctionCategory.auctionCategory.map((item, index) => (
                                <tbody key={index}>
                                    <tr>
                                        <td>{item.auctionCategoryName ? item.auctionCategoryName : "--"}</td>
                                        <td>{item.auctionDescription ? item.auctionDescription : "--"}</td>
                                        <td>{item.bidPoints ? item.bidPoints : "--"}</td>
                                        <td>
                                            {/* <Switch onChange={this.handleChange()} checked={this.state.statuschange?this.state.status:item.status} /> */}
                                            {this.state.id === item.id ? (<div className="custom-control custom-switch">
                                                <input type="checkbox" className="custom-control-input"
                                                    onChange={() => this.handleChange({ id: item.id, status: item.status })}
                                                    defaultChecked={this.state.status} id={"customSwitch" + index} />
                                                <label className="custom-control-label" for={"customSwitch" + index} ></label>
                                            </div>) :
                                                (<div className="custom-control custom-switch">
                                                    <input type="checkbox" className="custom-control-input"
                                                        onChange={() => this.handleChange({ id: item.id, status: item.status })}
                                                        defaultChecked={item.status} id={"customSwitch" + index} />
                                                    <label onChange={() => this.handleChange({ id: item.id, status: item.status })} className="custom-control-label" for={"customSwitch" + index} ></label>
                                                </div>)
                                            }

                                        </td>
                                        <td>{<Edit2 style={{ cursor: "pointer" }} size={21} className='pluscircle' onClick={() => this.EditAuctionCategory(item)} />}</td>
                                    </tr>
                                </tbody>
                            ))}
                        </Table>
                    </Col>
                </div>
            </div>
        )
        return (
            <Fragment>
                {isEmpty(this.props.auctionCategory.auctionCategory) ? errorMessage : ChannelLists}
            </Fragment>
        );
    }
}

const mapStateToProps = state => ({
    chanels: state.chaneldata.chanels,
    auctionCategory: state.masterdata.auctionCategory
});
export default connect(
    mapStateToProps, { fetchauctionCategory, changeStatusAuctionCategory }
)(ChannelList);


