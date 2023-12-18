import React, { Fragment, PureComponent } from "react";
import { isEmpty } from 'lodash';
import PropTypes from "prop-types";
import { PlusCircle, DownloadCloud } from "react-feather";
import { Row, Card, FormGroup, Col, Input, Label, Button, Table } from "reactstrap";
import { Calendar,Edit2 } from "react-feather";
import { connect } from "react-redux";
import img_thumb from '../../../../assets/img/avatar-s-1.png';
import {fetchBanner,changeStatusOnboarding} from '../../../../redux/actions/masterDataFiles/bannerActions'
import { fetchLanguage } from '../../../../redux/actions/language/languageAction'
import {fetchLocation} from '../../../../redux/actions/location/locationActions'

class BannerList extends PureComponent {
     constructor() {
    super();
    this.state = { status: '',
                   id:null,
        
                //  currentPage:1,
                //  postPerPage:30
                  };
                this.handleChange = this.handleChange.bind(this);
  }
     componentDidMount() {
         this.props.fetchBanner({"type":"ONBOARDING"});
            this.props.fetchLanguage();
            this.props.fetchLocation()
    }
    Editbanner=(event)=>{
this.props.bannerInfo(event)
    }
    filterOnboarding=()=>{
const data={
    type:"ONBOARDING"
}
        this.props.fetchBanner(data);
    }
     handleChange=(value,event)=>{
          this.setState({
      id: value.id,
      status:value.status,
    })
   var  data={id:value.id,status:!value.status}
     this.props.changeStatusOnboarding(data)
    //   window.location.reload();
    }
    render() {
        const {onboarding}=this.props.banner
        const { language,location} = this.props
        const BannerLists = (
            <div>
                <Row>
                    <Col sm="12">
                        <div className="aucionlist_filters">
                            <Row>
                                <Col sm="2">
                                    <FormGroup>
                                        <Label for="exampleSelect">Language</Label>
                                        <Input type="select" className="custom_arrow">
                                        <option value="">No Language</option>
                                                {language.language.map((item, index) => (
                                                    <option value={item.id} key={'CH_TYPE' + item.id}>{item.language}</option>
                                                ))}
                                        </Input>
                                    </FormGroup>
                                </Col>
                                <Col sm="2">
                                    <FormGroup>
                                        <Label for="exampleSelect">Location</Label>
                                        <Input type="select" className="custom_arrow">
                                        <option value="">All</option>
                                                         {
                                                             location.map((item)=>{
                                                                return <option value={item.state}>{item.state}</option>
                                                             })
                                                         }
                                        </Input>
                                    </FormGroup>
                                </Col>
                                <Col sm="2">
                                    <div>&nbsp;</div>
                                    <Button color="primary" onClick={this.filterOnboarding}>Submit</Button>
                                </Col>
                            </Row>
                        </div>
                    </Col>
                </Row>
                        
                <div className="auctionlist_content">
                    <Col sm="12">
                        <Table striped>
                            <thead>
                                <tr>
                                    <th>Onboarding</th>
                                    <th>Description</th>
                                    <th>Language</th>
                                    <th>Location</th>
                                    <th>status</th>
                                    <th>Edit</th>
                                </tr>
                            </thead>
                            <tbody>
                           </tbody>
                                 <tbody>
                            {onboarding && onboarding.map((item,index)=>(
                                    <tr key ={index}>
                                    <td><img src={item.images} width="100" height="40" /></td>
                                    <td>{item.contentValue}</td>
                                    <td>{item.language?item.language.language:"--"}</td>
                                     <td>{item.location}</td> 
                                     
                                       {this.state.id ===item.id?(  <div className="custom-control custom-switch">
                                            <input type="checkbox" className="custom-control-input"
                                            onChange={(event) => this.handleChange({id: item.id,status:item.status},event)}
                                             defaultChecked={this.state.status} id={"customSwitch"+index}
                                            onClick={this.clickSwitch}
                                              />
                                            <label   className="custom-control-label" for={"customSwitch"+index} ></label>
                                        </div>):
                                        (  <div className="custom-control custom-switch">
                                            <input type="checkbox" className="custom-control-input"
                                            onChange={(event) => this.handleChange({id: item.id,status:item.status},event)}
                                          defaultChecked={item.status} id={"customSwitch"+index}
                                       />
                                            <label onClick={this.clickSwitch} onChange={(event) => this.handleChange({id: item.id,status:item.status},event)}className="custom-control-label" for={"customSwitch"+index} ></label>
                                        </div>)
                                        } 
                                     <td>{<Edit2 size={21} className='pluscircle' onClick={()=>this.Editbanner(item)}/>}</td>
                                      </tr>
                                    ))}
                                </tbody>
                        </Table>
                    </Col>
                </div>

            </div>
                
        )

        return (
            <Fragment>
                {BannerLists}
            </Fragment>
        );
    }
} 

const mapStateToProps = state => ({
    banner:state.masterdata.banner,
    language: state.languagedata.language,
    location:state.locationdata.location.location
});
export default connect(
    mapStateToProps, { fetchBanner,changeStatusOnboarding,fetchLanguage,fetchLocation}
)(BannerList);