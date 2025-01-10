import type { NextApiRequest, NextApiResponse } from "next";
import axios from "axios";

const API_BASE_URL = "http://localhost:4000"; // バックエンドのURL

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === "POST") {
    try {
      const { data } = await axios.post(`${API_BASE_URL}/tasks`, req.body); // バックエンドにリクエストを送信
      res.status(201).json(data);
    } catch (error) {
      if (axios.isAxiosError(error)) {
        // AxiosErrorの場合
        res.status(error.response?.status || 500).json({
          error: error.response?.data || "An error occurred while adding the task.",
        });
      } else {
        // その他のエラーの場合
        res.status(500).json({ error: "An unexpected error occurred." });
      }
    }
  } else {
    res.setHeader("Allow", ["POST"]);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
