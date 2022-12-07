import { useContext, useState } from 'react'
import { GlobalStoreContext } from '../store'
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import ThumbUpIcon from '@mui/icons-material/ThumbUp';
import ThumbDownIcon from '@mui/icons-material/ThumbDown';
import IconButton from '@mui/material/IconButton';
import ListItem from '@mui/material/ListItem';
import TextField from '@mui/material/TextField';

/*
    This is a card in our list of top 5 lists. It lets select
    a list for editing and it has controls for changing its 
    name or deleting it.
    
    @author McKilla Gorilla
*/
function ListCard(props) {
    const { store } = useContext(GlobalStoreContext);
    const [editActive, setEditActive] = useState(false);
    const [text, setText] = useState("");
    const { idNamePair, selected } = props;

    function handleLoadList(event, id) {
        event.stopPropagation();
        console.log("handleLoadList for " + id);
        if (!event.target.disabled) {
            let _id = event.target.id;
            if (_id.indexOf('list-card-text-') >= 0)
                _id = ("" + _id).substring("list-card-text-".length);

            console.log("load " + event.target.id);

            // CHANGE THE CURRENT LIST
            store.setCurrentList(id);
        }
    }

    function handleToggleEdit(event) {
        event.stopPropagation();
        toggleEdit();
    }

    function toggleEdit() {
        let newActive = !editActive;
        if (newActive) {
            store.setIsListNameEditActive();
        }
        setEditActive(newActive);
    }

    async function handleDeleteList(event, id) {
        event.stopPropagation();
        let _id = event.target.id;
        _id = ("" + _id).substring("delete-list-".length);
        store.markListForDeletion(id);
    }

    function handleKeyPress(event) {
        if (event.code === "Enter") {
            let id = event.target.id.substring("list-".length);
            store.changeListName(id, text);
            toggleEdit();
        }
    }
    function handleUpdateText(event) {
        setText(event.target.value);
    }

    let selectClass = "unselected-list-card";
    if (selected) {
        selectClass = "selected-list-card";
    }
    let cardStatus = false;
    if (store.isListNameEditActive) {
        cardStatus = true;
    }
    // If list is published
    let cardColor = "lightgrey";
    let owner = ""
    let publishDate = "";
    let viewCount = "";
    let ratings = "";
    if (idNamePair.publishDate) {
        cardColor = "cornflowerblue"
        owner = "By: " + idNamePair.ownerUsername;
        publishDate = "Published:" + (new Date(idNamePair.publishDate).toLocaleDateString());
        viewCount = "Views: " + idNamePair.__v; //Fix this later
        ratings = (
            <Grid container sx={{width: '100%', height: '100%'}}>
                <IconButton onClick={handleToggleEdit} aria-label='like'>
                    <ThumbUpIcon style={{fontSize:'24pt'}} />
                </IconButton>
                <Box>Likes: {idNamePair.likes}</Box>
                <IconButton onClick={handleToggleEdit} aria-label='dislike'>
                    <ThumbDownIcon style={{fontSize:'24pt'}} />
                </IconButton>
                <Box>Dislikes: {idNamePair.dislikes}</Box>
            </Grid>
        );
    }
    let cardElement =
        <ListItem
            id={idNamePair._id}
            key={idNamePair._id}
            sx={{ marginTop: '15px', display: 'flex', p: 1, backgroundColor: cardColor }}
            style={{ width: '100%'}}
            button
        >
            <Grid container sx={{width: '100%', height: '100%'}}>
                <Grid item xs={8}>
                    <Box sx={{ p: 1, flexGrow: 1}}><b>{idNamePair.name}</b></Box>
                </Grid>
                <Grid item xs={4}>
                    <Box sx={{ p: 1 }}>
                        <IconButton onClick={handleToggleEdit} aria-label='edit'>
                            <EditIcon style={{fontSize:'24pt'}} />
                        </IconButton>
                    </Box>
                </Grid>
                <Grid item xs={6}>
                    <Box sx={{p: 1}}>{owner}</Box>
                </Grid>
                <Grid item xs={6}>
                    {ratings}
                </Grid>
                <Grid item xs={4}>
                    <Box sx={{p: 1}}>{publishDate}</Box>
                </Grid>
                <Grid item xs={4}>
                    <Box sx={{p: 1}}>{viewCount}</Box>
                </Grid>
                <Grid item xs={4}>
                    <IconButton onClick={(event) => {
                            handleLoadList(event, idNamePair._id)
                        }} aria-label='expand'>
                        <ExpandMoreIcon style={{fontSize:'24pt'}} />
                    </IconButton>
                </Grid>
            </Grid>
            <Box sx={{ p: 1 }}>
            </Box>
        </ListItem>

    if (editActive) {
        cardElement =
            <TextField
                margin="normal"
                required
                fullWidth
                id={"list-" + idNamePair._id}
                label="Playlist Name"
                name="name"
                autoComplete="Playlist Name"
                className='list-card'
                onKeyPress={handleKeyPress}
                onChange={handleUpdateText}
                defaultValue={idNamePair.name}
                inputProps={{style: {fontSize: 48}}}
                InputLabelProps={{style: {fontSize: 24}}}
                autoFocus
            />
    }
    return (
        cardElement
    );
}

export default ListCard;