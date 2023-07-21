import summariesData from '../../data/summaries.json';

export default function handler(req, res) {
  const { college } = req.query;
  const collegeSummary = summariesData[college];

  res.status(200).json({ summary: collegeSummary });
}