import React from "react";
import { Row, Col, Form, Input, Button } from "antd";
import { useParams } from "react-router-dom";
import request from "../../api/request";
import PostCard from "../../components/PostCard";
import useAuth from "../../hooks/useAuth";
import { MainLayout } from "../../components/Layout";
import socketClient from '../../socket';

export default function PostDetail() {
  const { postId } = useParams();
  const [postInfo, setPostInfo] = React.useState({ status: "idle" });
  const [form] = Form.useForm();

  const [listCommentInfo, setListCommentInfo] = React.useState({
    status: "idle",
  });
  const user = useAuth();

  const fetchDetailPost = async (postId) => {
    try {
      setPostInfo({ status: "loading" });

      const res = await request({
        url: `/posts/${postId}`,
        method: "GET",
      });

      if (res.success) {
        setPostInfo({
          status: "done",
          post: res.data,
        });
        return;
      }
      setPostInfo({ status: "error" });
    } catch (err) {
      setPostInfo({ status: "error" });
    }
  };

  const fetchComments = async (postId) => {
    try {
      setListCommentInfo({ status: "loading" });

      const res = await request({
        url: `/posts/${postId}/comments/`,
        method: "GET",
      });

      if (res.success) {
        setListCommentInfo({
          status: "done",
          comments: res.data,
        });
        return;
      }
      setListCommentInfo({ status: "error" });
    } catch (err) {
      setListCommentInfo({ status: "error" });
    }
  };

  React.useEffect(() => {
    fetchDetailPost(postId);
  }, [postId]);

  React.useEffect(() => {
    fetchComments(postId);
  }, [postId]);

  React.useEffect(() => {
    socketClient.emit('join-post', postId);
  }, [postId]);

  React.useEffect(() => {
    socketClient.on('new-comment', newComment => {
      setListCommentInfo(preCommentInfo => {
        const { status, comments } = preCommentInfo;
        const newComments = [...comments, newComment];
        return {
          status,
          comments: newComments
        }
      })
    });
  }, [postId]);

  return (
    <MainLayout>
      <Row>
        <Col span={12}>
          {postInfo.status === "done" && (
            <PostCard
              postId={postInfo.post._id}
              title={postInfo.post.title}
              imageUrl={postInfo.post.imageUrl}
              description={postInfo.post.description}
              createdBy={postInfo.post.createdBy.username}
            />
          )}
        </Col>
        <Col span={12}>
          {listCommentInfo.status === "done" && (
            <div
              style={{
                background: "#fff",
                height: "100%",
                padding: 10,
                display: "flex",
                flexDirection: "column",
              }}
            >
              <div style={{ flexGrow: 1 }}>
                {listCommentInfo.comments.map((comment) => (
                  <div key={comment._id}>
                    {comment.createdBy.username}: {comment.content}
                  </div>
                ))}
              </div>
              <div>
                {user && (
                  <Form
                    form={form}
                    onFinish={async (values) => {
                      console.log("hi");
                      const { comment } = values;
                      const res = await request({
                        url: "/comments",
                        method: "POST",
                        data: {
                          postId,
                          content: comment,
                        },
                      });
                      if (res.success) {
                        // setListCommentInfo(preCommentInfo => {
                        //   const { status, comments } = preCommentInfo;
                        //   const newComments = [...comments, res.data];
                        //   return {
                        //     status,
                        //     comments: newComments
                        //   }
                        // })
                      } 
                      form.resetFields();

                    }}
                    rules={[
                      {
                        required: true,
                        message: "Please input your username!",
                      },
                    ]}
                  >
                    <Form.Item name="comment">
                      <Input />
                    </Form.Item>
                    <Form.Item>
                      <Button type="primary" htmlType="submit">
                        Submit
                      </Button>
                    </Form.Item>
                  </Form>
                )}
              </div>
            </div>
          )}
        </Col>
      </Row>
    </MainLayout>
  );
}

// Ví dụ chức năng: 
// follow Nhân vật B
/// B đăng bài mới, các bạn nhận được thông báo

// API create post B
// Server tìm tất cả các người follow B
// tập userIds: [1, 2, 3]
// Server push (emit) notifcation ('B tạo bài post mới') vào các room 
// room: notification-user-1
// room: notifcation-user-2
// room: notifcation-user-3

// Client 1
// Đăng nhập xong
// emit Server để join room: notifcation-1

// Client 1
// Đăng nhập ở tab khác
// emit Server để join room: notifcation-1


// API create post B id xyz
// Server tìm tất cả các người follow B
// Server push vào room 'noti-post-xyz

// Client 1
// Đăng nhập xong
// Emit server join room follow
// on room follow => Server query DB => Client 1 follow ai [A, B, xyz]
// join room noti-post-A
// join room noti-post-B
// join room noti-post-C

// Client 1
// Đăng nhập xong
// API để lấy danh sách người follow
// Emit server join room follow noti-post-A, noti-post-B, noti-post-C



