import Property from '../Components/Property';
import PropertyFilter from '../Components/PropertyFilter';

function PropertyPage({
  properties,
  canVote,
  onVote,
  onViewMore,
  allLoaded,
  filters,
  onFilter,
  onFilterReset,
  hasActiveFilters,
  searchPending,
  searchError,
}) {
  return (
    <>
      <section className="route-page">
        <div className="route-page-inner">
          <PropertyFilter
            filters={filters}
            onFilter={onFilter}
            onReset={onFilterReset}
            searchPending={searchPending}
            searchError={searchError}
          />
        </div>
      </section>

      <Property
        properties={properties}
        canVote={canVote}
        onVote={onVote}
        onViewMore={onViewMore}
        allLoaded={allLoaded}
        hasActiveFilters={hasActiveFilters}
        onClearFilters={onFilterReset}
      />
    </>
  );
}

export default PropertyPage;
