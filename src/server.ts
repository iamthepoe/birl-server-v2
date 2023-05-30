import express from 'express';
import cors from 'cors';
import { codeVerification } from './interpreter/codeVerification';
import { birl } from './interpreter/codeExec';

const app = express();

app.use(cors());
app.use(express.json());

app.post('/compile', function (req, res) {
  console.log('-----------------------------------------');
  console.log("POST AT '/compile'");

  // Lendo o JSON
  var body = '';
  req.on('data', function (data) {
    body += data;
  });

  // Enviando o código e o stdin para a execução do código
  req.on('end', function () {
    var json = JSON.parse(body);
    if (json.code == null || codeVerification(json.code)) {
      res.setHeader('Content-Type', 'application/json');
      res.end(
        JSON.stringify({
          error: 'ERRO DE COMPILAÇÃO, CUMPADI!!\n',
          stdout: null,
        })
      );
    } else {
      birl(json.code, json.stdin, res);
    }
  });
});

app.listen(3000, () => {
  console.log('Server running at http://localhost:3000');
});
