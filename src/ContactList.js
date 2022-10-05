import {
    Avatar,
    List,
    ListItem,
    ListItemAvatar,
    ListItemButton,
    ListItemText,
} from "@mui/material";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

function ContactList() {
    const [contactList, setContactList] = useState();
    const navigate = useNavigate();

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
        <List>
            {contactList?.results?.map((item) => (
                <ListItem disablePadding key={item.id}>
                    <ListItemButton
                        onClick={() => navigate(`/contact/${item.id}`)}
                    >
                        <ListItemAvatar>
                            <Avatar alt={item?.name} src={item?.image} />
                        </ListItemAvatar>
                        <ListItemText primary={item?.name} />
                    </ListItemButton>
                </ListItem>
            ))}
        </List>
    );
}

export default ContactList;
