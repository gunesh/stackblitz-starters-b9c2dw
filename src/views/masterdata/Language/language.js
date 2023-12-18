import React, { Fragment, useState } from "react";
import { Card, Nav, NavLink, TabContent, TabPane, NavItem } from "reactstrap";
import { PlusCircle, Search } from "react-feather";
import classnames from 'classnames';
import LanguageList from "./languageList"
import CreateLanguage from "./createLanguage"
import PropTypes from "prop-types";
import '../../auctions/createauctions/viewauctions.scss'
import EditLanguage from './editLanguage'
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
                            LANGUAGE LIST
                            </NavLink>
                        </NavItem>
                        {this.state.Editloction && this.state.activeTab ==="2"?(
                        <NavItem className="create_tab">
                            <NavLink className={classnames({ active: this.state.activeTab === '2' })} onClick={() => { toggle('2'); }} >
                                EDIT LANGUAGE
                            </NavLink>
                        </NavItem>): <NavItem className="create_tab">
                            <NavLink onClick={this.reloadRoute()}  className={classnames({ active: this.state.activeTab === '2' })} onClick={() => { toggle('2'); }} >
                                CREATE LANGUAGE
                            </NavLink>
                        </NavItem>}
                    </Nav>
                    <TabContent activeTab={this.state.activeTab}>
                        <TabPane tabId="1">
                            <div className="auctionlist_content">
                               <LanguageList LangInfo={this.LocationData}/>
                            </div>
                        </TabPane>
                        {this.state.Editloction?( <TabPane tabId="2">
                        <EditLanguage EditLanguageList={this.state.Editloction}/>
                         </TabPane>):<TabPane tabId="2">
                            <CreateLanguage  />
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


