import React from "react";
import { Html, Button } from "@react-email/components";

const Email = () => (
  <Html>
    <p>Test mot de passe oublié</p>
    <Button
      href="https://example.com"
      style={{ background: "#000", color: "#fff", padding: "12px 20px" }}
    >
      Click me
    </Button>
  </Html>
);

export default Email;
