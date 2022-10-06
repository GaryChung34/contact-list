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
import { useNavigate } from "react-router-dom";

function ContactList() {
    const [contactList, setContactList] = useState([]);
    const [searchText, setSearchText] = useState("");
    const navigate = useNavigate();

    console.log("search Text: ", searchText);

    useEffect(() => {
        if (searchText === "") {
            fetch("https://rickandmortyapi.com/api/character")
                .then((response) => response.json())
                .then((result) => {
                    console.log(result);
                    setContactList(result);
                })
                .catch((error) => {
                    console.error(error);
                });
        } else {
            fetch(
                `https://rickandmortyapi.com/api/character/?name=${searchText}`
            )
                .then((response) => response.json())
                .then((result) => setContactList(result))
                .catch((error) => console.log(error));
        }
    }, [searchText]);

    return (
        <div className="">
            <div className="contactListHeader">
                <div className="title">Contact list</div>
                <TextField
                    id="search-bar"
                    variant="standard"
                    size="small"
                    placeholder="search any name"
                    onChange={(e) => setSearchText(e.target.value)}
                />
            </div>
            <div className="contactListContent">
                <List>
                    {contactList?.results?.map((item) => (
                        <ListItem disablePadding key={item.id}>
                            <ListItemButton
                                onClick={() => navigate(`/contact/${item.id}`)}
                            >
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
    );
}

export default ContactList;
