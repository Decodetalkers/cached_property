function cached_property(origin_Method: any, _context: DecoratorContext) {
  let data: any = undefined;
  function replacementMethod(this: any, ...args: any[]) {
    if (data === undefined) {
      data = origin_Method.call(this, ...args);
    }
    return data;
  }
  return replacementMethod;
}
