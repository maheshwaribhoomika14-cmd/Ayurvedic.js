import React, { useState, useEffect } from 'react';

const Enquire = () => {
  const [enquiries, setEnquiries] = useState([
    { _id: 'ENQ001', name: 'Bhoomika Maheshwari', contact: 'maheshwaribhoomika14@gmail.com', subject: 'Product Query', message: 'Want to know about delivery timelines for classical Ayurvedic medicines.', createdAt: new Date() },
    { _id: 'ENQ002', name: 'Vaibhav Sharma', contact: '094142XXXXX', subject: 'Bulk Ordering', message: 'Do you offer custom commercial discounts on ordering 10+ packs of Brahmi Vati?', createdAt: new Date() }
  ]);

  useEffect(() => {
    const fetchEnquiries = async () => {
      try {
        const response = await fetch('http://localhost:5000/api/v2/enquiries');
        if (response.ok) {
          const data = await response.json();
          if (data && data.length > 0) {
            setEnquiries(data);
          }
        }
      } catch (err) {
        console.error("Enquiry stream connection error:", err);
      }
    };
    fetchEnquiries();
  }, []);

  return (
    <div className="w-full min-h-screen bg-[#ffffff] p-4 text-left font-sans box-border antialiased">
      
      {/* HEADER SECTION */}
      <div className="mb-6">
        <span className="text-[11px] font-black tracking-widest text-gray-900 uppercase block mb-1">📬 SUPPORT SYSTEM</span>
        <h1 className="text-xl font-black text-gray-950 tracking-tight uppercase m-0">CUSTOMER ENQUIRIES</h1>
        <div className="text-right text-[11px] text-gray-400 font-semibold -mt-5 select-none">
          Dashboard &gt; <span className="text-gray-600 font-bold">User Messages</span>
        </div>
      </div>

      {/* 📋 THE DATA TABLE GRID */}
      <div className="w-full bg-white border border-gray-200/70 rounded-xl overflow-hidden shadow-3xs mt-4">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse m-0 table-layout-fixed">
            <thead>
              <tr className="bg-white border-b border-gray-200 text-[11px] font-black text-gray-400 uppercase tracking-widest select-none">
                <th className="p-3.5 pl-6 w-[22%]">CUSTOMER NAME</th>
                <th className="p-3.5 w-[22%]">CONTACT INFO</th>
                <th className="p-3.5 w-[16%]">SUBJECT</th>
                <th className="p-3.5 w-[32%]">MESSAGE / QUERY</th>
                <th className="p-3.5 w-[8%] text-center">DATE</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100 text-xs font-semibold text-gray-600">
              {enquiries.map((enq) => (
                <tr key={enq._id} className="hover:bg-gray-50/20 transition-colors">
                  
                  {/* Sender Name */}
                  <td className="p-3.5 pl-6 font-bold text-gray-800 tracking-tight truncate">
                    ✨ {enq.name}
                  </td>
                  
                  {/* Contact Info */}
                  <td className="p-3.5 text-gray-500 font-mono tracking-tight truncate lowercase">
                    ✉️ {enq.contact || enq.email || 'N/A'}
                  </td>
                  
                  {/* Subject */}
                  <td className="p-3.5 text-gray-700 font-bold truncate">
                    📌 {enq.subject || 'General'}
                  </td>
                  
                  {/* Message Body */}
                  <td className="p-3.5 text-gray-400 font-medium break-words leading-relaxed text-[11px]">
                    💬 {enq.message}
                  </td>

                  {/* Date */}
                  <td className="p-3.5 text-center text-gray-400 text-[11px]">
                    {new Date(enq.createdAt).toLocaleDateString('en-IN', { day: '2-digit', month: 'short' })}
                  </td>

                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

    </div>
  );
};

export default Enquire;