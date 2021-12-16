import file1 from '../configs/file1.json'
import file2 from '../configs/file2.json'

export default function handler(req, res) {
  const client = req.query.client
  if (client === 'file1') {
    return res.status(200).json(file1)
  } else if (client === 'file2') {
    return res.status(200).json(file2)
  } else {
    return res.status(404).json({ error: 'client not found!' })
  }
}
