import React, { Fragment, PureComponent } from "react";
import { isEmpty } from 'lodash';
import PropTypes from "prop-types";
import { PlusCircle, DownloadCloud ,Edit2} from "react-feather";
import { Row, Card, FormGroup, Col, Input, Label, Button, Table } from "reactstrap";
import { Calendar } from "react-feather";
import {fetchBanner} from '../../redux/actions/banner/bannerAction'
import { connect } from "react-redux";
import img_thumb from '../../assets/img/avatar-s-1.png';
import { changeStatusOnboarding } from '../../redux/actions/masterDataFiles/bannerActions'

class BannerList extends PureComponent {
     constructor() {
    super();
    this.state = { 
        location:"Kerala",
        status: false,
            id: null,
    };    
  }
    Editbanner=(data)=>{
    this.props.bannerInfo(data)
    }

    handleChange = (value) => {
        console.log("=-=-=>>>",value)
        this.setState({
            id: value.id,
            status: value.status,
        })
        var data = { id: value.id, status: !value.status }
        this.props.changeStatusOnboarding(data)
        //  window.location.reload();
    }

     componentDidMount() {
         this.props.fetchBanner(this.state);
    }
    render() {
        const{banner}=this.props.banner
        const BannerLists = (
            <div>
                {/* <Row>
                    <Col sm="12">
                        <div className="aucionlist_filters">
                            <Row>
                                <Col sm="2">
                                    <FormGroup>
                                        <Label for="exampleSelect">Language</Label>
                                        <Input type="select" className="custom_arrow">
                                            <option>English</option>
                                            <option>Malayalam</option>
                                            <option>Hindi </option>
                                            <option value="">No Language</option>
                                        </Input>
                                    </FormGroup>
                                </Col>
                                <Col sm="2">
                                    <FormGroup>
                                        <Label for="exampleSelect">Location</Label>
                                        <Input type="select" className="custom_arrow">
                                            <option>Telangana</option>
                                            <option>Kerala</option>
                                            <option value="">No Location</option>
                                        </Input>
                                    </FormGroup>
                                </Col>
                                <Col sm="2">
                                    <div>&nbsp;</div>
                                    <Button color="primary" >Submit</Button>
                                </Col>
                            </Row>
                        </div>
                    </Col>
                </Row> */}
                        
                <div className="auctionlist_content">
                    <Col sm="12">
                        <Table striped>
                            <thead>
                                <tr>
                                    {/* <th>Background Banner</th> */}
                                    <th>Banner</th>
                                    <th>Description</th>
                                    {/* <th>Episode</th> */}
                                    {/* <th>Language</th> */}
                                    <th>Location</th>
                                    <th>Status</th>
                                    <th>Edit</th>
                                </tr>
                            </thead>
                            <tbody>
                            {banner && banner.map((item,index)=>(
                                        <tr key ={index}>
                                    {/* <td><img src={item.auctionBackgroundImage} width="100" height="40" /></td> */}
                                    <td><img src={item.auctionForegroundImage} width="100" height="40" /></td>
                                    <td>{item.description}</td>
                                 {/* <th>{item.episodeId}</th> */}
                                
                            {/* <td>{(item.language.language) ? item.language.language : ""}</td> */}
                            <td>{item.location}</td>
                            <td>
                                {this.state.id === item.id ? (<div className="custom-control custom-switch">
                                    <input type="checkbox" className="custom-control-input"
                                        onChange={() => this.handleChange({ id: item.id, status: item.status })}
                                        defaultChecked={this.state.status} id={"customSwitch" + index} />
                                    <label className="custom-control-label" for={"customSwitch" + index} ></label>
                                </div>) :
                                    (<div className="custom-control custom-switch">
                                        <input type="checkbox" className="custom-control-input"
                                            onChange={() => this.handleChange({ id: item.id, status: item.status })}
                                            defaultChecked={item.status} id={"customSwitch" + index} />
                                        <label onChange={() => this.handleChange({ id: item.id, status: item.status })} className="custom-control-label" for={"customSwitch" + index} ></label>
                                    </div>)
                                }

                             </td>
                              <td>{<Edit2 size={21} style={{cursor:"pointer"}} className='pluscircle' onClick={()=>this.Editbanner(item)}/>}</td>
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
    banner: state.bannerdata.banner
});
export default connect(
    mapStateToProps, { fetchBanner,changeStatusOnboarding}
)(BannerList);
