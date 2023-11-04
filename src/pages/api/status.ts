import { NextApiRequest, NextApiResponse } from 'next';
import ping from 'ping';

async function checkStatus(ipAddress: string): Promise<string> {
  const result = await ping.promise.probe(ipAddress);
  return result.alive ? 'online 🟢' : 'offline 🔴';
}
export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    const ipAddress = '26.243.229.64';
  
    async function updateStatus() {
      const status = await checkStatus(ipAddress);
      res.status(200).json({ status });
    }
  
    // Initial status update
    await updateStatus();
  
    // Update status every 10 seconds
    setInterval(updateStatus, 10000);
  }