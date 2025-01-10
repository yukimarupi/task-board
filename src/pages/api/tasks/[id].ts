// import type { NextApiRequest, NextApiResponse } from 'next';
// import axios from 'axios';
// import { API_BASE_URL } from '@/utils/constant';

// export default async function handler(
//   req: NextApiRequest,
//   res: NextApiResponse
// ) {
//   try {
//     if (req.method === 'GET') {
//       const { id } = req.query;
//       const response = await axios.get(`${API_BASE_URL}/tasks/${id}`, req.body);
//       res.status(200).json(response.data);
//     } else {
//       res.setHeader('Allow', ['GET']);
//       res.status(405).end(`Method ${req.method} Not Allowed`);
//     }
//   } catch (error) {
//     if (axios.isAxiosError(error)) {
//       // AxiosErrorの場合に詳細なメッセージを設定
//       res
//         .status(500)
//         .json({ error: error.response?.data?.error || error.message });
//     } else {
//       // その他のエラーの場合
//       res.status(500).json({ error: '予期しないエラーが発生しました。' });
//     }
//   }
// }
