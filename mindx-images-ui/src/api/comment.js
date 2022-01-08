import request from './request';

export const fetchComments = async (postId) => {
  const res = await request({
    url: `/posts/${postId}/comments/`,
    method: "GET",
  });

  if (res.success) {
    return res.data;
  }
  return null;
};
