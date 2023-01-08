/* eslint-disable @typescript-eslint/no-explicit-any */
export function someIsNullOrUndefined(...values: any[]) {
  const nullOrUndefined: any[] = [null, undefined];

  if(nullOrUndefined.includes(values)) {
    return true;
  }

  return values.some(value => nullOrUndefined.includes(value));
}
