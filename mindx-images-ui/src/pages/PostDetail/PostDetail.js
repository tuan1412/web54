import React from 'react';
import { Row, Col, Form, Input, Button } from 'antd';
import { useParams } from 'react-router-dom';
import request from '../../api/request';
import PostCard from '../../components/PostCard';
import useAuth from '../../hooks/useAuth';
import { MainLayout } from '../../components/Layout';
import {
  useListen,
  useSocket,
} from '../../components/SocketProvider/SocketProvider';
import useAsync from '../../hooks/useAsync';
import { fetchComments } from '../../api/comment';
import { fetchDetailPost } from '../../api/post';

export default function PostDetail() {
  const { postId } = useParams();
  const [form] = Form.useForm();
  const { isConnected, socketRef } = useSocket();
  const {
    data: commentInfo,
    run: runComments,
    isDone: isDoneComments,
    setData: setCommentInfo,
  } = useAsync();
  const { data: postInfo, run: runPost, isDone: isDonePost } = useAsync();

  const user = useAuth();

  React.useEffect(() => {
    runPost(fetchDetailPost(postId));
  }, [postId, runPost]);

  React.useEffect(() => {
    runComments(fetchComments(postId));
  }, [postId, runComments]);

  React.useEffect(() => {
    if (isConnected) {
      socketRef.emit('join-post', postId);
    }
  }, [postId, isConnected, socketRef]);

  const addComment = React.useCallback(
    (newComment) => {
      setCommentInfo((preComments) => {
        const newComments = [...preComments, newComment];
        return newComments;
      });
    },
    [setCommentInfo]
  );

  useListen('new-comment', addComment);

  return (
    <MainLayout>
      <Row>
        <Col span={12}>
          {isDonePost && (
            <PostCard
              postId={postInfo._id}
              title={postInfo.title}
              imageUrl={postInfo.imageUrl}
              description={postInfo.description}
              createdBy={postInfo.createdBy.username}
            />
          )}
        </Col>
        <Col span={12}>
          {isDoneComments && (
            <div
              style={{
                background: '#fff',
                height: '100%',
                padding: 10,
                display: 'flex',
                flexDirection: 'column',
              }}
            >
              <div style={{ flexGrow: 1 }}>
                {commentInfo.map((comment) => (
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
                      console.log('hi');
                      const { comment } = values;
                      const res = await request({
                        url: '/comments',
                        method: 'POST',
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
                        message: 'Please input your username!',
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

// V?? d??? ch???c n??ng:
// follow Nh??n v???t B
/// B ????ng b??i m???i, c??c b???n nh???n ???????c th??ng b??o

// API create post B
// Server t??m t???t c??? c??c ng?????i follow B
// t???p userIds: [1, 2, 3]
// Server push (emit) notifcation ('B t???o b??i post m???i') v??o c??c room
// room: notification-user-1
// room: notifcation-user-2
// room: notifcation-user-3

// Client 1
// ????ng nh???p xong
// emit Server ????? join room: notifcation-1

// Client 1
// ????ng nh???p ??? tab kh??c
// emit Server ????? join room: notifcation-1

// API create post B id xyz
// Server t??m t???t c??? c??c ng?????i follow B
// Server push v??o room 'noti-post-xyz

// Client 1
// ????ng nh???p xong
// Emit server join room follow
// on room follow => Server query DB => Client 1 follow ai [A, B, xyz]
// join room noti-post-A
// join room noti-post-B
// join room noti-post-C

// Client 1
// ????ng nh???p xong
// API ????? l???y danh s??ch ng?????i follow
// Emit server join room follow noti-post-A, noti-post-B, noti-post-C
