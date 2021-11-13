// create a new post on the current subreddit
import { fetchWrapper, handlePaths, handleStrings } from "@lib/helpers";
import { IPath, ISub } from "@lib/interfaces";
import AlertTriangle from "@public/icons/alert-triangle.svg";
import styles from "@styles/Default.module.scss";
import type { GetStaticPaths, GetStaticProps, NextPage } from "next";
import getConfig from "next/config";
import { useRouter } from "next/dist/client/router";
import Head from "next/head";
import Link from "next/link";
import { FormEvent, useState } from "react";

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
  const currentSub: ISub[] = await fetchWrapper
    .get(`${baseUrl}/subs/${sub}`)
    .catch((error) => console.error(error));
  const props = { ...currentSub };
  return { props: { ...props } };
};

interface ICreatePostPage {
  sub: ISub;
}

const CreatePostPage: NextPage<ICreatePostPage> = ({ sub }) => {
  const [alert, setAlert] = useState<string | null>(null);
  const [form, setForm] = useState({
    name: "",
    body: "",
    sub: { _id: sub._id, uri: sub.uri },
    value: 0,
  });

  const router = useRouter();

  const handleForm = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const post = {
      ...form,
      uri: handleStrings.snake(form.name),
    };
    fetchWrapper
      .post("/api/posts", post)
      .then(async (data) => {
        await fetchWrapper
          .put("/api/subs", {
            subId: sub._id,
            postId: data.post._id,
          })
          .then(() =>
            router.push(
              `/r/${sub.uri}/comments/${data.post._id}/${data.post.uri}`
            )
          );
      })
      .catch((error) => setAlert(error));
  };

  return (
    <div className={styles.root}>
      <Head>
        <title>Post on r/{sub.uri}</title>
        <meta name="description" content={sub.body} />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div className={styles.container}>
        <form className={styles.form} onSubmit={handleForm}>
          <div className={styles.heading}>
            <h1>Create a Post</h1>
            <div>
              <Link href={`/r/${sub.uri}`}>
                <a className={styles.link}>BACK TO r/{sub.uri}</a>
              </Link>
            </div>
          </div>
          <fieldset>
            <input
              autoComplete="off"
              id="name"
              maxLength={256}
              name="name"
              onChange={(e) =>
                setForm((state) => ({
                  ...state,
                  name: e.target.value,
                  uri: handleStrings.snake(e.target.value),
                }))
              }
              placeholder="Name"
              required
              type="text"
            />
          </fieldset>
          <fieldset>
            <textarea
              autoComplete="off"
              id="body"
              name="body"
              onChange={(e) =>
                setForm((state) => ({ ...state, body: e.target.value }))
              }
              placeholder="Body"
              required
            />
          </fieldset>
          {alert && (
            <div className={styles.alert}>
              <span className={styles.icon}>
                <AlertTriangle width={16} height={16} />
              </span>
              {alert}
            </div>
          )}
          <button className={styles.button}>CREATE POST</button>
        </form>
      </div>
    </div>
  );
};

export default CreatePostPage;
