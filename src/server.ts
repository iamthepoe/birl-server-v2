import express from 'express';
import cors from 'cors';
import { codeVerification } from './interpreter/codeVerification';
import { BirlClient } from './interpreter/BirlClient';

const client = new BirlClient();

const app = express();

app.use(cors());
app.use(express.json());

app.post('/compile', async (req, res) => {
  console.log('-----------------------------------------');
  console.log("POST AT '/compile'");

  try {
    const { code, stdin } = req.body;
    if (!code.trim() || codeVerification(code)) {
      res.status(400).json({
        error: 'ERRO DE COMPILAÇÃO, CUMPADI!!\n',
        stdout: null,
      });
    }

    const data = await client.executeCode(code, stdin);
    res.status(data.code).json({
      stdout: data.stdout,
      error: data.error
    });
  } catch (error) {
    res.status(500).json({ error: 'Erro no servidor' });
  }
});

app.listen(3000, () => {
  console.log('Server running at http://localhost:3000');
});
