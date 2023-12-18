import React, { Fragment, useState } from "react";
import { Card, Nav, NavLink, TabContent, TabPane, NavItem } from "reactstrap";
import { PlusCircle, Search } from "react-feather";
import classnames from 'classnames';
// import './viewauctions.scss';
import LocationList from "./LocationList"
import CreateLocation from "./CreateLocation"
import PropTypes from "prop-types";
import '../../auctions/createauctions/viewauctions.scss'
import EditLocation from './editLocation'
import { withRouter } from 'react-router-dom';
import { compose } from 'redux';
import { connect } from "react-redux";
// import { fetchChannel,saveChannel } from '../../redux/actions/chanels/chanelAction';


class Banner  extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      activeTab: 1,
     Editloction:"",
      reloadPage:false
    };
  }

LocationData=(data)=>{
      this.setState({Editloction:data})
      
      if(data){
          this.setState({activeTab:'2'})
      }
  }
  componentDidMount(){
      this.setState({activeTab:'1'})
  }
  reloadRoute=()=>{
   if(this.state.Editloction){
       this.setState({Editloction:""})
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
                            LOCATION LIST
                            </NavLink>
                        </NavItem>
                        {this.state.Editloction && this.state.activeTab ==="2"?(
                        <NavItem className="create_tab">
                            <NavLink className={classnames({ active: this.state.activeTab === '2' })} onClick={() => { toggle('2'); }} >
                                EDIT LOCATION
                            </NavLink>
                        </NavItem>): <NavItem className="create_tab">
                            <NavLink onClick={this.reloadRoute()}  className={classnames({ active: this.state.activeTab === '2' })} onClick={() => { toggle('2'); }} >
                                CREATE LOCATION
                            </NavLink>
                        </NavItem>}
                    </Nav>
                    <TabContent activeTab={this.state.activeTab}>
                        <TabPane tabId="1">
                            <div className="auctionlist_content">
                               <LocationList locationInfo={this.LocationData}/>
                            </div>
                        </TabPane>
                        {this.state.Editloction?( <TabPane tabId="2">
                        <EditLocation EditLocationList={this.state.Editloction}/>
                         </TabPane>):<TabPane tabId="2">
                            <CreateLocation  />
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
  connect(null, { })
)(Banner);


