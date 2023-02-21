class ParseBoolean {

  static parse(value: any): boolean {
    if(typeof value === 'string') {
      return value.toLowerCase() === 'true';
    }

    if(typeof value === 'boolean') {
      return value;
    }

    return value === 'true';
  }

  static literallyParse(value: 'true' | 'false'): boolean {
    if(value === 'true') {
      return true;
    }

    if(value === 'false') {
      return false;
    }

    throw new Error('Invalid boolean value');
  }

}

export { ParseBoolean };
