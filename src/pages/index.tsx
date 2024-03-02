import { useRouter } from "next/router";
import { useEffect } from "react";
import Cookies from "js-cookie";
import { useSession } from "next-auth/react";

export default function Home() {
  const router = useRouter();
  const { status } = useSession();
  const userCookies = Cookies.get("user");

  useEffect(() => {
    if (userCookies && status === "authenticated") {
      router.push("/profile");
    } else if (!userCookies && status === "unauthenticated") {
      router.push("/auth/register");
    }
  }, [userCookies, status, router]);

  return <main />;
}
