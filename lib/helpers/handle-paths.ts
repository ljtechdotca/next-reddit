import { IParams, IPost, ISub } from "@lib/interfaces";

const defaultSubPaths: IParams[] = [
  { params: { sub: "all" } },
  { params: { sub: "create" } },
  { params: { sub: "front" } },
];

const handleReturn = (paths: IParams[]) => {
  return {
    paths: paths,
    fallback: false,
  };
};

const _subs = (subs: ISub[]) => {
  const subPaths: IParams[] = subs.map((sub) => {
    return { params: { sub: sub.uri } };
  });
  const extendPaths = subPaths.concat(defaultSubPaths);
  return handleReturn(extendPaths);
};

const _posts = (posts: IPost[]) => {
  const postPaths: IParams[] = posts.map((post) => {
    return {
      params: { sub: post.sub.uri, post: [post._id.toString(), post.uri] },
    };
  });
  return handleReturn(postPaths);
};

export const handlePaths = {
  subs: _subs,
  posts: _posts,
};
