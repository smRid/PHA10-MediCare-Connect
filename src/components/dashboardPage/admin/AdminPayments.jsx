"use client";

import { useEffect, useState } from "react";
import { getPayments } from "@/lib/api/healthcare";
import { useAuth } from "@/lib/auth-context";
import SectionHeading from "@/components/shared/SectionHeading";
import StatusPill from "@/components/shared/StatusPill";
import LoadingState from "@/components/shared/LoadingState";

export default function AdminPayments() {
  const { token } = useAuth();
  const [payments, setPayments] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!token) return;
    getPayments(token)
      .then(setPayments)
      .catch(console.error)
      .finally(() => setLoading(false));
  }, [token]);

  if (loading) return <LoadingState label="Loading payment records" />;

  return (
    <div className="space-y-6">
      <SectionHeading
        eyebrow="Financials"
        title="Payment Records"
        description="View and monitor all platform transactions and payouts."
      />
      <div className="overflow-hidden rounded-lg border border-border bg-card">
        <div className="overflow-x-auto">
          <table className="w-full min-w-[760px] text-left text-sm">
            <thead className="bg-muted text-muted-foreground">
              <tr>
                <th className="px-4 py-3">Transaction ID</th>
                <th className="px-4 py-3">Patient</th>
                <th className="px-4 py-3">Doctor</th>
                <th className="px-4 py-3 text-right">Amount</th>
                <th className="px-4 py-3">Date</th>
                <th className="px-4 py-3 text-right">Status</th>
              </tr>
            </thead>
            <tbody>
              {payments.map((payment) => {
                const amount = payment.amount || payment.fee || 0;
                return (
                  <tr key={payment._id} className="border-t border-border">
                    <td className="px-4 py-3 font-mono text-xs text-muted-foreground">
                      {payment.transactionId || payment._id.slice(-8)}
                    </td>
                    <td className="px-4 py-3 font-semibold text-foreground">
                      {payment.appointment?.patientName || "Unknown"}
                    </td>
                    <td className="px-4 py-3 text-muted-foreground">
                      {payment.appointment?.doctorName || "Unknown"}
                    </td>
                    <td className="px-4 py-3 text-right font-medium text-primary">
                      {new Intl.NumberFormat("en-US", { style: "currency", currency: "USD" }).format(Number(amount))}
                    </td>
                    <td className="px-4 py-3 text-sm text-muted-foreground">
                      {new Date(payment.paymentDate).toLocaleDateString(undefined, {
                        year: 'numeric', month: 'short', day: 'numeric'
                      })}
                    </td>
                    <td className="px-4 py-3 text-right">
                      <StatusPill status={payment.status || "paid"} />
                    </td>
                  </tr>
                );
              })}
              {payments.length === 0 && (
                <tr>
                  <td colSpan={6} className="p-4 text-center text-muted-foreground">
                    No payment records found.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
