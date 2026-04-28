import '../Components-css/Dashboard.css';

function Dashboard({ sellerListings, formatCurrency }) {
  const totalVotes = sellerListings.reduce(
    (sum, listing) => sum + listing.votes.low + listing.votes.worth + listing.votes.high,
    0,
  );
  const totalValue = sellerListings.reduce((sum, listing) => sum + listing.price, 0);

  return (
    <section className="dashboard-panel">
      <div className="dashboard-header">
        <span className="section-kicker">Dashboard</span>
        <h2>Seller overview</h2>
        <p>Track how many advertisements you have posted and see the key numbers at a glance.</p>
      </div>

      <div className="dashboard-stats">
        <article className="dashboard-card">
          <span>Total ads posted</span>
          <strong>{sellerListings.length}</strong>
        </article>
        <article className="dashboard-card">
          <span>Total buyer votes</span>
          <strong>{totalVotes}</strong>
        </article>
        <article className="dashboard-card">
          <span>Total listing value</span>
          <strong>{formatCurrency(totalValue)}</strong>
        </article>
      </div>
    </section>
  );
}

export default Dashboard;
