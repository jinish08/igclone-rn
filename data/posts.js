import { USERS } from "./users";

export const POSTS = [
  {
    imageUrl: "https://picsum.photos/400",
    user: USERS[0].user,
    likes: 7870,
    caption: "Train Ride to Hogwarts ...",
    profile_picture: USERS[0].image,
    comments: [
      {
        user: "tempuser",
        comment: "Wow! This build looks fire. Super excited about it",
      },
      {
        user: "tempuser",
        comment: "Wow! This build looks fire. Super excited about it",
      },
    ],
  },
  {
    imageUrl: "https://picsum.photos/400",
    user: USERS[1].user,
    likes: 7870,
    caption: "Train Ride to Hogwarts ...",
    profile_picture: USERS[1].image,
    comments: [
      {
        user: "tempuser",
        comment: "Wow! This build looks fire. Super excited about it",
      },
      {
        user: "tempuser",
        comment: "Wow! This build looks fire. Super excited about it",
      },
    ],
  },
];
