import React from 'react';
import ReviewItem from '../ReviewItem';
import {Review} from '../../types/review.ts';

type ReviewListProps = {
  reviews: Review[];
};

const ReviewList: React.FC<ReviewListProps> = React.memo(({reviews}) => (
  <section className="offer__reviews reviews">
    <h2 className="reviews__title">
      Reviews &middot; <span className="reviews__amount">{reviews.length}</span>
    </h2>
    <ul className="reviews__list">
      {reviews.map((review) => (
        <ReviewItem key={review.id} review={review}/>
      ))}
    </ul>
  </section>
));

export default ReviewList;
