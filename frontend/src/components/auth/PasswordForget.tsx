import React from "react";
import { EmailModal } from "../EmailModal";

export function PasswordForget() {
  return (
    <div className="flex justify-center">
      <EmailModal
        buttonText={"Forgot your password"}
        title={"Forgot your password"}
        message={
          "If you have forgotten your password, fill in your email address to receive a new password by email."
        }
        confirmButton={"Send"}
      />
    </div>
  );
}
