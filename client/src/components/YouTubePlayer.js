import { useContext, useState } from 'react'
import { GlobalStoreContext } from '../store'
import AuthContext from '../auth'


import React from 'react';
import YouTube from 'react-youtube';
import AddIcon from '@mui/icons-material/Add';
import Box from '@mui/material/Box';
import { Tab, Tabs } from '@mui/material'
import List from '@mui/material/List';

function YouTubePlayer() {
    // THIS EXAMPLE DEMONSTRATES HOW TO DYNAMICALLY MAKE A
    // YOUTUBE PLAYER AND EMBED IT IN YOUR SITE. IT ALSO
    // DEMONSTRATES HOW TO IMPLEMENT A PLAYLIST THAT MOVES
    // FROM ONE SONG TO THE NEXT

    const { store } = useContext(GlobalStoreContext);

    // THIS HAS THE YOUTUBE IDS FOR THE SONGS IN OUR PLAYLIST
    let songs = store.currentList ? store.currentList.songs : [];
    let playlist = store.currentList ? songs.map(x => x.youTubeId) : [];

    // THIS IS THE INDEX OF THE SONG CURRENTLY IN USE IN THE PLAYLIST
    let currentSong = 0;

    const playerOptions = {
        height: '390',
        width: '640',
        playerVars: {
            // https://developers.google.com/youtube/player_parameters
            autoplay: 0,
        },
    };

    // THIS FUNCTION LOADS THE CURRENT SONG INTO
    // THE PLAYER AND PLAYS IT
    function loadAndPlayCurrentSong(player) {
        let song = playlist[currentSong];
        player.loadVideoById(song);
        player.playVideo();
    }

    // THIS FUNCTION INCREMENTS THE PLAYLIST SONG TO THE NEXT ONE
    function incSong() {
        currentSong++;
        currentSong = currentSong % playlist.length;
    }

    function onPlayerReady(event) {
        loadAndPlayCurrentSong(event.target);
        event.target.playVideo();
    }

    // THIS IS OUR EVENT HANDLER FOR WHEN THE YOUTUBE PLAYER'S STATE
    // CHANGES. NOTE THAT playerStatus WILL HAVE A DIFFERENT INTEGER
    // VALUE TO REPRESENT THE TYPE OF STATE CHANGE. A playerStatus
    // VALUE OF 0 MEANS THE SONG PLAYING HAS ENDED.
    function onPlayerStateChange(event) {
        let playerStatus = event.data;
        let player = event.target;
        if (playerStatus === -1) {
            // VIDEO UNSTARTED
            console.log("-1 Video unstarted");
        } else if (playerStatus === 0) {
            // THE VIDEO HAS COMPLETED PLAYING
            console.log("0 Video ended");
            incSong();
            if (store.currentList) {
                store.setPlayerInfo(currentSong, songs[currentSong].title, songs[currentSong].artist);
            }
            loadAndPlayCurrentSong(player);
        } else if (playerStatus === 1) {
            // THE VIDEO IS PLAYED
            console.log("1 Video played");
            if (store.currentList) {
                store.setPlayerInfo(currentSong, songs[currentSong].title, songs[currentSong].artist);
            }
        } else if (playerStatus === 2) {
            // THE VIDEO IS PAUSED
            console.log("2 Video paused");
        } else if (playerStatus === 3) {
            // THE VIDEO IS BUFFERING
            console.log("3 Video buffering");
        } else if (playerStatus === 5) {
            // THE VIDEO HAS BEEN CUED
            console.log("5 Video cued");
        }
    }

    function VideoDescription() {
        const { store } = useContext(GlobalStoreContext);

        let playerText = ""
        if (songs.length > 0 && store.playerInfo) {
            playerText = <Box>
                <Box>Playlist: {store.currentList.name}</Box>
                <Box>Song #: {store.playerInfo.songNum}</Box>
                <Box>Title: {store.playerInfo.title}</Box>
                <Box>Artist: {store.playerInfo.artist}</Box>
            </Box>
        }
        return playerText;
    }

    return (
        <Box>
        <YouTube
            videoId={playlist[currentSong]}
            opts={playerOptions}
            onReady={onPlayerReady}
            onStateChange={onPlayerStateChange} />
        <VideoDescription />
        </Box>);
}

export default YouTubePlayer