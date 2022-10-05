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
import InfoSession from "./InfoSession";
import ContactStart from "./ContactStart";
import { Route, BrowserRouter as Router, Routes } from "react-router-dom";

function App() {
    const [contactList, setContactList] = useState({});

    useEffect(() => {
        fetch("https://rickandmortyapi.com/api/character")
            .then((response) => response.json())
            .then((result) => {
                console.log(result);
                setContactList(result);
            })
            .catch((error) => {
                console.error(error);
            });
    }, []);

    return (
        <div className="App">
            <div className="container">
                {/* Nav bar */}
                <div className="navBar">
                    <div className="navBarHeader">
                        <div className="title">Rick and Morty</div>
                    </div>
                    <div className="navBarContact">
                        <div className="title">Contact</div>
                    </div>
                </div>

                {/* Contact list */}
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

                {/* Info. session */}
                <div className="infoSection">
                    <Router>
                        <Routes>
                            <Route path="/contact" element={<ContactStart />} />
                            <Route
                                path="/contact/:id"
                                element={<InfoSession />}
                            />
                        </Routes>
                    </Router>
                </div>
            </div>
        </div>
    );
}

export default App;
