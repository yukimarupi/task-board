import { API_BASE_URL } from '@/utils/constant';
import axios from 'axios';
import { NextApiRequest, NextApiResponse } from 'next';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === 'GET') {
    // タスク一覧を取得
    console.log('🚀 ~ タスク一覧を取得:');

    try {
      const response = await axios.get(`${API_BASE_URL}/api/tasks`, req.body); // バックエンドにリクエストを送信
      console.log('🚀 ~ response.data:', response.data);

      res.status(200).json(response.data);
    } catch (error) {
      console.error('Error fetching tasks:', error);
      res.status(500).json({ error: 'Failed to fetch tasks' });
    }
  } else if (req.method === 'POST') {
    // 新しいタスクを追加
    const { taskName, status, dueDate, createdById, assignedToId } = req.body;

    if (!taskName || !status || !dueDate || !createdById || !assignedToId) {
      return res.status(400).json({ error: 'All fields are required' });
    }

    try {
      const { data } = await axios.post(`${API_BASE_URL}/api/tasks`, req.body); // バックエンドにリクエストを送信
      res.status(201).json(data);
    } catch (error) {
      console.error('Error creating task:', error);
      res.status(500).json({ error: 'Failed to create task' });
    }
  } else if (req.method === 'PATCH') {
    // タスクを更新
  } else {
    // その他の HTTP メソッドは許可しない
    res.setHeader('Allow', ['GET', 'POST', 'PATCH']);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
