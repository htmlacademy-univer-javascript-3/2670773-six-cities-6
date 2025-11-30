import {createAsyncThunk} from '@reduxjs/toolkit';
import type {AxiosInstance} from 'axios';
import type {Offer} from '../types/Offer';
import {Review} from "../types/Review.ts";

type Comment = {
  offerId: string;
  comment: string;
  rating: number;
};

export const fetchOffers = createAsyncThunk<Offer[], undefined, { extra: AxiosInstance }>(
  'offers/fetchOffers',
  async (_arg, {extra: api, rejectWithValue}) => {
    try {
      const {data} = await api.get<Offer[]>('/offers');
      return data;
    } catch (error) {
      return rejectWithValue(`Failed to fetch offers: ${error}`);
    }
  }
);

export const fetchOffer = createAsyncThunk<Offer, string, { extra: AxiosInstance }>(
  'offers/fetchOffer',
  async (id, { extra: api, rejectWithValue }) => {
    try {
      const { data } = await api.get<Offer>(`/offers/${id}`)
      return data;
    } catch (err) {
      return rejectWithValue(`Failed to fetch offer: ${err}`);
    }
  }
);

export const fetchNearbyOffers = createAsyncThunk<Offer[], string, { extra: AxiosInstance }>(
  'offers/fetchNearbyOffers',
  async (id, { extra: api, rejectWithValue }) => {
    try {
      const { data } = await api.get<Offer[]>(`/offers/${id}/nearby`);
      return data;
    } catch (err){
      return rejectWithValue(`Failed to fetch nearby offers: ${err}`);
    }
  }
);

export const fetchReviews = createAsyncThunk<Review[], string, { extra: AxiosInstance }> (
  'offers/fetchReviews',
  async (id, { extra: api, rejectWithValue }) => {
    try {
      const { data } = await api.get<Review[]>(`/comments/${id}`);
      return data;
    } catch (err) {
      return rejectWithValue(`Failed to fetch reviews: ${err}`);
    }
  }
);

export const postComment = createAsyncThunk<void, Comment, { extra: AxiosInstance }>(
  'offers/postComment',
  async ({ offerId, comment, rating }, { extra: api, dispatch, rejectWithValue }) => {
    try {
      await api.post(`/comments/${offerId}`, { comment, rating });
      dispatch(fetchReviews(offerId));
    } catch (error: any) {
      return rejectWithValue(`Failed to post comment: ${error}`);
    }
  }
);
