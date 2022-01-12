import Layout from "../components/Layout";

const Register = () => (
  <Layout title="Register">
    <h1>Register</h1>

    <form>
      <label htmlFor="name">Name</label>
      <input
        required
        type="text"
        name="name"
        id="name"
        placeholder="John Smith"
      />
      <label htmlFor="email">Email</label>
      <input
        required
        type="email"
        name="email"
        id="email"
        placeholder="john@example.com"
      />
      <label htmlFor="email">Password <span className="text-xs opacity-75">(minimum 8 characters)</span></label>
      <input
        required
        type="password"
        name="password"
        id="password"
        placeholder="••••••••••••"
        minLength={8}
      />
      <label htmlFor="email">Confirm Password</label>
      <input
        required
        type="password"
        name="password"
        id="password"
        placeholder="••••••••••••"
        minLength={8}
      />
      <div>
        <button type="submit">Submit</button>
      </div>
    </form>
  </Layout>
);

export default Register;
