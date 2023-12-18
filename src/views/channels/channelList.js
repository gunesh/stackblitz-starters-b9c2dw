import React, { Fragment, PureComponent } from "react";
import { isEmpty } from 'lodash';
import { Col, Table } from "reactstrap";
import { Edit2 } from "react-feather";
import { fetchChannel, changeStatusChannel } from '../../redux/actions/chanels/chanelAction'
import { connect } from "react-redux";
import ProductModal from '../modal/modal'

class ChannelList extends PureComponent {
    constructor() {
        super();
        this.state = {
            status: false,
            id: null,
            currentPage: 1,
            postPerPage: 5,
            channalName: '',
            channalLogo: '',
            modal: false

        };
        this.handleChange = this.handleChange.bind(this);
    }

    componentDidMount() {
        this.props.fetchChannel();
    }
    EditChannel = (event) => {
        this.props.ChannelInfo(event);
    }
    handleChange = (value) => {
        this.setState({
            id: value.id,
            status: value.status,
        })
        var data = { id: value.id, status: !value.status }
        this.props.changeStatusChannel(data)
        //  window.location.reload();
    }
    paginate = (data) => {
        this.setState({ currentPage: data })

    }

    toggle = (name, img) => {

        this.setState({
            modal: !this.state.modal,
            channalLogo: img,
            channalName: name,
        });

    }

    render() {
        const errorMessage = (
            <p>There are no chanels.</p>
        );
        const { chanels } = this.props
        const indexOfLastPost = this.state.currentPage + this.state.postPerPage
        const indexOfFirstPost = indexOfLastPost - this.state.postPerPage
        const curreAuctionData = chanels.chanels.slice(indexOfFirstPost, indexOfLastPost)

        const ChannelLists = (
            <div>
                <div className="auctionlist_content">

                    <Col sm="12">
                        <Table striped>
                            <thead>
                                <tr>
                                    <th>Channel Name</th>
                                    <th>Channel Language</th>
                                    <th>Channel Logo</th>
                                    <th>Location</th>
                                    <th>Status</th>
                                    <th>Edit</th>
                                </tr>
                            </thead>
                            <tbody>
                                {chanels.chanels.map((item, index) => (
                                    <tr key={index}>
                                        <td>{item.channelName ? item.channelName : "--"}</td>
                                        <td>{item.channelLanguage ? item.language.language : "--"}</td>
                                        <td><img src={item.logo ? item.logo : "--"} style={{ cursor: 'pointer' }} onClick={() => this.toggle(item.channelName, item.logo)} height="40" /></td>
                                        <td>{item.location ? item.location : "--"}</td>



                                        <td>

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
                                        <td>{<Edit2 size={21} style={{ cursor: "pointer" }} className='pluscircle' onClick={() => this.EditChannel(item)} />}</td>
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
                {isEmpty(this.props.chanels.chanels) ? errorMessage : ChannelLists}
                {this.state.modal ? <ProductModal
                    name={this.state.channalName}
                    img={this.state.channalLogo}
                    modal={this.state.modal}
                    toggle={this.toggle} /> : ''}
            </Fragment>
        );
    }
}

const mapStateToProps = state => ({
    chanels: state.chaneldata.chanels
});
export default connect(
    mapStateToProps, { fetchChannel, changeStatusChannel }
)(ChannelList);
