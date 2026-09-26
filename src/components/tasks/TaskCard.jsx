function TaskCard({ task, onEdit, onDelete }) {
  const statusStyles = {
    todo: "bg-gray-100 text-gray-700",
    "in-progress": "bg-blue-100 text-blue-700",
    completed: "bg-green-100 text-green-700",
  };

  const statusLabels = {
    todo: "To Do",
    "in-progress": "In Progress",
    completed: "Completed",
  };

  return (
    <article className="rounded-xl border border-gray-200 bg-white p-5 shadow-sm transition hover:-translate-y-0.5 hover:shadow-md">
      <div className="flex items-start justify-between gap-4">
        <div className="min-w-0 flex-1">
          <h3 className="truncate font-semibold text-gray-900">{task.title}</h3>

          {task.description && (
            <p className="mt-2 line-clamp-2 text-sm leading-6 text-gray-500">
              {task.description}
            </p>
          )}
        </div>

        <span
          className={`shrink-0 rounded-full px-3 py-1 text-xs font-medium ${
            statusStyles[task.status] || statusStyles.todo
          }`}
        >
          {statusLabels[task.status] || "To Do"}
        </span>
      </div>

      <div className="mt-5 flex items-center justify-between border-t border-gray-100 pt-4">
        <p className="text-xs text-gray-400">
          {new Date(task.$createdAt).toLocaleDateString()}
        </p>

        <div className="flex items-center gap-4">
          <button
            onClick={() => onEdit(task)}
            className="text-sm font-medium text-indigo-600 transition hover:text-indigo-800"
          >
            Edit
          </button>

          <button
            onClick={() => onDelete(task.$id)}
            className="text-sm font-medium text-red-500 transition hover:text-red-700"
          >
            Delete
          </button>
        </div>
      </div>
    </article>
  );
}

export default TaskCard;
