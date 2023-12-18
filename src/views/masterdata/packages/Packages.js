import React, { Fragment, useState } from "react";
import { Card, FormGroup, Nav, NavLink, TabContent, TabPane, Row, NavItem, Col, Input, Label, Button, Table } from "reactstrap";
import { PlusCircle, Search } from "react-feather";
import classnames from 'classnames';
// import './viewauctions.scss';
import PackagesList from "./PackagesList";
import PackagesCreate from "./PackagesCreate";
import { withRouter } from 'react-router-dom';
import '../../auctions/createauctions/viewauctions.scss'
import { compose } from 'redux';
import { connect } from "react-redux";
import EditPackage from "./editPackage";
class Packages extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      activeTab: 1,
      Editpackage:"",
      channelLogo:"",
      id:"",
      reloadPage:false
    };
  }

  packagesData=(data)=>{
      console.log(">>>data",data)
     this.setState({Editpackage:data})
      
      if(data){
          this.setState({activeTab:'2'})
      }
  }
  componentDidMount(){
      this.setState({activeTab:'1'})
  }
  reloadRoute=()=>{
   if(this.state.Editpackage){
       this.setState({Editpackage:""})
   }

  }
  render() {
    const toggle = tab => {
        if (this.state.activeTab !== tab)
        this.setState({activeTab:tab}) 
    }

    return (
        <Fragment>
            <h6>Packages</h6>
            <Card>
                <div className="auctions_section">
                    <Nav tabs>
                        <NavItem>
                            <NavLink className={classnames({ active: this.state.activeTab === '1' })} onClick={() => { toggle('1'); }} >
                                PACKAGE LIST
                            </NavLink>
                        </NavItem>
                          {this.state.Editpackage && this.state.activeTab ==="2"?(
                        <NavItem className="create_tab">
                            <NavLink className={classnames({ active: this.state.activeTab === '2' })} onClick={() => { toggle('2'); }} >
                                EDIT PACKAGE
                            </NavLink>
                        </NavItem>): <NavItem className="create_tab">
                            <NavLink onClick={this.reloadRoute()}  className={classnames({ active: this.state.activeTab === '2' })} onClick={() => { toggle('2'); }} >
                                {/* {<PlusCircle size={21} className='pluscircle' />} */}
                                CREATE PACKAGE
                            </NavLink>
                        </NavItem>}
                       
                    </Nav>
                    <TabContent activeTab={this.state.activeTab}>
                        <TabPane tabId="1">
                            <PackagesList PackageInfo={this.packagesData} />
                        </TabPane>
                       {this.state.Editpackage?( <TabPane tabId="2">
                            <EditPackage editPackageList={this.state.Editpackage} />
                         </TabPane>):<TabPane tabId="2">
                            <PackagesCreate  />
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
  connect(null, { })
)(Packages);