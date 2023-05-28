/**********************************************************************
* 
* code_verification.js: recebe um código em birl e verifica se o código
* pode ser executado ou nao.
*
***********************************************************************/
function codeVerification(birlCode) {
    return birlCode.match(/((#.*include.*)|(system)|(popen)|(fopen)|(fgets)|(execl))/g);
}

export { codeVerification };
