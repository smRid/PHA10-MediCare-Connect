"use client";

import { useEffect, useState } from "react";
import { getPayments } from "@/lib/api/healthcare";
import { useAuth } from "@/lib/auth-context";
import StatusPill from "@/components/shared/StatusPill";
import { currency, formatDate } from "@/lib/utils";

export default function PaymentHistory() {
  const { token } = useAuth();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!token) return;
    setLoading(true);
    getPayments(token)
      .then(setPayments)
      .catch(() => setPayments([]))
      .finally(() => setLoading(false));
  }, [token]);

  return (
    <section className="rounded-lg border border-border bg-card p-5">
      <p className="text-sm font-bold uppercase tracking-[0.18em] text-primary">
        Payment History
      </p>
      <h2 className="mt-2 font-heading text-3xl font-extrabold">
        Paid appointments and transactions
      </h2>

      <div className="mt-6 overflow-x-auto">
        <table className="w-full min-w-[760px] text-left text-sm">
          <thead className="text-muted-foreground">
            <tr className="border-b border-border">
              <th className="py-3 pr-4">Appointment ID</th>
              <th className="py-3 pr-4">Transaction</th>
              <th className="py-3 pr-4">Amount</th>
              <th className="py-3 pr-4">Date</th>
              <th className="py-3 pr-4">Status</th>
            </tr>
          </thead>
          <tbody>
            {loading ? (
              Array.from({ length: 4 }).map((_, i) => (
                <tr key={`skeleton-${i}`} className="border-b border-border/70 animate-pulse">
                  <td className="py-4 pr-4"><div className="h-4 w-24 bg-muted/40 rounded"></div></td>
                  <td className="py-4 pr-4"><div className="h-4 w-32 bg-muted/40 rounded"></div></td>
                  <td className="py-4 pr-4"><div className="h-4 w-16 bg-muted/40 rounded"></div></td>
                  <td className="py-4 pr-4"><div className="h-4 w-28 bg-muted/40 rounded"></div></td>
                  <td className="py-4 pr-4"><div className="h-6 w-20 bg-muted/40 rounded-full"></div></td>
                </tr>
              ))
            ) : payments.length === 0 ? (
              <tr>
                <td colSpan={5} className="py-12 text-center text-muted-foreground">
                  <p>No payment history found.</p>
                </td>
              </tr>
            ) : (
              payments.map((payment) => (
                <tr key={payment._id} className="border-b border-border/70 hover:bg-muted/30 transition-colors">
                  <td className="py-3 pr-4 font-mono text-xs">
                    {payment.appointmentId}
                  </td>
                  <td className="py-3 pr-4 font-mono text-xs">
                    {payment.transactionId || "txn_placeholder"}
                  </td>
                  <td className="py-3 pr-4 font-semibold">
                    {currency(payment.amount)}
                  </td>
                  <td className="py-3 pr-4">
                    {formatDate(payment.paymentDate || payment.createdAt)}
                  </td>
                  <td className="py-3 pr-4">
                    <StatusPill status={payment.status || "paid"} />
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </section>
  );
}
