"use client";

import React, { useState, useMemo } from "react";
import { Panel } from "@/components/ui/Panel";
import { ContentTop } from "@/components/layout/ContentTop";
import { Search, ChevronUp, ChevronDown, ChevronLeft, ChevronRight, Edit2, Trash2 } from "lucide-react";

interface User {
  id: number;
  firstName: string;
  lastName: string;
  email: string;
  age: number;
  city: string;
  status: "Active" | "Inactive" | "Pending";
}

const initialData: User[] = [
  { id: 1, firstName: "Mark", lastName: "Otto", email: "mark@example.com", age: 28, city: "New York", status: "Active" },
  { id: 2, firstName: "Jacob", lastName: "Thornton", email: "jacob@example.com", age: 32, city: "Los Angeles", status: "Active" },
  { id: 3, firstName: "Larry", lastName: "Bird", email: "larry@example.com", age: 45, city: "Chicago", status: "Inactive" },
  { id: 4, firstName: "John", lastName: "Snow", email: "john@example.com", age: 27, city: "Boston", status: "Pending" },
  { id: 5, firstName: "Daenerys", lastName: "Targaryen", email: "daenerys@example.com", age: 24, city: "Miami", status: "Active" },
  { id: 6, firstName: "Tyrion", lastName: "Lannister", email: "tyrion@example.com", age: 38, city: "San Francisco", status: "Active" },
  { id: 7, firstName: "Arya", lastName: "Stark", email: "arya@example.com", age: 18, city: "Seattle", status: "Pending" },
  { id: 8, firstName: "Sansa", lastName: "Stark", email: "sansa@example.com", age: 22, city: "Denver", status: "Active" },
  { id: 9, firstName: "Cersei", lastName: "Lannister", email: "cersei@example.com", age: 42, city: "Phoenix", status: "Inactive" },
  { id: 10, firstName: "Jamie", lastName: "Lannister", email: "jamie@example.com", age: 40, city: "Portland", status: "Active" },
  { id: 11, firstName: "Bran", lastName: "Stark", email: "bran@example.com", age: 17, city: "Austin", status: "Pending" },
  { id: 12, firstName: "Ned", lastName: "Stark", email: "ned@example.com", age: 50, city: "Dallas", status: "Inactive" },
];

type SortKey = keyof User;
type SortDirection = "asc" | "desc";

export default function SmartTablesPage() {
  const [data, setData] = useState<User[]>(initialData);
  const [searchTerm, setSearchTerm] = useState("");
  const [sortKey, setSortKey] = useState<SortKey>("id");
  const [sortDirection, setSortDirection] = useState<SortDirection>("asc");
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(5);
  const [editingId, setEditingId] = useState<number | null>(null);
  const [editForm, setEditForm] = useState<Partial<User>>({});

  const filteredData = useMemo(() => {
    return data.filter((item) =>
      Object.values(item).some((value) =>
        value.toString().toLowerCase().includes(searchTerm.toLowerCase())
      )
    );
  }, [data, searchTerm]);

  const sortedData = useMemo(() => {
    return [...filteredData].sort((a, b) => {
      const aValue = a[sortKey];
      const bValue = b[sortKey];
      if (aValue < bValue) return sortDirection === "asc" ? -1 : 1;
      if (aValue > bValue) return sortDirection === "asc" ? 1 : -1;
      return 0;
    });
  }, [filteredData, sortKey, sortDirection]);

  const paginatedData = useMemo(() => {
    const startIndex = (currentPage - 1) * itemsPerPage;
    return sortedData.slice(startIndex, startIndex + itemsPerPage);
  }, [sortedData, currentPage, itemsPerPage]);

  const totalPages = Math.ceil(sortedData.length / itemsPerPage);

  const handleSort = (key: SortKey) => {
    if (sortKey === key) {
      setSortDirection(sortDirection === "asc" ? "desc" : "asc");
    } else {
      setSortKey(key);
      setSortDirection("asc");
    }
  };

  const handleDelete = (id: number) => {
    setData(data.filter((item) => item.id !== id));
  };

  const handleEdit = (user: User) => {
    setEditingId(user.id);
    setEditForm(user);
  };

  const handleSaveEdit = () => {
    if (editingId !== null) {
      setData(data.map((item) => (item.id === editingId ? { ...item, ...editForm } : item)));
      setEditingId(null);
      setEditForm({});
    }
  };

  const handleCancelEdit = () => {
    setEditingId(null);
    setEditForm({});
  };

  const SortIcon = ({ columnKey }: { columnKey: SortKey }) => {
    if (sortKey !== columnKey) return null;
    return sortDirection === "asc" ? (
      <ChevronUp className="w-4 h-4 inline ml-1" />
    ) : (
      <ChevronDown className="w-4 h-4 inline ml-1" />
    );
  };

  return (
    <div>
      <ContentTop title="Smart Tables" />

      <Panel title="Smart Table with Sorting, Filtering & Pagination">
        <div className="space-y-4">
          <div className="flex flex-col sm:flex-row justify-between gap-4">
            <div className="relative flex-1 max-w-md">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
              <input
                type="text"
                placeholder="Search..."
                value={searchTerm}
                onChange={(e) => {
                  setSearchTerm(e.target.value);
                  setCurrentPage(1);
                }}
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#209e91] focus:border-transparent"
              />
            </div>
            <div className="flex items-center gap-2">
              <span className="text-sm text-gray-600">Show</span>
              <select
                value={itemsPerPage}
                onChange={(e) => {
                  setItemsPerPage(Number(e.target.value));
                  setCurrentPage(1);
                }}
                className="px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#209e91] focus:border-transparent bg-white"
              >
                <option value={5}>5</option>
                <option value={10}>10</option>
                <option value={25}>25</option>
              </select>
              <span className="text-sm text-gray-600">entries</span>
            </div>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="bg-gray-50">
                  {[
                    { key: "id" as SortKey, label: "#" },
                    { key: "firstName" as SortKey, label: "First Name" },
                    { key: "lastName" as SortKey, label: "Last Name" },
                    { key: "email" as SortKey, label: "Email" },
                    { key: "age" as SortKey, label: "Age" },
                    { key: "city" as SortKey, label: "City" },
                    { key: "status" as SortKey, label: "Status" },
                  ].map((column) => (
                    <th
                      key={column.key}
                      onClick={() => handleSort(column.key)}
                      className="text-left py-3 px-4 font-medium text-gray-600 cursor-pointer hover:bg-gray-100 select-none"
                    >
                      {column.label}
                      <SortIcon columnKey={column.key} />
                    </th>
                  ))}
                  <th className="text-left py-3 px-4 font-medium text-gray-600">Actions</th>
                </tr>
              </thead>
              <tbody>
                {paginatedData.map((row) => (
                  <tr key={row.id} className="border-b border-gray-100 hover:bg-gray-50">
                    {editingId === row.id ? (
                      <>
                        <td className="py-3 px-4 text-gray-800">{row.id}</td>
                        <td className="py-3 px-4">
                          <input
                            type="text"
                            value={editForm.firstName || ""}
                            onChange={(e) => setEditForm({ ...editForm, firstName: e.target.value })}
                            className="w-full px-2 py-1 border border-gray-300 rounded"
                          />
                        </td>
                        <td className="py-3 px-4">
                          <input
                            type="text"
                            value={editForm.lastName || ""}
                            onChange={(e) => setEditForm({ ...editForm, lastName: e.target.value })}
                            className="w-full px-2 py-1 border border-gray-300 rounded"
                          />
                        </td>
                        <td className="py-3 px-4">
                          <input
                            type="email"
                            value={editForm.email || ""}
                            onChange={(e) => setEditForm({ ...editForm, email: e.target.value })}
                            className="w-full px-2 py-1 border border-gray-300 rounded"
                          />
                        </td>
                        <td className="py-3 px-4">
                          <input
                            type="number"
                            value={editForm.age || ""}
                            onChange={(e) => setEditForm({ ...editForm, age: Number(e.target.value) })}
                            className="w-20 px-2 py-1 border border-gray-300 rounded"
                          />
                        </td>
                        <td className="py-3 px-4">
                          <input
                            type="text"
                            value={editForm.city || ""}
                            onChange={(e) => setEditForm({ ...editForm, city: e.target.value })}
                            className="w-full px-2 py-1 border border-gray-300 rounded"
                          />
                        </td>
                        <td className="py-3 px-4">
                          <select
                            value={editForm.status || ""}
                            onChange={(e) => setEditForm({ ...editForm, status: e.target.value as User["status"] })}
                            className="px-2 py-1 border border-gray-300 rounded bg-white"
                          >
                            <option value="Active">Active</option>
                            <option value="Inactive">Inactive</option>
                            <option value="Pending">Pending</option>
                          </select>
                        </td>
                        <td className="py-3 px-4">
                          <div className="flex gap-2">
                            <button
                              onClick={handleSaveEdit}
                              className="px-3 py-1 bg-[#90b900] text-white rounded text-sm hover:bg-[#7a9d00]"
                            >
                              Save
                            </button>
                            <button
                              onClick={handleCancelEdit}
                              className="px-3 py-1 bg-gray-200 text-gray-700 rounded text-sm hover:bg-gray-300"
                            >
                              Cancel
                            </button>
                          </div>
                        </td>
                      </>
                    ) : (
                      <>
                        <td className="py-3 px-4 text-gray-800">{row.id}</td>
                        <td className="py-3 px-4 text-gray-800">{row.firstName}</td>
                        <td className="py-3 px-4 text-gray-800">{row.lastName}</td>
                        <td className="py-3 px-4 text-gray-600">{row.email}</td>
                        <td className="py-3 px-4 text-gray-800">{row.age}</td>
                        <td className="py-3 px-4 text-gray-600">{row.city}</td>
                        <td className="py-3 px-4">
                          <span
                            className={`px-2 py-1 rounded-full text-xs font-medium ${
                              row.status === "Active"
                                ? "bg-green-100 text-green-700"
                                : row.status === "Pending"
                                ? "bg-yellow-100 text-yellow-700"
                                : "bg-gray-100 text-gray-700"
                            }`}
                          >
                            {row.status}
                          </span>
                        </td>
                        <td className="py-3 px-4">
                          <div className="flex gap-2">
                            <button
                              onClick={() => handleEdit(row)}
                              className="p-1 text-blue-600 hover:bg-blue-50 rounded"
                            >
                              <Edit2 className="w-4 h-4" />
                            </button>
                            <button
                              onClick={() => handleDelete(row.id)}
                              className="p-1 text-red-600 hover:bg-red-50 rounded"
                            >
                              <Trash2 className="w-4 h-4" />
                            </button>
                          </div>
                        </td>
                      </>
                    )}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div className="flex flex-col sm:flex-row justify-between items-center gap-4">
            <div className="text-sm text-gray-600">
              Showing {(currentPage - 1) * itemsPerPage + 1} to{" "}
              {Math.min(currentPage * itemsPerPage, sortedData.length)} of {sortedData.length} entries
            </div>
            <div className="flex items-center gap-2">
              <button
                onClick={() => setCurrentPage(Math.max(1, currentPage - 1))}
                disabled={currentPage === 1}
                className="p-2 border border-gray-300 rounded-lg hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <ChevronLeft className="w-4 h-4" />
              </button>
              {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
                <button
                  key={page}
                  onClick={() => setCurrentPage(page)}
                  className={`px-3 py-1 rounded-lg ${
                    currentPage === page
                      ? "bg-[#209e91] text-white"
                      : "border border-gray-300 hover:bg-gray-50"
                  }`}
                >
                  {page}
                </button>
              ))}
              <button
                onClick={() => setCurrentPage(Math.min(totalPages, currentPage + 1))}
                disabled={currentPage === totalPages}
                className="p-2 border border-gray-300 rounded-lg hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      </Panel>
    </div>
  );
}
