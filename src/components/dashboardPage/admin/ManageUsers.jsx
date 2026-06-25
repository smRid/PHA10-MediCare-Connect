"use client";

import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { Trash2, UserX, UserCheck } from "lucide-react";
import { getUsers, deleteUser, updateUser } from "@/lib/api/healthcare";
import { useAuth } from "@/lib/auth-context";
import SectionHeading from "@/components/shared/SectionHeading";
import StatusPill from "@/components/shared/StatusPill";
import Button from "@/components/ui/Button";
import LoadingState from "@/components/shared/LoadingState";

export default function ManageUsers() {
  const { token } = useAuth();
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!token) return;
    getUsers(token)
      .then(setUsers)
      .catch(console.error)
      .finally(() => setLoading(false));
  }, [token]);

  const handleSuspend = async (userId, currentStatus) => {
    if (!token) return;
    try {
      const newStatus = currentStatus === "suspended" ? "active" : "suspended";
      await updateUser(userId, { status: newStatus }, token);
      setUsers((current) =>
        current.map((user) => (user._id === userId ? { ...user, status: newStatus } : user)),
      );
      toast.success(`User ${newStatus}`);
    } catch (error) {
      toast.error(error.message || "Failed to update user status");
    }
  };

  const handleDelete = async (userId) => {
    if (!token) return;
    if (!window.confirm("Are you sure you want to delete this user?")) return;
    
    try {
      await deleteUser(userId, token);
      setUsers((current) => current.filter((user) => user._id !== userId));
      toast.success("User deleted successfully");
    } catch (error) {
      toast.error(error.message || "Failed to delete user");
    }
  };

  if (loading) return <LoadingState label="Loading users" />;

  return (
    <div className="space-y-6">
      <SectionHeading
        eyebrow="Manage Users"
        title="User Management"
        description="View and manage all registered patients and doctors."
      />
      <div className="overflow-hidden rounded-lg border border-border bg-card">
        <div className="overflow-x-auto">
          <table className="w-full min-w-[760px] text-left text-sm">
            <thead className="bg-muted text-muted-foreground">
              <tr>
                <th className="px-4 py-3">Name</th>
                <th className="px-4 py-3">Email</th>
                <th className="px-4 py-3">Role</th>
                <th className="px-4 py-3">Status</th>
                <th className="px-4 py-3 text-right">Actions</th>
              </tr>
            </thead>
            <tbody>
              {users.map((user) => (
                <tr key={user._id} className="border-t border-border">
                  <td className="px-4 py-3 font-semibold">{user.name}</td>
                  <td className="px-4 py-3">{user.email}</td>
                  <td className="px-4 py-3 capitalize">{user.role}</td>
                  <td className="px-4 py-3">
                    <StatusPill status={user.status || "active"} />
                  </td>
                  <td className="px-4 py-3 text-right">
                    <div className="flex justify-end gap-2">
                      <Button variant="outline" size="sm" title="Suspend User" onClick={() => handleSuspend(user._id, user.status)}>
                        {user.status === "suspended" ? <UserCheck className="size-4" /> : <UserX className="size-4" />}
                      </Button>
                      <Button variant="outline" size="sm" className="text-red-500 hover:bg-red-50 hover:text-red-600" title="Delete User" onClick={() => handleDelete(user._id)}>
                        <Trash2 className="size-4" />
                      </Button>
                    </div>
                  </td>
                </tr>
              ))}
              {users.length === 0 && (
                <tr>
                  <td colSpan={5} className="p-4 text-center text-muted-foreground">
                    No users found.
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
