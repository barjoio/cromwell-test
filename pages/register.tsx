import { useRouter } from "next/router";
import { useState } from "react";
import { useDispatch } from "react-redux";
import Layout from "../components/Layout";
import { activateToast } from "../features/toast/Toast";
import { toastDuration, toastVariant } from "../features/toast/toastSlice";

const Register = () => {
  const router = useRouter();
  const dispatch = useDispatch();

  // Form state
  const [name, setName] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [confirmPassword, setConfirmPassword] = useState<string>("");

  // Form submit
  const handleSubmit = async (e: any) => {
    e.preventDefault();

    // Submit form data to API
    const res = await fetch("/api/user/register", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ name, email, password, confirmPassword }),
    }).then((res) => res.json());

    // Handle error
    if (res.error) {
      activateToast(dispatch, res.error, toastVariant.error);
      return;
    }

    // Re-route to login page
    activateToast(dispatch, "Registration successful", toastVariant.success);
    setTimeout(() => {
      router.push("/login");
    }, toastDuration / 2);
  };

  return (
    <Layout title="Register">
      <h1 className="mb-8">Register</h1>

      <form onSubmit={handleSubmit}>
        <label htmlFor="name">Name</label>
        <input
          required
          type="text"
          name="name"
          id="name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="John Smith"
        />
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
        <label htmlFor="password">
          Password&nbsp;
          <span className="text-xs opacity-75">(minimum 8 characters)</span>
        </label>
        <input
          required
          type="password"
          name="password"
          id="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="••••••••••••"
          minLength={8}
        />
        <label htmlFor="confirmPassword">Confirm Password</label>
        <input
          required
          type="password"
          name="confirmPassword"
          id="confirmPassword"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
          placeholder="••••••••••••"
          minLength={8}
        />
        <div>
          <button type="submit">Submit</button>
        </div>
      </form>
    </Layout>
  );
};

export default Register;
