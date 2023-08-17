import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import Link from "next/link";
import Head from "next/head";

import { useUserAuth } from "hooks/useUserAuth";
import { useAuthLogin } from "services/auth";
import { Input } from "components/Input";
import { Button } from "components/Button";

const Login = () => {
  console.log("login");
  const [{ loading }, login] = useAuthLogin();
  const [formSubmitted, setFormSubmitted] = useState(false);
  const [form, setForm] = useState({
    email: "",
    password: "",
  });

  const { validateSession, user, hasValidated } = useUserAuth();
  const router = useRouter();
  useEffect(() => {
    if (hasValidated === true && user !== null) {
      router.push("/tasks");
    }
  }, [user, hasValidated]);

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (form.email === "" || form.password === "") {
      return alert("Please fill all the fields");
    }

    try {
      const data = await login(form);

      if (data?.data?.token) {
        window.localStorage.setItem("token", data.data.token);
        await validateSession();
        router.push("/tasks");
        setFormSubmitted(true);
      } else {
        throw new Error("An error occurred");
      }
    } catch (error) {
      const message = error instanceof Error ? error.message : "An error occurred";
      alert(message);
    }
  };

  const handleChange = (field: keyof typeof form) => (event: React.ChangeEvent<HTMLInputElement>) => {
    setForm((prev) => ({ ...prev, [field]: event.target.value }));
  };

  if (!hasValidated) {
    return (
      <div className="mx-auto mt-10 max-w-lg rounded-lg bg-slate-800 p-10">
        <Head>
          <title>Checking session on login...</title>
        </Head>
        <h1>Checking session on login...</h1>
      </div>
    );
  }

  return (
    <div className="mx-auto mt-10 max-w-lg rounded-lg bg-slate-800 p-10">
      <Head>
        <title>Login</title>
      </Head>
      <form onSubmit={handleSubmit} className="space-y-2">
        <div className="text-center">
          <h1 className="mb-8 text-3xl font-semibold text-gray-700 dark:text-gray-200">Login</h1>
        </div>
        <div className="space-y-2">
          <label htmlFor="email">Email</label>
          <Input type="email" placeholder="Email" onChange={handleChange("email")} required disabled={loading} />
        </div>
        <div className="space-y-2">
          <label htmlFor="password">Password</label>
          <Input
            type="password"
            placeholder="Password"
            onChange={handleChange("password")}
            required
            disabled={loading}
          />
        </div>
        <div className="flex justify-between space-x-2 pt-10">
          <Link href="/auth/register" className="text-blue-500 underline hover:text-blue-700">
            Don{"'"}t have an account? Register
          </Link>
          <Button type="submit" disabled={loading || formSubmitted}>
            {loading || formSubmitted ? "Loading..." : "Login"}
          </Button>
        </div>
      </form>
    </div>
  );
};

export default Login;
