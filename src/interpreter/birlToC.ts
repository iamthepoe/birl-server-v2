/**********************************************************************
 *
 * birlToC.js: recebe um código em BIRL e retorna o mesmo traduzido
 * para C.
 *
 * A tradução é feita com um simples replace no código birl com o seu respectivo valor
 * em C, a regex (?=(?:[^"]|"[^"]*")*$) evita que sejam substituido os valores dentro
 * de aspas.
 ***********************************************************************/
import { exec } from 'child_process';

export class BirlConverter {
  private printCode(code: string): void {
    console.log('-----------------------------------------');
    console.log('CODIGO GERADO:');
    console.log(code);
    console.log('-----------------------------------------');
  }

  public convertToC(birlCode: string): string {
    if (!birlCode) return '';

    //Traduzindo a MAIN
    birlCode = birlCode.replace(
      /(HORA DO SHOW)(?=(?:[^"]|"[^"]*")*$)/g,
      'int main (void) {'
    );
    //Traduzindo o BIRL
    birlCode = birlCode.replace(/(BIRL)(?=(?:[^"]|"[^"]*")*$)/g, '}');
    //Traduzindo printf
    birlCode = birlCode.replace(
      /(CE QUER VER ESSA PORRA[\?]?)(?=(?:[^"]|"[^"]*")*$)/g,
      'printf'
    );
    //Traduzindo scanf
    birlCode = birlCode.replace(
      /(QUE QUE CE QUER MONSTR[AÃ]O[\?]?)(?=(?:[^"]|"[^"]*")*$)/g,
      'scanf'
    );
    //Traduzindo if
    birlCode = birlCode.replace(
      /(ELE QUE A GENTE QUER[\?]?)(?=(?:[^"]|"[^"]*")*$)(.*)/g,
      'if $2 {'
    );
    //Traduzindo else
    birlCode = birlCode.replace(
      /(N[AÃ]O VAI DAR N[AÃ]O)(?=(?:[^"]|"[^"]*")*$)/g,
      '} else {'
    );
    //Traduzindo else if
    birlCode = birlCode.replace(
      /(QUE NUM VAI DAR O QUE[\?]?)(?=(?:[^"]|"[^"]*")*$)(.*)/g,
      '} else if $2 {'
    );
    birlCode = birlCode.replace(
      /(QUE N[AÃ]O VAI DAR O QUE[\?]?)(?=(?:[^"]|"[^"]*")*$)(.*)/g,
      '} else if $2 {'
    );
    //Traduzindo while
    birlCode = birlCode.replace(
      /(NEGATIVA BAMBAM)(?=(?:[^"]|"[^"]*")*$)(.*)/g,
      'while $2 {'
    );
    //Traduzindo for
    birlCode = birlCode.replace(
      /(MAIS QUERO MAIS)(?=(?:[^"]|"[^"]*")*$)(.*)/g,
      'for $2 {'
    );
    //Traduzindo declaração de função
    birlCode = birlCode.replace(
      /(O[H]? O HOM[EI][M]? A[IÍ] PO[ \t]*\()(?=(?:[^"]|"[^"]*")*$)(.*)(\))/g,
      '$2 {'
    );
    //Traduzindo retorno da função
    birlCode = birlCode.replace(
      /(BORA CUMPAD[EI])(?=(?:[^"]|"[^"]*")*$)/g,
      'return'
    );
    //Traduzindo chamada de função
    birlCode = birlCode.replace(
      /(AJUDA O MALUCO TA DOENTE)(?=(?:[^"]|"[^"]*")*$)/g,
      ' '
    );
    birlCode = birlCode.replace(
      /(AJUDA O MALUCO QUE TA DOENTE)(?=(?:[^"]|"[^"]*")*$)/g,
      ' '
    );
    //Traduzindo parada no código
    birlCode = birlCode.replace(
      /(SAI FILH[OA] DA PUTA)(?=(?:[^"]|"[^"]*")*$)/g,
      'break'
    );
    //Traduzindo continuar o código
    birlCode = birlCode.replace(
      /(VAMO MONSTRO)(?=(?:[^"]|"[^"]*")*$)/g,
      'continue'
    );

    //Traduzindo os tipos de dados
    birlCode = birlCode.replace(/(FRANGO)(?=(?:[^"]|"[^"]*")*$)/g, 'char');
    birlCode = birlCode.replace(/(MONSTRO)(?=(?:[^"]|"[^"]*")*$)/g, 'int');
    birlCode = birlCode.replace(/(MONSTRINHO)(?=(?:[^"]|"[^"]*")*$)/g, 'short');
    birlCode = birlCode.replace(/(MONSTR[ÃA]O)(?=(?:[^"]|"[^"]*")*$)/g, 'long');
    birlCode = birlCode.replace(
      /(TRAP[EÉ]ZIO DESCENDENTE)(?=(?:[^"]|"[^"]*")*$)/g,
      'double'
    );
    birlCode = birlCode.replace(
      /(TRAP[EÉ]ZIO)(?=(?:[^"]|"[^"]*")*$)/g,
      'float'
    );
    birlCode = birlCode.replace(
      /(B[IÍ]CEPS)(?=(?:[^"]|"[^"]*")*$)/g,
      'unsigned'
    );

    //Colocando as bibliotecas
    birlCode = '#include <stdio.h>\n#include <math.h>\n\n' + birlCode;

    this.printCode(birlCode);

    return birlCode;
  }

  public compileCodeC(file, res) {
    const compileComand = `gcc ${file}.c -o ${file} -lm && timeout 2s ./${file} < ${file}.txt`;

    //compila com o gcc
    exec(compileComand, function (error, stdout, stderr) {
      //se houver erro de compilação, respondemos a requisição com um erro.
      res.setHeader('Content-Type', 'application/json');

      if (error) {
        console.log('ERROR: ' + error);
        res.end(
          JSON.stringify({
            error: 'CODEI PRA CARALHO MAS NÃO COMPILOU!\n',
            stdout: null,
          })
        );
      } else {
        console.log('STDOUT: ' + stdout);
        res.end(JSON.stringify({ error: null, stdout: stdout }));
      }
    }).on('close', function () {
      exec('rm ' + file + '*', function (error, stdout, stderr) {
        console.log('-----------------------------------------');
        console.log('REMOVING FILES');
      });
    });
  }
}
