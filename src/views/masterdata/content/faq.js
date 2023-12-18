import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';
import { Row, Col, FormGroup, Label, Input, Card, Table, Button } from "reactstrap";
import { fetchLanguage } from '../../../redux/actions/language/languageAction'
import { fetchContent, updateContent } from '../../../redux/actions/masterDataFiles/contentActions'
import { ContentBlock, ContentState, convertFromHTML, convertFromRaw, convertToRaw, EditorState } from "draft-js";
import { stateToHTML } from "draft-js-export-html";
import { stateFromMarkdown } from "draft-js-import-markdown";
import draftToHtml from 'draftjs-to-html';
// import draftToMarkdown from "draftjs-to-markdown";
import { Editor } from "react-draft-wysiwyg";
import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css';
import '../../auctions/createauctions/viewauctions.scss';
import htmlToDraft from 'html-to-draftjs';

import CKEditor from 'ckeditor4-react';

class TermsAndConditions extends Component {
    constructor(props) {

        super(props);
        this.state = {
            languageId: 1,
            type: "FAQ",
            editorState: [],
            status: true,
            answer: [],
            question: "",
            id: "",
            isAdd: false,
            isRemove: false,
            isEnable: false
        }
        this.answer = [];

    }

    componentDidMount() {
        this.props.fetchLanguage();
        this.props.fetchContent(this.state);
    }
    onLanguageChange = (e) => {

        this.setState({
            languageId: e.target.value,
            editorState: ""
        }, () => {
            this.props.fetchContent(this.state).then((data) => {
                if (data.content[0].contentValueJson) {
                    this.setState({
                        editorState: data.content[0].contentValueJson,
                        id: data.content[0].id,
                        languageId: data.content[0].languageId, contentValue: data.content[0].languageId
                    })
                }

            });

        })
    }

    onEditEpisode = (e) => {
        e.preventDefault()

    }
    onEditorStateChange = (editorState, index) => {
        if (editorState.blocks) {
            const answerblocksFromHTML = htmlToDraft(editorState.blocks[0].text);
            const answercontentState = ContentState.createFromBlockArray(answerblocksFromHTML.contentBlocks);
            this.answer[index] = EditorState.createWithContent(answercontentState)
            this.state.answer[index] = this.answer[index]
            this.setState({
                answer: this.state.answer,
            })
        }
    };

    componentWillReceiveProps(nextProps) {
        nextProps.content.content.map((item) => {
            this.setState({ editorState: item.contentValueJson, id: item.id, })
        })

    }

    onAddFaq = (event) => {
        event.preventDefault();

        this.setState({
            editorState: this.state.editorState.concat({ answer: "", question: "" }),
            isAdd: true
        });

    }

    onEditFAQ = (event) => {
        event.preventDefault();
        var data = {
            languageId: this.state.languageId,
            type: "FAQ",
            contentValueJson: this.state.editorState,
            status: true,
            id: this.state.id
        }
        this.props.updateContent(data)
        if (this.state.isRemove) {
            alert('FAQ Removed successfully');
        }
        else if (this.state.isAdd) {
            alert('FAQ Added successfully');
        }
        else if (this.state.isEnable) {
            alert('FAQ Updated successfully');
        }

        window.location.reload();


    }
    // update Answer
    answerUpdateHandler = (event, index) => {
        let editorState = [...this.state.editorState]
        console.log("event", editorState[index].answer);
        editorState[index].answer = event.editor.getData()

        this.setState({
            answer: editorState[index].answer,
            isEnable: true
        })
    }

    //update Question
    questionUpdateHandler = (event, index) => {
        let editorState = [...this.state.editorState]
        console.log("event", editorState[index].question);
        editorState[index].question = event.editor.getData()

        this.setState({
            question: editorState[index].question,
            isEnable: true
        })
    }

    handleDeleteFAQ = i => e => {
        e.preventDefault()
        let editorState = [
            ...this.state.editorState.slice(0, i),
            ...this.state.editorState.slice(i + 1)
        ]
        this.setState({
            editorState,
            isRemove: true
        })
    }

    render() {
        const { language, content } = this.props;
        return (
            <Fragment>
                <h6>Frequently Asked Questions</h6>
                <Card>

                    <Col sm="12">
                        <form>
                            <Row className="marB0">
                                <Col sm="5"></Col>
                                <Col sm="6" className="text-right">
                                    <button sm="6" className="text-right submit"
                                        className="btn btn-primary submit_btn1"
                                        onClick={this.onAddFaq}
                                    >Add FAQ
                                        </button>
                                </Col>
                            </Row>
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
                                    <Table striped>
                                        <thead>
                                            <tr>
                                                <th>Question</th>
                                                <th>Answer</th>
                                            </tr>
                                        </thead>
                                        {this.state.editorState && this.state.editorState.map((item, index) => {

                                            return (<tbody key={index}>   <tr>
                                                <td>
                                                    <FormGroup>


                                                        <CKEditor type="inline"
                                                            data={item.question}
                                                            onChange={(editor) => this.questionUpdateHandler(editor, index)}
                                                        />

                                                    </FormGroup>
                                                </td>
                                                <td>


                                                    <CKEditor type="inline"
                                                        data={item.answer}
                                                        onChange={(editor) => this.answerUpdateHandler(editor, index)}
                                                    />

                                                </td>

                                                <td style={{ width: '100px' }}>
                                                    <Button className="btn btn-remove marB0" type="button" onClick={this.handleDeleteFAQ(index)}>Remove</Button>
                                                </td>


                                            </tr>
                                            </tbody>)
                                        })}

                                    </Table>
                                </Col>
                                <Row className="marB0">
                                    <Col sm="5"></Col>
                                    <Col sm="6" className="text-right">
                                        <button sm="6" className="text-right submit"
                                            className="btn btn-primary submit_btn1"
                                            onClick={this.onEditFAQ}
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
    content: state.masterdata.content
});
export default connect(
    mapStateToProps, { fetchLanguage, fetchContent, updateContent }
)(TermsAndConditions);


