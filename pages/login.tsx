import { useRouter } from "next/router";
import { useState } from "react";
import { useDispatch } from "react-redux";
import Layout from "../components/Layout";
import { activateToast } from "../features/toast/Toast";
import { toastVariant } from "../features/toast/toastSlice";

const Login = () => {
  const dispatch = useDispatch();
  const router = useRouter();

  // Form state
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");

  // Form submit
  const handleSubmit = async (e: any) => {
    e.preventDefault();

    // Submit form data to API
    const res = await fetch("/api/user/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email, password }),
    }).then((res) => res.json());

    // Handle error
    if (res.error) {
      activateToast(dispatch, res.error, toastVariant.error);
      return;
    }

    localStorage.setItem("logged", "true"); // Only used for arbitrary checking
    router.push("/landing"); // Re-route to landing page
    setTimeout(() => {
      activateToast(dispatch, "Login successful", toastVariant.success);
    }, 10);
  };

  return (
    <Layout title="Login">
      <h1 className="mb-8">Login</h1>

      <form onSubmit={handleSubmit}>
        <label htmlFor="email">Email</label>
        <input
          required
          type="email"
          name="email"
          id="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="john@example.com"
        />
        <label htmlFor="password">Password</label>
        <input
          required
          type="password"
          name="password"
          id="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="••••••••••••"
        />
        <div>
          <button type="submit">Submit</button>
        </div>
      </form>
    </Layout>
  );
};

export default Login;
