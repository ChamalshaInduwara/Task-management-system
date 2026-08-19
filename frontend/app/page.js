"use client";

import { useEffect, useState } from "react";

export default function Home() {
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const [showForm, setShowForm] = useState(false);

  const [formData, setFormData] = useState({
    title: "",
    description: "",
    status: "Pending",
    dueDate: "",
  });

  const API_URL = process.env.NEXT_PUBLIC_API_URL;

  const fetchTasks = async () => {
    try {
      setLoading(true);
      setError("");

      const response = await fetch(`${API_URL}/api/tasks`);

      if (!response.ok) {
        throw new Error("Failed to fetch tasks");
      }

      const data = await response.json();
      setTasks(data);
    } catch (error) {
      console.error(error);
      setError("Unable to load tasks.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTasks();
  }, []);

  const handleChange = (event) => {
    const { name, value } = event.target;

    setFormData((previous) => ({
      ...previous,
      [name]: value,
    }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      const response = await fetch(`${API_URL}/api/tasks`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        throw new Error("Failed to create task");
      }

      setFormData({
        title: "",
        description: "",
        status: "Pending",
        dueDate: "",
      });

      setShowForm(false);

      await fetchTasks();
    } catch (error) {
      console.error(error);
      alert("Failed to create task.");
    }
  };

  const totalTasks = tasks.length;

  const pendingTasks = tasks.filter(
    (task) => task.status === "Pending"
  ).length;

  const inProgressTasks = tasks.filter(
    (task) => task.status === "In Progress"
  ).length;

  const completedTasks = tasks.filter(
    (task) => task.status === "Completed"
  ).length;

  return (
    <main className="min-h-screen bg-gray-50">
      <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-10 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">
              Task Management System
            </h1>

            <p className="mt-2 text-gray-600">
              Manage and organize your tasks efficiently.
            </p>
          </div>

          <button
            onClick={() => setShowForm(true)}
            className="rounded-lg bg-black px-5 py-3 font-medium text-white transition hover:bg-gray-800"
          >
            + Add Task
          </button>
        </div>

        {/* Add Task Form */}
        {showForm && (
          <div className="mb-10 rounded-xl border bg-white p-6 shadow-sm">
            <div className="mb-6 flex items-center justify-between">
              <h2 className="text-xl font-semibold text-gray-900">
                Add New Task
              </h2>

              <button
                onClick={() => setShowForm(false)}
                className="text-gray-500 hover:text-gray-900"
              >
                ✕
              </button>
            </div>

            <form onSubmit={handleSubmit} className="space-y-5">
              <div>
                <label className="mb-2 block text-sm font-medium text-gray-700">
                  Title
                </label>

                <input
                  type="text"
                  name="title"
                  value={formData.title}
                  onChange={handleChange}
                  required
                  className="w-full rounded-lg border border-gray-300 px-4 py-3 text-gray-900 outline-none focus:border-black"
                  placeholder="Enter task title"
                />
              </div>

              <div>
                <label className="mb-2 block text-sm font-medium text-gray-700">
                  Description
                </label>

                <textarea
                  name="description"
                  value={formData.description}
                  onChange={handleChange}
                  required
                  rows="4"
                  className="w-full rounded-lg border border-gray-300 px-4 py-3 text-gray-900 outline-none focus:border-black"
                  placeholder="Enter task description"
                />
              </div>

              <div className="grid gap-5 md:grid-cols-2">
                <div>
                  <label className="mb-2 block text-sm font-medium text-gray-700">
                    Status
                  </label>

                  <select
                    name="status"
                    value={formData.status}
                    onChange={handleChange}
                    className="w-full rounded-lg border border-gray-300 px-4 py-3 text-gray-900 outline-none focus:border-black"
                  >
                    <option value="Pending">Pending</option>
                    <option value="In Progress">In Progress</option>
                    <option value="Completed">Completed</option>
                  </select>
                </div>

                <div>
                  <label className="mb-2 block text-sm font-medium text-gray-700">
                    Due Date
                  </label>

                  <input
                    type="date"
                    name="dueDate"
                    value={formData.dueDate}
                    onChange={handleChange}
                    required
                    className="w-full rounded-lg border border-gray-300 px-4 py-3 text-gray-900 outline-none focus:border-black"
                  />
                </div>
              </div>

              <div className="flex justify-end gap-3">
                <button
                  type="button"
                  onClick={() => setShowForm(false)}
                  className="rounded-lg border border-gray-300 px-5 py-2.5 text-sm font-medium text-gray-700 hover:bg-gray-100"
                >
                  Cancel
                </button>

                <button
                  type="submit"
                  className="rounded-lg bg-black px-5 py-2.5 text-sm font-medium text-white hover:bg-gray-800"
                >
                  Create Task
                </button>
              </div>
            </form>
          </div>
        )}

        {/* Statistics */}
        <div className="mb-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          <div className="rounded-xl border bg-white p-6 shadow-sm">
            <p className="text-sm text-gray-500">Total Tasks</p>
            <p className="mt-2 text-3xl font-bold text-gray-900">
              {totalTasks}
            </p>
          </div>

          <div className="rounded-xl border bg-white p-6 shadow-sm">
            <p className="text-sm text-gray-500">Pending</p>
            <p className="mt-2 text-3xl font-bold text-yellow-600">
              {pendingTasks}
            </p>
          </div>

          <div className="rounded-xl border bg-white p-6 shadow-sm">
            <p className="text-sm text-gray-500">In Progress</p>
            <p className="mt-2 text-3xl font-bold text-blue-600">
              {inProgressTasks}
            </p>
          </div>

          <div className="rounded-xl border bg-white p-6 shadow-sm">
            <p className="text-sm text-gray-500">Completed</p>
            <p className="mt-2 text-3xl font-bold text-green-600">
              {completedTasks}
            </p>
          </div>
        </div>

        {/* Tasks */}
        <div>
          <div className="mb-5">
            <h2 className="text-2xl font-semibold text-gray-900">
              My Tasks
            </h2>

            <p className="mt-1 text-gray-500">
              View and manage all your tasks.
            </p>
          </div>

          {loading && (
            <div className="rounded-xl border bg-white p-8 text-center text-gray-500">
              Loading tasks...
            </div>
          )}

          {!loading && error && (
            <div className="rounded-xl border border-red-200 bg-red-50 p-6 text-red-700">
              {error}
            </div>
          )}

          {!loading && !error && tasks.length === 0 && (
            <div className="rounded-xl border bg-white p-8 text-center text-gray-500">
              No tasks found. Add your first task.
            </div>
          )}

          {!loading && !error && tasks.length > 0 && (
            <div className="grid gap-5 md:grid-cols-2">
              {tasks.map((task) => (
                <div
                  key={task._id}
                  className="rounded-xl border bg-white p-6 shadow-sm"
                >
                  <div className="mb-4 flex items-start justify-between gap-4">
                    <h3 className="text-lg font-semibold text-gray-900">
                      {task.title}
                    </h3>

                    <span
                      className={`rounded-full px-3 py-1 text-xs font-medium ${
                        task.status === "Completed"
                          ? "bg-green-100 text-green-700"
                          : task.status === "In Progress"
                          ? "bg-blue-100 text-blue-700"
                          : "bg-yellow-100 text-yellow-700"
                      }`}
                    >
                      {task.status}
                    </span>
                  </div>

                  <p className="mb-5 text-sm leading-6 text-gray-600">
                    {task.description}
                  </p>

                  <p className="mb-5 text-sm text-gray-500">
                    Due Date:{" "}
                    <span className="font-medium text-gray-700">
                      {new Date(task.dueDate).toLocaleDateString()}
                    </span>
                  </p>

                  <div className="flex gap-3">
                    <button className="rounded-md border border-gray-300 px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-100">
                      Edit
                    </button>

                    <button className="rounded-md border border-red-200 px-4 py-2 text-sm font-medium text-red-600 hover:bg-red-50">
                      Delete
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </main>
  );
}