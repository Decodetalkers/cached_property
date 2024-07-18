import { assertEquals } from "jsr:@std/assert";

import { cached_property, cached_static_property } from "./mod.ts";

class CacheTestClass {
  static b = 10;
  constructor(public a: number) {
  }

  @cached_static_property
  static tag_static() {
    return CacheTestClass.b + 10;
  }

  @cached_property
  tag() {
    return this.a + 10;
  }
}

Deno.test(function testCache() {
  assertEquals(CacheTestClass.tag_static(), 20);

  const cached_test = new CacheTestClass(10);
  assertEquals(cached_test.tag(), 20);
  cached_test.a += 100;
  assertEquals(cached_test.tag(), 20);

  const cached_test_2 = new CacheTestClass(100);
  assertEquals(cached_test_2.tag(), 110);
  cached_test_2.a += 100;
  assertEquals(cached_test_2.tag(), 110);
});
