import React,{Component} from 'react';
import { FormGroup,Modal,ModalHeader,ModalBody} from "reactstrap";

 class ImageModal extends Component{  

    render() {    
       return (
           <div>
                 <Modal isOpen={this.props.modal} toggle={this.props.toggle} >
                        <ModalHeader toggle={this.props.toggle}>{this.props.name}</ModalHeader>
                         <ModalBody>      
                            <FormGroup className="text-center">
                              <img src={this.props.img} title= {this.props.name} className="img-fluid1" />
                            </FormGroup>
                        </ModalBody>
                 </Modal>
                 
           </div>
       )            
 }
 }
export default ImageModal;