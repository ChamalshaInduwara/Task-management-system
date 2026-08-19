"use client";

import { useState } from "react";

export default function Home() {
  const [tasks] = useState([
    {
      id: 1,
      title: "Complete Backend API",
      description: "Build CRUD operations using Express and MongoDB.",
      status: "In Progress",
      dueDate: "2026-09-20",
    },
    {
      id: 2,
      title: "Build Frontend",
      description: "Create the task management dashboard using Next.js.",
      status: "Pending",
      dueDate: "2026-09-22",
    },
  ]);

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

          <button className="rounded-lg bg-black px-5 py-3 font-medium text-white transition hover:bg-gray-800">
            + Add Task
          </button>
        </div>

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

        {/* Task Section */}
        <div>
          <div className="mb-5">
            <h2 className="text-2xl font-semibold text-gray-900">
              My Tasks
            </h2>

            <p className="mt-1 text-gray-500">
              View and manage all your tasks.
            </p>
          </div>

          {/* Task Cards */}
          <div className="grid gap-5 md:grid-cols-2">

            {tasks.map((task) => (
              <div
                key={task.id}
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
                    {task.dueDate}
                  </span>
                </p>

                <div className="flex gap-3">
                  <button className="rounded-md border border-gray-300 px-4 py-2 text-sm font-medium text-gray-700 transition hover:bg-gray-100">
                    Edit
                  </button>

                  <button className="rounded-md border border-red-200 px-4 py-2 text-sm font-medium text-red-600 transition hover:bg-red-50">
                    Delete
                  </button>
                </div>
              </div>
            ))}

          </div>
        </div>

      </div>
    </main>
  );
}