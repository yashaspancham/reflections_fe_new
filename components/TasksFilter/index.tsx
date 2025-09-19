const TaskFilter = ({ statusFilter, handleStatusFilter }: any) => {
  return (
    <div className="p-4">
      <select
        value={statusFilter}
        onChange={(e) => handleStatusFilter(e.target.value)}
        className="border border-gray-300 rounded p-1 active:border-purple-600"
      >
        <option value="">All</option>
        <option value="pending">Pending</option>
        <option value="in_progress">In-Progress</option>
        <option value="completed">Completed</option>
      </select>
    </div>
  );
};
export default TaskFilter;
