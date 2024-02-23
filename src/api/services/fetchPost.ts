import { createAsyncThunk } from '@reduxjs/toolkit';
import { Post } from '../../types/post';
import { Category } from '../../types/category';

const URL = 'https://blog-e6tl.onrender.com';

export const fetchPosts = createAsyncThunk('fetchPost', async () => {
  const data = await fetch(`${URL}/posts`);
  return (await data.json()) as Post[];
});

export const fetchCategories = createAsyncThunk('fetchCategory', async () => {
  const data = await fetch(`${URL}/categories`);
  return (await data.json()) as Category[];
});

export const fetchPostsByCategory = createAsyncThunk('fetchPostsByCategory', async (categoryTitle: string) => {
  const data = await fetch(`${URL}/category/${categoryTitle}`);
  return (await data.json()) as Post[];
});
