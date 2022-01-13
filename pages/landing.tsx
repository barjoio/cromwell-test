import { useEffect, useState } from "react";
import Layout from "../components/Layout";
import auth from "../util/auth";

const Landing = () => {
  const [userData, setUserData] = useState<any>({});

  useEffect(() => {
    const getUserData = async () => {
      const userData = await fetch("/api/user").then((res) => res.json());
      setUserData(userData?.success && userData.user);
    };
    getUserData();
  });

  return (
    <Layout title="User">
      <h2 className="mb-8 sm:mb-16">Hello, you are logged in</h2>
      <div>
        <div>
          <b>ID:&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</b>
          <span>{userData?.id}</span>
        </div>
        <div>
          <b>Name:&nbsp;&nbsp;&nbsp;</b>
          <span>{userData?.name}</span>
        </div>
        <div>
          <b>Email:&nbsp;&nbsp;&nbsp;&nbsp;</b>
          <span>{userData?.email}</span>
        </div>
      </div>
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
