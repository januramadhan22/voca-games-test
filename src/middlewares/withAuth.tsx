"use-client";

import { useSession } from "next-auth/react";
import { useRouter } from "next/router";
import React, { useEffect } from "react";
import Cookies from "js-cookie";

const withAuth = (WrappedComponent: any) => {
  const Wrapper = (props: any) => {
    const router = useRouter();
    const { status } = useSession();
    const userCookies = Cookies.get("user");

    useEffect(() => {
      if (status === "authenticated") {
        router.push("/profile"); // Redirect authenticated users away from login and register pages
      } else if (status === "unauthenticated") {
        router.push("/auth/register"); // Redirect unauthenticated users to login page
      }
    }, [userCookies, status, router]);

    if (!userCookies || status === "loading") {
      return <div>Loading...</div>;
    }

    return <WrappedComponent {...props} />;
  };

  return Wrapper;
};

export default withAuth;
