import React from "react";
import $ from "react-test";
import Button from "./Button";

describe("Button.js", () => {
  it("has different backgrounds depending on the props", () => {
    const $button = $(<Button>Hello</Button>);
    expect($button).toHaveStyle("background", "gray");
    const $primary = $(<Button primary>Hello</Button>);
    expect($primary).toHaveStyle("background", "blue");
  });

  it("can be clicked", async () => {
    const fn = jest.fn();
    const $button = $(<Button onClick={fn}>Hello</Button>);
    expect(fn).not.toBeCalled();
    await $button.click();
    expect(fn).toBeCalled();
  });

  // FAILS
  it("cannot be clicked if it's disabled", async () => {
    const fn = jest.fn();
    const $button = $(
      <Button onClick={fn} disabled>
        Hello
      </Button>
    );
    await $button.click();
    expect(fn).not.toBeCalled(); // ERROR!
  });
});