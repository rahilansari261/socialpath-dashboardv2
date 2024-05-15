"use client";

import { useSession } from "next-auth/react";
import { redirect } from "next/navigation";

const RedirectClient = () => {
  const session = useSession();
  if (session) {
    redirect("/dashboard");
  } else {
    redirect("/signin");
  }
};

export default RedirectClient;
