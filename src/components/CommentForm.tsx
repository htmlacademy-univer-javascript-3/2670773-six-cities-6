import React, {useState} from 'react';
import type {ChangeEvent, FormEvent} from 'react';
import {useDispatch} from "react-redux";
import {AppDispatch} from "../store";
import {postComment} from "../store/offerThunks.ts";

type CommentFormProps = {
  offerId: string;
};

export const CommentForm: React.FC<CommentFormProps> = ({ offerId }) => {
  const dispatch = useDispatch<AppDispatch>();
  const [comment, setComment] = useState('');
  const [rating, setRating] = useState(0);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleCommentChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
    setComment(e.target.value);
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    await dispatch(postComment({ offerId, comment, rating }));
    setComment('');
    setRating(0);
    setIsSubmitting(false);
  }

  const convertRatingToMessage = (star: number) => {
    if (star === 5) {
      return 'perfect';
    }

    if (star === 4) {
      return 'good';
    }

    if (star === 3) {
      return 'not bad';
    }

    if (star === 2) {
      return 'badly';
    }

    return 'terribly';
  };

  return (
    <form className="reviews__form form" onSubmit={handleSubmit}>
      <label className="reviews__label form__label" htmlFor="review">Your review</label>
      <div className="reviews__rating-form form__rating">
        {[5, 4, 3, 2, 1].map((star) => (
          <React.Fragment key={star}>
            <input
              className="form__rating-input visually-hidden"
              name="rating"
              value={star}
              id={`${star}-stars`}
              type="radio"
              checked={rating === star}
              onChange={() => setRating(star)}
              disabled={isSubmitting}
            />
            <label
              htmlFor={`${star}-stars`}
              className="reviews__rating-label form__rating-label"
              title={convertRatingToMessage(star)}
            >
              <svg className="form__star-image" width="37" height="33">
                <use xlinkHref="#icon-star"></use>
              </svg>
            </label>
          </React.Fragment>
        ))}
      </div>
      <textarea
        className="reviews__textarea form__textarea"
        id="review"
        name="review"
        placeholder="Tell how was your stay, what you like and what can be improved"
        value={comment}
        onChange={handleCommentChange}
        maxLength={300}
        required
      />
      <div className="reviews__button-wrapper">
        <p className="reviews__help">
          To submit review please make sure to set <span className="reviews__star">rating</span> and describe your stay
          with at least <b className="reviews__text-amount">50 characters</b>.
        </p>

        <button
          className="reviews__submit form__submit button"
          type="submit"
          disabled={isSubmitting || rating === 0 || comment.length < 50}
        >
          Submit
        </button>
      </div>
    </form>
  );
};
