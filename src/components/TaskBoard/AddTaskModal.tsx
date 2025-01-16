//タスク追加用のモーダルウィンドウ。

import { useState } from 'react';

interface AddTaskModalProps {
  onClose: () => void;
  onSubmit: (task: { title: string; dueDate: string; tags: string[] }) => void; // タグを含むタスク情報を送信
  status: string;
}

const AddTaskModal: React.FC<AddTaskModalProps> = ({
  onClose,
  onSubmit,
  status,
}) => {
  const [taskName, setTaskName] = useState('');
  const [dueDate, setDueDate] = useState('');
  const [tags, setTags] = useState<string[]>([]); // タグの状態を追加
  const [selectedTag, setSelectedTag] = useState('');

  // タグ候補
  const availableTags = ['Design', 'Development', 'Testing', 'Deployment'];

  const handleAddTag = () => {
    if (selectedTag && !tags.includes(selectedTag)) {
      setTags([...tags, selectedTag]);
      setSelectedTag('');
    }
  };

  const handleRemoveTag = (tag: string) => {
    setTags(tags.filter((t) => t !== tag));
  };

  const handleSubmit = () => {
    if (taskName && dueDate) {
      onSubmit({ title: taskName, dueDate, tags }); // タグを含むデータを送信
      setTaskName('');
      setDueDate('');
      setTags([]);
    }
  };

  return (
    <div className="modal-container">
      <div className="modal-content">
        <h2 className="modal-title">Add Task</h2>
        <p className="modal-description">
          Adding task to <strong>{status}</strong>
        </p>
        <input
          type="text"
          placeholder="Task Name"
          value={taskName}
          onChange={(e) => setTaskName(e.target.value)}
          className="input-field"
        />
        <input
          type="date"
          value={dueDate}
          onChange={(e) => setDueDate(e.target.value)}
          className="input-field"
        />

        {/* タグ選択セクション */}
        <div className="mt-4">
          <label className="block text-sm font-medium mb-2">Tags</label>
          <div className="flex space-x-2">
            <select
              value={selectedTag}
              onChange={(e) => setSelectedTag(e.target.value)}
              className="border p-2 rounded"
            >
              <option value="">Select a tag</option>
              {availableTags.map((tag) => (
                <option key={tag} value={tag}>
                  {tag}
                </option>
              ))}
            </select>
            <button
              type="button"
              onClick={handleAddTag}
              className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
            >
              Add Tag
            </button>
          </div>
          <div className="mt-2 flex flex-wrap space-x-2">
            {tags.map((tag) => (
              <span
                key={tag}
                className="px-2 py-1 bg-gray-200 text-gray-700 rounded-full flex items-center space-x-2"
              >
                <span>{tag}</span>
                <button
                  type="button"
                  onClick={() => handleRemoveTag(tag)}
                  className="text-red-500 ml-2"
                >
                  &times;
                </button>
              </span>
            ))}
          </div>
        </div>

        <button onClick={handleSubmit} className="add-button mt-4">
          Add Task
        </button>
        <button onClick={onClose} className="cancel-button">
          Cancel
        </button>
      </div>
    </div>
  );
};

export default AddTaskModal;
