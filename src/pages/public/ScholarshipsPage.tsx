import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { 
  Search, 
  Filter, 
  ArrowRight, 
  Sparkles, 
  Calendar, 
  DollarSign, 
  FileCheck2, 
  Info,
  CheckCircle,
  ExternalLink
} from 'lucide-react';
import { SCHOLARSHIP_SCHEMES } from '../../data/mockData';
import { ScholarshipScheme } from '../../types';
import { StatusBadge } from '../../components/common/StatusBadge';
import { useAppStore } from '../../stores/useAppStore';

export const ScholarshipsPage: React.FC = () => {
  const navigate = useNavigate();
  const { setRole } = useAppStore();
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [selectedSchemeForModal, setSelectedSchemeForModal] = useState<ScholarshipScheme | null>(null);

  const categories = ['All', 'School', 'Higher Education', 'Excellence', 'Research', 'International'];

  const filteredSchemes = SCHOLARSHIP_SCHEMES.filter((s) => {
    const matchesCategory = selectedCategory === 'All' || s.category === selectedCategory;
    const matchesSearch = s.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          s.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          s.shortName.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-8 py-10 space-y-8">
      {/* Header */}
      <div className="space-y-2">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#123C32]/10 text-[#123C32] text-xs font-bold">
          <Sparkles className="w-3.5 h-3.5 text-[#C86B43]" />
          <span>Central Tribal Scholarship Schemes (2026-27)</span>
        </div>
        <h1 className="font-heading font-black text-3xl sm:text-4xl text-[#123C32]">
          Tribal Scholarship Directory
        </h1>
        <p className="text-xs sm:text-sm text-[#576562] max-w-2xl">
          Complete guidelines, income limits, eligibility criteria, and required documents for all five schemes administered by the Ministry of Tribal Affairs.
        </p>
      </div>

      {/* Filter and Search Bar */}
      <div className="bg-white p-4 rounded-2xl border border-[#E2DDD2] shadow-xs flex flex-col md:flex-row items-center justify-between gap-4">
        {/* Search */}
        <div className="relative w-full md:w-80">
          <Search className="w-4 h-4 text-gray-400 absolute left-3.5 top-3" />
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Search scheme name, course, degree..."
            className="w-full bg-[#F7F5EF] border border-[#E2DDD2] rounded-xl pl-9 pr-3.5 py-2 text-xs sm:text-sm focus:border-[#123C32] focus:outline-hidden"
          />
        </div>

        {/* Category Pills */}
        <div className="flex items-center gap-1.5 overflow-x-auto w-full md:w-auto pb-1 md:pb-0">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-3 py-1.5 rounded-xl text-xs font-bold whitespace-nowrap transition-all cursor-pointer ${
                selectedCategory === cat
                  ? 'bg-[#123C32] text-white shadow-2xs'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      {/* Schemes Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredSchemes.map((scheme) => (
          <div
            key={scheme.id}
            className="bg-white rounded-2xl border border-[#E2DDD2] p-5 shadow-xs hover:shadow-md transition-all flex flex-col justify-between"
          >
            <div>
              <div className="flex items-center justify-between mb-3">
                <span className="text-[11px] font-bold px-2.5 py-0.5 rounded-full bg-[#123C32]/10 text-[#123C32]">
                  {scheme.category}
                </span>
                <StatusBadge status={scheme.status} size="sm" />
              </div>

              <h3 className="font-heading font-bold text-lg text-[#123C32] mb-2 leading-snug">
                {scheme.name}
              </h3>
              <p className="text-xs text-[#576562] mb-4 leading-relaxed line-clamp-3">
                {scheme.description}
              </p>

              {/* Specs Box */}
              <div className="p-3 bg-[#FAF8F3] rounded-xl border border-[#E2DDD2] space-y-2 mb-4 text-xs">
                <div className="flex items-center justify-between">
                  <span className="text-[#576562]">Maximum Benefit:</span>
                  <span className="font-bold text-[#123C32]">₹{scheme.annualAwardMax.toLocaleString('en-IN')}/yr</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-[#576562]">Family Income Cap:</span>
                  <span className="font-semibold text-[#17221F]">
                    {scheme.incomeLimitAnnual ? `₹${scheme.incomeLimitAnnual.toLocaleString('en-IN')}` : 'No Ceiling (Merit)'}
                  </span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-[#576562]">Application Closes:</span>
                  <span className="font-medium text-rose-700">{scheme.deadlineDate}</span>
                </div>
              </div>

              {/* Key Benefits Bullets */}
              <div className="space-y-1 mb-4">
                <div className="text-[11px] font-bold text-[#17221F]">Core Inclusions:</div>
                {scheme.keyBenefits.slice(0, 2).map((b, i) => (
                  <div key={i} className="flex items-center gap-1.5 text-xs text-[#576562]">
                    <CheckCircle className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                    <span>{b}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Actions */}
            <div className="pt-3 border-t border-gray-100 flex items-center gap-2">
              <button
                onClick={() => setSelectedSchemeForModal(scheme)}
                className="flex-1 py-2 px-3 text-center border border-[#123C32] text-[#123C32] hover:bg-[#123C32]/5 text-xs font-bold rounded-xl transition-colors cursor-pointer"
              >
                View Details
              </button>
              <button
                onClick={() => {
                  setRole('student');
                  navigate('/student/apply');
                }}
                className="py-2 px-4 bg-[#123C32] hover:bg-[#0A241E] text-white text-xs font-bold rounded-xl shadow-xs transition-colors flex items-center gap-1 cursor-pointer"
              >
                <span>Apply</span>
                <ArrowRight className="w-3.5 h-3.5 text-[#E8B84A]" />
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Scheme Detail Modal */}
      {selectedSchemeForModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs">
          <div className="relative w-full max-w-2xl bg-white rounded-3xl shadow-2xl p-6 sm:p-8 max-h-[90vh] overflow-y-auto border border-[#E2DDD2]">
            <div className="flex items-start justify-between pb-4 border-b border-gray-100">
              <div>
                <span className="text-xs font-bold px-2.5 py-0.5 rounded-full bg-[#123C32]/10 text-[#123C32]">
                  {selectedSchemeForModal.category}
                </span>
                <h3 className="font-heading font-black text-xl sm:text-2xl text-[#123C32] mt-1.5">
                  {selectedSchemeForModal.name}
                </h3>
                <p className="text-xs text-[#576562]">{selectedSchemeForModal.ministry}</p>
              </div>
              <button
                onClick={() => setSelectedSchemeForModal(null)}
                className="p-1 rounded-lg text-gray-500 hover:bg-gray-100"
              >
                ✕
              </button>
            </div>

            <div className="py-4 space-y-4 text-xs sm:text-sm text-[#17221F]">
              <p className="leading-relaxed text-[#576562]">
                {selectedSchemeForModal.description}
              </p>

              <div className="p-4 rounded-2xl bg-[#FAF8F3] border border-[#E2DDD2] grid grid-cols-2 gap-4">
                <div>
                  <div className="text-[11px] text-[#576562]">Maximum Annual Award:</div>
                  <div className="font-bold text-base text-[#123C32]">
                    ₹{selectedSchemeForModal.annualAwardMax.toLocaleString('en-IN')}
                  </div>
                </div>
                <div>
                  <div className="text-[11px] text-[#576562]">Family Income Cap:</div>
                  <div className="font-bold text-base text-[#17221F]">
                    {selectedSchemeForModal.incomeLimitAnnual
                      ? `₹${selectedSchemeForModal.incomeLimitAnnual.toLocaleString('en-IN')}`
                      : 'None (Pure Merit)'}
                  </div>
                </div>
              </div>

              <div>
                <h4 className="font-bold text-[#123C32] mb-2">Scheme Benefits:</h4>
                <ul className="space-y-1.5">
                  {selectedSchemeForModal.keyBenefits.map((b, i) => (
                    <li key={i} className="flex items-start gap-2">
                      <CheckCircle className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                      <span>{b}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div>
                <h4 className="font-bold text-[#123C32] mb-2">Required Digital Documents:</h4>
                <div className="flex flex-wrap gap-2">
                  {selectedSchemeForModal.documentsRequired.map((doc, i) => (
                    <span key={i} className="px-2.5 py-1 bg-gray-100 text-gray-800 rounded-lg text-xs font-medium">
                      📄 {doc}
                    </span>
                  ))}
                </div>
              </div>
            </div>

            <div className="pt-4 border-t border-gray-100 flex items-center justify-between">
              <span className="text-xs text-[#82918D]">Academic Year {selectedSchemeForModal.academicYear}</span>
              <button
                onClick={() => {
                  setSelectedSchemeForModal(null);
                  setRole('student');
                  navigate('/student/apply');
                }}
                className="px-6 py-2.5 bg-[#123C32] hover:bg-[#0A241E] text-white text-xs sm:text-sm font-bold rounded-xl flex items-center gap-1.5 shadow-sm"
              >
                <span>Proceed to 1-Click Apply</span>
                <ArrowRight className="w-4 h-4 text-[#E8B84A]" />
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
