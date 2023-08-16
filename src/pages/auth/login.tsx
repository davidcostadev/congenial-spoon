import { useState } from "react";
import { useRouter } from "next/router";

import { useAuthLogin } from "services/auth";
import { Input } from "components/Input";
import { Button } from "components/Button";

const Login = () => {
  const [{ loading }, login] = useAuthLogin();
  const [formSubmitted, setFormSubmitted] = useState(false);
  const [form, setForm] = useState({
    email: "",
    password: "",
  });
  const router = useRouter();

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (form.email === "" || form.password === "") {
      return alert("Please fill all the fields");
    }

    try {
      const data = await login(form);

      if (data?.data?.id) {
        window.localStorage.setItem("token", data.data.id);
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

  return (
    <div className="mx-auto mt-10 max-w-lg rounded-lg bg-slate-800 p-10">
      <form onSubmit={handleSubmit} className="space-y-2">
        <div>
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
        <div className="flex justify-center pt-10">
          <Button type="submit" disabled={loading || formSubmitted}>
            {loading || formSubmitted ? "Loading..." : "Register"}
          </Button>
        </div>
      </form>
    </div>
  );
};

export default Login;
