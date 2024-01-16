"use client";

import { signOut } from "next-auth/react";

export default function SignOut() {
  return (
    <div>
      <button
        onClick={() =>
          signOut({
            callbackUrl: "/", //This make the redirects work do de home page.
          })
        }
      >
        Logout
      </button>
    </div>
  );
}
