import request from "./request";

export const fetchDetailPost = async (postId) => {
  const res = await request({
    url: `/posts/${postId}`,
    method: "GET",
  });

  if (res.success) {
    return res.data;
  }
  return null;
};

export const fetchPosts = async (page, pageSize) => {
  const skip = (page - 1) * pageSize;
  const limit = pageSize;

  const res = await request({
    method: "GET",
    url: "/posts",
    params: {
      skip,
      limit,
    },
  });
  if (res && res.success) {
    const { total, data } = res.data;
    return { total, data };
  }
  return { total: 0, data: [] };
};
