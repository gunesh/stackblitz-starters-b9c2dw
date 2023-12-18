import React from 'react';
import { isEmpty } from 'lodash';
import PropTypes from "prop-types";
import $ from 'jquery';
import { Edit2, RefreshCcw } from "react-feather";
import { connect } from "react-redux";
import { fetchauctions } from '../../../redux/actions/auctions/auctionsActions';
import { startAuctionTimer, revealProductInfo, revealWinnerInfo } from '../../../redux/actions/auctions/auctionsActions';
import { Modal, ModalHeader, ModalBody, ModalFooter, Button, FormGroup, Input } from 'reactstrap';
import * as moment from 'moment';
class WeeklyAuctionsTable extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            modal: false

        };
        this.startAuction = this.startAuction.bind(this);
        this.sec2human = this.sec2human.bind(this);
        this.revealProduct = this.revealProduct.bind(this);
        this.revealWinner = this.revealWinner.bind(this);
        this.calculateTimeDiff = this.calculateTimeDiff.bind(this);

    }
    toggle = () => {
        this.setState({ modal: !this.state.modal });
    }
    sec2human = (seconds) => {
        let sec = seconds;// % 60;
        return sec;
    }
    startAuction = (id) => {
        let that = this;
        let conf = window.confirm('Are you sure wanted to start ?');
        if (conf) {
            this.props.startAuctionTimer({ 'id': id }).then(function (response) {
                $("#ALID_" + id).hide();
                $("#TIMER__" + id).removeClass('d-none').addClass('d-block');
                let timeSeconds = 120;
                setInterval(function () {
                    if (timeSeconds >= 0) {
                        $("#TIMER__" + id).html(that.sec2human(timeSeconds));
                        timeSeconds--;
                    } else {
                        if (timeSeconds <= 0) {
                            $("#TIMER__" + id).html('--');
                        }
                    }
                }, 120)
            })
        }
    }

    revealProduct = (id) => {
        let that = this;
        let conf = window.confirm('Are you sure wanted to reveal the Product ?');
        if (conf) {
            $("#PRODID_" + id).hide();
            $("#PRODUCT_INFO_" + id).removeClass('d-none').addClass('d-block');
            this.props.revealProductInfo({ 'id': id }).then(function (response) {
                alert('Product Revealed successfully');

            })

        }
    }
    revealWinner = (id) => {
        let that = this;
        let conf = window.confirm('Are you sure wanted to reveal the Winner ?');
        if (conf) {
            // $("#WINID_" + id).hide();
            // $("#WINNER_INFO_" + id).removeClass('d-none').addClass('d-block');
            this.props.revealWinnerInfo({ 'id': id, 'module': 'bids' }).then(function (response) {
                if (response.status === 200) {
                    alert("Winner Revealed Successfully..!")
                    window.location.reload();
                }
                else {
                    alert(response.message)
                }


            })

        }
    }
    calculateTimeDiff = (endTime) => {
        var dateEnd = new Date(endTime);
        var dateNow = new Date();
        if (dateNow.getTime() >= dateEnd.getTime()) {
            if (this.props.auction.iswinreveal == null)
                return (<button className="btn btn-primary " id={"WINID_" + this.props.auction.id} onClick={() => this.revealWinner(this.props.auction.id)}>Reveal</button>);
        } else {
            return '';
        }

    }
    refreshTotalBids = (id) => {
        this.props.fetchauctions({ "auctionTypeId": 5 })
    }

    formatDisplayTime = (dateTime) => {

        return moment(dateTime).format('DD/MM/YYYY h:mm:ss a')
    }
    EditLiveAuction = (event) => {
        this.props.monthlyWeeklyAuctionInfo(event)
    }
    render() {
        const { id, productId, location, showId, auctionCode, auctionCategoryId, wonUserId, auctionStartTime, auctionEndTime, isproductreveal, isstarted, iswinreveal, user } = this.props.auction;
        return (

            <tr key={this.props.auction.id && id}>
                <td>
                    {this.props.index + 1}
                </td>

                <td>
                    {(this.props.auction.product && this.props.auction.product.productId) ? (<span title={this.props.auction.product.productName + '(' + this.props.auction.product.productId + ')'}><img src={this.props.auction.product.productImage} onClick={this.toggle} style={{ cursor: "pointer" }} width="40" height="40" /><br /> </span>) : '--'}
                </td>
                {(this.props.auction.product && this.props.auction.product.productId) ?
                    <Modal isOpen={this.state.modal} toggle={this.toggle} >
                        <ModalHeader toggle={this.toggle}>{this.props.auction.product.productName + '(' + this.props.auction.product.productId + ')'}</ModalHeader>
                        <ModalBody>
                            <FormGroup className="text-center">
                                <img src={this.props.auction.product.productImage} title={this.props.auction.product.productName + '(' + this.props.auction.product.productId + ')'} className="img-fluid1" />
                            </FormGroup>
                        </ModalBody>

                    </Modal>
                    : ''}
                <td>{this.props.auction.product && this.props.auction.product.productName}</td>
                {this.props.auction.location ? <td>{this.props.auction.location}
                </td> : <td>--</td>}

                <td>
                    {(this.props.auction.show && this.props.auction.show.showName) ? this.props.auction.show.showName : '--'}
                </td>
                {this.props.auction.episodeId ? <td>
                    {this.props.auction.episodeId}
                </td> : <td>--</td>}
                {/* {this.props.auction.auctionCode?   <td>
                    {this.props.auction.auctionCode}
                </td>:<td>--</td>} */}

                <td>
                    {(this.props.auction.auctionCategoryId) ? this.props.auction.auctionsCategory.auctionCategoryName : '--'}
                </td>
                <td>{this.props.auction.iswinreveal ? <button className="color_green btn btn-secondary" disabled={true} id={"WINID_" + this.props.auction.id} onClick={() => this.revealWinner(this.props.auction.id)}>Reveal</button> : <button className={"btn btn-primary"} id={"WINID_" + this.props.auction.id} onClick={() => this.revealWinner(this.props.auction.id)}>Reveal</button>}</td>

                {this.props.auction.wonUserId ? <td>
                    <a href={`/#/customersUserprofile/${this.props.auction.user.id}`}>
                        {this.props.auction.user.firstName}
                    </a>
                </td> : <td>--</td>}

                <td>
                    <span title={this.formatDisplayTime(auctionStartTime)}>
                        {this.formatDisplayTime(auctionStartTime)}</span>
                    <br />
                    <span title={this.formatDisplayTime(auctionEndTime)}>
                        {this.formatDisplayTime(auctionEndTime)}</span>
                </td>
                <td className="text-center refresh_td">
                    <p style={{ fontSize: "22px", fontWeight: "700", color: "#000000", marginBottom: "0", padding: "2px 0" }}>{(this.props.auction && this.props.auction.totalBids) ? this.props.auction.totalBids : '--'}</p>
                    <p style={{ marginBottom: "0" }}><button onClick={() => this.refreshTotalBids(this.props.auction.id)}><RefreshCcw size={12} /></button></p>
                </td>

                <td>{<Edit2 size={21} className='pluscircle' style={{ cursor: "pointer" }} onClick={() => this.EditLiveAuction(this.props.auction)} />}</td>

            </tr>

        );
    }
}

WeeklyAuctionsTable.propTypes = {
    startAuctionTimer: PropTypes.func.isRequired,
    revealProductInfo: PropTypes.func.isRequired,
    revealWinnerInfo: PropTypes.func.isRequired
}

const mapStateToProps = state => ({
    auctions: state.auctionsdata.auctions
});

export default connect(
    mapStateToProps, { startAuctionTimer, revealProductInfo, fetchauctions, revealWinnerInfo }
)(WeeklyAuctionsTable);
