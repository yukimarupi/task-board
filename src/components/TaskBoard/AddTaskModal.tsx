import { useState } from "react";

interface AddTaskModalProps {
  onClose: () => void;
  onSubmit: (task: { title: string; dueDate: string }) => void;
  status: string; // ステータス
}

const AddTaskModal: React.FC<AddTaskModalProps> = ({ onClose, onSubmit, status }) => {
  const [taskName, setTaskName] = useState("");
  const [dueDate, setDueDate] = useState("");
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = () => {
    if (!taskName || !dueDate) {
      setError("タスク名と締め切り日は必須です。");
      return;
    }

    // 入力データを親コンポーネントに送信
    onSubmit({ title: taskName, dueDate });
    setTaskName(""); // フィールドをリセット
    setDueDate("");
    onClose(); // モーダルを閉じる
  };

  return (
    <div className="modal-container p-4 bg-white rounded shadow-lg">
      <div className="modal-content">
        <h2 className="text-lg font-semibold mb-4">Add Task</h2>
        <p className="text-sm text-gray-600 mb-4">
          Adding task to <strong>{status}</strong>
        </p>
        {error && <p className="text-red-500 text-sm mb-2">{error}</p>}
        <input
          type="text"
          placeholder="Task Name"
          value={taskName}
          onChange={(e) => setTaskName(e.target.value)}
          className="input-field w-full p-2 border rounded mb-2"
        />
        <input
          type="date"
          value={dueDate}
          onChange={(e) => setDueDate(e.target.value)}
          className="input-field w-full p-2 border rounded mb-4"
        />
        <div className="flex justify-end space-x-2">
          <button
            onClick={onClose}
            className="cancel-button px-4 py-2 bg-gray-300 text-gray-700 rounded"
          >
            Cancel
          </button>
          <button
            onClick={handleSubmit}
            className="add-button px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
          >
            Add Task
          </button>
        </div>
      </div>
    </div>
  );
};

export default AddTaskModal;
