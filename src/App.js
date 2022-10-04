import "./App.css";
import {
    Avatar,
    List,
    ListItem,
    ListItemAvatar,
    ListItemButton,
    ListItemText,
    TextField,
} from "@mui/material";
import { useEffect, useState } from "react";

function App() {
    const [contactList, setContactList] = useState({});

    useEffect(() => {
        fetch("https://rickandmortyapi.com/api/character")
            .then((response) => response.json())
            .then((result) => {
                console.log(result);
                setContactList(result);
            });
    }, []);

    return (
        <div className="App">
            <div className="container">
                <div className="navBar">
                    <div className="navBarHeader">Rick and Morty</div>
                    <div className="navBarContact">Contact</div>
                </div>
                <div className="contactList">
                    <div className="contactListHeader">
                        <div className="title">Contact list</div>
                        <TextField
                            id="search-bar"
                            variant="standard"
                            size="small"
                            placeholder="search any name"
                        />
                    </div>
                    <div className="contactListContent">
                        <List>
                            <ListItem disablePadding>
                                <ListItemButton>
                                    <ListItemText primary="abc" />
                                </ListItemButton>
                            </ListItem>
                            {contactList?.results?.map((item) => (
                                <ListItem disablePadding>
                                    <ListItemButton>
                                        <ListItemAvatar>
                                            <Avatar
                                                alt={item?.name}
                                                src={item?.image}
                                            />
                                        </ListItemAvatar>
                                        <ListItemText primary={item?.name} />
                                    </ListItemButton>
                                </ListItem>
                            ))}
                        </List>
                    </div>
                </div>
                <div className="infoSection">Info section</div>
            </div>
        </div>
    );
}

export default App;
