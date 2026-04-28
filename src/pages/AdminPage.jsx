import AdminDashboard from '../Components/AdminDashboard';

function AdminPage({ role, currentUser, adminData, adminLoading, adminError, onRefresh, onOpenAuth }) {
  if (!currentUser || role !== 'admin') {
    return (
      <section className="route-page">
        <div className="route-page-inner">
          <div className="route-empty">
            <span className="section-kicker">Admin Access</span>
            <h1>Login as admin to open the dashboard</h1>
            <p>
              This page is only available for admin accounts. Sign in as admin to load website statistics
              and system activity charts.
            </p>
            <button type="button" className="primary-action" onClick={onOpenAuth}>
              Login as Admin
            </button>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="route-page">
      <div className="route-page-inner">
        <AdminDashboard
          adminData={adminData}
          loading={adminLoading}
          error={adminError}
          onRefresh={onRefresh}
        />
      </div>
    </section>
  );
}

export default AdminPage;
