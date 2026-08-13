'use client';

import React, { useEffect, useState } from 'react';
import { Paperclip } from 'lucide-react';

interface Enquiry {
  _id: string;
  name: string;
  email: string;
  company: string;
  phone: string;
  message: string;
  budget: string;
  fileUrl?: string;
  createdAt: string;
}

export default function AdminEnquiriesPage() {
  const [enquiries, setEnquiries] = useState<Enquiry[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch('/api/admin/enquiries')
      .then(res => res.json())
      .then(data => {
        setEnquiries(data);
        setLoading(false);
      });
  }, []);

  return (
    <div className="p-8">
      <div className="mb-8">
        <h1 className="text-3xl font-serif font-bold text-foreground">Enquiries</h1>
        <p className="text-foreground/70 mt-1">Contact form submissions and leads.</p>
      </div>

      {loading ? (
        <div className="animate-pulse h-64 bg-surface rounded-xl"></div>
      ) : (
        <div className="space-y-6">
          {enquiries.map((enquiry) => (
            <div key={enquiry._id} className="bg-surface border border-border/20 rounded-xl p-6 shadow-sm">
              <div className="flex flex-col md:flex-row gap-6 md:gap-12">
                <div className="md:w-1/3 space-y-4">
                  <div>
                    <div className="text-xs font-bold text-foreground/50 uppercase tracking-wider mb-1">Contact</div>
                    <div className="font-bold text-lg text-foreground">{enquiry.name}</div>
                    <div className="text-sm text-foreground/80">{enquiry.email}</div>
                    <div className="text-sm text-foreground/80">{enquiry.phone}</div>
                  </div>
                  <div>
                    <div className="text-xs font-bold text-foreground/50 uppercase tracking-wider mb-1">Company / Budget</div>
                    <div className="text-sm text-foreground">{enquiry.company || '-'}</div>
                    <div className="text-sm font-semibold text-accent">{enquiry.budget}</div>
                  </div>
                  <div className="text-xs text-foreground/50">
                    Received on {new Date(enquiry.createdAt).toLocaleString()}
                  </div>
                </div>
                
                <div className="md:w-2/3 flex flex-col">
                  <div className="text-xs font-bold text-foreground/50 uppercase tracking-wider mb-2">Message</div>
                  <div className="bg-background/50 border border-border/10 p-4 rounded-lg flex-1 text-foreground/80 text-sm whitespace-pre-wrap">
                    {enquiry.message}
                  </div>
                  {enquiry.fileUrl && (
                    <div className="mt-4">
                      <a 
                        href={enquiry.fileUrl} 
                        target="_blank" 
                        rel="noreferrer"
                        className="inline-flex items-center gap-2 px-4 py-2 bg-accent/10 text-accent font-semibold rounded-lg hover:bg-accent hover:text-background transition-colors text-sm"
                      >
                        <Paperclip className="w-4 h-4" />
                        View Attached File
                      </a>
                    </div>
                  )}
                </div>
              </div>
            </div>
          ))}
          {enquiries.length === 0 && (
            <div className="p-12 text-center bg-surface border border-border/20 rounded-xl text-foreground/50">
              No enquiries found.
            </div>
          )}
        </div>
      )}
    </div>
  );
}
