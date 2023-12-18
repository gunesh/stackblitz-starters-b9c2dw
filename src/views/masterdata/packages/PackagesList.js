import React, { Component, Fragment } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { Card, Button, CardBody, CardTitle, FormGroup, Row, Col, Label, Table } from "reactstrap";
import { PlusCircle, Edit2 } from "react-feather";
import "./viewauctions.scss";
import {fetchpackages, updatePackage} from '../../../redux/actions/masterDataFiles/packagesActions'
class PackagesList extends Component {
    constructor() {
        super();
        this.state = { 
            status: false,
                id: null,
        };    
      }

    componentDidMount() {
        this.props.fetchpackages();
       
    }

     handleChange = (value) => {
        console.log("=-=-=>>>",value)
        this.setState({
            id: value.id,
            status: value.status,
        })
        var data = { id: value.id, status: !value.status }
        this.props.updatePackage(data)
        //  window.location.reload();
    }

    EditPackage=(event)=>{
    this.props.PackageInfo(event)
    }
    render() {
        const {packages}=this.props.packages
         console.log("packages",packages)
        return (
            <Fragment>
                <div className="auctionlist_content">
                    <Col sm="12">
                        <Table striped>
                            <thead>
                                <tr>
                                    <th>Package Name</th>
                                    <th>Price</th>
                                    {/* <th>Bonus Percentage</th> */}
                                    <th>Coins</th>
                                    <th>Gratitude Coins</th>
                                    <th>GST %</th>
                                    <th>GST Amount</th>
                                    <th>Pack Amount</th>
                                    <th>Price per unit</th>
                                    <th>Total Coins</th>
                                    <th>Status</th>
                                    <th>Edit</th>
                                </tr>
                            </thead>
                                <tbody>
                            {
                           packages &&  packages.map((item,index)=>(
                                <tr key={index}>
                                   <td>{item.packageName}</td>
                                   <td>{item.price}</td>
                                   {/* <td>{item.bonusPercentage}</td> */}
                                   <td>{item.coins}</td>
                                   <td>{item.gratitudeCoins}</td>
                                   <td>{item.gstPercentage}</td>
                                  <td>{item.gstAmount}</td>
                                   <td>{item.packAmount}</td>
                                   <td>{item.pricePerUnit}</td>
                                   <td>{item.totalCoins}</td>
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
                                  <td>{<Edit2 size={21} className='pluscircle' style={{cursor:"pointer"}} onClick={()=>this.EditPackage(item)}/> }</td>
                                </tr>
                             ))
                            }
                            </tbody>
                           
                        </Table>
                    </Col>
                </div>
            </Fragment>

        );
    }


}
PackagesList.propTypes = {
    // buycategory: PropTypes.object.isRequired,
    fetchpackages: PropTypes.func.isRequired,
    // deletebuycategory: PropTypes.func.isRequired
}
const mapStateToProps = state => ({
    packages:state.masterdata.packages
});
export default connect(
    mapStateToProps,
   {fetchpackages,updatePackage}
)(PackagesList);
