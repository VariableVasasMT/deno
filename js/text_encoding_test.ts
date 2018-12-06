// Copyright 2018 the Deno authors. All rights reserved. MIT license.
import { test, assert, assertEqual } from "./test_util.ts";

test(function atobSuccess() {
  const text = "hello world";
  const encoded = btoa(text);
  assertEqual(encoded, "aGVsbG8gd29ybGQ=");
});

test(function btoaSuccess() {
  const encoded = "aGVsbG8gd29ybGQ=";
  const decoded = atob(encoded);
  assertEqual(decoded, "hello world");
});

test(function btoaFailed() {
  const text = "你好";
  let err;
  try {
    btoa(text);
  } catch (e) {
    err = e;
  }
  assert(!!err);
  assertEqual(err.name, "InvalidInput");
});

test(function textDecoder() {
  // prettier-ignore
  const fixture = new Uint8Array([
    0xef, 0xbf, 0xbd, 0xef, 0xbf, 0xbd,
    0xef, 0xbf, 0xbd, 0xef, 0xbf, 0xbd,
    0xef, 0xbf, 0xbd, 0xef, 0xbf, 0xbd
  ]);
  const decoder = new TextDecoder();
  assertEqual(decoder.decode(fixture), "������");
});

test(function textDecoder2() {
  // prettier-ignore
  const fixture = new Uint8Array([
    0xf0, 0x9d, 0x93, 0xbd,
    0xf0, 0x9d, 0x93, 0xae,
    0xf0, 0x9d, 0x94, 0x81,
    0xf0, 0x9d, 0x93, 0xbd
  ]);
  const decoder = new TextDecoder();
  assertEqual(decoder.decode(fixture), "𝓽𝓮𝔁𝓽");
});

test(function textEncoder() {
  const fixture = "������";
  const encoder = new TextEncoder();
  // prettier-ignore
  assertEqual(Array.from(encoder.encode(fixture)), [
    0xef, 0xbf, 0xbd, 0xef, 0xbf, 0xbd,
    0xef, 0xbf, 0xbd, 0xef, 0xbf, 0xbd,
    0xef, 0xbf, 0xbd, 0xef, 0xbf, 0xbd
  ]);
});

test(function textEncoder2() {
  const fixture = "𝓽𝓮𝔁𝓽";
  const encoder = new TextEncoder();
  // prettier-ignore
  assertEqual(Array.from(encoder.encode(fixture)), [
    0xf0, 0x9d, 0x93, 0xbd,
    0xf0, 0x9d, 0x93, 0xae,
    0xf0, 0x9d, 0x94, 0x81,
    0xf0, 0x9d, 0x93, 0xbd
  ]);
});
