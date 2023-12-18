import React, { Fragment, useState } from "react";
import { Card, Nav, NavLink, TabContent, TabPane, NavItem } from "reactstrap";
import { PlusCircle, Search } from "react-feather";
import classnames from 'classnames';
// import './viewauctions.scss';
import EpisodeList from "./episodeList"
import CreateEpisode from "./createEpisode"
import PropTypes from "prop-types";
import '../auctions/createauctions/viewauctions.scss'
import EditEpisode from './editEpisode'
import { withRouter } from 'react-router-dom';
import { compose } from 'redux';
import { connect } from "react-redux";
import { fetchChannel,saveChannel } from '../../redux/actions/chanels/chanelAction';


// Styling
class Episodes  extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      activeTab: 1,
      EditEpisode:"",
      reloadPage:false
    };
  }

  EpisodeData=(data)=>{
 
      this.setState({EditEpisode:data})
      
      if(data){
          this.setState({activeTab:'2'})
      }
  }
  
  componentDidMount(){
      this.setState({activeTab:'1'})
  }
  reloadRoute=()=>{
   if(this.state.EditEpisode){
       this.setState({EditEpisode:""})
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
                                EPISODE LIST
                            </NavLink>
                        </NavItem>
                        {this.state.EditEpisode && this.state.activeTab ==="2"?(
                        <NavItem className="create_tab">
                            <NavLink className={classnames({ active: this.state.activeTab === '2' })} onClick={() => { toggle('2'); }} >
                                EDIT EPISODE
                            </NavLink>
                        </NavItem>): <NavItem className="create_tab">
                            <NavLink onClick={this.reloadRoute()} className={classnames({ active: this.state.activeTab === '2' })} onClick={() => { toggle('2'); }} >
                                CREATE EPISODE
                            </NavLink>
                        </NavItem>}
                    </Nav>
                    <TabContent activeTab={this.state.activeTab}>
                        <TabPane tabId="1">
                            <div className="auctionlist_content">
                               <EpisodeList EpisodeInfo={this.EpisodeData} />
                            </div>
                        </TabPane>
                        {this.state.EditEpisode?( <TabPane tabId="2">
                            <EditEpisode EditEpisodeList={this.state.EditEpisode}/>
                         </TabPane>):<TabPane tabId="2">
                            <CreateEpisode  />
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
)(Episodes );


