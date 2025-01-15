import { apiClient } from '@/lib/api';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';

export interface Task {
  id: string;
  title: string; // フロントエンドで使用するプロパティ
  status: string;
  assignees: string[];
  comments: number;
  attachments: number;
  dueDate: string;
}

// APIから取得する生データ型
interface RawTask {
  id: string;
  taskName: string; // APIからのプロパティ名
  status: string;
  assignees: string[];
  comments: number;
  attachments: number;
  dueDate: string;
}

// タスク一覧取得用の API 呼び出し関数
const fetchTasks = async (): Promise<RawTask[]> => {
  const response = await fetch('/api/tasks');
  console.log('🚀 ~ fetchTasks ~ response:', response);
  if (!response.ok) {
    throw new Error('Failed to fetch tasks');
  }
  return response.json();
};

// タスク作成用の API 呼び出し関数
const createTaskApi = async (task: Omit<Task, 'id'>): Promise<Task> => {
  const response = await fetch('/api/tasks', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(task),
  });
  if (!response.ok) {
    throw new Error('Failed to create task');
  }
  return response.json();
};

// データ変換関数
const mapRawTaskToTask = (rawTask: RawTask): Task => ({
  ...rawTask,
  title: rawTask.taskName, // taskName を title に変換
});

export const useTask = () => {
  const queryClient = useQueryClient();

  // タスク一覧取得
  const {
    data: rawTasks = [],
    error,
    isLoading,
  } = useQuery<RawTask[], Error>({
    queryKey: ['tasks'],
    queryFn: fetchTasks,
  });

  // `taskName` を `title` に変換
  const tasks = rawTasks.map(mapRawTaskToTask);

  // タスク追加
  const { mutate: addTask } = useMutation<Task, Error, Omit<Task, 'id'>>({
    mutationFn: createTaskApi,
    onSuccess: (newTask) => {
      // キャッシュを更新して、新しいタスクを反映
      queryClient.setQueryData<RawTask[]>(['tasks'], (oldTasks = []) => [
        ...oldTasks,
        { ...newTask, taskName: newTask.title }, // キャッシュには元の形式を保存
      ]);
    },
    onError: (error) => {
      console.error('Failed to add task:', error.message);
    },
  });

  return {
    tasks,
    isLoading,
    error,
    addTask,
  };
};
// リクエストインターセプターでトークンを付加
apiClient.interceptors.request.use((config) => {
  const token = sessionStorage.getItem('token'); // セッションストレージからトークンを取得
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});
