import React, { useState } from 'react';
import { Search, ChevronDown, HelpCircle, Sparkles, MessageCircle, FileText, Shield, CreditCard } from 'lucide-react';
import { useAppStore } from '../../stores/useAppStore';

export const FaqPage: React.FC = () => {
  const { toggleJago } = useAppStore();
  const [searchTerm, setSearchTerm] = useState('');
  const [activeCategory, setActiveCategory] = useState('All');
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const categories = ['All', 'Application', 'DigiLocker Wallet', 'Verification', 'DBT Payments', 'PVTG Special'];

  const allFaqs = [
    {
      cat: 'Application',
      q: 'Can I apply for more than one scholarship under TribalSetu?',
      a: 'A student can receive one active maintenance and fee scholarship at a time for any given academic year (e.g. either Post-Matric or Top Class, not both). However, your single unified profile enables you to be considered for fellowship schemes (NFST) or Overseas (NOS) as you progress academically without re-registering.'
    },
    {
      cat: 'Application',
      q: 'Do I need to fill my personal, tribe, and academic details for every new application?',
      a: 'No. The core idea of TribalSetu is "One Profile. Every Scholarship." Personal, family, community, and educational details in your profile can be reused to prefill new applications.'
    },
    {
      cat: 'DigiLocker Wallet',
      q: 'What if my state does not issue digital certificates on DigiLocker?',
      a: 'While all major states (Odisha, Jharkhand, Chhattisgarh, MP, Rajasthan, Assam) are integrated with DigiLocker via API Setu, students whose local Tehsildar has not yet issued a digital barcode certificate can upload scanned PDF certificates through our Direct Upload option.'
    },
    {
      cat: 'DigiLocker Wallet',
      q: 'Are documents pulled from DigiLocker legally valid for scholarship scrutiny?',
      a: 'Yes. Under Rule 9A of the Information Technology (Preservation and Retention of Information by Intermediaries Providing Digital Locker Facilities) Rules, 2016, digital documents issued to DigiLocker are treated at par with original physical documents.'
    },
    {
      cat: 'Verification',
      q: 'What should I do if my application status shows "Deficiency"?',
      a: 'Do not panic. A deficiency status means an official has requested an updated document or clarification (e.g., renewed financial year income certificate). Visit your Deficiency Center, review the remark, and simply fetch or upload the required document before the deadline.'
    },
    {
      cat: 'Verification',
      q: 'Does a minor spelling mismatch in name result in instant rejection?',
      a: 'No. TribalSetu flags minor spelling variations between identity and academic records for manual review rather than automatically rejecting the application.'
    },
    {
      cat: 'DBT Payments',
      q: 'How does the DBT money reach my account?',
      a: 'Disbursements are executed through the Public Financial Management System (PFMS) directly into the student’s bank account seeded with Aadhaar in the National Payments Corporation of India (NPCI) mapper.'
    },
    {
      cat: 'DBT Payments',
      q: 'What if my bank account is not Aadhaar seeded?',
      a: 'The portal alerts you with a red warning badge during registration. You will be instructed to visit your bank branch to submit an Aadhaar seeding consent form for DBT enablement.'
    },
    {
      cat: 'PVTG Special',
      q: 'What special provisions exist for Particularly Vulnerable Tribal Groups (PVTG)?',
      a: 'Students belonging to recognized PVTG communities (such as Birhor, Dongria Kondh, Baiga, Chenchu, etc.) receive priority fast-track verification under the PM-PVTG Development Mission with 100% saturation coverage and designated field nodal assistance.'
    }
  ];

  const filteredFaqs = allFaqs.filter((f) => {
    const matchesCat = activeCategory === 'All' || f.cat === activeCategory;
    const matchesSearch = f.q.toLowerCase().includes(searchTerm.toLowerCase()) || f.a.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesCat && matchesSearch;
  });

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-8 py-10 space-y-8">
      {/* Header */}
      <div className="text-center space-y-2">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#123C32]/10 text-[#123C32] text-xs font-bold">
          <HelpCircle className="w-3.5 h-3.5 text-[#C86B43]" />
          <span>Knowledge Base</span>
        </div>
        <h1 className="font-heading font-black text-3xl sm:text-4xl text-[#123C32]">
          Frequently Asked Questions
        </h1>
        <p className="text-xs sm:text-sm text-[#576562] max-w-xl mx-auto">
          Clear, jargon-free answers to all your questions about eligibility, DigiLocker credentials, and DBT disbursements.
        </p>
      </div>

      {/* Search and Categories */}
      <div className="space-y-4">
        <div className="relative">
          <Search className="w-4 h-4 text-gray-400 absolute left-3.5 top-3.5" />
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Search questions by keyword (e.g. DigiLocker, income, bank, deficiency)..."
            className="w-full bg-white border border-[#E2DDD2] rounded-2xl pl-10 pr-4 py-3 text-xs sm:text-sm focus:border-[#123C32] focus:outline-hidden shadow-xs"
          />
        </div>

        <div className="flex items-center gap-1.5 overflow-x-auto pb-1">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`px-3.5 py-1.5 rounded-xl text-xs font-bold whitespace-nowrap transition-colors cursor-pointer ${
                activeCategory === cat
                  ? 'bg-[#123C32] text-white shadow-2xs'
                  : 'bg-white text-gray-700 hover:bg-gray-100 border border-[#E2DDD2]'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      {/* FAQ Items */}
      <div className="space-y-3">
        {filteredFaqs.map((faq, idx) => {
          const isOpen = openIndex === idx;
          return (
            <div
              key={idx}
              className="bg-white rounded-2xl border border-[#E2DDD2] overflow-hidden shadow-2xs"
            >
              <button
                onClick={() => setOpenIndex(isOpen ? null : idx)}
                className="w-full p-4 sm:p-5 text-left flex items-center justify-between gap-4 hover:bg-gray-50/80 transition-colors cursor-pointer"
              >
                <div>
                  <span className="text-[10px] font-bold text-[#C86B43] uppercase tracking-wider block mb-1">
                    {faq.cat}
                  </span>
                  <span className="font-heading font-bold text-sm sm:text-base text-[#123C32]">
                    {faq.q}
                  </span>
                </div>
                <ChevronDown
                  className={`w-4 h-4 text-[#C86B43] shrink-0 transition-transform ${
                    isOpen ? 'rotate-180' : ''
                  }`}
                />
              </button>
              {isOpen && (
                <div className="px-4 sm:px-5 pb-5 pt-1 text-xs sm:text-sm text-[#576562] leading-relaxed border-t border-gray-100">
                  {faq.a}
                </div>
              )}
            </div>
          );
        })}
      </div>

      {/* Still need help CTA */}
      <div className="p-6 rounded-2xl bg-[#FAF8F3] border border-[#E2DDD2] flex flex-col sm:flex-row items-center justify-between gap-4">
        <div>
          <h4 className="font-heading font-bold text-base text-[#123C32]">
            Still have an unanswered question?
          </h4>
          <p className="text-xs text-[#576562]">
            Chat with JAGO, your 24/7 AI scholarship guide, or connect with our toll-free tribal helpline.
          </p>
        </div>
        <button
          onClick={toggleJago}
          className="px-5 py-2.5 bg-[#123C32] hover:bg-[#0A241E] text-white text-xs font-bold rounded-xl flex items-center gap-2 shadow-xs cursor-pointer shrink-0"
        >
          <Sparkles className="w-4 h-4 text-[#E8B84A]" />
          <span>Ask JAGO Assistant</span>
        </button>
      </div>
    </div>
  );
};
