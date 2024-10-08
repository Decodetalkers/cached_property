/**
 * @module
 * This module define a Decorator about cached_property property
 * @example
 *
 * ```typescript
 * import { cached_property } from "@nobody/cached-property";
 * import { assertEquals } from "jsr:@std/assert";
 *
 * class CacheTestClass {
 *  constructor(public a: number) {
 *  }
 *  \@cached_static_property
 *  static static_tag() {
 *      return 10;
 *  }
 *  \@cached_property
 *  tag() {
 *    return this.a + 10;
 *  }
 * }
 *
 * Deno.test(function testCache() {
 *  const cached_test = new CacheTestClass(10);
 *  assertEquals(cached_test.tag(), 20);
 *  cached_test.a += 100;
 *  assertEquals(cached_test.tag(), 20);
 *
 *  const cached_test_2 = new CacheTestClass(100);
 *  assertEquals(cached_test_2.tag(), 110);
 *  cached_test_2.a += 100;
 *  assertEquals(cached_test_2.tag(), 110);
 * });
 * ```
 */

/**
 * This is for none static function
 * When the function is used, the value from the function will never change
 */
export function cached_property<T>(
  origin_Method: T,
  context: (ClassMethodDecoratorContext | ClassGetterDecoratorContext) & {
    static: false;
  },
): T {
  const name = context.name as string;
  const cached_data_name: string = "_cached_" + name;
  // deno-lint-ignore no-explicit-any
  function replacementMethod(this: any, ...args: any[]) {
    if (this[cached_data_name] === undefined) {
      // deno-lint-ignore no-explicit-any
      this[cached_data_name] = (origin_Method as any).call(this, ...args);
    }
    return this[cached_data_name];
  }
  return replacementMethod as T;
}

/**
 * This is for static function
 * When the function is used, the value from the function will never change,
 * even you new a new class.
 */
export function cached_static_property<T>(
  origin_Method: T,
  _context: (ClassMethodDecoratorContext | ClassGetterDecoratorContext) & {
    static: true;
  },
): T {
  // deno-lint-ignore no-explicit-any
  let cache_data: any = undefined;
  // deno-lint-ignore no-explicit-any
  function replacementMethod(this: any, ...args: any[]) {
    if (cache_data === undefined) {
      // deno-lint-ignore no-explicit-any
      cache_data = (origin_Method as any).call(this, ...args);
    }
    return cache_data;
  }
  return replacementMethod as T;
}
