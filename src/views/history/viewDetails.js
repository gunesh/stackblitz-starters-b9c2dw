import React from 'react';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from "reactstrap";

class ViewDetails extends React.Component {
    constructor(props) {

        super(props);
        this.state = {
            notes: this.props.notesdata.notes,
            callstatus: this.props.notesdata.callStatus
        }
    }
    state = {
        modal: false
    };

    toggle = () => {
        this.setState({
            modal: !this.state.modal
        });
    }
    render() {
        return (
            <div>
                <Button color="danger" onClick={this.toggle}> Details</Button>
                <Modal
                    size="md"
                    isOpen={this.state.modal}
                    toggle={this.toggle}
                    className={this.props.className}
                >
                    <ModalHeader toggle={this.toggle}>Details</ModalHeader>
                    <ModalBody>
                        <div style={{ marginTop: 10 }}>
                            <form onSubmit={this.onSubmit}>
                                <div className="form-group">
                                    <textarea
                                        disabled
                                        type="text"
                                        className="form-control"
                                        value={this.state.notes}
                                    />
                                </div>
                            </form>
                        </div>
                    </ModalBody>
                    <ModalFooter>
                        Status: {this.state.callstatus}
                    </ModalFooter>
                </Modal>
            </div>
        );
    }

}

export default ViewDetails;