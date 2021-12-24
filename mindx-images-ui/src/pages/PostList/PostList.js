import React from "react";
import { Row, Col } from 'antd';
import { MainLayout } from "../../components/Layout";
import PostCard from "../../components/PostCard";
import request from "../../api/request";
import Pagination from '../../components/Pagination'

const PAGE_SIZE = 4;

/*
  componentDiDMount() => fetchPosts(1)
  componentDidUpdate() => check page có đổi hay ko => fetchPost(page)

  handleChangePage => this.set({ page: newPage})
  // fetchPages(newPage);
*/

export default function PostList() {
  const [status, setStatus] = React.useState("idle");
  const [posts, setPosts] = React.useState([]);
  const [currentPage, setCurrentPage] = React.useState(1);
  const [total, setTotal] = React.useState(0);

  const fetchPosts = async (page) => {
  
    const skip = (page - 1) * PAGE_SIZE;
    const limit = PAGE_SIZE;

    try {
      setStatus("loading");
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

        setStatus("done");
        setTotal(total)
        setPosts(data);
        return;
      }
      setStatus("error");
    } catch (err) {
      setStatus("error");
    }
  };

  React.useEffect(() => {
    fetchPosts(currentPage);
  }, [currentPage]);

  const handleChangePage = (newPage) => {
    setCurrentPage(newPage);
  }


  const renderPosts = () => {
    if (status === "error") return <div>Error</div>;

    if (status === "idle" || status === "loading") return <div>Loading...</div>;

    return (
      <Row gutter={[16, 16]}>
        {posts.map((post) => (
          <Col xs={{ span: 24 }} md={{ span: 6 }} key={post._id}>
            <PostCard
              postId={post._id}
              title={post.title}
              imageUrl={post.imageUrl}
              description={post.description}
              createdBy={post.createdBy.username}
            />
          </Col>
        ))}
      </Row>
    );
  };

  return (
    <MainLayout>
      <div>{renderPosts()}</div>
      <div className="mt-4">
        <Pagination 
          currentPage={currentPage} 
          total={total}
          handleChangePage={handleChangePage}
        />
      </div>
    </MainLayout>
  );
}
