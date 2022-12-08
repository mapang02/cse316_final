import { useContext, useState } from 'react'
import { GlobalStoreContext } from '../store'
import AuthContext from '../auth'

import AddIcon from '@mui/icons-material/Add';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import { Tab, Tabs } from '@mui/material'
import List from '@mui/material/List';

function Comments() {
    const { auth } = useContext(AuthContext);
    const { store } = useContext(GlobalStoreContext);
    const [text, setText] = useState("");

    function handleKeyPress(event) {
        if (event.code === "Enter") {
            store.createComment(store.currentList._id, "", text);
            store.getComments(store.currentList._id);
            setText("");
        }
    }
    function handleUpdateText(event) {
        setText(event.target.value);
    }

    const commentGenerator = (c) => {
        return <Box
                    sx={{bgcolor: "cornflowerblue", m: 2}}
                >
                    <Box><b>{c.username}</b></Box>
                    <Box>{c.body}</Box>
                </Box>
    }

    let comments = "";
    if (store.comments.length > 0) {
        let c = store.comments
        comments = c.map(commentGenerator);
    }
    let commentBox = "";
    if (auth.user) {
        commentBox = <TextField
            margin="normal"
            required
            fullWidth
            id={"comment-entry"}
            label="Playlist Name"
            name="name"
            autoComplete="Comment"
            onKeyPress={handleKeyPress}
            onChange={handleUpdateText}
            defaultValue=""
            inputProps={{style: {fontSize: 48}}}
            InputLabelProps={{style: {fontSize: 24}}}
            autoFocus
        />
    }

    return (
        <Box>
            <div id="comment-box">
                {comments}
                {commentBox}
            </div>
        </Box>
    )
}

export default Comments