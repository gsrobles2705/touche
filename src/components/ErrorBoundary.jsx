import { Component } from 'react';

/**
 * Catches JavaScript errors anywhere in the child component tree,
 * logs them, and displays a fallback UI instead of crashing the whole app.
 *
 * Usage:
 *   <ErrorBoundary fallback={<p>Algo salió mal.</p>}>
 *     <MyComponent />
 *   </ErrorBoundary>
 */
export default class ErrorBoundary extends Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true, error };
  }

  componentDidCatch(error, info) {
    // In production you'd send this to Sentry / LogRocket / etc.
    console.error('[ErrorBoundary]', error, info.componentStack);
  }

  render() {
    if (this.state.hasError) {
      if (this.props.fallback) return this.props.fallback;

      return (
        <div className="flex flex-col items-center justify-center py-20 px-6 text-center gap-4">
          <p className="text-sm font-mono text-gold-500/60 tracking-widest uppercase">
            Algo salió mal
          </p>
          <p className="text-white/40 text-sm max-w-sm leading-relaxed">
            Esta sección no pudo cargarse. Recarga la página o contáctanos por WhatsApp.
          </p>
          <button
            onClick={() => this.setState({ hasError: false, error: null })}
            className="btn-ghost text-sm px-6 py-2"
          >
            Reintentar
          </button>
        </div>
      );
    }

    return this.props.children;
  }
}