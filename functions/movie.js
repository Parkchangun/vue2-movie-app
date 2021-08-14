const axios = require('axios')
const {OMDB_API_KEY} = process.env;

exports.handler = async function (event) {
  const payload = JSON.parse(event.body);

  const {title, type, page = 1, year, id} = payload;
  console.log(title, type, id);
  const url = id
      ? `https://www.omdbapi.com/?apikey=${OMDB_API_KEY}&i=${id}&plot=full`
      : `https://www.omdbapi.com/?apikey=${OMDB_API_KEY}&s=${title}&type=${type}&y=${year}&page=${page}`;
  const {data} = await axios.get(url);
  console.log(data);
  return {
    statusCode: 200,
    body: JSON.stringify(data)
  }
}
