// top comments on current post and post body
import { Comments } from "@components";
import { fetchWrapper, handlePaths } from "@lib/helpers";
import { IPath, IPost } from "@lib/interfaces";
import styles from "@styles/Default.module.scss";
import type { GetStaticPaths, GetStaticProps, NextPage } from "next";
import getConfig from "next/config";
import Head from "next/head";

const { publicRuntimeConfig } = getConfig();
const baseUrl = `${publicRuntimeConfig.apiUrl}`;

export const getStaticPaths: GetStaticPaths = async () => {
  const { posts } = await fetchWrapper
    .get(`${baseUrl}/posts`)
    .catch((error) => console.error(error));
  return handlePaths.posts(posts);
};

export const getStaticProps: GetStaticProps = async (context) => {
  const { post } = context.params as IPath;
  const currentPost: IPost = await fetchWrapper
    .get(`${baseUrl}/posts/${post}`)
    .catch((error) => console.error(error));
  const props = { ...currentPost };
  return { props: { ...props } };
};

interface ICommentsPage {
  post: IPost;
}

const CommentsPage: NextPage<ICommentsPage> = ({ post }) => {
  function handleVote(value: number) {}

  return (
    <div className={styles.root}>
      <Head>
        <title>{post.name}</title>
        <meta name="description" content={post.body} />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div className={styles.container}>
        <Comments post={post} />
      </div>
    </div>
  );
};

export default CommentsPage;
