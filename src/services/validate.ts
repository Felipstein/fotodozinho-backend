/* eslint-disable @typescript-eslint/no-explicit-any */
class ValidateService {

  static someIsNullOrUndefined(...values: any[]) {
    const nullOrUndefined: any[] = [null, undefined];

    if(nullOrUndefined.includes(values)) {
      return true;
    }

    return values.some(value => nullOrUndefined.includes(value));
  }

  static someIsNull(...values: any[]) {
    if(values === null) {
      return true;
    }

    return values.some(value => value === null);
  }

}

export { ValidateService };
