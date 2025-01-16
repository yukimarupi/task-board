import { useState, useEffect } from 'react';
import { Task } from '@/types/task';
import apiClient from '@/lib/api';

export const useTask = () => {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null); // エラーは文字列として管理

  useEffect(() => {
    const fetchTasks = async () => {
      try {
        const response = await apiClient.get('/tasks');
        setTasks(response.data);
      } catch (err: unknown) {
        // unknown型を使用
        if (err instanceof Error) {
          setError(err.message); // Error型の場合のみエラーメッセージを取得
        } else {
          setError('An unknown error occurred');
        }
      } finally {
        setIsLoading(false);
      }
    };

    fetchTasks();
  }, []);

  return { tasks, isLoading, error };
};
