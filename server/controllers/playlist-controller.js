const Playlist = require('../models/playlist-model')
const User = require('../models/user-model');
const Comment = require('../models/comment-model');
const Rating = require('../models/rating-model');
/*
    This is our back-end API. It provides all the data services
    our database needs. Note that this file contains the controller
    functions for each endpoint.
    
    @author McKilla Gorilla
*/
createPlaylist = (req, res) => {
    const body = req.body;
    console.log("createPlaylist body: " + JSON.stringify(body));

    if (!body) {
        return res.status(400).json({
            success: false,
            error: 'You must provide a Playlist',
        })
    }

    const playlist = new Playlist(body);
    console.log("playlist: " + playlist.toString());
    if (!playlist) {
        return res.status(400).json({ success: false, error: err })
    }

    User.findOne({ _id: req.userId }, (err, user) => {
        async function asyncCreatePlaylist(playlist) {
            //Return error if req.userId does not match body.ownerEmail
            if (user.email != body.ownerEmail) {
                console.log("incorrect user!");
                return res.status(400).json({
                    errorMessage: "authentication error"
                });
            }
            console.log("user found: " + JSON.stringify(user));
    
            //Set owner username appropriately
            playlist.ownerUsername = user.username

            //Find available name for playlist
            let appendedNum = 0;
            let newName = playlist.name;
            let validNameFound = false;
            while (!validNameFound) {
                let foundList = await Playlist.findOne({ ownerEmail: user.email, name: newName });
                if (!foundList) {
                    console.log("New name: " + newName);
                    playlist.name = newName;
                    validNameFound = true;
                }
                else {
                    console.log("Playlist with name " + newName + " already exists");
                    console.log(foundList);
                }
                appendedNum += 1;
                newName = playlist.name + " " + appendedNum;
            }
    
            //Create playlist
            user.playlists.push(playlist._id);
            user
                .save()
                .then(() => {
                    playlist
                        .save()
                        .then(() => {
                            return res.status(201).json({
                                playlist: playlist
                            })
                        })
                        .catch(error => {
                            return res.status(400).json({
                                error,
                                errorMessage: 'Playlist Not Created!'
                            })
                        })
                });
        }
        asyncCreatePlaylist(playlist);
    });
}
deletePlaylist = async (req, res) => {
    console.log("delete Playlist with id: " + JSON.stringify(req.params.id));
    console.log("delete " + req.params.id);
    Playlist.findById({ _id: req.params.id }, (err, playlist) => {
        console.log("playlist found: " + JSON.stringify(playlist));
        if (err) {
            return res.status(404).json({
                errorMessage: 'Playlist not found!',
            })
        }

        // DOES THIS LIST BELONG TO THIS USER?
        async function asyncFindUser(list) {
            User.findOne({ email: list.ownerEmail }, (err, user) => {
                console.log("user._id: " + user._id);
                console.log("req.userId: " + req.userId);
                if (user._id == req.userId) {
                    console.log("correct user!");

                    //Remove from user list
                    user.playlists.splice(user.playlists.indexOf(req.params.id), 1);
                    user.save().catch(err => console.log(err));

                    //Delete comments
                    async function asyncDeleteComments(list) { 
                        for (let key in list.comments) {
                            console.log("Deleting comment " + list.comments[key])
                            await Comment.findOneAndDelete({ _id: list.comments[key] }).catch(err => console.log(err))
                        }
                    }
                    asyncDeleteComments(playlist);

                    //Delete playlist
                    Playlist.findOneAndDelete({ _id: req.params.id }, () => {
                        return res.status(200).json({});
                    }).catch(err => console.log(err))

                }
                else {
                    console.log("incorrect user!");
                    return res.status(400).json({ 
                        errorMessage: "authentication error" 
                    });
                }
            });
        }
        asyncFindUser(playlist);
    })
}
getPlaylistById = async (req, res) => {
    console.log("Find Playlist with id: " + JSON.stringify(req.params.id));

    await Playlist.findById({ _id: req.params.id }, (err, list) => {
        if (err) {
            return res.status(400).json({ success: false, error: err });
        }
        console.log("Found list: " + JSON.stringify(list));

        // DOES THIS LIST BELONG TO THIS USER?
        async function asyncFindUser(list) {
            await User.findOne({ email: list.ownerEmail }, (err, user) => {
                console.log("user._id: " + user._id);
                console.log("req.userId: " + req.userId);
                if (user._id == req.userId) {
                    console.log("correct user!");
                    return res.status(200).json({ success: true, playlist: list })
                }
                else {
                    console.log("incorrect user!");
                    return res.status(400).json({ success: false, description: "authentication error" });
                }
            });
        }
        asyncFindUser(list);
    }).catch(err => console.log(err))
}
getPlaylistPairs = async (req, res) => {
    //Gets public playlists, can search by username or playlist name
    console.log("getPlaylistPairs");

    //Construct regex for search criteria
    searchPlaylistName = req.body.searchPlaylistName ? req.body.searchPlaylistName : ""
    searchUsername = req.body.searchUsername ? req.body.searchUsername : ""
    searchPlaylistNameRegex = new RegExp(searchPlaylistName.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'))
    searchUsernameRegex = new RegExp(searchUsername.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'))

    //Perform search
    await Playlist.find(
                        { publishDate: { $gt: new Date(0)}, name: searchPlaylistNameRegex, ownerUsername: searchUsernameRegex}, 
                        (err, playlists) => {
        console.log("found Playlists: " + JSON.stringify(playlists));
        if (err) {
            return res.status(400).json({ success: false, error: err })
        }
        if (!playlists) {
            console.log("!playlists.length");
            return res
                .status(404)
                .json({ success: false, error: 'Playlists not found' })
        }
        else {
            console.log("Send the Playlist pairs");
            // PUT ALL THE LISTS INTO ID, NAME PAIRS
            let pairs = [];
            for (let key in playlists) {
                let list = playlists[key];
                let pair = {
                    _id: list._id,
                    name: list.name
                };
                pairs.push(pair);
            }
            return res.status(200).json({ success: true, idNamePairs: pairs })
        }
    }).catch(err => console.log(err))
}
getUserPlaylistPairs = async (req, res) => {
    console.log("getUserPlaylistPairs");
    await User.findOne({ _id: req.userId }, (err, user) => {
        console.log("find user with id " + req.userId);
        async function asyncFindList(email) {
            console.log("find all Playlists owned by " + email);
            await Playlist.find({ ownerEmail: email }, (err, playlists) => {
                console.log("found Playlists: " + JSON.stringify(playlists));
                if (err) {
                    return res.status(400).json({ success: false, error: err })
                }
                if (!playlists) {
                    console.log("!playlists.length");
                    return res
                        .status(404)
                        .json({ success: false, error: 'Playlists not found' })
                }
                else {
                    console.log("Send the Playlist pairs");
                    // PUT ALL THE LISTS INTO ID, NAME PAIRS
                    let pairs = [];
                    for (let key in playlists) {
                        let list = playlists[key];
                        let pair = {
                            _id: list._id,
                            name: list.name
                        };
                        pairs.push(pair);
                    }
                    return res.status(200).json({ success: true, idNamePairs: pairs })
                }
            }).catch(err => console.log(err))
        }
        asyncFindList(user.email);
    }).catch(err => console.log(err))
}
getPlaylists = async (req, res) => {
    await Playlist.find({}, (err, playlists) => {
        if (err) {
            return res.status(400).json({ success: false, error: err })
        }
        if (!playlists.length) {
            return res
                .status(404)
                .json({ success: false, error: `Playlists not found` })
        }
        return res.status(200).json({ success: true, data: playlists })
    }).catch(err => console.log(err))
}
updatePlaylist = async (req, res) => {
    const body = req.body
    console.log("updatePlaylist: " + JSON.stringify(body));
    console.log("req.body.name: " + req.body.name);

    if (!body) {
        return res.status(400).json({
            success: false,
            error: 'You must provide a body to update',
        })
    }

    Playlist.findOne({ _id: req.params.id }, (err, playlist) => {
        console.log("playlist found: " + JSON.stringify(playlist));
        if (err) {
            return res.status(404).json({
                err,
                message: 'Playlist not found!',
            })
        }

        // DOES THIS LIST BELONG TO THIS USER?
        async function asyncFindUser(list) {
            await User.findOne({ email: list.ownerEmail }, (err, user) => {
                console.log("user._id: " + user._id);
                console.log("req.userId: " + req.userId);
                if (user._id == req.userId) {
                    console.log("correct user!");
                    console.log("req.body.name: " + req.body.name);

                    list.name = body.playlist.name;
                    list.songs = body.playlist.songs;
                    list
                        .save()
                        .then(() => {
                            console.log("SUCCESS!!!");
                            return res.status(200).json({
                                success: true,
                                id: list._id,
                                message: 'Playlist updated!',
                            })
                        })
                        .catch(error => {
                            console.log("FAILURE: " + JSON.stringify(error));
                            return res.status(404).json({
                                error,
                                message: 'Playlist not updated!',
                            })
                        })
                }
                else {
                    console.log("incorrect user!");
                    return res.status(400).json({ success: false, description: "authentication error" });
                }
            });
        }
        asyncFindUser(playlist);
    })
}
publishPlaylist = async (req, res) => {
    const body = req.body
    console.log("publishPlaylist: " + JSON.stringify(req.params.id));

    Playlist.findOne({ _id: req.params.id }, (err, playlist) => {
        console.log("playlist found: " + JSON.stringify(playlist));
        if (err) {
            return res.status(404).json({
                err,
                message: 'Playlist not found!',
            })
        }
        if (playlist.publishDate) {
            return res.status(400).json({
                success: false,
                description: "Playlist is already published"
            })
        }

        // DOES THIS LIST BELONG TO THIS USER?
        async function asyncFindUser(list) {
            await User.findOne({ email: list.ownerEmail }, (err, user) => {
                console.log("user._id: " + user._id);
                console.log("req.userId: " + req.userId);
                if (user._id == req.userId) {
                    console.log("correct user!");

                    list.publishDate = Date();
                    list.views = 0;
                    list.likes = 0;
                    list.dislikes = 0;
                    list.comments = [];
                    list
                        .save()
                        .then(() => {
                            console.log("SUCCESS!!!");
                            return res.status(200).json({
                                success: true,
                                id: list._id,
                                message: 'Playlist published!',
                            })
                        })
                        .catch(error => {
                            console.log("FAILURE: " + JSON.stringify(error));
                            return res.status(404).json({
                                error,
                                message: 'Playlist not published!',
                            })
                        })
                }
                else {
                    console.log("incorrect user!");
                    return res.status(400).json({ success: false, description: "authentication error" });
                }
            });
        }
        asyncFindUser(playlist);
    })
}
createComment = async (req, res) => {
    const body = req.body
    console.log("createComment: " + JSON.stringify(body));

    Playlist.findOne({ _id: req.params.id }, (err, playlist) => {
        console.log("playlist found: " + JSON.stringify(playlist));
        if (err) {
            return res.status(404).json({
                err,
                message: 'Playlist not found!',
            })
        }

        // Check if playlist is published
        if (playlist.publishDate) {
            if (!body) {
                return res.status(400).json({
                    success: false,
                    error: 'You must provide a comment body',
                })
            }

            //Find user to set comment username appropriately
            User.findOne({ _id: req.userId }, (err, user) => {
                const comment = new Comment(body);
                comment.username = user.username;

                playlist.comments.push(comment._id);
                playlist
                    .save()
                    .then(() => {
                        comment
                            .save()
                            .then(() => {
                                return res.status(201).json({
                                    comment: comment
                                })
                            })
                            .catch(error => {
                                return res.status(400).json({
                                    errorMessage: 'Comment Not Created!'
                                })
                            })
                    });
            });

        }
        else {
            return res.status(400).json({ success: false, description: "Playlist is not published" });
        }
    })
}
getComments = async (req, res) => {
    console.log("getComments: " + req.params.id);

    Playlist.findOne({ _id: req.params.id }, (err, playlist) => {
        console.log("playlist found: " + JSON.stringify(playlist));
        if (err) {
            return res.status(404).json({
                err,
                message: 'Playlist not found!',
            })
        }

        // Check if playlist is published
        if (playlist.publishDate) {
            //Retrieve each comment and return in array
            async function asyncGetComments() {
                let comments = []
                for (let key in playlist.comments) {
                    await Comment.findById({ _id: playlist.comments[key] }, (error, comment) => {
                        if (!error) {
                            comments.push(comment);
                        }
                    });
                }
                return res.status(200).json({ success: true, comments: comments});
            }
            return asyncGetComments();
        }
        else {
            return res.status(400).json({ success: false, description: "Playlist is not published" });
        }
    })
}
addRating = async (req, res) => {
    const body = req.body
    const Ratings = {
        LIKE: "LIKE",
        DISLIKE: "DISLIKE"
    }
    console.log("addRating: " + JSON.stringify(body));

    Playlist.findOne({ _id: req.params.id }, (err, playlist) => {
        console.log("playlist found: " + JSON.stringify(playlist));
        if (err) {
            return res.status(404).json({
                err,
                message: 'Playlist not found!',
            })
        }

        // Check if playlist is published
        if (playlist.publishDate) {
            if (!body) {
                return res.status(400).json({
                    success: false,
                    error: 'You must provide a rating',
                })
            }

            User.findOne({ _id: req.userId }, (err, user) => {
                async function asyncAddRating() {
                    //Return error if user has already given a rating
                    const existingRating = await Rating.findOne({ ownerEmail: user.email });
                    if (existingRating) {
                        return res.status(400).json({
                            errorMessage: "User has already given a rating to this playlist"
                        });
                    }
    
                    //Return error if rating is invalid
                    if (!Ratings[body.rating]) {
                        return res.status(400).json({
                            errorMessage: "invalid rating"
                        });
                    }
    
                    //Creating Rating object to track rating
                    const rating = new Rating({ ownerEmail: user.email, playlist: playlist._id, rating: body.rating});
    
                    //Add to playlist like/dislike count
                    switch (body.rating) {
                        case Ratings.LIKE:
                            playlist.likes += 1;
                            break;
                        case Ratings.DISLIKE:
                            playlist.dislikes += 1;
                            break;
                    }
    
                    playlist
                        .save()
                        .then(() => {
                            rating
                                .save()
                                .then(() => {
                                    return res.status(201).json({
                                        rating: rating
                                    })
                                })
                                .catch(error => {
                                    return res.status(400).json({
                                        errorMessage: 'Rating Not Created!'
                                    })
                                })
                        });
                }
                asyncAddRating();
            });

        }
        else {
            return res.status(400).json({ success: false, description: "Playlist is not published" });
        }
    })
}
removeRating = async (req, res) => {

}
getRating = async (req, res) => {

}

module.exports = {
    createPlaylist,
    deletePlaylist,
    getPlaylistById,
    getPlaylistPairs,
    getUserPlaylistPairs,
    getPlaylists,
    updatePlaylist,
    publishPlaylist,
    createComment,
    getComments,
    addRating,
    removeRating,
    getRating
}