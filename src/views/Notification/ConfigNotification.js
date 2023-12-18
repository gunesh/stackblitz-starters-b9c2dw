
import React, { Component, Fragment } from "react";
import { connect } from "react-redux";
import { NavLink } from "react-router-dom";
import {
    Row,
    Col,
    FormGroup,
    Label,
    Input,
    Card,
    Table,
    Button
} from "reactstrap";
import "../auctions/createauctions/viewauctions.scss";
import {
    fetchsettingsData,
    fetchNotificationSettingsData,
    updateNotificationSettingData
} from "../../redux/actions/masterDataFiles/settingsData";

import { sendNotificationAction } from '../../redux/actions/notification/notificationActions'
//----ck editor 4
import CKEditor from 'ckeditor4-react';

//-----Jodit Editor
import JoditEditor from "jodit-react";

class ConfigNotification extends Component {
    constructor(props) {

        super(props);
        this.state = {
            error: false,
            currentdata: "",
            keyName: "",
            value: "",
            keyNameType:"",
            notificationScheduler: "",
            contentValue: "",
            notificationMessage: "",
            gratitudeArr: []
        }
    }
    componentDidMount() {
        this.props.fetchNotificationSettingsData().then((data) => {
            this.setState({ gratitudeArr: data.settingData })
        });

    }

    contentUpdateHandler = (i, event) => {
        const data = event;
        let gratitudeArrdata = { ...this.state.gratitudeArr }
        gratitudeArrdata[i].value = data
    }

    onSendValue = data => {
        console.log("=-=-=->>", data)
        var message_body = {
            isEnable: data.status,
            contentValue: data.value,
            notificationMessage: data.value,
            title:data.keyNameType
        };
        this.props.sendNotificationAction(message_body)
            .then(function (response) {
                if (response && response.banner && response.status == 201) {
                    alert('Notification sent successfully');
                    window.location.reload();
                }
                else if (response && response.message) {
                    console.log(response)
                }
            }).catch(function (error) {
                console.log(error);
            });
    }
    onUpdateValue = data => {
        console.log(data);
        let conf = window.confirm('Are you sure want to change value ?');
        if (data.keyName === 'NOTIFICATION' || data.keyName === 'REFERAL_STATUS' || data.keyName === 'PROFILE_COMPLETE_STATUS') {
            var value = this.state.status;
        } else {
            var value = data.value;
        }
        var keyvalue = {
            keyName: data.keyName,
            value: value,
            scheduler: data.notificationScheduler
        }
        if (conf) {
            this.props.updateNotificationSettingData(keyvalue).then((response) => {
                if (response && response.status == 200) {
                    alert('Value Updated successfully');

                }
                else if (response && response.message) {
                    alert(response.message);
                }
            }).catch(function (error) {
                console.log(error);
            });
        }
    }
    onChange = (i, event) => {
        let gratitudeArrdata = { ...this.state.gratitudeArr }
        gratitudeArrdata[i].notificationScheduler = event.target.value
        this.setState({ error: false, currentdata: i })
    }

    onTitleChange = (i, event) => {
        this.setState({ [event.target.name]: event.target.value == "India" ? "" : event.target.value })
        if (event.target.keyNameType > 0) {
            let gratitudeArrdata = { ...this.state.gratitudeArr }
            gratitudeArrdata[i].keyNameType = event.target.keyNameType
            console.log(gratitudeArrdata);
            console.log(event.target.keyNameType);
            this.setState({ error: false, currentdata: i })
        }
        else {
            this.setState({ error: true, currentdata: i })
        }
    }

    render() {
        const { content } = this.props.content

        return (
            <Fragment>
                <Row>
                    <Col sm="1"></Col>
                    <Col sm="10">
                        {this.state.gratitudeArr.map((item, index) => (


                            <Card>
                                <br />
                                <Row>
                                    <Col sm="2" className="text-right">
                                        <Label>TemplateID </Label>
                                    </Col>
                                    <Col sm="8" >
                                        <FormGroup>
                                            <Input
                                                type="text"
                                                name="keyName"
                                                value={item.keyName}
                                                placeholder=""
                                                disabled="disabled"
                                                required
                                            />
                                        </FormGroup>
                                    </Col>
                                </Row>
                                <Row>
                                    <Col sm="2" className="text-right">
                                        <Label>Title </Label>
                                    </Col>
                                    <Col sm="8" >
                                        <FormGroup>
                                            <Input disabled="true" type="text" value={item.keyNameType} name="keyNameType" onChange={(e) => this.onTitleChange(index, e)} required></Input>

                                        </FormGroup>
                                    </Col>
                                </Row>
                                <Row>
                                    <Col sm="2" className="text-right">
                                        <Label>Message </Label>
                                    </Col>
                                    <Col sm="8" >
                                        <FormGroup>

                                            <JoditEditor
                                                value={item.value}
                                                onBlur={newContent => this.contentUpdateHandler(index, newContent)}
                                                onChange={newContent => this.contentUpdateHandler(index, newContent)}
                                            />

                                        </FormGroup>
                                    </Col>
                                </Row>
                                <Row>
                                    <Col sm="2" className="text-right">

                                    </Col>
                                    <Col sm="8" >

                                        <Label>

                                            <input type="checkbox"
                                                name="notificationScheduler"
                                                onChange={(e) => this.onChange(index, e)}
                                                defaultChecked={item.notificationScheduler}
                                                disabled={item.notificationScheduler ? true : false}
                                            />  Notification Scheduler Default Template</Label>

                                    </Col>
                                </Row>
                                <Row>
                                    <Col sm="2" className="text-right">
                                        <Label> </Label>
                                    </Col>
                                    <Col sm="8" >

                                        <Button
                                            className="btn btn-primary submit_btn1"
                                            type="button"
                                            onClick={() => this.onUpdateValue(item)}

                                        >Update</Button>&nbsp;&nbsp;

<Button
                                            className="btn btn-primary submit_btn1"
                                            type="button"
                                            onClick={() => this.onSendValue(item)}

                                        >Send</Button>
                                    </Col>
                                </Row>
                            </Card>

                        ))}
                    </Col>
                    <Col sm="1"></Col>
                </Row>
            </Fragment>
        );
    }
}

const mapStateToProps = state => ({
    content: state.masterdata.settingdata,
});
export default connect(mapStateToProps, { fetchNotificationSettingsData, sendNotificationAction,fetchsettingsData, updateNotificationSettingData })(ConfigNotification);
