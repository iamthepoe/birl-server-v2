import express from 'express';
import cors from 'cors';
import { codeVerification } from './interpreter/codeVerification';
import { birl } from './interpreter/codeExec';

const app = express();

app.use(cors());
app.use(express.json());

app.post('/compile', async (req, res) => {
  console.log('-----------------------------------------');
  console.log("POST AT '/compile'");

  try {
    const { code, stdin } = req.body;
    if (!code.trim() || codeVerification(code)) {
      res.json({
        error: 'ERRO DE COMPILAÇÃO, CUMPADI!!\n',
        stdout: null,
      });
    } else {
      birl(code, stdin, res);
    }
  } catch (error) {
    res.status(500).json({ error: 'Erro no servidor' });
  }
});

app.listen(3000, () => {
  console.log('Server running at http://localhost:3000');
});
