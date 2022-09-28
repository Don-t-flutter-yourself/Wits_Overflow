import React from "react";
import { waitFor } from "@testing-library/react";

import { render } from "./utils/testing";

import Profile from "./components/profile";

test("Render Profile page", async () => {
  const { getByText, findByText } = render(<Profile />, { route: "/profile" });
  await findByText(/Leanne Graham/i);
});
