//タスクに関する型（例: タスクID、ステータス、期限など）。
export interface Task {
    id: string;
    title: string;
    status: "Backlog" | "To Do" | "In Process" | "Done";
    assignees: string[]; // ユーザーIDまたはアバター画像URL
    comments: number;
    attachments: number;
    dueDate: string;
  }
