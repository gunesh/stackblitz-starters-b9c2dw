
import React, { Component, Fragment } from "react";
import { connect } from "react-redux";
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
import "../../auctions/createauctions/viewauctions.scss";
import {
  fetchsettingsData,
  updatesettingData
} from "../../../redux/actions/masterDataFiles/settingsData";

class Settings extends Component {
  constructor(props) {

    super(props);
    this.state = {
      error: false,
      currentdata: "",
      keyName: "",
      value: "",
      status: "",
      gratitudeArr: []
    }
  }
  componentDidMount() {

    this.props.fetchsettingsData().then((data) => {
      this.setState({ gratitudeArr: data.settingData })
    });

  }

  onUpdateValue = data => {
    let conf = window.confirm('Are you sure want to change value ?');
    if(data.keyName === 'NOTIFICATION' || data.keyName === 'REFERAL_STATUS' || data.keyName === 'PROFILE_COMPLETE_STATUS' ){
      var value = this.state.status;
    }else{
      var value = data.value;
    }
    var keyvalue = {
      keyName: data.keyName,
      value: value
    }
    if (conf) {
      this.props.updatesettingData(keyvalue).then((response) => {
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

  onChange = (e) => {
    this.setState({ status: e.target.value })  // smhkm2 new changes
  }
  handleValueChange = (i, event) => {

    const regexp = new RegExp(`^-?[0-9]*$`);
    if (regexp.test(event.target.value) && event.target.value > 0) {
      let gratitudeArrdata = { ...this.state.gratitudeArr }
      gratitudeArrdata[i].value = event.target.value

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
        <h6>Settings</h6>
        <Card>
          <Col sm="12">
            <form>
              <Row>
                <Col sm="6"></Col>
              </Row>

              <Row>
                <Col sm="6"></Col>
                <Col sm="12">
                  <Table striped>
                    <thead>
                      <tr>
                        <th>Gratitude Key</th>
                        <th>Gratitude points</th>
                        <th>Update</th>

                      </tr>
                    </thead>
                    {this.state.gratitudeArr.map((item, index) => (
                      <tbody key={index}>
                        <tr>
                          <td>
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
                          </td>
                          <td>
                            <FormGroup>
{/* smhkm2 new changes */}
                              {item.keyName === 'NOTIFICATION' || item.keyName === 'REFERAL_STATUS' || item.keyName === 'PROFILE_COMPLETE_STATUS' ? (
                                <div>
                                  {item.value === 'disable' ? (true) : (false)}
                                  <Input type="select" className="custom_arrow" name="status" onChange={this.onChange}>
                                    <option value="enable" selected={item.value === 'enable' ? (true) : (false)} >Enabled</option>
                                    <option value="disable" selected={item.value === 'disable' ? (true) : (false)}  >Disabled</option>

                                  </Input>

                                </div>) :
                                (
                                  <div>
                                    <Input
                                      type="number" pattern="[0-9]*" inputMode="numeric"
                                      name="value"
                                      // onChange={this.handleValueChange}

                                      defaultValue={item.value}
                                      onChange={(e) => this.handleValueChange(index, e)}
                                      placeholder=""
                                      required
                                    />
                                    <span style={{ color: "red" }}>{this.state.error && this.state.currentdata === index ? "Please enter numbers only" : ""}</span>

                                  </div>)
                              }
                            </FormGroup>
                          </td>
                          <td>
                            <Button
                              className="btn btn-primary submit_btn1"
                              type="button"
                              onClick={() => this.onUpdateValue(item)}
                              disabled={this.state.error && this.state.currentdata === index ? true : false}
                            >
                              Update
                          </Button>
                          </td>
                        </tr>
                      </tbody>
                    ))}


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
  content: state.masterdata.settingdata,
});
export default connect(mapStateToProps, { fetchsettingsData, updatesettingData })(Settings);
