// create a new post on the current subreddit
import { fetchWrapper, handlePaths, handleStrings } from "@lib/helpers";
import { IPath, ISub } from "@lib/interfaces";
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
  // todo : if sub comes through bad, this will throw an error
  const [form, setForm] = useState({
    name: "",
    body: "",
    sub: { _id: sub._id, uri: sub.uri },
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
    <div className={styles.container}>
      <Head>
        <title>Post on r/{sub.uri}</title>
        <meta name="description" content={sub.body} />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div>
        <Link href={`/r/${sub.uri}`}>
          <a>VIEW r/{sub.uri}</a>
        </Link>

        <form onSubmit={handleForm}>
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
              placeholder="Description"
              required
            />
          </fieldset>
          <button>CREATE POST</button>
        </form>
        <pre>{JSON.stringify({ form }, null, 2)}</pre>
        <pre>{JSON.stringify({ alert }, null, 2)}</pre>
      </div>
    </div>
  );
};

export default CreatePostPage;
