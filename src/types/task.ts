export interface Task {
  id: number;
  taskName: string;
  status: string;
  dueDate: string;
  createdBy: {
    id: number;
    username: string;
    profileImage?: string;
  };
  assignedTo: {
    id: number;
    username: string;
    profileImage?: string;
  };
}
