import { stringifyWebgazerHandlerAction } from "../helper";
import { WebgazerHandlerAction } from "../types";

test("stringifyWebgazerHandlerAction(WebgazerHandlerAction.ENABLE) == enable action", () => {
  expect(stringifyWebgazerHandlerAction(WebgazerHandlerAction.ENABLE)).toBe("enable action");
});

test("stringifyWebgazerHandlerAction(WebgazerHandlerAction.ENABLE) != invalid action", () => {
  expect(stringifyWebgazerHandlerAction(WebgazerHandlerAction.ENABLE)).not.toBe("invalid action");
});

test("stringifyWebgazerHandlerAction(WebgazerHandlerAction.INVALID_ACTION) == invalid action", () => {
  expect(stringifyWebgazerHandlerAction(WebgazerHandlerAction.INVALID_ACTION)).toBe("invalid action");
});

test("stringifyWebgazerHandlerAction(WebgazerHandlerAction.DISABLE) == disable action", () => {
  expect(stringifyWebgazerHandlerAction(WebgazerHandlerAction.DISABLE)).toBe("disable action");
});

test("stringifyWebgazerHandlerAction(WebgazerHandlerAction.PAUSE) == resume action", () => {
  expect(stringifyWebgazerHandlerAction(WebgazerHandlerAction.PAUSE)).toBe("pause action");
});

test("stringifyWebgazerHandlerAction(WebgazerHandlerAction.RESUME) == resume action", () => {
  expect(stringifyWebgazerHandlerAction(WebgazerHandlerAction.RESUME)).toBe("resume action");
});