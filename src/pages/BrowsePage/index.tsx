import { JSX, useEffect, useRef, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { useFetchVenues } from '../../hooks/useFetchVenues';
import SearchSection from '../../components/venues/SearchAndFilters/SearchSection';
import ResultsBanner from '../../components/venues/SearchAndFilters/ResultBanner';
import AmenitiesFilter from '../../components/venues/SearchAndFilters/AmenitiesFilter';
import Pagination from '../../components/commons/Pagination';
import { SortDropdown, SortValue } from '../../components/venues/SearchAndFilters/SortDropdown';
import VenueCard from '../../components/venues/VenueCard';
import { CommonButton, SplitButton } from '../../components/commons/Buttons';
import { SearchParams } from '../../App';
import AdBanner from '../../components/commons/Ads/AdBanner.tsx';
import LoadingSpinner from '../../components/commons/LoadingSpinner.tsx';

export default function BrowsePage(): JSX.Element {
  const location    = useLocation();
  const resultRef   = useRef<HTMLDivElement>(null);
  const [currentPage, setCurrentPage]       = useState(1);
  const [showMobileFilters, setShowMobileFilters] = useState(false);

  // grab any incoming params from homepage
  const incoming = (location.state as { params?: SearchParams })?.params;
  const defaultParams: SearchParams = {
    city: '', guests: 2, dateFrom: '', dateTo: '',
    amenities: { wifi: false, parking: false, breakfast: false, pets: false },
  };

  const [pendingFilters, setPendingFilters] = useState<SearchParams>(incoming || defaultParams);
  const [activeFilters, setActiveFilters]   = useState<SearchParams>(incoming || defaultParams);

  const {
    venues, isLoading, error, meta,
    currentSort, currentSortOrder,
    fetchAllVenues, applyFilters, setPage, setSort,
  } = useFetchVenues();

  const totalResults = meta?.totalCount ?? 0;

  console.log('🧐 meta object:', meta);
  console.log('🧐 totalResults:', totalResults);

  useEffect(() => {
    fetchAllVenues().then(() =>
        applyFilters({
          ...activeFilters,
          query: activeFilters.city,
          sort: 'created',
          sortOrder: 'desc',
          page: 1,
        })
    );
  }, []);

  useEffect(() => {
    setPage(currentPage);
    applyFilters({
      ...activeFilters,
      query: activeFilters.city,
      sort: currentSort,
      sortOrder: currentSortOrder,
      page: currentPage,
    });
    resultRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  }, [currentPage, activeFilters, currentSort, currentSortOrder, setPage, applyFilters]);

  // Handlers
  const onPageChange      = (p: number) => setCurrentPage(p);
  const handleSortChange  = (v: SortValue) => {
    let sf = 'created', so: 'asc' | 'desc' = 'desc';
    if (v === 'priceAsc')  [sf, so] = ['price','asc'];
    if (v === 'priceDesc') [sf, so] = ['price','desc'];
    if (v === 'rating')    [sf, so] = ['rating','desc'];
    if (v === 'popularity')[sf, so] = ['bookings','desc'];
    setSort(sf, so);
    setCurrentPage(1);
  };
  const handleSearchClick    = () => { setActiveFilters(pendingFilters); setCurrentPage(1); setShowMobileFilters(false); };
  const handleApplyAmenities = () => { setActiveFilters(pendingFilters); setCurrentPage(1); setShowMobileFilters(false); };
  const handleClear          = () => { setPendingFilters(defaultParams); setActiveFilters(defaultParams); setCurrentPage(1); setShowMobileFilters(false); };

  return (
      <div className="mt-24 px-4 max-w-7xl mx-auto space-y-6 mb-12">

        <AdBanner />

        <SearchSection
            filters={pendingFilters}
            setFilters={setPendingFilters}
            onSearchClick={handleSearchClick}
            onClear={handleClear}
        />

        {/* 2. Mobile amenities toggle */}
        <div className="md:hidden text-center">
          <CommonButton
              onClick={() => setShowMobileFilters(f => !f)}
              bgColor="bg-white"
              hoverColor="hover:bg-gray-50"
              textColor="text-gray-700"
              className="px-4 py-2 rounded-full border border-gray-300"
          >
            {showMobileFilters ? 'Hide Amenities' : 'Show Amenities'}
          </CommonButton>
        </div>

        {/* 3. Two‐column on md+ */}
        <div className="md:grid md:grid-cols-4 md:gap-6 md:max-w-5xl md:mx-auto">
          <aside className="hidden md:block">
            <AmenitiesFilter
                amenities={pendingFilters.amenities}
                onChange={a => setPendingFilters(f => ({ ...f, amenities: a }))}
                onApply={handleApplyAmenities}
            />
          </aside>

          <main className="md:col-span-3 space-y-6">
            {showMobileFilters && (
                <div className="md:hidden">
                  <AmenitiesFilter
                      amenities={pendingFilters.amenities}
                      onChange={a => setPendingFilters(f => ({ ...f, amenities: a }))}
                      onApply={handleApplyAmenities}
                  />
                </div>
            )}

            {/* 4. Banner + Sort + Results */}
            <div
                ref={resultRef}
                className="!mt-0 space-y-6"
            >
              <ResultsBanner
                  resultsCount={totalResults}
                  filters={activeFilters} />

              <div className="flex justify-end">
                <SortDropdown
                    onChange={handleSortChange}
                    currentSort={
                      currentSort === 'price' && currentSortOrder === 'asc'
                          ? 'priceAsc'
                          : currentSort === 'price' && currentSortOrder === 'desc'
                              ? 'priceDesc'
                              : currentSort === 'rating'
                                  ? 'rating'
                                  : currentSort === 'bookings'
                                      ? 'popularity'
                                      : 'newest'
                    }
                />
              </div>

              {isLoading ? (
                  <div className="flex justify-center items-center h-[500px] w-full">
                    <LoadingSpinner size={64} colorClass="text-primary" />
                  </div>

              ) : error ? (
                  <p className="text-red-600">{error}</p>
              ) : (
                  <div className="grid grid-cols-1 gap-6">
                    {venues.map(v => {
                      const qs = new URLSearchParams({
                        dateFrom: activeFilters.dateFrom,
                        dateTo: activeFilters.dateTo,
                        guests: String(activeFilters.guests),
                      }).toString();

                      return (
                          <div>
                            <VenueCard venue={v} />
                            <div className="flex justify-end">
                              <SplitButton
                                  to={`/venue/${v.id}?${qs}`}
                                  target="_blank"
                                  text="Book now"
                                  bgColor="bg-primary"
                                  borderColor="border-primary"
                                  textColor="text-primary"
                                  arrowColor="text-white"
                                  arrowHoverColor="group-hover:text-primary"
                                  className="font-heading -mt-12 h-10 mr-2"
                              />

                            </div>
                          </div>
                      );
                    })}
                  </div>
              )}

              {meta.pageCount > 1 && (
                  <Pagination
                      currentPage={currentPage}
                      pageCount={meta.pageCount}
                      onPageChange={onPageChange}
                  />
              )}
            </div>
          </main>
        </div>
      </div>
  );
}