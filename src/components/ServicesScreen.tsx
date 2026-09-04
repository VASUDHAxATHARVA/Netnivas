import React, { useState } from 'react';
import { TabType, ServiceItem } from '../types';
import { SERVICE_CATEGORIES, POPULAR_SERVICES } from '../data';

interface ServicesScreenProps {
  onBack: () => void;
  onBookService: (service: ServiceItem) => void;
  onNavigate: (tab: TabType) => void;
}

export const ServicesScreen: React.FC<ServicesScreenProps> = ({ onBack, onBookService }) => {
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [searchTerm, setSearchTerm] = useState('');

  const filteredServices = POPULAR_SERVICES.filter((service) => {
    const matchesCategory = selectedCategory
      ? service.category.toLowerCase().includes(selectedCategory.toLowerCase()) ||
        selectedCategory.toLowerCase().includes(service.category.toLowerCase())
      : true;
    const matchesSearch = searchTerm
      ? service.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        service.category.toLowerCase().includes(searchTerm.toLowerCase()) ||
        service.description.toLowerCase().includes(searchTerm.toLowerCase())
      : true;
    return matchesCategory && matchesSearch;
  });

  return (
    <div className="w-full max-w-md md:max-w-3xl mx-auto min-h-screen bg-surface pb-28 md:pb-12 text-on-surface">
      {/* Header */}
      <header className="bg-surface sticky top-0 z-30 border-b border-outline-variant shadow-xs">
        <div className="flex justify-between items-center w-full px-4 py-3 min-h-[56px]">
          <button
            onClick={onBack}
            aria-label="Go Back"
            className="flex items-center justify-center w-10 h-10 text-on-surface-variant hover:bg-surface-container rounded-full transition-colors active:scale-95"
            type="button"
          >
            <span className="material-symbols-outlined text-[22px]">arrow_back</span>
          </button>
          <h1 className="font-bold text-lg text-primary text-center flex-1">
            Request a Service
          </h1>
          <button
            onClick={() => {
              const el = document.getElementById('service-search-input');
              el?.focus();
            }}
            aria-label="Search"
            className="flex items-center justify-center w-10 h-10 text-on-surface-variant hover:bg-surface-container rounded-full transition-colors active:scale-95"
            type="button"
          >
            <span className="material-symbols-outlined text-[22px]">search</span>
          </button>
        </div>
      </header>

      {/* Main Container */}
      <main className="px-4 py-4 flex flex-col gap-6">
        {/* Search Bar */}
        <section className="w-full">
          <div className="relative w-full group">
            <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-outline group-focus-within:text-primary transition-colors">
              <span className="material-symbols-outlined text-[20px]">search</span>
            </div>
            <input
              id="service-search-input"
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Search for a service (e.g. Electrician)"
              className="block w-full min-h-[44px] pl-11 pr-10 py-2.5 bg-surface-container-lowest border border-outline-variant rounded-xl text-sm text-on-surface focus:ring-2 focus:ring-primary focus:border-primary focus:outline-none transition-all placeholder:text-outline"
            />
            {searchTerm && (
              <button
                onClick={() => setSearchTerm('')}
                className="absolute inset-y-0 right-0 pr-3 flex items-center text-outline hover:text-on-surface"
              >
                <span className="material-symbols-outlined text-[18px]">close</span>
              </button>
            )}
          </div>
        </section>

        {/* Categories Section */}
        <section className="w-full flex flex-col gap-3">
          <div className="flex items-center justify-between">
            <h2 className="font-bold text-xl text-on-surface">Categories</h2>
            {selectedCategory && (
              <button
                onClick={() => setSelectedCategory(null)}
                className="text-xs font-semibold text-primary hover:underline"
              >
                Show All
              </button>
            )}
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
            {SERVICE_CATEGORIES.map((cat) => {
              const isSelected = selectedCategory === cat.name;
              return (
                <button
                  key={cat.id}
                  onClick={() => setSelectedCategory(isSelected ? null : cat.name)}
                  className={`flex flex-col items-center justify-center p-3 rounded-xl border transition-all min-h-[96px] gap-2 text-center group active:scale-95 ${
                    isSelected
                      ? 'bg-primary-fixed/30 border-primary ring-2 ring-primary/20 shadow-sm'
                      : 'bg-surface-container-lowest border-outline-variant hover:bg-surface-container hover:shadow-xs'
                  }`}
                >
                  <div
                    className={`w-11 h-11 rounded-full flex items-center justify-center transition-transform group-hover:scale-105 ${cat.bgColorClass} ${cat.colorClass}`}
                  >
                    <span
                      className="material-symbols-outlined text-[22px]"
                      style={{ fontVariationSettings: "'FILL' 1" }}
                    >
                      {cat.iconName}
                    </span>
                  </div>
                  <span className="text-xs font-medium text-on-surface leading-tight">
                    {cat.name}
                  </span>
                </button>
              );
            })}
          </div>
        </section>

        {/* Popular Services (Horizontal Scroll & Grid) */}
        <section className="w-full flex flex-col gap-3">
          <div className="flex items-center justify-between">
            <h2 className="font-bold text-xl text-on-surface">
              {selectedCategory ? `${selectedCategory} Services` : 'Popular Services'}
            </h2>
            <span className="text-xs font-medium text-on-surface-variant">
              {filteredServices.length} options available
            </span>
          </div>

          {filteredServices.length === 0 ? (
            <div className="bg-surface-container-lowest rounded-xl p-8 text-center border border-outline-variant">
              <span className="material-symbols-outlined text-4xl text-outline mb-2">search_off</span>
              <p className="text-sm font-semibold text-on-surface">No services matching "{searchTerm}"</p>
              <button
                onClick={() => {
                  setSearchTerm('');
                  setSelectedCategory(null);
                }}
                className="mt-3 px-4 py-1.5 bg-primary text-on-primary rounded-lg text-xs font-semibold hover:bg-primary-container"
              >
                Reset Filters
              </button>
            </div>
          ) : (
            <div className="flex overflow-x-auto hide-scrollbar gap-3 pb-2 -mx-4 px-4 snap-x">
              {filteredServices.map((service) => (
                <div
                  key={service.id}
                  className="min-w-[240px] w-[240px] flex-shrink-0 bg-surface-container-lowest border border-outline-variant rounded-xl overflow-hidden shadow-xs hover:shadow-md transition-shadow snap-start flex flex-col justify-between"
                >
                  <div>
                    <div
                      className="bg-cover bg-center w-full h-[120px] bg-surface-variant relative"
                      style={{ backgroundImage: `url('${service.image}')` }}
                    >
                      <span className="absolute bottom-2 left-2 bg-black/60 backdrop-blur-xs text-white text-[10px] font-semibold px-2 py-0.5 rounded">
                        {service.category}
                      </span>
                    </div>
                    <div className="p-3">
                      <h3 className="font-bold text-base text-on-surface">{service.title}</h3>
                      <p className="text-xs text-on-surface-variant flex items-center gap-1 mt-1">
                        <span className="material-symbols-outlined text-[15px] text-primary">schedule</span>
                        {service.duration}
                      </p>
                      <p className="text-[11px] text-on-surface-variant/80 mt-1 line-clamp-2">
                        {service.description}
                      </p>
                    </div>
                  </div>

                  <div className="p-3 pt-0 mt-auto flex justify-between items-center border-t border-surface-container/80 pt-2">
                    <span className="text-sm font-bold text-primary">From ₹{service.price}</span>
                    <button
                      onClick={() => onBookService(service)}
                      className="bg-primary hover:bg-primary-container text-on-primary text-xs font-semibold px-4 py-2 rounded-lg transition-colors active:scale-95 shadow-xs"
                    >
                      Book
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </section>

        {/* All Society Available Services List */}
        <section className="w-full flex flex-col gap-3">
          <h3 className="font-bold text-base text-on-surface">More Community Services</h3>
          <div className="space-y-2">
            {POPULAR_SERVICES.map((item) => (
              <div
                key={`list-${item.id}`}
                className="bg-surface-container-lowest border border-outline-variant rounded-xl p-3 flex items-center justify-between gap-3 hover:bg-surface-container-low transition-colors"
              >
                <div className="flex items-center gap-3 min-w-0">
                  <img
                    src={item.image}
                    alt={item.title}
                    className="w-14 h-14 rounded-lg object-cover flex-shrink-0"
                  />
                  <div className="min-w-0">
                    <h4 className="text-sm font-bold text-on-surface truncate">{item.title}</h4>
                    <p className="text-xs text-on-surface-variant">{item.category} • {item.duration}</p>
                    <span className="text-xs font-bold text-primary">₹{item.price}</span>
                  </div>
                </div>
                <button
                  onClick={() => onBookService(item)}
                  className="px-3.5 py-1.5 border border-primary text-primary hover:bg-primary hover:text-on-primary rounded-lg text-xs font-semibold transition-all active:scale-95 shrink-0"
                >
                  Book
                </button>
              </div>
            ))}
          </div>
        </section>
      </main>
    </div>
  );
};
