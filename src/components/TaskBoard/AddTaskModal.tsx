import { useState } from "react";

interface AddTaskModalProps {
    onClose: () => void;
    onSubmit: (task: { title: string; dueDate: string }) => void;
    status: string; // ステータスだけを受け取る
  }

  const AddTaskModal: React.FC<AddTaskModalProps> = ({ onClose, onSubmit, status }) => {
    const [taskName, setTaskName] = useState("");
    const [dueDate, setDueDate] = useState("");

    const handleSubmit = () => {
      if (taskName && dueDate) {
        onSubmit({ title: taskName, dueDate }); // 必要なデータのみ送信
        setTaskName(""); // フィールドをリセット
        setDueDate("");
      }
    };

    return (
      <div className="modal-container">
        <div className="modal-content">
          <h2 className="modal-title">Add Task</h2>
          <p className="modal-description">Adding task to <strong>{status}</strong></p>
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
          <button onClick={handleSubmit} className="add-button">Add Task</button>
          <button onClick={onClose} className="cancel-button">Cancel</button>
        </div>
      </div>
    );
  };

  export default AddTaskModal;
