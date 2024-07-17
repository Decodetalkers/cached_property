import { assertEquals } from "jsr:@std/assert";

import cached_property from "./mod.ts";

class CacheTestClass {
  constructor(public a: number) {
  }

  @cached_property
  tag() {
    return this.a + 10;
  }
}

Deno.test(function testCache() {
  const cached_test = new CacheTestClass(10);
  assertEquals(cached_test.tag(), 20);
  cached_test.a += 100;
  assertEquals(cached_test.tag(), 20);

  const cached_test_2 = new CacheTestClass(100);
  assertEquals(cached_test_2.tag(), 110);
  cached_test_2.a += 100;
  assertEquals(cached_test_2.tag(), 110);
});
