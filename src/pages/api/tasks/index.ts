import { NextApiRequest, NextApiResponse } from 'next';

const tasks = [
  {
    id: 1,
    title: 'Model Answer',
    description: 'Create the model answer.',
    status: 'backlog',
    assignedUsers: [
      { id: 1, name: 'User A', profileImage: '/images/user-a.png' },
      { id: 2, name: 'User B', profileImage: '/images/user-b.png' },
    ],
  },
  // 他のタスクを追加
];

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'GET') {
    res.status(200).json(tasks);
  } else {
    res.setHeader('Allow', ['GET']);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
