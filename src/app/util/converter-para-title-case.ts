// Captura o valor da string e passa a primeira letra para maiúsculo
export function converterParaTitleCase(texto: string): string {

  // Se a posição da letra no array for maior que 1 retorna somente o texto
  if(texto.length < 1) return texto;

  // Se estiver na primeira posição do array passa a letra para maiúsculo e concatena com o restante do texto
  return texto[0].toUpperCase() + texto.substring(1).toLowerCase();
}
