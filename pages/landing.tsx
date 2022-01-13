import { useEffect, useState } from "react";
import Layout from "../components/Layout";
import auth from "../util/auth";

const Landing = () => {
  const [userData, setUserData] = useState<any>({});

  useEffect((): any => {
    let isSubscribed = true;
    const getUserData = async () => {
      const userData = await fetch("/api/user").then((res) => res.json());
      isSubscribed && setUserData(userData?.success && userData.user);
    };
    getUserData();
    return () => (isSubscribed = false);
  }, []);

  return (
    <Layout title="Landing page">
      <h2 className="mb-8 sm:mb-16">Hello, you are logged in</h2>
      <table>
        <tbody>
          <tr>
            <td>
              <b>ID:</b>
            </td>
            <td>{userData?.id}</td>
          </tr>
          <tr>
            <td>
              <b>Name:</b>
            </td>
            <td>{userData?.name}</td>
          </tr>
          <tr>
            <td>
              <b>Email:</b>
            </td>
            <td>{userData?.email}</td>
          </tr>
        </tbody>
      </table>
    </Layout>
  );
};

export const getServerSideProps = ({ req }: any) => {
  // Authorise user
  const claims = auth(req);

  // Redirect if unauthorised
  if (!claims)
    return {
      redirect: {
        permanent: false,
        destination: "/login",
      },
      props: {},
    };

  return {
    props: {},
  };
};

export default Landing;
