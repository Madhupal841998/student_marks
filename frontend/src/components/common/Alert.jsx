import { Alert as BootstrapAlert } from 'react-bootstrap';

const Alert = ({ message, variant = 'info' }) => {
  return (
    <BootstrapAlert variant={variant} className="mt-3">
      {message}
    </BootstrapAlert>
  );
};

export default Alert;