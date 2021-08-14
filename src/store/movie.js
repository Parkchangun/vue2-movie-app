import axios from 'axios';
import _uniqBy from 'lodash/uniqBy';

export default {
  namespaced: true,
  state: () => ({
    movies: [],
    loading: false,
    message: 'Search for the movie Title!',
    theMovie: {}
  }),
  getters: {},
  mutations: {
    updateState(state, payload) {
      Object.keys(payload).forEach(key => {
        state[key] = payload[key]
      })
    }
  },
  actions: {
    async searchMovies({state, commit}, payload) {
      if(state.loading) return

      commit('updateState', {
        loading: true,
        message: ''
      })

      try {
        const res = await _fetchMovie(payload);
        const {Search, totalResults} = res.data;

        commit('updateState', {
          movies: _uniqBy(Search, 'imdbID')
        });

        const total = parseInt(totalResults, 10);
        // const totalLength = Math.ceil(total / 10);

        const datasCount = total >= payload.number ? payload.number : total;

        let page = 2;
        
        while(state.movies.length < datasCount) {
          const res = await _fetchMovie({...payload, page});
          const {Search} = res.data;
          commit('updateState', {
            movies: _uniqBy([
              ...state.movies,
              ...Search
            ], 'imdbID') 
          })
          console.log('while문');
          console.log(state.movies)
          page += 1;
        }

        if(state.movies.length > datasCount) {
          commit('updateState', {
            movies: [...state.movies.slice(0, datasCount)]
          });
          console.log('if문');
          console.log(state.movies);
        }
      } catch(e) {
        console.log(e);
        commit('updateState', {
          message: e.message,
          movies: []
        })
      } finally {
        commit('updateState', {
          loading : false
        })
      }
      
    },
    async searchMovieWithId({state, commit}, payload) {
      if(state.loading) return

      commit('updateState', {
        loading: true
      })

      try {
        const res = await _fetchMovie({
          id: payload.id
        });
        console.log(res.data);
        commit('updateState', {
          theMovie: res.data
        })
      } catch (e) {
        commit('updateState', {
          message: e.message
        })
      } finally {
        commit('updateState', {
          loading: false
        })
      }
    }
  }
}

async function _fetchMovie(payload) {
  const {title, type, page = 1, year, id} = payload;
  const url = id
  ? `https://www.omdbapi.com/?apikey=7035c60c&i=${id}&plot=full`
  : `https://www.omdbapi.com/?apikey=7035c60c&s=${title}&type=${type}&y=${year}&page=${page}`;
  return await axios.get(url);
}