export function buildFormalString(strings: string[]) {
  if(strings.length === 0) {
    return '';
  } else if(strings.length === 1) {
    return strings[0];
  } else if(strings.length === 2) {
    return strings.join(' e ');
  } else {
    const lastItem = strings.pop();
    return strings.join(', ') + ' e ' + lastItem;
  }
}
