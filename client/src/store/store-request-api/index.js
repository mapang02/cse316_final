/*
    This is our http api, which we use to send requests to
    our back-end API. Note we`re using the Axios library
    for doing this, which is an easy to use AJAX-based
    library. We could (and maybe should) use Fetch, which
    is a native (to browsers) standard, but Axios is easier
    to use when sending JSON back and forth and it`s a Promise-
    based API which helps a lot with asynchronous communication.
    
    @author McKilla Gorilla
*/

import axios from 'axios'
axios.defaults.withCredentials = true;
const api = axios.create({
    baseURL: 'http://localhost:4000/api',
})

// THESE ARE ALL THE REQUESTS WE`LL BE MAKING, ALL REQUESTS HAVE A
// REQUEST METHOD (like get) AND PATH (like /top5list). SOME ALSO
// REQUIRE AN id SO THAT THE SERVER KNOWS ON WHICH LIST TO DO ITS
// WORK, AND SOME REQUIRE DATA, WHICH WE WE WILL FORMAT HERE, FOR WHEN
// WE NEED TO PUT THINGS INTO THE DATABASE OR IF WE HAVE SOME
// CUSTOM FILTERS FOR QUERIES
export const createPlaylist = (newListName, newSongs, userEmail) => {
    return api.post(`/playlist/`, {
        // SPECIFY THE PAYLOAD
        name: newListName,
        songs: newSongs,
        ownerEmail: userEmail
    })
}
export const deletePlaylistById = (id) => api.delete(`/playlist/${id}`)
export const getPlaylistById = (id) => api.get(`/playlist/${id}`)
export const getPlaylistByName = (name) => api.get(`/playlistname/${name}`)
export const getPublicPlaylistById = (id) => api.get(`/publicplaylist/${id}`)
export const getPlaylistPairs = () => api.get(`/playlistpairs/`)
export const getPublicPlaylistPairs = (searchName, searchUser) => api.get(`/publicplaylistpairs/name=${searchName}/user=${searchUser}`);
export const updatePlaylistById = (id, playlist) => {
    return api.put(`/playlist/${id}`, {
        // SPECIFY THE PAYLOAD
        playlist : playlist
    })
}
export const publishPlaylistById = (id) => api.put(`/publish/${id}`)

//Comment functions
export const createComment = (id, username, body) => {
    return api.post(`/comment/${id}`, {
        username: username,
        body: body
    })
}
export const getComments = (id) => api.get(`/comment/${id}`)

//Rating functions
export const addRating = (id, rating) => {
    return api.post(`/rating/${id}`, {
        rating: rating
    })
}
export const removeRating = (id) => api.delete(`/rating/${id}`)
export const getRating = (id) => api.get(`/rating/${id}`)

const apis = {
    createPlaylist,
    deletePlaylistById,
    getPlaylistById,
    getPlaylistByName,
    getPublicPlaylistById,
    getPlaylistPairs,
    getPublicPlaylistPairs,
    updatePlaylistById,
    publishPlaylistById,
    createComment,
    getComments,
    addRating,
    removeRating,
    getRating
}

export default apis
