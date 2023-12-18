import React, { Fragment, PureComponent } from "react";
import { isEmpty } from 'lodash';
import PropTypes from "prop-types";
import { PlusCircle, DownloadCloud } from "react-feather";
import { Row, Card, FormGroup, Col, Input, Label, Button, Table } from "reactstrap";
import { Calendar ,Edit2} from "react-feather";
import { connect } from "react-redux";
import {fetchEpisodes,changeStatusEpisode} from '../../redux/actions/episode/episodeAction';
import { fetchChannel } from '../../redux/actions/chanels/chanelAction'
import {fetchShows} from '../../redux/actions/Shows/showsAction';
import Pagination from "../auctions/createauctions/pagination"
// import img_thumb from '../../assets/img/avatar-s-1.png';

class EpisodeList extends PureComponent {
    constructor() {
    super();
    this.state = { status: '',
                   id:null,
                 count:1,
                 currentPage:1,
                 postPerPage:30
                  };
                this.handleChange = this.handleChange.bind(this);
  }
      componentDidMount() {
         this.props.fetchEpisodes();
         this.props.fetchChannel();
         this.props.fetchShows();
    }

    EditEpisode=(event)=>{
        this.props.EpisodeInfo(event);
    }
     handleChange=(value,event)=>{
          this.setState({
      id: value.id,
      status:value.status,
    })
   var  data={id:value.id,status:!value.status}
     this.props.changeStatusEpisode(data)
    //   window.location.reload();
    }

 clickSwitch=()=>{
     this.setState({count:this.state.count+1})
      
 }
    render() {
const {episode}=this.props.episode
const indexOfLastPost = this.state.currentPage + this.state.postPerPage
        const indexOfFirstPost =indexOfLastPost - this.state.postPerPage
        const curreAuctionData = episode.slice(indexOfFirstPost,indexOfLastPost)
        const EpisodeLists = (
            <div>
                {/* <Row>
                    <Col sm="12">
                        <div className="aucionlist_filters">
                            <Row>
                                <Col sm="2">
                                    <FormGroup>
                                        <Label for="exampleSelect">Channel ID</Label>
                                        <Input type="select" className="custom_arrow">
                                            <option>Channel ID</option>
                                            <option>Channel ID</option>
                                            <option>Channel ID</option>
                                            <option>Channel ID</option>
                                        </Input>
                                    </FormGroup>
                                </Col>
                                <Col sm="2">
                                    <FormGroup>
                                        <Label for="exampleSelect">Show ID</Label>
                                        <Input type="select" className="custom_arrow">
                                            <option>Show ID</option>
                                            <option>Show ID</option>
                                            <option>Show ID</option>
                                        </Input>
                                    </FormGroup>
                                </Col>
                                <Col sm="2">
                                    <FormGroup>
                                        <Label for="exampleSelect">Episode Date</Label>
                                        <Input type="text" placeholder="Show Date" ></Input>
                                        {<Calendar size={21} className='calender_icon1' />}
                                    </FormGroup>
                                </Col>
                                <Col sm="2">
                                    <div>&nbsp;</div>
                                    <Button color="primary">Submit</Button>
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
                                    <th>Channel Name</th>
                                    <th>Show Name</th>
                                    <th>Episode Date</th>
                                    <th>Status</th>
                                    <th>Edit</th>
                                </tr>
                            </thead>
                                <tbody>
                                {episode.map((item,index)=>(
                                <tr>
                                {item.channel? <td>{item.channel.channelName}</td>:<td>--</td>}
                                    {item.show ?  <td>{item.show.showName}</td>:<td>--</td>}
                                    <td>{item.episodeDate}</td>
                                    <td>
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
                                    </td>    
                                    <td>{<Edit2 size={21} style={{cursor:"pointer"}} className='pluscircle' onClick={()=>this.EditEpisode(item)}/>}</td>
                                </tr>
                                ))}
                            </tbody>
                        </Table>
                    </Col>
                     {/* {!this.state.loading ?
                    <Pagination postPerPage={this.state.postPerPage} totalPosts={this.state.auctionInfo.length} paginate={this.paginate}/>
                    :null} */}
                </div>

            </div>
                
        )

        return (
            <Fragment>
                {EpisodeLists}
            </Fragment>
        );
    }
}

const mapStateToProps = state => ({
    episode:state.episodedata.episode
});
export default connect(
    mapStateToProps, { fetchEpisodes,fetchChannel,fetchShows,changeStatusEpisode }
)(EpisodeList);
