
import React, { useState } from 'react';
import { EnquiryFormData, CustomerEnquiry } from './types.ts';
import { BRANCHES, BRANCH_SALES_MAPPING } from './constants.ts';

const SCRIPT_URL = 'https://script.google.com/macros/s/AKfycbzDDBNiCbyUEDUbNt2FQTISfPaACZ0bCEgGyfQPb9pd2T0Y3f5tTUNVnBNXaYvfnX-g_A/exec';

const App: React.FC = () => {
  const [formData, setFormData] = useState<EnquiryFormData>({
    date: new Date().toISOString().split('T')[0],
    branchName: '',
    salesPersonName: '',
    enquiries: [{ srNo: 1, customerName: '', enquiry: '' }]
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<{ type: 'success' | 'error' | null, message: string }>({ type: null, message: '' });

  const handleBranchChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const branch = e.target.value;
    setFormData(prev => ({
      ...prev,
      branchName: branch,
      salesPersonName: '' 
    }));
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleEnquiryChange = (index: number, field: keyof CustomerEnquiry, value: string) => {
    const updatedEnquiries = [...formData.enquiries];
    updatedEnquiries[index] = { ...updatedEnquiries[index], [field]: value };
    setFormData(prev => ({ ...prev, enquiries: updatedEnquiries }));
  };

  const addEnquiryRow = () => {
    setFormData(prev => ({
      ...prev,
      enquiries: [
        ...prev.enquiries,
        { srNo: prev.enquiries.length + 1, customerName: '', enquiry: '' }
      ]
    }));
  };

  const removeEnquiryRow = (index: number) => {
    if (formData.enquiries.length === 1) return;
    const updatedEnquiries = formData.enquiries
      .filter((_, i) => i !== index)
      .map((item, i) => ({ ...item, srNo: i + 1 }));
    setFormData(prev => ({ ...prev, enquiries: updatedEnquiries }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.branchName || !formData.salesPersonName) {
      alert("Please select both Branch and Sales Person.");
      return;
    }

    setIsSubmitting(true);
    setSubmitStatus({ type: null, message: '' });

    try {
      await fetch(SCRIPT_URL, {
        method: 'POST',
        mode: 'no-cors',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      setSubmitStatus({ 
        type: 'success', 
        message: `Success! Data for ${formData.branchName} branch has been synced to Google Sheets.` 
      });
      
      setFormData({
        date: new Date().toISOString().split('T')[0],
        branchName: '',
        salesPersonName: '',
        enquiries: [{ srNo: 1, customerName: '', enquiry: '' }]
      });

    } catch (error) {
      console.error("Submission error:", error);
      setSubmitStatus({ 
        type: 'error', 
        message: 'Submission failed. Please check your internet connection and try again.' 
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-100 py-10 px-4 sm:px-6 lg:px-8 font-['Inter']">
      <div className="max-w-5xl mx-auto bg-white shadow-[0_20px_50px_rgba(0,0,0,0.1)] rounded-[2.5rem] overflow-hidden border border-zinc-200">
        
        {/* Header Section */}
        <div className="px-8 py-10 border-b border-zinc-100 flex flex-col md:flex-row items-center relative min-h-[160px]">
          <div className="md:absolute md:left-10 flex-shrink-0 mb-6 md:mb-0">
            <img 
              src="https://www.ginzalimited.com/cdn/shop/files/Ginza_logo.jpg?v=1668509673&width=500" 
              alt="GINZA Logo" 
              className="h-24 md:h-32 w-auto object-contain transition-transform duration-300 hover:scale-105"
            />
          </div>
          <div className="w-full text-center px-4 md:px-44">
            <h1 className="text-3xl md:text-5xl font-black text-black tracking-tight uppercase leading-tight">
              Dead Stock Enquiry Form
            </h1>
            <div className="h-2 w-48 bg-[#ed1c24] mx-auto mt-4 rounded-full shadow-sm"></div>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="p-6 md:p-10 space-y-10">
          {/* Top Section: Branch & User Info */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 bg-zinc-50 p-8 rounded-[2rem] border border-zinc-100 shadow-inner">
            <div className="space-y-3">
              <label className="text-sm font-bold text-black uppercase tracking-wider block ml-1">Today's Date</label>
              <input
                type="date"
                name="date"
                value={formData.date}
                readOnly
                className="w-full px-5 py-3.5 rounded-xl border-zinc-300 shadow-sm bg-zinc-200 font-bold text-zinc-700 focus:ring-0 cursor-default text-sm"
              />
            </div>

            <div className="space-y-3">
              <label className="text-sm font-bold text-black uppercase tracking-wider block ml-1">Branch Name</label>
              <select
                name="branchName"
                value={formData.branchName}
                onChange={handleBranchChange}
                required
                className="w-full px-5 py-3.5 rounded-xl border-zinc-300 shadow-sm focus:ring-4 focus:ring-red-500/10 focus:border-red-500 bg-white font-bold transition-all text-zinc-900 appearance-none border-2 text-sm"
              >
                <option value="">Select Branch</option>
                {BRANCHES.map(branch => (
                  <option key={branch} value={branch}>{branch}</option>
                ))}
              </select>
            </div>

            <div className="space-y-3">
              <label className="text-sm font-bold text-black uppercase tracking-wider block ml-1">Sales Person</label>
              <select
                name="salesPersonName"
                value={formData.salesPersonName}
                onChange={handleInputChange}
                required
                disabled={!formData.branchName}
                className="w-full px-5 py-3.5 rounded-xl border-zinc-300 shadow-sm focus:ring-4 focus:ring-red-500/10 focus:border-red-500 bg-white font-bold disabled:bg-zinc-100 disabled:text-zinc-300 transition-all text-zinc-900 appearance-none border-2 text-sm"
              >
                <option value="">Select Name</option>
                {formData.branchName && BRANCH_SALES_MAPPING[formData.branchName].map(person => (
                  <option key={person} value={person}>{person}</option>
                ))}
              </select>
            </div>
          </div>

          {/* Table Section */}
          <div className="space-y-6">
            <div className="flex items-center gap-4 px-1">
              <h3 className="text-2xl font-black text-black uppercase tracking-tighter">Customer Entries</h3>
              <div className="flex-grow h-1 bg-zinc-200 rounded-full"></div>
            </div>

            <div className="overflow-hidden rounded-[1.5rem] border border-zinc-300 shadow-xl">
              <table className="min-w-full divide-y divide-zinc-200">
                <thead className="bg-zinc-300 border-b border-zinc-400">
                  <tr>
                    <th className="px-6 py-4 text-left text-xs font-black text-zinc-900 uppercase tracking-widest w-20">Sr. No</th>
                    <th className="px-6 py-4 text-left text-xs font-black text-zinc-900 uppercase tracking-widest">Customer Name</th>
                    <th className="px-6 py-4 text-left text-xs font-black text-zinc-900 uppercase tracking-widest">Enquiry Details</th>
                    <th className="px-6 py-4 text-center text-xs font-black text-zinc-900 uppercase tracking-widest w-20">Del</th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-zinc-200">
                  {formData.enquiries.map((row, index) => (
                    <tr key={index} className="group hover:bg-zinc-50/70 transition-colors">
                      <td className="px-6 py-5 whitespace-nowrap text-base font-bold text-black text-center bg-zinc-100/60 border-r border-zinc-200">
                        {row.srNo}
                      </td>
                      <td className="px-6 py-5">
                        <input
                          type="text"
                          required
                          placeholder="Customer Full Name"
                          value={row.customerName}
                          onChange={(e) => handleEnquiryChange(index, 'customerName', e.target.value)}
                          className="w-full border-0 border-b-2 border-transparent focus:border-red-500 focus:ring-0 bg-transparent py-2 text-sm font-bold placeholder-zinc-300 transition-all"
                        />
                      </td>
                      <td className="px-6 py-5">
                        <input
                          type="text"
                          required
                          placeholder="Requirement specifics..."
                          value={row.enquiry}
                          onChange={(e) => handleEnquiryChange(index, 'enquiry', e.target.value)}
                          className="w-full border-0 border-b-2 border-transparent focus:border-red-500 focus:ring-0 bg-transparent py-2 text-sm font-semibold placeholder-zinc-300 transition-all"
                        />
                      </td>
                      <td className="px-6 py-5 text-center">
                        {formData.enquiries.length > 1 && (
                          <button
                            type="button"
                            onClick={() => removeEnquiryRow(index)}
                            className="text-zinc-300 hover:text-red-500 transition-all transform hover:scale-110 p-2"
                          >
                            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                            </svg>
                          </button>
                        )}
                      </td>
                    </tr>
                  ))}
                  <tr className="bg-zinc-100/60">
                    <td colSpan={4} className="px-6 py-5">
                      <button
                        type="button"
                        onClick={addEnquiryRow}
                        className="flex items-center text-[#ed1c24] hover:text-red-700 font-bold text-sm uppercase tracking-wider transition-all group"
                      >
                        <span className="bg-white border-2 border-[#ed1c24] rounded-full w-8 h-8 flex items-center justify-center mr-4 group-hover:bg-[#ed1c24] group-hover:text-white transition-all shadow text-xl">+</span>
                        Add New Inquiry Line
                      </button>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>

          {/* Submission Area */}
          <div className="flex flex-col items-center pt-6 space-y-6">
            {submitStatus.type && (
              <div className={`w-full max-w-xl p-5 rounded-2xl flex items-center gap-4 animate-in slide-in-from-bottom-4 duration-500 ${submitStatus.type === 'success' ? 'bg-green-50 text-green-900 border-2 border-green-200' : 'bg-red-50 text-red-900 border-2 border-red-200'}`}>
                <div className={`p-3 rounded-full flex-shrink-0 ${submitStatus.type === 'success' ? 'bg-green-100' : 'bg-red-100'}`}>
                  {submitStatus.type === 'success' ? (
                    <svg className="w-6 h-6 text-green-600" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd"></path></svg>
                  ) : (
                    <svg className="w-6 h-6 text-red-600" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd"></path></svg>
                  )}
                </div>
                <div>
                   <p className="font-bold text-base uppercase tracking-tight">Status</p>
                   <p className="font-medium text-sm mt-0.5">{submitStatus.message}</p>
                </div>
              </div>
            )}

            <button
              type="submit"
              disabled={isSubmitting}
              className={`w-full max-w-sm py-5 rounded-[2rem] text-lg font-black text-white bg-black hover:bg-zinc-800 shadow-[0_15px_30px_rgba(0,0,0,0.2)] transition-all active:scale-95 flex items-center justify-center uppercase tracking-[0.2em] group overflow-hidden relative ${isSubmitting ? 'opacity-50 cursor-not-allowed' : ''}`}
            >
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000"></div>
              {isSubmitting ? (
                <div className="flex items-center">
                  <svg className="animate-spin -ml-1 mr-3 h-6 w-6 text-white" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  Syncing...
                </div>
              ) : (
                <span className="flex items-center gap-3">
                  Submit to Sheet
                  <svg className="w-6 h-6 transition-transform group-hover:translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M17 8l4 4m0 0l-4 4m4-4H3" />
                  </svg>
                </span>
              )}
            </button>
          </div>
        </form>

        <div className="bg-zinc-950 py-10 text-center border-t border-white/5">
          <p className="text-[10px] font-black text-zinc-500 uppercase tracking-[0.5em]">
            Ginza Industries Limited • Proprietary Internal Resource
          </p>
        </div>
      </div>
    </div>
  );
};

export default App;
