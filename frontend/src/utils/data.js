//user query
export const categories = [
  {
    name: "view",
    image:
      "https://cdn.pixabay.com/photo/2016/01/20/11/11/baby-1151351_960_720.jpg",
  },
  {
    name: "food",
    image:
      "https://cdn.pixabay.com/photo/2016/12/26/17/28/spaghetti-1932466_1280.jpg",
  },
  {
    name: "code",
    image:
      "https://cdn.pixabay.com/photo/2016/11/23/14/45/coding-1853305_960_720.jpg",
  },
  {
    name: "anime",
    image:
      "https://cdn.pixabay.com/photo/2016/12/14/12/30/girl-1906187_960_720.jpg",
  },
  {
    name: "vtuber",
    image:
      "https://www.howtogeek.com/wp-content/uploads/2021/04/Kizuna-Ai.jpg?width=1198&trim=1,1&bg-color=000&pad=1,1",
  },
  {
    name: "toys",
    image:
      "https://cdn.pixabay.com/photo/2016/12/14/12/30/girl-1906187_960_720.jpg",
  },
  {
    name: "fun",
    image:
      "https://cdn.pixabay.com/photo/2017/06/13/13/06/girl-2398821_1280.jpg",
  },
  {
    name: "music",
    image:
      "https://cdn.pixabay.com/photo/2015/05/07/11/02/guitar-756326_960_720.jpg",
  },
  {
    name: "designs",
    image:
      "https://cdn.pixabay.com/photo/2017/08/10/02/05/tiles-shapes-2617112_960_720.jpg",
  },
  {
    name: "home",
    image:
      "https://cdn.pixabay.com/photo/2017/09/09/18/25/living-room-2732939_960_720.jpg",
  },
  {
    name: "vehicles",
    image:
      "https://cdn.pixabay.com/photo/2020/05/14/19/36/bmw-5171111_960_720.jpg",
  },
  {
    name: "love",
    image:
      "https://cdn.pixabay.com/photo/2018/02/12/10/45/heart-3147976_960_720.jpg",
  },
  {
    name: "animals",
    image:
      "https://cdn.pixabay.com/photo/2014/11/30/14/11/cat-551554_960_720.jpg",
  },
  {
    name: "games",
    image:
      "https://cdn.pixabay.com/photo/2016/07/07/16/46/dice-1502706_1280.jpg",
  },
  {
    name: "movie",
    image:
      "https://cdn.pixabay.com/photo/2019/11/07/20/48/cinema-4609877_1280.jpg",
  },
  {
    name: "city",
    image:
      "https://cdn.pixabay.com/photo/2017/01/18/16/46/hong-kong-1990268_1280.jpg",
  },
];

// user query
export const userQuery = (userId) => {
  const query = `*[_type == 'user' && _id == '${userId}']`;
  //   checking the user table in sanity and fetching the matching id

  return query;
};

export const userCreatedPinsQuery = (userId) => {
  const query = `*[ _type == 'pin' && userId == '${userId}'] | order(_createdAt desc){
    image{
      asset->{
        url
      }
    },
    _id,
    destination,
    postedBy->{
      _id,
      userName,
      image
    },
    save[]{
      postedBy->{
        _id,
        userName,
        image
      },
    },
  }`;
  return query;
};

export const userSavedPinsQuery = (userId) => {
  const query = `*[_type == 'pin' && '${userId}' in save[].userId ] | order(_createdAt desc) {
    image{
      asset->{
        url
      }
    },
    _id,
    destination,
    postedBy->{
      _id,
      userName,
      image
    },
    save[]{
      postedBy->{
        _id,
        userName,
        image
      },
    },
  }`;
  return query;
};

export const searchQuery = (searchTerm) => {
  const query = `*[_type == 'pin' && title match '${searchTerm}*' || category match '${searchTerm}*' || about match '${searchTerm}*' ]{
    image{
      asset -> {
        url
      }
    },
    _id,
    destination,
    postedBy -> {
      _id,
      userName,
      image
    },
    save[]{
      _key,
      postedBy -> {
        _id,
        userName,
        image
      },
    },
  }`;

  return query;
};

export const feedQuery = `*[_type == 'pin'] | order(_createAt desc){
  image{
    asset -> {
      url
    }
  },
  _id,
  destination,
  postedBy -> {
    _id,
    userName,
    image
  },
  save[]{
    _key,
    postedBy -> {
      _id,
      userName,
      image
    },
  },
}`;

export const pinDetailQuery = (pinId) => {
  const query = `*[_type == "pin" && _id == '${pinId}']{
    image{
      asset->{
        url
      }
    },
    _id,
    title, 
    about,
    category,
    destination,
    postedBy->{
      _id,
      userName,
      image
    },
   save[]{
      postedBy->{
        _id,
        userName,
        image
      },
    },
    comments[]{
      comment,
      _key,
      postedBy->{
        _id,
        userName,
        image
      },
    }
  }`;
  return query;
};

export const pinDetailMorePinQuery = (pin) => {
  const query = `*[_type == "pin" && category == '${pin.category}' && _id != '${pin._id}' ]{
    image{
      asset->{
        url
      }
    },
    _id,
    destination,
    postedBy->{
      _id,
      userName,
      image
    },
    save[]{
      _key,
      postedBy->{
        _id,
        userName,
        image
      },
    },
  }`;
  return query;
};