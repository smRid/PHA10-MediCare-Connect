"use client";

import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { Search, Trash2, UserCheck, UserX } from "lucide-react";
import { getUsers, deleteUser, updateUser } from "@/lib/api/healthcare";
import { useAuth } from "@/lib/auth-context";
import SectionHeading from "@/components/shared/SectionHeading";
import StatusPill from "@/components/shared/StatusPill";
import LoadingState from "@/components/shared/LoadingState";

export default function ManageUsers() {
  const { token } = useAuth();
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");

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

  const filteredUsers = users.filter(
    (user) =>
      user.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.email?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.role?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="space-y-8">
      <SectionHeading
        align="left"
        eyebrow="Manage Users"
        title="User Management"
        description="View and manage all registered patients, doctors, and staff."
      />
      
      <div className="overflow-hidden rounded-3xl border border-border/50 glass-card shadow-sm transition-all hover:shadow-lg">
        <div className="flex flex-col gap-4 border-b border-border/50 bg-muted/20 p-5 sm:flex-row sm:items-center sm:justify-between">
          <h3 className="font-heading text-lg font-bold">User Database</h3>
          <div className="flex h-10 w-full max-w-sm items-center gap-2 rounded-full border border-border/50 bg-background px-4 transition-all focus-within:border-primary/50 focus-within:ring-4 focus-within:ring-primary/10">
            <Search className="size-4 shrink-0 text-muted-foreground" />
            <input
              placeholder="Search by name, email, or role..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full bg-transparent text-sm font-medium outline-none placeholder:text-muted-foreground/70"
            />
          </div>
        </div>
        
        <div className="overflow-x-auto">
          <table className="w-full min-w-[760px] text-left text-sm">
            <thead className="bg-muted/30 text-muted-foreground border-b border-border/50">
              <tr>
                <th className="px-6 py-4 font-bold uppercase tracking-wider text-[10px]">Name</th>
                <th className="px-6 py-4 font-bold uppercase tracking-wider text-[10px]">Email</th>
                <th className="px-6 py-4 font-bold uppercase tracking-wider text-[10px]">Role</th>
                <th className="px-6 py-4 font-bold uppercase tracking-wider text-[10px]">Status</th>
                <th className="px-6 py-4 text-right font-bold uppercase tracking-wider text-[10px]">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border/50">
              {filteredUsers.map((user) => (
                <tr key={user._id} className="group transition-colors hover:bg-muted/30">
                  <td className="px-6 py-4">
                    <span className="font-bold text-foreground transition-colors group-hover:text-primary">{user.name}</span>
                  </td>
                  <td className="px-6 py-4 font-medium text-muted-foreground">{user.email}</td>
                  <td className="px-6 py-4">
                    <span className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-semibold capitalize ${
                      user.role === 'admin' ? 'bg-violet-500/10 text-violet-600' : 
                      user.role === 'doctor' ? 'bg-teal-500/10 text-teal-600' : 
                      'bg-indigo-500/10 text-indigo-600'
                    }`}>
                      {user.role}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <StatusPill status={user.status || "active"} />
                  </td>
                  <td className="px-6 py-4 text-right">
                    <div className="flex justify-end gap-2">
                      <button 
                        onClick={() => handleSuspend(user._id, user.status)} 
                        title={user.status === "suspended" ? "Unsuspend User" : "Suspend User"}
                        className={`flex size-9 items-center justify-center rounded-full transition-all hover:scale-105 hover:text-white hover:shadow-lg ${
                          user.status === "suspended" 
                            ? "bg-green-500/10 text-green-600 hover:bg-green-500 hover:shadow-green-500/20" 
                            : "bg-orange-500/10 text-orange-600 hover:bg-orange-500 hover:shadow-orange-500/20"
                        }`}
                      >
                        {user.status === "suspended" ? <UserCheck className="size-4" /> : <UserX className="size-4" />}
                      </button>
                      <button 
                        onClick={() => handleDelete(user._id)} 
                        title="Delete User"
                        className="flex size-9 items-center justify-center rounded-full bg-red-500/10 text-red-500 transition-all hover:bg-red-500 hover:text-white hover:shadow-lg hover:shadow-red-500/20 hover:scale-105"
                      >
                        <Trash2 className="size-4" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
              {filteredUsers.length === 0 && (
                <tr>
                  <td colSpan={5} className="p-12 text-center">
                    <div className="inline-flex flex-col items-center justify-center rounded-2xl border border-dashed border-border/50 p-8">
                      <Search className="size-8 text-muted-foreground/50 mb-3" />
                      <p className="text-sm font-medium text-muted-foreground">No users found matching your criteria.</p>
                    </div>
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
