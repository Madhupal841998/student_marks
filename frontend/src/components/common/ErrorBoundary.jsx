import { Component } from 'react';
import Alert from './Alert';

class ErrorBoundary extends Component {
  state = { error: null };

  static getDerivedStateFromError(error) {
    return { error };
  }

  componentDidCatch(error, errorInfo) {
    console.error("Error caught:", error, errorInfo);
  }

  render() {
    if (this.state.error) {
      return (
        <Alert 
          message="Something went wrong. Please try again later."
          variant="danger"
        />
      );
    }
    return this.props.children;
  }
}

export default ErrorBoundary;