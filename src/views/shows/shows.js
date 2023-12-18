import React, { Fragment, useState } from "react";
import { Card, Nav, NavLink, TabContent, TabPane, NavItem } from "reactstrap";
import { PlusCircle, Search } from "react-feather";
import classnames from 'classnames';
// import './viewauctions.scss';
import PropTypes from "prop-types";
import '../auctions/createauctions/viewauctions.scss'
import ShowsList from "./showsList"
import CreateShows from "./createShows"
import EditShows from './editShows';
import { compose } from 'redux';
import { connect } from "react-redux";
import { withRouter } from 'react-router-dom';
import { fetchChannel,saveChannel } from '../../redux/actions/chanels/chanelAction';



// Styling
class Shows extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      activeTab: 1,
      EditShow:"",
      reloadPage:false
    };
  }

  ShowData=(data)=>{
      this.setState({EditShow:data})
    //   if(this.state.activeTab === '1'){
    //      this.setState({EditShow:[]})

    // }
      if(data){
          this.setState({activeTab:'2'})
      }
  }
  componentDidMount(){
      this.setState({activeTab:'1'})
  }
 reloadRoute=()=>{
   if(this.state.EditShow){
       this.setState({EditShow:""})
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
                                SHOW LIST
                            </NavLink>
                        </NavItem>
                        {this.state.EditShow && this.state.activeTab ==="2"?(
                        <NavItem className="create_tab">
                            <NavLink className={classnames({ active: this.state.activeTab === '2' })} onClick={() => { toggle('2'); }} >
                                EDIT SHOW
                            </NavLink>
                        </NavItem>): <NavItem className="create_tab">
                            <NavLink  onClick={this.reloadRoute()} className={classnames({ active: this.state.activeTab === '2' })} onClick={() => { toggle('2'); }} >
                                CREATE SHOW
                            </NavLink>
                        </NavItem>}
                    </Nav>
                    <TabContent activeTab={this.state.activeTab}>
                        <TabPane tabId="1">
                            <div className="auctionlist_content">
                               <ShowsList showInfo={this.ShowData} />
                            </div>
                        </TabPane>
                        {this.state.EditShow?( <TabPane tabId="2">
                            <EditShows EditshowList={this.state.EditShow}/>
                         </TabPane>):<TabPane tabId="2">
                            <CreateShows  />
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
)(Shows);


