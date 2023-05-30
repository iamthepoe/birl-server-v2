/**********************************************************************
 *
 * code_exec.js: recebe um código em BIRL, uma entrada padrão e um valor
 * de resposta, cria o arquivo .c equivalente ao código BIRL, compila e
 * o executa.
 *
 ***********************************************************************/
import fs from 'fs';
import { compiler } from './compiler';
import { birlToC } from './birlToC';

function birl(birlCode: string, stdin: string, res) {
  const code = birlToC(birlCode);
  var randomName = crypto.randomUUID();

  // Escrevendo a stdin
  fs.writeFile(randomName + '.txt', stdin, function (error) {
    // Se ocorrer erro, retorna a resposta
    if (error) {
      res.setHeader('Content-Type', 'application/json');
      res.end(JSON.stringify({ error: 'ERRO INTERNO PAI!\n', stdout: null }));
    }

    // Se não, escreve o código em um .c com nome aleatorio
    //e chama compiler

    fs.writeFile(randomName + '.c', code, function (err) {
      // se ocorrer erro, retorna JSON
      if (err) {
        res.setHeader('Content-Type', 'application/json');
        res.end(JSON.stringify({ error: 'ERRO INTERNO PAI!\n', stdout: null }));
        return;
      }
      // caso contrário, compila e executa
      process.nextTick(function () {
        compiler(randomName, res);
      });
    });
  });
}
export { birl };
