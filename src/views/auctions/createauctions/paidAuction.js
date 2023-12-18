import React, { Fragment, } from "react";
import { Card, Nav, NavLink, TabContent, TabPane, NavItem} from "reactstrap";
import { PlusCircle } from "react-feather";
import classnames from 'classnames';
import './viewauctions.scss';
import CreateAuctions from "./createAuctions"
import PaidAuction from "../createauctions/paidAuctionsList"
import AddFreeAuction from "../addauctions/addPaidAuction"
import EditAuction from "../editauctions/editPaidAuction"
import { withRouter } from 'react-router-dom';
import { compose } from 'redux';
import { connect } from "react-redux";


// Styling
class Paidauction extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      activeTab: 1,
      editPaidAuction:"",
      id:"",
      reloadPage:false
    };
  }

  AuctionData=(data)=>{
      this.setState({editPaidAuction:data})
      
      if(data){
          this.setState({activeTab:'2'})
      }
  }
  componentDidMount(){
      this.setState({activeTab:'1'})
  }


  reloadRoute=()=>{
    if(this.state.editPaidAuction){
        this.setState({editPaidAuction:""})
    }
   }
   
  render() {
    const toggle = tab => {
        if (this.state.activeTab !== tab)
        this.setState({activeTab:tab}) 
    }

    return (
        <Fragment>
            <Card>
            
                <div className="auctions_section">
                    <Nav tabs>
                        <NavItem>
                            <NavLink  className={classnames({ active: this.state.activeTab === '1' })} onClick={() => { toggle('1'); }} >
                                PAID AUCTION LIST
                            </NavLink>
                        </NavItem>
                        {this.state.editPaidAuction && this.state.activeTab ==="2"?(
                            
                        <NavItem className="create_tab">
                            <NavLink className={classnames({ active: this.state.activeTab === '2' })} onClick={() => { toggle('2'); }} >
                               Edit PAID AUCTION
                            </NavLink>
                        </NavItem>): <NavItem className="create_tab">
                            <NavLink onClick={this.reloadRoute()} className={classnames({ active: this.state.activeTab === '2' })} onClick={() => { toggle('2'); }} >
                               CREATE PAID AUCTION
                            </NavLink>
                        </NavItem>}
                    </Nav>
                    <TabContent activeTab={this.state.activeTab}>
                        <TabPane tabId="1">
                            <div className="auctionlist_content">
                               <PaidAuction  PaidAuctionInfo={this.AuctionData} />
                            </div>
                        </TabPane>
                        {this.state.editPaidAuction?( <TabPane tabId="2">
                            <EditAuction PaidAuctionInfo={this.state.editPaidAuction} />
                         </TabPane>):<TabPane tabId="2">
                            <AddFreeAuction />
                         </TabPane>
                         }
                    </TabContent>
                </div>
            </Card>
        </Fragment>
    );


}


}

export default compose(
  withRouter,
  connect(null, {})
)(Paidauction);







