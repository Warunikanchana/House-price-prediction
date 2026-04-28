import { Link } from 'react-router-dom';

function NotFoundPage() {
  return (
    <section className="route-page">
      <div className="route-page-inner route-empty">
        <span className="section-kicker">404</span>
        <h1>Page not found</h1>
        <p>The route you requested does not exist in this real-estate app.</p>
        <Link to="/" className="primary-action">
          Go Home
        </Link>
      </div>
    </section>
  );
}

export default NotFoundPage;
