// top posts from current sub
import { Layout } from "@components";
import { fetchWrapper, handlePaths } from "@lib/helpers";
import { IPath, ISub } from "@lib/interfaces";
import styles from "@styles/Default.module.scss";
import type { GetStaticPaths, GetStaticProps, NextPage } from "next";
import getConfig from "next/config";
import Head from "next/head";
import Link from "next/link";

const { publicRuntimeConfig } = getConfig();
const baseUrl = `${publicRuntimeConfig.apiUrl}`;

export const getStaticPaths: GetStaticPaths = async () => {
  const { subs } = await fetchWrapper
    .get(`${baseUrl}/subs`)
    .catch((error) => console.error(error));
  return handlePaths.subs(subs);
};

export const getStaticProps: GetStaticProps = async (context) => {
  const { sub } = context.params as IPath;
  const currentSub: ISub = await fetchWrapper
    .get(`${baseUrl}/subs/${sub}`)
    .catch((error) => console.error(error));
  const props = { ...currentSub };
  return { props: { ...props } };
};

interface ISubPage {
  sub: ISub;
}

const SubPage: NextPage<ISubPage> = ({ sub }) => {
  return (
    <div className={styles.container}>
      <Head>
        <title>r/{sub.uri}</title>
        <meta name="description" content={sub.body} />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div>
        <Link href={`/r/${sub.uri}/create`}>
          <a className={styles.button}>CREATE POST on r/{sub.uri}</a>
        </Link>
        <Layout sub={sub} posts={sub.posts} />
      </div>
    </div>
  );
};

export default SubPage;
