/* eslint-disable testing-library/prefer-screen-queries */
import React from "react";

import { render } from "../../utils/testing";
import NotFound from "./index";


//404 page not found test
test("renders NotFound page", () => {
  const { getByRole } = render(<NotFound />, { route: "/test" });
  expect(getByRole("heading")).toHaveTextContent(/not found/i);
});
