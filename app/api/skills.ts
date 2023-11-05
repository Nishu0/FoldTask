
import type { NextApiRequest, NextApiResponse } from 'next'

import fs from 'fs/promises';

const FILE_PATH = '../../data/skills.json';

console.log("Request received");

export default async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method === 'GET') {
    try {
      const data = await fs.readFile(FILE_PATH, 'utf-8');
      res.status(200).json(JSON.parse(data));
    } catch (error) {
      res.status(500).json({ error: 'Failed to read data.' });
    }
  } else if (req.method === 'POST') {
    try {
      const newData = JSON.stringify(req.body);
      await fs.writeFile(FILE_PATH, newData);
      res.status(200).json({ message: 'Data saved successfully' });
    } catch (error) {
      res.status(500).json({ error: 'Failed to save data.' });
    }
  } else {
    res.status(405).json({ error: 'Method not allowed' });
  }
};
