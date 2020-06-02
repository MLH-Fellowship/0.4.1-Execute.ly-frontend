import express from 'express';

const router = express.Router();

router.get('/status', (req, res) => {
  res.json({ status: `Server running at PORT ${process.env.PORT || 5000}` });
});

export default router;
