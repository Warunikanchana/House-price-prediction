import AdminChartCard from './AdminChartCard';
import '../Components-css/AdminDashboard.css';

function AdminDashboard({ adminData, loading, error, onRefresh }) {
  const summaryCards = [
    { label: 'Total Users', value: adminData.summary?.total_users ?? 0 },
    { label: 'Total Sellers', value: adminData.summary?.total_sellers ?? 0 },
    { label: 'Total Buyers', value: adminData.summary?.total_buyers ?? 0 },
    { label: 'Total Properties', value: adminData.summary?.total_properties ?? 0 },
    { label: 'Total Predictions', value: adminData.summary?.total_predictions ?? 0 },
  ];

  return (
    <section className="admin-dashboard">
      <div className="admin-hero">
        <div className="section-heading">
          <span className="section-kicker">Admin Console</span>
          <h2>Track users, sellers, buyers, predictions, and listing activity</h2>
          <p>
            This dashboard gives administrators a quick view of platform growth, prediction behavior,
            advertisement distribution, and the most active buyer search areas.
          </p>
        </div>

        <button type="button" className="primary-action admin-refresh" onClick={onRefresh} disabled={loading}>
          {loading ? 'Refreshing...' : 'Refresh Dashboard'}
        </button>
      </div>

      {error ? <p className="admin-error">{error}</p> : null}

      <div className="admin-metrics-grid">
        {summaryCards.map((card) => (
          <article key={card.label} className="admin-metric-card">
            <span>{card.label}</span>
            <strong>{Number(card.value).toLocaleString()}</strong>
          </article>
        ))}
      </div>

      <div className="admin-chart-grid">
        <AdminChartCard
          title="Predictions Per Week"
          subtitle="Weekly forecasting activity across the platform"
          rows={adminData.predictionsPerWeek}
          valueKey="prediction_count"
          labelRenderer={(row) => row.week_start}
          emptyMessage="No weekly prediction data yet."
          chartType="line"
        />
        <AdminChartCard
          title="Predictions By District"
          subtitle="Districts receiving the most prediction requests"
          rows={adminData.predictionsByDistrict}
          valueKey="prediction_count"
          labelRenderer={(row) => row.district || 'Unknown district'}
          emptyMessage="No district prediction data yet."
        />
        <AdminChartCard
          title="Predictions By City"
          subtitle="Cities receiving the most prediction requests"
          rows={adminData.predictionsByCity}
          valueKey="prediction_count"
          labelRenderer={(row) => row.city || 'Unknown city'}
          emptyMessage="No city prediction data yet."
        />
        <AdminChartCard
          title="House Advertisements By District"
          subtitle="Property inventory grouped by district"
          rows={adminData.propertiesByDistrict}
          valueKey="property_count"
          labelRenderer={(row) => row.district || 'Unknown district'}
          emptyMessage="No property district data yet."
        />
        <AdminChartCard
          title="Most Buyer Searched Areas"
          subtitle="Prediction hotspots grouped by district and city"
          rows={adminData.mostSearchedAreas}
          valueKey="search_count"
          labelRenderer={(row) => `${row.district || 'Unknown district'} / ${row.city || 'Unknown city'}`}
          emptyMessage="No search hotspot data yet."
        />
      </div>
    </section>
  );
}

export default AdminDashboard;
