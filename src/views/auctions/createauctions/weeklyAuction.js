import React, { Fragment, } from "react";
import { Card, Nav, NavLink, TabContent, TabPane, NavItem} from "reactstrap";
import { PlusCircle } from "react-feather";
import classnames from 'classnames';
import './viewauctions.scss';
import CreateAuctions from "./createAuctions"
import WeeklyAuction from "../createauctions/weeklyAuctionsList"
import AddWeeklyAuction from "../addauctions/addWeeklyAuction"
import EditAuction from "../editauctions/editWeeklyAuction"
import { withRouter } from 'react-router-dom';
import { compose } from 'redux';
import { connect } from "react-redux";


// Styling
class Weeklyauction extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      activeTab: 1,
      editWeeklyAuction:"",
      id:"",
      reloadPage:false
    };
  }

  AuctionData=(data)=>{
      console.log(">>>>,",data)
      this.setState({editWeeklyAuction:data})
      
      if(data){
          this.setState({activeTab:'2'})
      }
  }
  componentDidMount(){
      this.setState({activeTab:'1'})
  }


  reloadRoute=()=>{
    if(this.state.editWeeklyAuction){
        this.setState({editWeeklyAuction:""})
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
                                WEEKLY AUCTION LIST
                            </NavLink>
                        </NavItem>
                        {this.state.editWeeklyAuction && this.state.activeTab ==="2"?(
                            
                        <NavItem className="create_tab">
                            <NavLink className={classnames({ active: this.state.activeTab === '2' })} onClick={() => { toggle('2'); }} >
                                Edit WEEKLY AUCTION
                            </NavLink>
                        </NavItem>): <NavItem className="create_tab">
                            <NavLink onClick={this.reloadRoute()} className={classnames({ active: this.state.activeTab === '2' })} onClick={() => { toggle('2'); }} >
                                CREATE WEEKLY AUCTION
                            </NavLink>
                        </NavItem>}
                    </Nav>
                    <TabContent activeTab={this.state.activeTab}>
                        <TabPane tabId="1">
                            <div className="auctionlist_content">
                               <WeeklyAuction  WeeklyAuctionInfo={this.AuctionData} />
                            </div>
                        </TabPane>
                        {this.state.editWeeklyAuction?( <TabPane tabId="2">
                            <EditAuction WeeklyAuctionInfo={this.state.editWeeklyAuction} />
                         </TabPane>):<TabPane tabId="2">
                            <AddWeeklyAuction />
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
)(Weeklyauction);







