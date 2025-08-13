import React from 'react';

class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true, error };
  }

  componentDidCatch(error, errorInfo) {
    console.error('Error caught by boundary:', error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return (
        <div style={{ 
          padding: '2rem', 
          textAlign: 'center',
          minHeight: '100vh',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'center'
        }}>
          <h2>Something went wrong</h2>
          <p>We&apos;re sorry, but something unexpected happened.</p>
          <button 
            onClick={() => {
              this.setState({ hasError: false, error: null });
              window.location.href = '/';
            }}
            style={{
              padding: '0.5rem 1rem',
              marginTop: '1rem',
              backgroundColor: '#2cb1bc',
              color: 'white',
              border: 'none',
              borderRadius: '4px',
              cursor: 'pointer'
            }}
          >
            Go Home
          </button>
        </div>
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary; 