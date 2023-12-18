import React, { Component, Fragment } from "react";
import { connect } from "react-redux";
import { fetchauctions } from '../../../redux/actions/auctions/auctionsActions';
import AuctionsList from "./auctionsList";
import WeeklyAuctionsList from "./weeklyAuctionsList";
import MonthlylyAuctionsList from "./monthlyAuctionsList";
import PaidAuctionsList from "./paidAuctionsList";
import FreeAuctionsList from "./freeAuctionsList";
import { fetchauctionsType } from '../../../redux/actions/auctions/auctionTypeAction';
import {fetchEpisodes} from '../../../redux/actions/episode/episodeAction';

// Styling
class CreateAuctions extends Component {

    componentDidMount() {
        const data= {'auctionTypeId':this.props.auctionTypeId};
        this.props.fetchauctions(data);
        this.props.fetchauctionsType();
        this.props.fetchEpisodes();    
    }
AuctionData=(data)=>{
this.props.AuctionInfo(data)
}
    render() {
        if(this.props.auctionTypeId==1){
        return (
            <Fragment>
                <AuctionsList auctions={this.props.auctions} />
            </Fragment>
        );
        }
        if(this.props.auctionTypeId==4){
            return (
                <Fragment>
                    <WeeklyAuctionsList auctions={this.props.auctions} />
                </Fragment>
            ); 
        }
        if(this.props.auctionTypeId==5){
            return (
                <Fragment>
                    <MonthlylyAuctionsList auctions={this.props.auctions} />
                </Fragment>
            ); 
        }

        if(this.props.auctionTypeId==2){
            return (
                <Fragment>
                    <PaidAuctionsList auctions={this.props.auctions} />
                </Fragment>
            ); 
        }
        if(this.props.auctionTypeId==3){
            return (
                <Fragment>
                    <FreeAuctionsList auctions={this.props.auctions} freeAuctionInfo={this.AuctionData}/>
                </Fragment>
            ); 
        }
    }
}

const mapStateToProps = state => ({
    auctions: state.auctionsdata.auctions
});


// export default Users;
export default connect(
    mapStateToProps, { fetchauctions, fetchauctionsType,fetchEpisodes}
)(CreateAuctions);
