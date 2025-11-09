export type Review = {
  id: string;
  user: {
    name: string;
    avatarUrl: string;
  };
  rating: number;
  comment: string;
  date: string;
};

export const reviews: Review[] = [
  {
    id: '1',
    user: {
      name: 'Max',
      avatarUrl: 'img/avatar-max.jpg',
    },
    rating: 4,
    comment: 'A quiet cozy and picturesque that hides behind a river by the unique lightness of Amsterdam. The building is green and from 18th century.',
    date: '2019-04-24',
  },
  {
    id: '2',
    user: {
      name: 'Anna',
      avatarUrl: 'img/avatar-anna.jpg',
    },
    rating: 1,
    comment: 'Boring stay! Very bad service and dirty rooms.',
    date: '2020-05-12',
  }
];
