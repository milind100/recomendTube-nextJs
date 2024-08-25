"use client";

import { signIn } from "next-auth/react";

const SignINButton = () => {
  return (
    <div>
      {" "}
      <button
        type="button"
        className="bg-sky-400 rounded-md px-4 py-2"
        onClick={() => signIn()}
      >
        sign in
      </button>
    </div>
  );
};

export default SignINButton;
