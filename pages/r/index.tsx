// index page redirects to r/all
import type { GetServerSideProps, NextPage } from "next";

export const getServerSideProps: GetServerSideProps = async () => {
  return {
    redirect: { destination: "/r/all/", permanent: false },
  };
};

const HomePage: NextPage = () => {
  return <></>;
};

export default HomePage;
