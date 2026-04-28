import { useState } from 'react';
import '../pages/SellerPage.css';
import Dashboard from '../Components/Dashboard';
import MyList from '../Components/MyList';
import PostAdd from '../Components/PostAdd';
import Predict from '../Components/Predict';

function SellerPage(props) {
  const [activeTab, setActiveTab] = useState('dashboard');

  const tabs = [
    { id: 'dashboard', label: 'Dashboard' },
    { id: 'mylist', label: 'MyList' },
    { id: 'prediction', label: 'GetPrediction' },
    { id: 'postadd', label: 'Post Add' },
  ];

  return (
    <div className="seller-page">
      <aside className="seller-sidebar">
        <div className="seller-brand">
          <h2>EstateSeller</h2>
          <p>Manage your posted house advertisements from one seller workspace.</p>
        </div>

        <nav className="seller-nav">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              type="button"
              className={activeTab === tab.id ? 'seller-nav-item active' : 'seller-nav-item'}
              onClick={() => {
                if (tab.id === 'prediction') {
                  props.onClear?.();
                }
                setActiveTab(tab.id);
              }}
            >
              {tab.label}
            </button>
          ))}
        </nav>
      </aside>

      <main className="seller-main">
        <div className="seller-panel">
          {activeTab === 'dashboard' ? <Dashboard sellerListings={props.sellerListings} formatCurrency={props.formatCurrency} /> : null}
          {activeTab === 'mylist' ? (
            <MyList
              sellerListings={props.sellerListings}
              sellerActionError={props.sellerActionError}
              formatCurrency={props.formatCurrency}
              onPriceUpdate={props.onPriceUpdate}
              onDeleteProperty={props.onDeleteProperty}
            />
          ) : null}
          {activeTab === 'prediction' ? <Predict {...props} /> : null}
          {activeTab === 'postadd' ? (
            <PostAdd
              role={props.role}
              sellerForm={props.sellerForm}
              sellerSubmitPending={props.sellerSubmitPending}
              sellerSubmitError={props.sellerSubmitError}
              sellerDistrictError={props.sellerDistrictError}
              sellerLocationError={props.sellerLocationError}
              onSellerChange={props.onSellerChange}
              onSellerImageChange={props.onSellerImageChange}
              onSellerLocationChange={props.onSellerLocationChange}
              onSubmit={props.onSubmit}
            />
          ) : null}
        </div>
      </main>
    </div>
  );
}

export default SellerPage;
