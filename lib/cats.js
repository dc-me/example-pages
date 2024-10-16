/**
 * Cats related api
 */

// axios defaults
axios.defaults.baseURL = ' https://api.thecatapi.com/v1';
axios.defaults.headers.common['x-api-key'] =
  'live_T7I3z7pGE65nF0UiwZFyYMoZEVlpxboUdTY0ZiDvyomEyzVLRWyYi62gCEpMvV9h';

async function getRandomCats(limit = 12) {
  const res = await axios.get('/images/search', {
    params: {
      limit,
    },
  });
  const data = [];
  res.data.forEach((cat) => {
    const breeds = cat.breeds;
    delete cat.breeds;
    const categories = cat.categories;
    delete cat.categories;
    const image = { ...cat };
    data.push({
      breeds,
      image,
      categories,
    });
  });
  return data;
}

async function getFavourites(limit = 12) {
  const res = await axios.get('/favourites', {
    params: {
      limit,
    },
  });
  return res.data;
}

async function favorate(id) {
  const res = await axios.post('/favourites', {
    image_id: id,
  });
}

export { getRandomCats, getFavourites, favorate };
