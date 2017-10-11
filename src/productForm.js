import React from 'react';
import { Button, Modal, Input, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';



export default (props) => {
  console.log('props', props)
  return (
    <div>
      <Button color="primary" onClick={props.isEditing ? props.editProduct : props.addProduct}>
        {`${props.isEditing ? 'Edit' : 'Add'} Product`}
      </Button>
      <Button color="danger" onClick={props.toggle}>Add Product</Button>
      <Modal isOpen={props.modal} toggle={props.toggle} className={props.className}>
        <ModalHeader toggle={props.toggle}>Modal title</ModalHeader>
        <ModalBody>
          <Input type="text" name="name" placeholder="Name" value={props.product.name || ''} onChange={props.onChange} />
          <Input type="text" name="description" placeholder="Description" value={props.product.description || ''} onChange={props.onChange} />
          <Input type="" name="cost" placeholder="ksh" value={props.product.cost || ''} onChange={props.onChange} />
        </ModalBody>
        <ModalFooter>
          <Button color="primary" onClick={this.toggle}>Do Something</Button>{' '}
          <Button color="secondary" onClick={this.toggle}>Cancel</Button>
        </ModalFooter>
      </Modal>
    </div>
  );
}
