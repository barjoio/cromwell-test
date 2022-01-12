import Layout from "../components/Layout";

const Login = () => {
  return (
    <Layout title="Login">
      <h1>Login</h1>

      <form>
        <label htmlFor="email">Email</label>
        <input required type="email" name="email" id="email" placeholder="john@example.com" />
        <label htmlFor="email">Password</label>
        <input required type="password" name="password" id="password" placeholder="••••••••••••" />
        <div>
          <button type="submit">Submit</button>
        </div>
      </form>
    </Layout>
  );
};

export default Login;
