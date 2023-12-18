import React, { Fragment, useState } from "react";
import { Card, Nav, NavLink, TabContent, TabPane, NavItem } from "reactstrap";
import { PlusCircle, Search } from "react-feather";
import classnames from 'classnames';
// import './viewauctions.scss';
import BannerList from "./BannerList"
import CreateBanner from "./CreateBanner"
import PropTypes from "prop-types";
import '../auctions/createauctions/viewauctions.scss'
import EditBanner from './editBanner'
import { withRouter } from 'react-router-dom';
import { compose } from 'redux';
import { connect } from "react-redux";
import { fetchChannel,saveChannel } from '../../redux/actions/chanels/chanelAction';
// Styling

class Banner  extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      activeTab: 1,
     Editnanner:"",
      reloadPage:false
    };
  }

BannerData=(data)=>{
      this.setState({Editnanner:data})
      
      if(data){
          this.setState({activeTab:'2'})
      }
  }
  componentDidMount(){
      this.setState({activeTab:'1'})
  }
  reloadRoute=()=>{
   if(this.state.Editnanner){
       this.setState({Editnanner:""})
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
                            <NavLink className={classnames({ active: this.state.activeTab === '1' })} onClick={() => { toggle('1'); }} >
                            BANNER LIST
                            </NavLink>
                        </NavItem>
                        {this.state.Editnanner && this.state.activeTab ==="2"?(
                        <NavItem className="create_tab">
                            <NavLink className={classnames({ active: this.state.activeTab === '2' })} onClick={() => { toggle('2'); }} >
                                EDIT BANNER
                            </NavLink>
                        </NavItem>): <NavItem className="create_tab">
                            <NavLink onClick={this.reloadRoute()}  className={classnames({ active: this.state.activeTab === '2' })} onClick={() => { toggle('2'); }} >
                                CREATE BANNER
                            </NavLink>
                        </NavItem>}
                    </Nav>
                    <TabContent activeTab={this.state.activeTab}>
                        <TabPane tabId="1">
                            <div className="auctionlist_content">
                               <BannerList bannerInfo={this.BannerData}/>
                            </div>
                        </TabPane>
                        {this.state.Editnanner?( <TabPane tabId="2">
                            <EditBanner EditBannerList={this.state.Editnanner}/>
                         </TabPane>):<TabPane tabId="2">
                            <CreateBanner  />
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
  connect(null, { fetchChannel,saveChannel})
)(Banner);


