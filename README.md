# Cached_property

This lib made a Decorator like what in python.

`cached_property` will only run once in the first time it is used.

I do not know if it is useful. it is my first typescript Decorator.

## Example

```ts
import { cached_property, static_cached_property } from "@nobody/cached_property";
import { assertEquals } from "jsr:@std/assert";

class CacheTestClass {
 constructor(public a: number) {
 }

 @static_cached_property
 static static_tag() {
  return 20;
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
```
