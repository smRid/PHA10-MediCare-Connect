"use client";

import { useState } from "react";
import { toast } from "react-toastify";
import { Search, Eye, MailOpen, CheckCircle, Trash2, Clock, Mail } from "lucide-react";
import SectionHeading from "@/components/shared/SectionHeading";
import StatusPill from "@/components/shared/StatusPill";
import Modal from "@/components/ui/Modal";

// Mock data for contact responses since there's no API yet
const initialMockResponses = [
  {
    _id: "1",
    name: "John Doe",
    email: "john@example.com",
    subject: "Appointment issue",
    message: "I am having trouble booking an appointment on the platform. The calendar does not show any available slots for Dr. William Moore.",
    date: "2023-10-27T10:00:00Z",
    status: "unread",
  },
  {
    _id: "2",
    name: "Jane Smith",
    email: "jane@example.com",
    subject: "General Inquiry",
    message: "Do you offer telehealth services? I am unable to visit the clinic in person due to mobility issues.",
    date: "2023-10-26T14:30:00Z",
    status: "read",
  },
  {
    _id: "3",
    name: "Alice Johnson",
    email: "alice@example.com",
    subject: "Feedback",
    message: "Great experience with Dr. Patricia Martin! She was very patient and explained everything clearly.",
    date: "2023-10-25T09:15:00Z",
    status: "resolved",
  },
  {
    _id: "4",
    name: "Robert Brown",
    email: "robert.b@example.com",
    subject: "Billing Question",
    message: "I was charged twice for my last consultation. Can someone please look into this?",
    date: "2023-10-24T16:45:00Z",
    status: "unread",
  },
];

export default function ContactResponses() {
  const [responses, setResponses] = useState(initialMockResponses);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedResponse, setSelectedResponse] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleView = (response) => {
    setSelectedResponse(response);
    setIsModalOpen(true);
    // Mark as read when viewed if it was unread
    if (response.status === "unread") {
      updateStatus(response._id, "read", false);
    }
  };

  const updateStatus = (id, newStatus, showToast = true) => {
    setResponses((current) =>
      current.map((res) => (res._id === id ? { ...res, status: newStatus } : res))
    );
    if (showToast) {
      toast.success(`Message marked as ${newStatus}`);
    }
  };

  const handleDelete = (id) => {
    if (!window.confirm("Are you sure you want to delete this message?")) return;
    setResponses((current) => current.filter((res) => res._id !== id));
    toast.success("Message deleted successfully");
  };

  const filteredResponses = responses.filter(
    (res) =>
      res.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      res.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      res.subject.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="space-y-8">
      <SectionHeading
        align="left"
        eyebrow="Manage Feedback"
        title="Contact Responses"
        description="View and manage messages submitted through the Contact Us page."
      />
      
      <div className="overflow-hidden rounded-3xl border border-border/50 glass-card shadow-sm transition-all hover:shadow-lg">
        <div className="flex flex-col gap-4 border-b border-border/50 bg-muted/20 p-5 sm:flex-row sm:items-center sm:justify-between">
          <h3 className="font-heading text-lg font-bold">Messages Inbox</h3>
          <div className="flex h-10 w-full max-w-sm items-center gap-2 rounded-full border border-border/50 bg-background px-4 transition-all focus-within:border-primary/50 focus-within:ring-4 focus-within:ring-primary/10">
            <Search className="size-4 shrink-0 text-muted-foreground" />
            <input
              placeholder="Search by name, email, or subject..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full bg-transparent text-sm font-medium outline-none placeholder:text-muted-foreground/70"
            />
          </div>
        </div>
        
        <div className="overflow-x-auto">
          <table className="w-full min-w-[800px] text-left text-sm">
            <thead className="bg-muted/30 text-muted-foreground border-b border-border/50">
              <tr>
                <th className="px-6 py-4 font-bold uppercase tracking-wider text-[10px]">Sender</th>
                <th className="px-6 py-4 font-bold uppercase tracking-wider text-[10px]">Subject</th>
                <th className="px-6 py-4 font-bold uppercase tracking-wider text-[10px]">Date</th>
                <th className="px-6 py-4 font-bold uppercase tracking-wider text-[10px]">Status</th>
                <th className="px-6 py-4 text-right font-bold uppercase tracking-wider text-[10px]">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border/50">
              {filteredResponses.length > 0 ? (
                filteredResponses.map((res) => (
                  <tr 
                    key={res._id} 
                    className={`transition-colors hover:bg-muted/20 ${res.status === 'unread' ? 'bg-primary/5' : ''}`}
                  >
                    <td className="px-6 py-4">
                      <div className="flex flex-col">
                        <span className={`font-medium ${res.status === 'unread' ? 'text-foreground font-bold' : 'text-foreground/90'}`}>
                          {res.name}
                        </span>
                        <span className="text-xs text-muted-foreground">{res.email}</span>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <span className={`line-clamp-1 ${res.status === 'unread' ? 'font-medium text-foreground' : 'text-muted-foreground'}`}>
                        {res.subject}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-muted-foreground">
                      <div className="flex items-center gap-1.5">
                        <Clock className="size-3.5" />
                        <span>{new Date(res.date).toLocaleDateString()}</span>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <StatusPill 
                        status={res.status === "unread" ? "pending" : res.status === "resolved" ? "completed" : "active"} 
                        label={res.status} 
                      />
                    </td>
                    <td className="px-6 py-4 text-right">
                      <div className="flex items-center justify-end gap-2">
                        <button
                          onClick={() => handleView(res)}
                          className="flex h-8 w-8 items-center justify-center rounded-full bg-primary/10 text-primary transition-colors hover:bg-primary hover:text-white"
                          title="View Message"
                        >
                          <Eye className="size-4" />
                        </button>
                        {res.status !== "resolved" && (
                          <button
                            onClick={() => updateStatus(res._id, "resolved")}
                            className="flex h-8 w-8 items-center justify-center rounded-full bg-green-500/10 text-green-600 transition-colors hover:bg-green-500 hover:text-white dark:text-green-400"
                            title="Mark as Resolved"
                          >
                            <CheckCircle className="size-4" />
                          </button>
                        )}
                        <button
                          onClick={() => handleDelete(res._id)}
                          className="flex h-8 w-8 items-center justify-center rounded-full bg-red-500/10 text-red-600 transition-colors hover:bg-red-500 hover:text-white dark:text-red-400"
                          title="Delete Message"
                        >
                          <Trash2 className="size-4" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="5" className="px-6 py-12 text-center text-muted-foreground">
                    <Mail className="mx-auto size-12 opacity-20 mb-3" />
                    <p>No messages found matching your criteria.</p>
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* View Message Modal */}
      <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)}>
        {selectedResponse && (
          <div className="space-y-6">
            <div>
              <div className="flex items-center justify-between mb-2">
                <h2 className="font-heading text-2xl font-bold">{selectedResponse.subject}</h2>
                <StatusPill 
                  status={selectedResponse.status === "unread" ? "pending" : selectedResponse.status === "resolved" ? "completed" : "active"} 
                  label={selectedResponse.status} 
                />
              </div>
              <div className="flex flex-col gap-1 text-sm text-muted-foreground border-b border-border/50 pb-4">
                <p><strong>From:</strong> {selectedResponse.name} &lt;{selectedResponse.email}&gt;</p>
                <p><strong>Date:</strong> {new Date(selectedResponse.date).toLocaleString()}</p>
              </div>
            </div>
            
            <div className="bg-muted/30 p-5 rounded-2xl border border-border/50 text-foreground leading-relaxed whitespace-pre-wrap">
              {selectedResponse.message}
            </div>
            
            <div className="flex justify-end gap-3 pt-4 border-t border-border/50">
              {selectedResponse.status !== "resolved" && (
                <button
                  onClick={() => {
                    updateStatus(selectedResponse._id, "resolved");
                    setIsModalOpen(false);
                  }}
                  className="flex items-center gap-2 rounded-full bg-green-500/10 px-5 py-2 text-sm font-bold text-green-600 transition-colors hover:bg-green-500 hover:text-white dark:text-green-400"
                >
                  <CheckCircle className="size-4" />
                  Mark as Resolved
                </button>
              )}
              <button
                onClick={() => setIsModalOpen(false)}
                className="rounded-full bg-muted px-5 py-2 text-sm font-bold text-foreground transition-colors hover:bg-muted-foreground/20"
              >
                Close
              </button>
            </div>
          </div>
        )}
      </Modal>
    </div>
  );
}
