import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';
import { Row, Col, FormGroup, Label, Input, Card } from "reactstrap";
import { fetchLanguage } from '../../../redux/actions/language/languageAction'
import { fetchContactContent, updateContent } from '../../../redux/actions/masterDataFiles/contentActions'
import { ContentState, convertFromHTML, EditorState } from "draft-js";

import 'draft-js/dist/Draft.css';

import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css';
import '../../auctions/createauctions/viewauctions.scss';
import htmlToDraft from 'html-to-draftjs';

//----ck editor 4
import CKEditor from 'ckeditor4-react';

//-----Jodit Editor
import JoditEditor from "jodit-react";

class TermsAndConditions extends Component {
    constructor(props) {

        super(props);
        this.state = {
            languageId: 1,
            type: "TERMS",
            contentValue: "",
            editorState: "",
            status: true,
            id: "",
            changeContent: false,
            data: "",
            contactUs: "",
            isEnable: false,
        }

    }


    componentDidMount() {
        this.props.fetchLanguage();
        this.props.fetchContactContent(this.state);
    }
    onLanguageChange = (e) => {

        this.setState({
            languageId: e.target.value
        }, () => {
            this.props.fetchContactContent(this.state)
                .then((data) => {
                    if (data.content[0].contentValue) {
                        const blocksFromHTML = convertFromHTML(data.content[0].contentValue);
                        const contentState = ContentState.createFromBlockArray(blocksFromHTML);
                        this.setState({
                            editorState: EditorState.createWithContent(contentState),
                            id: data.content[0].id,
                            languageId: data.content[0].languageId, contentValue: data.content[0].contentValue
                        })
                    }

                });

        }
        )
    }
    onEditEpisode = (e) => {
        e.preventDefault()

    }
    onEditorStateChange = (editorState, b) => {
        if (editorState.blocks) {
            const contactblocksFromHTML = htmlToDraft(editorState.blocks[0].text);
            const contactcontentState = ContentState.createFromBlockArray(contactblocksFromHTML.contentBlocks);
            const contact = EditorState.createWithContent(contactcontentState)
            this.setState({ editorState: contact })
        }




    }
    componentWillReceiveProps(nextProps) {
        nextProps.content.content.map((item) => {
            this.setState({
                contactUs: item.contentValue,
                id: item.id
            })



        })

    }
    onEditTermsAndConditions = (event) => {
        event.preventDefault();
        var data = {
            languageId: this.state.languageId,
            type: "TERMS",
            contentValue: this.state.contentValue,
            status: true,
            id: this.state.id
        }
        this.props.updateContent(data).then(function (response) {
            if (response && response.status == 200) {
                alert("Terms Updated SuccessFully");
                window.location.reload();
            }
            else if (response && response.message) {
                alert(response.message);
            }
        }).catch(function (error) {
            console.log(error);
        });

    }

    contentUpdateHandler = (event) => {
        const data = event;
        this.setState({
            isEnable: true,
            contentValue: data
        })
    }

    render() {
        const { language, content } = this.props

        return (
            <Fragment>
                <h6>Privacy Policy</h6>
                <Card>
                    <Col sm="12">
                        <form>
                            <Row>
                                <Col sm="4">
                                    <FormGroup>
                                        <Label>Select language</Label>
                                        <Input type="select" className="custom_arrow" name="languageId" onChange={this.onLanguageChange}>
                                            {language.language.map((item, index) => (
                                                <option value={item.id} key={'CH_TYPE' + item.id}>{item.language}</option>
                                            ))}


                                        </Input>
                                    </FormGroup>
                                </Col>
                                <Col sm="6">

                                </Col>
                                <Col sm="12">
                                    <JoditEditor
                                        value={this.state.contactUs}
                                        onBlur={newContent => this.contentUpdateHandler(newContent)}
                                        onChange={newContent => this.contentUpdateHandler(newContent)}
                                    />
                                </Col>
                                <Row className="marB0">
                                    <Col sm="5"></Col>
                                    <Col sm="6" className="text-right">
                                        <button sm="6" className="text-right submit"
                                            className="btn btn-primary submit_btn1"
                                            onClick={this.onEditTermsAndConditions}
                                            disabled={this.state.isEnable ? false : true}
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
    content: state.masterdata.contactContent
});
export default connect(
    mapStateToProps, { fetchLanguage, fetchContactContent, updateContent }
)(TermsAndConditions);


