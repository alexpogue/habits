import { Modal, Header} from "semantic-ui-react";
import React from "react";

const GoalModal = props  => {
  return (
    <Modal trigger={props.trigger}>
      <Modal.Header>{props.header}</Modal.Header>
      <Modal.Content>
        <Modal.Description>
          <Header>{props.descriptionHeader}</Header>
          {props.descriptionText}
        </Modal.Description>
      </Modal.Content>
      <Modal.Actions>
         {props.actions}
      </Modal.Actions>
    </Modal>
  );
};

export default GoalModal;
