// create a new subreddit
import { fetchWrapper, handleStrings } from "@lib/helpers";
import styles from "@styles/Default.module.scss";
import type { NextPage } from "next";
import { useRouter } from "next/dist/client/router";
import Head from "next/head";
import Link from "next/link";
import { FormEvent, useState } from "react";

const CreateSubPage: NextPage = () => {
  const [alert, setAlert] = useState<string | null>(null);
  const [form, setForm] = useState({
    name: "",
    body: "",
    uri: "",
  });
  const router = useRouter();

  const handleForm = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const sub = {
      ...form,
      uri: handleStrings.alphaNum(form.name),
    };
    fetchWrapper
      .post("/api/subs", sub)
      .then((data) => {
        router.push(`/r/${data.sub.uri}`);
      })
      .catch((error) => setAlert(error));
  };

  return (
    <div className={styles.container}>
      <Head>
        <title>Create New Sub</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div>
        <form onSubmit={handleForm}>
          <fieldset>
            <input
              autoComplete="off"
              id="name"
              name="name"
              onChange={(e) =>
                setForm((state) => ({
                  ...state,
                  name: e.target.value,
                  uri: handleStrings.alphaNum(e.target.value),
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
                setForm((state) => ({
                  ...state,
                  body: e.target.value,
                }))
              }
              placeholder="Description"
              required
            />
          </fieldset>
          <button>CREATE COMMUNITY</button>
        </form>
        <pre>{JSON.stringify({ form }, null, 2)}</pre>
        <pre>{JSON.stringify({ alert }, null, 2)}</pre>
        <Link href="/r/all">
          <a className={styles.button}>BACK TO r/all</a>
        </Link>
      </div>
    </div>
  );
};

export default CreateSubPage;
