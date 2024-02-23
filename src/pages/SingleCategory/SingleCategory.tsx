import './categoryHeader.scss';
import './singleCategory.scss';
import { useEffect, useState } from 'react';
// import { useAppDispatch } from '../../app/redux/hooks/hooks';
// import { fetchPosts } from '../../api/services/fetchPost';
import { useParams, useSearchParams } from 'react-router-dom';
import { fetchPostsByCategory } from '../../api/services/fetchPost';
import {
  useAppDispatch,
  usePostsByCategory,
} from '../../app/redux/hooks/hooks';
import { HomePost } from '../../components/HomePost/HomePost';
import { SearchPosts } from '../../components/Search/SearchPosts/SearchPosts';
import { getSearchPosts } from '../../utils/Search/getSearchPosts';

const SingleCategory: React.FC = () => {
  const { categoryTitle } = useParams();
  const [sortBy, setSortBy] = useState<
    'title-az' | 'title-za' | 'date-newest' | 'date-oldest'
  >('title-az');
  const [searchParams] = useSearchParams();
  const data = usePostsByCategory((state) => state.postByCategory);
  const dispatch = useAppDispatch();

  const handleSortChange = (
    option: 'title-az' | 'title-za' | 'date-newest' | 'date-oldest'
  ) => {
    setSortBy(option);
  };

  useEffect(() => {
    const dataLoading = async (title: string) => {
      const posts = await fetchPostsByCategory(title);
      dispatch(posts);
    };

    dataLoading(categoryTitle || '');
  }, [searchParams.get('query')]);

  const showPosts = getSearchPosts(data.posts, searchParams.get('query'));

  return (
    <>
      <div className="slide">
        <div className="container">
          <div className="slide__overlay">
            <div className="slide__overlay__title">
              {categoryTitle &&
                categoryTitle.charAt(0).toUpperCase() + categoryTitle.slice(1)}
            </div>
            <div className="slide__overlay__text">
              opis kategorii w zależności od potrzeb
            </div>
          </div>
        </div>
      </div>
      <div className="container">
        <div className="title">
          <h1>
            {categoryTitle &&
              categoryTitle.charAt(0).toUpperCase() + categoryTitle.slice(1)}
          </h1>
          <SearchPosts />
          <div className="sort-dropdown">
            <div className="dropdown-button">
              <span>
                Sort by {sortBy.includes('title') ? 'Title' : 'Date'}
                {sortBy.includes('title') && (
                  <> ({sortBy.includes('az') ? 'A to Z' : 'Z to A'}) </>
                )}
                {sortBy.includes('date') && (
                  <>
                    {' '}
                    (
                    {sortBy.includes('newest')
                      ? 'Newest to Oldest'
                      : 'Oldest to Newest'}
                    ){' '}
                  </>
                )}
              </span>
              <div className="dropdown-content">
                <button onClick={() => handleSortChange('title-az')}>
                  Sort by Title (A to Z)
                </button>
                <button onClick={() => handleSortChange('title-za')}>
                  Sort by Title (Z to A)
                </button>
                <button onClick={() => handleSortChange('date-newest')}>
                  Sort by Date (Newest to Oldest)
                </button>
                <button onClick={() => handleSortChange('date-oldest')}>
                  Sort by Date (Oldest to Newest)
                </button>
              </div>
            </div>
          </div>
        </div>
        <div className="post-grid"></div>
      </div>
      <div className="container post-grid">
        {showPosts.map((post) => (
          <HomePost key={post.id} post={post} />
        ))}
      </div>
    </>
  );
};

export default SingleCategory;
