import React, { Fragment, PureComponent } from "react";
import { Col, Table } from "reactstrap";
import { Edit2 } from "react-feather";
import { fetchShows, changeStatusShow, startShow } from '../../redux/actions/Shows/showsAction'
import { fetchChannel } from '../../redux/actions/chanels/chanelAction'
import { connect } from "react-redux";
import ProductModal from '../modal/modal'

class ShowsList extends PureComponent {
    constructor() {
        super();
        this.state = {
            status: '',
            id: null,
            count: 1,
            modal: false,
            showName: '',
            showImage: '',
            modal: false,
            isStarted: false
        };
        this.handleChange = this.handleChange.bind(this);
    }
    componentDidMount() {
        this.props.fetchShows();
        this.props.fetchChannel();
    }
    handleChange = (value, event) => {
        this.setState({
            id: value.id,
            status: value.status,
        })
        var data = { id: value.id, status: !value.status }
        this.props.changeStatusShow(data)
        window.location.reload();
    }

    EditShow = (event) => {
        this.props.showInfo(event)
    }
    toggle = (name, img) => {
        this.setState({
            modal: !this.state.modal,
            showName: name,
            showImage: img
        });
    }

    onShowStart = (id, e) => {
        e.preventDefault();
        this.setState({ isStarted: true })
        let conf = window.confirm('Are you sure wanted to start Show?');
        this.props.startShow({ "id": id }).then(
            (response) => {
                if (response.status == 412) {
                    alert(response.message);
                }
                else if (response.status == 200) {
                    alert("Show started successfuly!")
                }

            })
        // window.location.reload();
    }

    render() {
        console.log(this.props.shows);
        const { shows } = this.props;
        const ShowsLists = (
            <div>

                <div className="auctionlist_content">
                    <Col sm="12">
                        <Table striped>
                            <thead>
                                <tr>
                                    <th>Show Name</th>
                                    <th>Show Image</th>
                                    <th>Show Date</th>
                                    <th>Status</th>
                                    <th>Edit</th>
                                    {/* <th>Start Show</th> */}
                                </tr>
                            </thead>
                            <tbody>
                                {shows.shows.map((item, index) => (
                                    <tr key={index}>
                                        <td>{item.showName}</td>
                                        <td><img src={item.showImage} onClick={() => this.toggle(item.showName, item.showImage)} style={{ cursor: 'pointer' }} height="40" /></td>

                                        <td>{item.showDate}</td>
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
                                        <td>{<Edit2 size={21} style={{ cursor: "pointer" }} className='pluscircle' onClick={() => this.EditShow(item)} />}</td>
                                        {/* <td>
                                            <button
                                                className="btn btn-primary submit_btn1"
                                                disabled={item.isStarted ? true : false}
                                                onClick={(e) => this.onShowStart(item.id, e)}
                                            >Start
                                    </button>
                                        </td> */}
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
                {ShowsLists}
                {this.state.modal ? <ProductModal
                    name={this.state.showName}
                    img={this.state.showImage}
                    modal={this.state.modal}
                    toggle={this.toggle} /> : ''}
            </Fragment>
        );
    }
}

const mapStateToProps = state => ({
    shows: state.showsdata.shows,
});

export default connect(
    mapStateToProps, { fetchShows, fetchChannel, changeStatusShow, startShow }
)(ShowsList);
