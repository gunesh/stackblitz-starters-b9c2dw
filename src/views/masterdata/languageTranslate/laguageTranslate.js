import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';
import { Row, Col, FormGroup, Label, Input, Card, Table,Button } from "reactstrap";
import '../../auctions/createauctions/viewauctions.scss';
import {fetchLanguageTranslate,UpdateString,AddString,deleteStrings} from '../../../redux/actions/masterDataFiles/languageTranslate'

class TermsAndConditions extends Component {
    constructor(props) {

        super(props);
        this.state = {
            isUpdate:false,
            isAddString:false,
            LanguageStrings:{}
                }
    }

    componentDidMount(){
        this.props.fetchLanguageTranslate().then((data) => {
            this.setState({LanguageStrings:data.language.language_translations})
        })
    }

    removeStrings=(i,data) => {
     
    let conf = window.confirm('Are you sure wanted to remove ?');
      var key=i.toString()
    let LanguageStrings = {...this.state.LanguageStrings}
            if(conf){
            delete LanguageStrings[key];
            const idArray=[]
            data.map((item)=>(
              idArray.push(item.id)
            ))
          
            this.props.deleteStrings(idArray)
 }
   
     this.setState({
      LanguageStrings
    })
  }
  handleLanguageChange=(key,id,e)=>{
let LanguageStrings = {...this.state.LanguageStrings}
      LanguageStrings[key][id-1].translationMessage = e.target.value
    this.setState({
      LanguageStrings
    })
}

handlestringKey = key=> e => {
     let LanguageStrings = {...this.state.LanguageStrings}
      LanguageStrings[key][0].translationKey=e.target.value
       LanguageStrings[key][1].translationKey=e.target.value
        LanguageStrings[key][2].translationKey=e.target.value
    this.setState({
      LanguageStrings
    })
  }
  
    onAddStrings = (event) => {
        event.preventDefault();
       let a= this.state.LanguageStrings;
  let len= Object.keys(a).length;
  len= len+1;
  let name="A_"+len;
    a[name]=[ 
         { 
           "languageId":"1",
            "translationKey":"",
            "translationMessage":"",
            "status":true,
           
         }, { 
        
        "languageId":"2",
            "translationKey":"",
            "translationMessage":"",
            "status":true,
      
         }, { 
           
            "languageId":"3",
            "translationKey":"",
            "translationMessage":"", 
            "status":true,
          
         }];

         
   
        this.setState({ LanguageStrings:a,
        isAddString:true

        });        
    }
   
    onTextAdd=(data)=>{
     this.props.AddString(data)

    }
    onTextUpdate=(data)=>{
      this.props.UpdateString(data)
    }
onChangefield=()=>{
this.setState({isUpdate:true})
}

    
   render() {
     
         const { language, content } = this.props
        return (
            <Fragment>
                <h6>Language Strings</h6>
                <Card>
               
                    <Col sm="12">
                        <form>
                        <Row>
                        
                        <Col sm="6">
                                </Col>
                                </Row>
                                    <Row className="marB0">
                                    <Col sm="5"></Col>
                                    <Col sm="6" className="text-right">
                                        <button sm="6" 
                                        className="text-right submit"
                                            className="btn btn-primary submit_btn1"
                                            onClick={this.onAddStrings}
                                            >Add Strings
                                        </button>
                                    </Col>
                                </Row>
                            <Row>

                                <Col sm="6">
                                </Col>
                                <Col sm="12">
                                    <Table striped>
                                     <thead>
                                <tr>
                                    <th>String Key</th>
                                    <th>String Name</th>
                                    <th></th>
                                      <th></th>
                                    <th>Add/Update</th>
                                    <th>Delete</th>
                                
                                </tr>
                            </thead>

                                        <tbody>
                                     {
                            this.state.LanguageStrings && Object.values(this.state.LanguageStrings).map((data,index)=>(
                                        <tr key={index}> 
                                         <td>
                                         <Label>String Key</Label>{data[0].id?

                                          <FormGroup>
                                            <Input type="text" name="translationKey" placeholder="" 
                                          onChange={this.handlestringKey(Object.keys(this.state.LanguageStrings)[index])}
                                            value={data ?data[0].translationKey:""}
                                            disabled="disabled"
                                             required/>
                                        </FormGroup>:<FormGroup>
                                            <Input type="text" name="translationKey" placeholder="" 
                                          onChange={this.handlestringKey(Object.keys(this.state.LanguageStrings)[index])}
                                            value={data ?data[0].translationKey:""}
                       
                                            required/>
                                        </FormGroup>
                                         }
                                          
                                        </td> 
                                        {data.map((stringInfo,key)=>(
                                         <td key={key}>
                                         {data[0].id?<Label>{stringInfo.language.language}</Label>:""}
                                         
                                         <FormGroup>
                                            <Input type="text" name="translationKey" placeholder="" 
                                          onChange={(e)=>this.handleLanguageChange(Object.keys(this.state.LanguageStrings)[index],stringInfo.languageId,e)}
                                            value={stringInfo ?stringInfo.translationMessage:""}
                                            required/>
                                        </FormGroup></td>
                                        ))}
                                         <td> 

                                             {data[0].id?(
                                              
                                                      <Button  className="text-right submit"
                                            className="btn btn-primary submit_btn1"
                                           
                                             type="button" onClick={()=>this.onTextUpdate(data)}>Update</Button>
                                                      
                                                
                                             ): 
                                                      <Button  className="text-right submit"
                                            className="btn btn-primary submit_btn1"
                                           
                                             type="button" onClick={()=>this.onTextAdd(data)}>Add</Button>
                                                         }
      
                                                 </td> 
                                                 <td>
                                                <Button className="btn btn-remove marB0" type="button" onClick={()=>this.removeStrings(Object.keys(this.state.LanguageStrings)[index],data)} required>Remove</Button>
                                            </td>
                                        
                                           </tr>
                                        ))} 
                                       
                                          </tbody>
                                     
                                       
                                    </Table>
                                </Col>
                               
                            </Row>
                        </form>
                    </Col>
                </Card>
            </Fragment>
        );
    }
}

const mapStateToProps = state => ({
   language : state.masterdata.translateLanguages,
    
});
export default connect(
    mapStateToProps, { fetchLanguageTranslate,UpdateString,AddString,deleteStrings}
)(TermsAndConditions);


