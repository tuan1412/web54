import React from "react";
import { Row, Col } from 'antd';
import { MainLayout } from "../../components/Layout";
import PostCard from "../../components/PostCard";
import Pagination from '../../components/Pagination'
import useAsync from '../../hooks/useAsync';
import { fetchPosts } from '../../api/post';

const PAGE_SIZE = 4;

/*
  componentDiDMount() => fetchPosts(1)
  componentDidUpdate() => check page có đổi hay ko => fetchPost(page)

  handleChangePage => this.set({ page: newPage})
  // fetchPages(newPage);
*/

export default function PostList() {
  const { isLoading, isIdle, data, run, isError } = useAsync({
    data: [],
    total: 0
  });
  const [currentPage, setCurrentPage] = React.useState(1);
  const { data:posts, total } = data

  React.useEffect(() => {
    run(fetchPosts(currentPage, PAGE_SIZE));
  }, [currentPage, run]);

  const handleChangePage = (newPage) => {
    setCurrentPage(newPage);
  }


  const renderPosts = () => {
    if (isError) return <div>Error</div>;

    if (isIdle || isLoading) return <div>Loading...</div>;

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
