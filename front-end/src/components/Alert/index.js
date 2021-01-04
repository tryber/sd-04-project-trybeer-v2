import React from 'react';
import {
  AlertDialog,
  AlertDialogBody,
  AlertDialogFooter,
  AlertDialogContent,
  AlertDialogOverlay,
  Button,
} from '@chakra-ui/react';
import PropTypes from 'prop-types';

const Alert = (props) => {
  const { isOpen, onClose, message } = props;
  return (
    <AlertDialog
      motionPreset="slideInBottom"
      isCentered
      isOpen={ isOpen }
      onClose={ onClose }
    >
      <AlertDialogOverlay>
        <AlertDialogContent>
          <AlertDialogBody>
            {message}
          </AlertDialogBody>
          <AlertDialogFooter>
            <Button colorScheme="red" onClick={ onClose } ml={ 3 }>
              OK
            </Button>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialogOverlay>
    </AlertDialog>
  );
};

export default Alert;

Alert.propTypes = {
  isOpen: PropTypes.bool,
  onClose: PropTypes.func,
  message: PropTypes.string,
};

Alert.defaultProps = {
  isOpen: false,
  onClose: () => null,
  message: 'Error',
};
