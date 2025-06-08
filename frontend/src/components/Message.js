import React from 'react';
import { Alert } from 'react-bootstrap';

// `variant` will be the color (e.g., 'success', 'danger')
// `children` is the content of the message
const Message = ({ variant, children }) => {
  return <Alert variant={variant}>{children}</Alert>;
};

Message.defaultProps = {
  variant: 'info',
};

export default Message;