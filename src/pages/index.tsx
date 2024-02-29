import { useRouter } from "next/router";
import RegisterPage from "./auth/register";
import { useEffect } from "react";

export default function Home() {
  const router = useRouter();

  useEffect(() => {
    const isAuthenticated = false;

    if (!isAuthenticated) {
      router.push("/auth/register");
    }
  }, []);

  return (
    <main>
      <RegisterPage />
    </main>
  );
}
