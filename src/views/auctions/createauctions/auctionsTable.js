import React from 'react';
import { isEmpty } from 'lodash';
import PropTypes from "prop-types";
import $ from 'jquery';
import { connect } from "react-redux";
import { fetchauctions } from '../../../redux/actions/auctions/auctionsActions';
import { startAuctionTimer, revealProductInfo, revealWinnerInfo } from '../../../redux/actions/auctions/auctionsActions';
import { Modal, ModalHeader, ModalBody, ModalFooter, Button, FormGroup, Input } from 'reactstrap';
import { RefreshCcw } from "react-feather";

class AuctionsTable extends React.Component {
    constructor(props) {

        super(props);
        this.state = {
            modal: false,
            startAuctionEnable: false,
            winnerRevealEnable: false,
            isproductreveal: this.props.auction.isproductreveal,
            isstarted: this.props.auction.isstarted,
            iswinreveal: this.props.auction.iswinreveal,
            duration: this.props.auction.duration

        };
        this.startAuction = this.startAuction.bind(this);
        this.sec2human = this.sec2human.bind(this);
        this.revealProduct = this.revealProduct.bind(this);
        this.revealWinner = this.revealWinner.bind(this);
        this.calculateTimeDiff = this.calculateTimeDiff.bind(this);
        // console.log(this.props);

    }
    toggle = () => {
        this.setState({ modal: !this.state.modal });
    }
    componentWillReceiveProps(nextProps) {

        this.setState({
            isproductreveal: nextProps.auction.isproductreveal,
            isstarted: nextProps.auction.isstarted,
            iswinreveal: nextProps.auction.iswinreveal,
            duration: nextProps.auction.duration
        })
    }


    sec2human = (seconds) => {
        let sec = seconds;// % 60;
        // let  min = parseInt(seconds / 60);
        // if(sec.toString().length === 1) { 
        //     sec = "0" + sec;
        // }
        //return min + ":" + sec;
        return sec;
    }
    startAuction = (id, duration) => {

        this.setState({ winnerRevealEnable: true })
        let that = this;
        let conf = window.confirm('Are you sure wanted to start ?');
        if (conf) {
            this.props.startAuctionTimer({ 'id': id }).then(function (response) {

                $("#ALID_" + id).hide();
                // $("#TIMER__"+id).removeClass('d-none').addClass('d-block');
                let timeSeconds = duration;
                setInterval(function () {
                    if (timeSeconds >= 0) {
                        $("#TIMER_" + id).disabled = true;
                        $("#TIMER_" + id).html(that.sec2human(timeSeconds));
                        timeSeconds--;
                    } else {
                        if (timeSeconds <= 0) {
                            $("#TIMER_" + id).html('Done');
                            that.setState({ iswinreveal: false });
                            that.setState({ isstarted: true });
                            that.setState({ isproductreveal: true });
                        }
                    }
                }, 1000)
            })
        }
    }

    revealProduct = (id) => {

        let that = this;
        let conf = window.confirm('Are you sure wanted to reveal the Product ?');
        if (conf) {
            this.setState({ isproductreveal: true });
            $("#PRODID_" + id).disabled = true;
            $("#PRODID_" + id).html('Done');
            $("#PRODID_" + id).attr("disabled", true);
            //  $("#TIMER_"+id).attr("enabled", true);
            // $("#TIMER_"+id).removeAttr('disabled');
            // $("#TIMER_"+id).html('Start');
            // $("#PRODUCT_INFO_"+id).removeClass('d-none').addClass('d-block');
            this.props.revealProductInfo({ 'id': id }).then(function (response) {

                alert("Product reveal successfuly");
                //  window.location.reload();
            })

        }
    }
    revealWinner = (id) => {
        let that = this;
        let conf = window.confirm('Are you sure wanted to reveal the Winner ?');
        if (conf) {
            // $("#WINID_"+id).hide();
            // $("#WINNER_INFO_"+id).removeClass('d-none').addClass('d-block');
            this.props.revealWinnerInfo({ 'id': id }).then(function (response) {
                if (response.status == 412) {

                    alert(response.message);
                    window.location.reload();
                }
                else if (response.status == 200) {
                    alert("Winner reveal successfuly!")
                    window.location.reload();
                }
            })

        }
    }
    refreshTotalBids = (id) => {
        this.props.fetchauctions({ "auctionTypeId": 1 })
    }
    calculateTimeDiff = (data) => {

    }
    render() {
        const { id, productId, location, showId, auctionCode, auctionCategoryId, wonUserId, totalBids, isproductreveal, isstarted, iswinreveal, user } = this.props.auction;


        return (

            <tr key={this.props.auction.id && id}>
                <td>
                    {this.props.index + 1}
                </td>
                <td>
                    {(this.props.auction.product && this.props.auction.product.productId) ? (<span title={this.props.auction.product.productName + '(' + this.props.auction.product.productId + ')'}><img onClick={this.toggle} src={this.props.auction.product.productImage} style={{ cursor: "pointer" }} width="40" height="40" /><br /></span>) : ''}
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
                <td> {this.props.auction.product && this.props.auction.product.productName}</td>
                <td>
                    {this.props.auction.auctionCode}
                </td>
                <td>
                    {(this.props.auction.auctionCategoryId) ? this.props.auction.auctionsCategory.auctionCategoryName : ''}
                </td>


                <td>{(!isproductreveal) ? <button className="color_lblue btn btn-secondary" id={"PRODID_" + this.props.auction.id} onClick={() => this.revealProduct(this.props.auction.id)}>Reveal</button> :
                    <>{isproductreveal ? <button className="color_lblue btn btn-secondary" id={"PRODID_REVL_" + this.props.auction.id} disabled={true} >Done</button> : <button className="color_lblue btn btn-secondary" id={"PRODID_" + this.props.auction.id} disabled={true} >Done</button>}</>
                }
                </td>
                <td>
                    {/* {isproductreveal && !isstarted?<button className={"color_green btn btn-secondary"} id={"TIMER_"+this.props.auction.id} onClick={()=>this.startAuction(this.props.auction.id,this.props.auction.duration )}>Start</button>:<>{
       isstarted? <button className="color_lblue btn btn-secondary"  id={'TIMER_'+this.props.auction.id} disabled={true}  onClick={()=>this.startAuction(this.props.auction.id,this.props.auction.duration )}>Done</button>: <button className="color_green btn btn-secondary" disabled={true} onClick={()=>this.startAuction(this.props.auction.id,this.props.auction.duration )} id={'TIMER_'+this.props.auction.id}>Start</button>
    }</>} */}


                    {(this.state.isproductreveal && !this.state.isstarted) ? <button className={"color_green btn btn-secondary"} id={"TIMER_" + this.props.auction.id} onClick={() => this.startAuction(this.props.auction.id, this.props.auction.duration)}>Start</button> : <>{
                        (this.state.isstarted) ? <button className="color_lblue btn btn-secondary" id={'TIMER_' + this.props.auction.id} disabled={true}  >Done</button> : <button className="color_green btn btn-secondary" disabled={true} onClick={() => this.startAuction(this.props.auction.id, this.props.auction.duration)} id={'TIMER_' + this.props.auction.id}>Start</button>
                    }</>}

                    {/* <span className={(isstarted)?"":"d-none"}  id={'TIMER__'+this.props.auction.id}></span> */}
                </td>
                <td>
                    {/* {isstarted && ! iswinreveal?
                <button  className={"btn btn-primary"}  id={"WINID_"+this.props.auction.id} onClick ={()=>this.revealWinner(this.props.auction.id)}>Reveal</button>:
    <>{iswinreveal?<button className="color_green btn btn-secondary" disabled={true}   id={"WINID_"+this.props.auction.id} >Done</button>:
    <button className="color_green btn btn-secondary" disabled={true}   id={"WINID_"+this.props.auction.id} >Reveal</button>}</>
                
                } */}

                    {(this.state.isproductreveal && this.state.isstarted) ?
                        <button className={"btn btn-primary"} id={"WINID_" + this.props.auction.id} onClick={() => this.revealWinner(this.props.auction.id)}>Reveal</button> :
                        <>{this.state.iswinreveal ? <button className="color_green btn btn-secondary" disabled={true} id={"WINID_" + this.props.auction.id} >Done</button> :
                            <button className="color_green btn btn-secondary" disabled={true} id={"WINID_" + this.props.auction.id} >Reveal</button>}</>

                    }


                </td>
                {this.props.auction.wonUserId ?
                    <td>
                        <a href={`/#/customersUserprofile/${this.props.auction.user.id}`}>
                            {this.props.auction.user.firstName}
                        </a>
                    </td> : <td>--</td>}

                {this.props.auction.location ? <td>
                    {this.props.auction.location}
                </td> : <td>--</td>}

                <td>
                    {(this.props.auction.show && this.props.auction.show.showName) ? this.props.auction.show.showName : ''}
                </td>

                {this.props.auction.totalBids ?
                    <td className="text-center refresh_td">
                        <p style={{ fontSize: "22px", fontWeight: "700", color: "#000000", marginBottom: "0", padding: "2px 0" }}>
                            {this.props.auction.totalBids}
                        </p>
                        <p style={{ marginBottom: "0" }}><button onClick={() => this.refreshTotalBids(this.props.auction.id)} ><RefreshCcw size={12} /></button></p>
                    </td> : <td>--</td>}
                <td>
                    {this.props.auction.episodeId}
                </td>
                {/* {()=>this.calculateTimeDiff(this.props.auction)} */}
            </tr>

        );
    }
}
const mapStateToProps = state => ({
    auctions: state.auctionsdata.auctions,
    auctionType: state.auctionsdata.auctionType,
    chanels: state.chaneldata.chanels,
    shows: state.showsdata.shows,
    episode: state.episodedata.episode
});

AuctionsTable.propTypes = {
    startAuctionTimer: PropTypes.func.isRequired,
    revealProductInfo: PropTypes.func.isRequired,
    revealWinnerInfo: PropTypes.func.isRequired,
    fetchauctions: PropTypes.func.isRequired
}


export default connect(
    mapStateToProps, { startAuctionTimer, fetchauctions, revealProductInfo, revealWinnerInfo }
)(AuctionsTable);
