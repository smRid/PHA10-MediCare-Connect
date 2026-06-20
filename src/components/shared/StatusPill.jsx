import Badge from "@/components/ui/Badge";

const toneByStatus = {
  verified: "green",
  accepted: "green",
  paid: "green",
  completed: "green",
  active: "green",
  requested: "amber",
  pending: "amber",
  rescheduled: "blue",
  unpaid: "red",
  rejected: "red",
  cancelled: "red",
  suspended: "red",
};

export default function StatusPill({ status }) {
  const label = String(status || "unknown").replaceAll("_", " ");
  return <Badge tone={toneByStatus[status] || "gray"}>{label}</Badge>;
}
