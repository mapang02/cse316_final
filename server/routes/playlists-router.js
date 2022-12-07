/*
    This is where we'll route all of the received http requests
    into controller response functions.
    
    @author McKilla Gorilla
*/
const express = require('express')
const PlaylistController = require('../controllers/playlist-controller')
const router = express.Router()
const auth = require('../auth')

router.post('/playlist', auth.verify, PlaylistController.createPlaylist)
router.delete('/playlist/:id', auth.verify, PlaylistController.deletePlaylist)
router.get('/playlist/:id', auth.verify, PlaylistController.getPlaylistById)
router.get('/publicplaylist/:id', PlaylistController.getPublicPlaylistById)
router.get('/playlistpairs', auth.verify, PlaylistController.getPlaylistPairs)
router.get('/publicplaylistpairs', PlaylistController.getPublicPlaylistPairs)
router.get('/playlists', auth.verify, PlaylistController.getPlaylists)
router.put('/playlist/:id', auth.verify, PlaylistController.updatePlaylist)
router.put('/publish/:id', auth.verify, PlaylistController.publishPlaylist)

router.post('/comment/:id', auth.verify, PlaylistController.createComment)
router.get('/comment/:id', PlaylistController.getComments)

router.post('/rating/:id', auth.verify, PlaylistController.addRating)
router.delete('/rating/:id', auth.verify, PlaylistController.removeRating)
router.get('/rating/:id', auth.verify, PlaylistController.getRating)

module.exports = router