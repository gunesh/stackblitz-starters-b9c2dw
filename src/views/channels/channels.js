import React, { Fragment, useState } from "react";
import { Card, Nav, NavLink, TabContent, TabPane, NavItem } from "reactstrap";
import { PlusCircle, Search } from "react-feather";
import classnames from 'classnames';
// import './viewauctions.scss';
import ChannelList from "./channelList"
import CreateChannel from "./createChannel"
import PropTypes from "prop-types";
import '../auctions/createauctions/viewauctions.scss'
import EditChanel from './editChannel'
import { withRouter } from 'react-router-dom';
import { compose } from 'redux';
import { connect } from "react-redux";
import { fetchChannel,saveChannel } from '../../redux/actions/chanels/chanelAction';

// Styling
class Channels extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      activeTab: 1,
      EditChanel:"",
      channelLogo:"",
      id:"",
      reloadPage:false
    };
  }

  ChannelData=(data)=>{
      this.setState({EditChanel:data,channelLogo:data.logo,id:data.id})
      
      if(data){
          this.setState({activeTab:'2'})
      }
  }
  componentDidMount(){
      this.setState({activeTab:'1'})
  }
  reloadRoute=()=>{
   if(this.state.EditChanel){
       this.setState({EditChanel:""})
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
                                CHANNEL LIST
                            </NavLink>
                        </NavItem>
                        {this.state.EditChanel && this.state.activeTab ==="2"?(
                            
                        <NavItem className="create_tab">
                            <NavLink className={classnames({ active: this.state.activeTab === '2' })} onClick={() => { toggle('2'); }} >
                                EDIT CHANNEL
                            </NavLink>
                        </NavItem>): <NavItem className="create_tab">
                            <NavLink onClick={this.reloadRoute()} className={classnames({ active: this.state.activeTab === '2' })} onClick={() => { toggle('2'); }} >
                                CREATE CHANNEL
                            </NavLink>
                        </NavItem>}
                    </Nav>
                    <TabContent activeTab={this.state.activeTab}>
                        <TabPane tabId="1">
                            <div className="auctionlist_content">
                               <ChannelList  ChannelInfo={this.ChannelData} />
                            </div>
                        </TabPane>
                        {this.state.EditChanel?( <TabPane tabId="2">
                            <EditChanel ChannelList={this.state.EditChanel}channelLogo={this.state.channelLogo}id={this.state.id}/>
                         </TabPane>):<TabPane tabId="2">
                            <CreateChannel />
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
)(Channels);


