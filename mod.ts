/**
 * @module
 * This module define a Decorator about cached_property property
 * @example
 *
 * ```typescript
 * import cached_property from "@nobody/cached_property";
 * import { assertEquals } from "jsr:@std/assert";
 *
 * class CacheTestClass {
 *  constructor(public a: number) {
 *  }
 *
 *  @cached_property
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

export default function cached_property<T>(
  origin_Method: T,
  context: DecoratorContext,
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
