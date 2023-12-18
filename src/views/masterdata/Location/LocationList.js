import React, { Fragment, PureComponent } from "react";
import { isEmpty } from 'lodash';
import PropTypes from "prop-types";
import { PlusCircle, DownloadCloud ,Edit2} from "react-feather";
import { Row, Card, FormGroup, Col, Input, Label, Button, Table } from "reactstrap";
import { connect } from "react-redux";
import {fetchLocation} from '../../../redux/actions/location/locationActions'

class LocationList extends PureComponent {
     constructor() {
    super();
    this.state = { 
        location:"Kerala",
        status: false,
            id: null,
    };    
  }
    EditLocation=(data)=>{
    this.props.locationInfo(data)
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
        this.props.fetchLocation()
    }
    render() {
        const{location}=this.props
        const LocationLists = (
            <div>
             
                        
                <div className="auctionlist_content">
                    <Col sm="12">
                        <Table striped>
                            <thead>
                                <tr>
                                    <th>State</th>
                                    <th>Edit</th>
                                </tr>
                            </thead> 
                            <tbody>
                            {location && location.map((item,index)=>(
                                        <tr key ={index}>
                            <td>{item.state}</td>
                              <td>{<Edit2 size={21} style={{cursor:"pointer"}} className='pluscircle' onClick={()=>this.EditLocation(item)}/>}</td>
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
                {LocationLists}
            </Fragment>
        );
    }
} 

const mapStateToProps = state => ({
    location:state.locationdata.location.location
});
export default connect(
    mapStateToProps, {fetchLocation }
)(LocationList);
