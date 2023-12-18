import React, { Fragment, } from "react";
import { Card, Nav, NavLink, TabContent, TabPane, NavItem} from "reactstrap";
import { PlusCircle } from "react-feather";
import classnames from 'classnames';
import './viewauctions.scss';
import MonthlyAuction from "../createauctions/monthlyAuctionsList"
import AddMonthlyAuction from "../addauctions/addMonthlyAuction"
import EditAuction from "../editauctions/editMonthlyAuction"
import { withRouter } from 'react-router-dom';
import { compose } from 'redux';
import { connect } from "react-redux";


// Styling
class Monthlyauction extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      activeTab: 1,
      editMonthlyAuction:"",
      id:"",
      reloadPage:false
    };
  }

  AuctionData=(data)=>{
      console.log(">>>>,",data)
      this.setState({editMonthlyAuction:data})
      
      if(data){
          this.setState({activeTab:'2'})
      }
  }
  componentDidMount(){
      this.setState({activeTab:'1'})
  }


  reloadRoute=()=>{
    if(this.state.editMonthlyAuction){
        this.setState({editMonthlyAuction:""})
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
                                MONTHLY AUCTION LIST
                            </NavLink>
                        </NavItem>
                        {this.state.editMonthlyAuction && this.state.activeTab ==="2"?(
                            
                        <NavItem className="create_tab">
                            <NavLink className={classnames({ active: this.state.activeTab === '2' })} onClick={() => { toggle('2'); }} >
                                 Edit MONTHLY AUCTION
                            </NavLink>
                        </NavItem>): <NavItem className="create_tab">
                            <NavLink onClick={this.reloadRoute()} className={classnames({ active: this.state.activeTab === '2' })} onClick={() => { toggle('2'); }} >
                                CREATE MONTHLY AUCTION
                            </NavLink>
                        </NavItem>}
                    </Nav>
                    <TabContent activeTab={this.state.activeTab}>
                        <TabPane tabId="1">
                            <div className="auctionlist_content">
                               <MonthlyAuction  MonthlyAuctionInfo={this.AuctionData} />
                            </div>
                        </TabPane>
                        {this.state.editMonthlyAuction?( <TabPane tabId="2">
                            <EditAuction MonthlyAuctionInfo={this.state.editMonthlyAuction} />
                         </TabPane>):<TabPane tabId="2">
                            <AddMonthlyAuction />
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
)(Monthlyauction);











