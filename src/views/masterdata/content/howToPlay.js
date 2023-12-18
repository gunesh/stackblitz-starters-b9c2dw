import React, { Component, Fragment } from "react";
import { connect } from "react-redux";
import { Row, Col, FormGroup, Label, Input, Card } from "reactstrap";
import { fetchLanguage } from "../../../redux/actions/language/languageAction";
import {
  fetchHowToPlayContent,
  updateContent
} from "../../../redux/actions/masterDataFiles/contentActions";
import {
  ContentBlock,
  ContentState,
  convertFromHTML,
  convertFromRaw,
  convertToRaw,
  EditorState
} from "draft-js";

import "../../auctions/createauctions/viewauctions.scss";

// //----ck editor 4
import CKEditor from 'ckeditor4-react';

//-----Jodit Editor
import JoditEditor from "jodit-react";

class TermsAndConditions extends Component {
  constructor(props) {
    super(props);
    this.state = {
      languageId: 1,
      type: "HOW_TO_PLAY",
      contentValue: "",
      editorState: "",
      status: true,
      id: "",
      changeContent: false,
      data: "",
    };
  }

  componentDidMount() {
    this.props.fetchLanguage();
    this.props.fetchHowToPlayContent(this.state);
  }
  onLanguageChange = e => {
    this.setState(
      {
        languageId: e.target.value
      },
      () => {
        this.props.fetchHowToPlayContent(this.state).then(data => {
          if (data.content[0].contentValue) {
            const blocksFromHTML = convertFromHTML(
              data.content[0].contentValue
            );
            const contentState = ContentState.createFromBlockArray(
              blocksFromHTML
            );
            this.setState({
              editorState: EditorState.createWithContent(contentState),
              id: data.content[0].id,
              languageId: data.content[0].languageId,
              contentValue: data.content[0].contentValue
            });
          }
        });
      }
    );
  };
  onEditEpisode = e => {
    e.preventDefault();
  };

  componentWillReceiveProps(nextProps) {
    nextProps.content.content.map(item => {
      

      this.setState({
        id: item.id,
        languageId: item.languageId,
        contentValue: item.contentValue
      });

      console.log("contentState", this.state.editorState);
    });
  }
  onEditTermsAndConditions = event => {
    console.log(this.state.contentValue)
    event.preventDefault();
    var data = {
      languageId: this.state.languageId,
      type: "HOW_TO_PLAY",
      contentValue: this.state.contentValue,
      status: true,
      id: this.state.id
    };
    this.props.updateContent(data);
    console.log(data);
  };
  

//   contentUpdateHandler = (event)=>{
//     console.log(event.editor.getData())
//     this.setState({
//         changeContent:true,
//         contentValue:event.editor.getData()

//     })
// }
  contentUpdateHandler = (event)=>{
    console.log(event)
    this.setState({
        changeContent:true,
        contentValue:event

    })
}

  render() {
    const { language, content } = this.props;
    console.log("this.state.data", this.state.changeContent);

    return (
      <Fragment>
        <h6>How To Play</h6>
        <Card>
          <Col sm="12">
            <form>
              <Row>
                <Col sm="4">
                  <FormGroup>
                    <Label>Select language</Label>
                    <Input
                      type="select"
                      className="custom_arrow"
                      name="languageId"
                      onChange={this.onLanguageChange}
                    >
                      {language.language.map((item, index) => (
                        <option value={item.id} key={"CH_TYPE" + item.id}>
                          {item.language}
                        </option>
                      ))}
                    </Input>
                  </FormGroup>
                </Col>
                <Col sm="6"></Col>
                <Col sm="12">
               
                  {/* {this.state.contentValue ? 
                   <JoditEditor
                   value={this.state.contentValue}
                   onBlur={newContent => this.contentUpdateHandler(newContent)} 
                   onChange={newContent => this.contentUpdateHandler(newContent)}
                 /> :null} */}

                  
                
                   <JoditEditor
                   value={this.state.contentValue}
                  //  config={{ "uploader": {
                  //   "insertImageAsBase64URI": true
                  // }}}
                   onBlur={newContent => this.contentUpdateHandler(newContent)} 
                   onChange={newContent => this.contentUpdateHandler(newContent)}
                 /> 

                  {/* {this.state.contentValue ? 
                  <CKEditor type='classic'
                            data={this.state.contentValue}
                            onChange={(event) => this.contentUpdateHandler(event) }
                                
                   /> :null} */}

                  {/* <Editor
                    editorState={this.state.editorState}
                    toolbarClassName="toolbarClassName"
                    wrapperClassName="wrapperClassName"
                    editorClassName="editorClassName"
                     onEditorStateChange={this.onEditorStateChange}
                    //  onChange= {(e)=>this.onEditorStateChange(e,this.state.editorState)}
                   
                  /> */}

                </Col>
          
                <Row className="marB0">
                                    <Col sm="5"></Col>
                                    <Col sm="6" className="text-right">
                                        <button sm="6" className="text-right submit"
                                            className="btn btn-primary submit_btn1"
                                            onClick={this.onEditTermsAndConditions}
                                            disabled ={this.state.changeContent  ? false : true}
                                            >Submit
                                        </button>
                                    </Col>
                                </Row>
               
                
              

              </Row>
            </form>
          </Col>
        </Card>
      </Fragment>
    );
  }
}
const mapStateToProps = state => ({
  language: state.languagedata.language,
  content: state.masterdata.howToPlayContent
});
export default connect(mapStateToProps, {
  fetchLanguage,
  fetchHowToPlayContent,
  updateContent
})(TermsAndConditions);

