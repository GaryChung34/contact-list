import {
    Avatar,
    Button,
    FormControl,
    IconButton,
    InputLabel,
    List,
    ListItem,
    ListItemAvatar,
    ListItemButton,
    ListItemText,
    MenuItem,
    Select,
    TextField,
} from "@mui/material";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";

function ContactList() {
    const [contactList, setContactList] = useState([]);
    const [searchText, setSearchText] = useState("");
    const [page, setPage] = useState(1);
    const [status, setStatus] = useState("");
    const [gender, setGender] = useState("");
    const navigate = useNavigate();

    const handleNext = () => {
        fetch(contactList?.info?.next)
            .then((response) => response.json())
            .then((result) => setContactList(result))
            .catch((error) => console.log(error));
        if (contactList?.info?.next !== null) {
            setPage((prev) => prev + 1);
        }
    };

    const handleBack = () => {
        fetch(contactList?.info?.prev)
            .then((response) => response.json())
            .then((result) => setContactList(result))
            .catch((error) => console.log(error));
        if (contactList?.info?.prev !== null) {
            setPage((prev) => prev - 1);
        }
    };

    const isNotEmpty = (val) => {
        if (val === "") {
            return false;
        }
        return true;
    };

    useEffect(() => {
        if (searchText === "" && status === "" && gender === "") {
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
                `https://rickandmortyapi.com/api/character/?` +
                    new URLSearchParams({
                        name: searchText,
                        status: status,
                        gender: gender,
                    })
            )
                .then((response) => response.json())
                .then((result) => setContactList(result))
                .catch((error) => console.log(error));
        }
        setPage(1);
    }, [searchText, status, gender]);

    console.log("status", status);

    return (
        <>
            <div className="contactListHeader">
                <div className="title">Contact list</div>
                <TextField
                    id="search-bar"
                    variant="standard"
                    size="small"
                    placeholder="search any name"
                    onChange={(e) => setSearchText(e.target.value)}
                    sx={{ mt: 1.5, p: 1 }}
                />
                <div className="filterBar">
                    <FormControl
                        sx={{ m: 1, width: "30%" }}
                        size="small"
                        variant="standard"
                    >
                        <InputLabel id="demo-simple-select-standard-label">
                            Status
                        </InputLabel>
                        <Select
                            labelId="demo-simple-select-label"
                            id="demo-simple-select"
                            value={status}
                            label="Status"
                            onChange={(e) => setStatus(e.target.value)}
                        >
                            <MenuItem value={"alive"}>alive</MenuItem>
                            <MenuItem value={"dead"}>dead</MenuItem>
                            <MenuItem value={"unknown"}>unknown</MenuItem>
                        </Select>
                    </FormControl>
                    <FormControl
                        sx={{ m: 1, minWidth: "30%" }}
                        size="small"
                        variant="standard"
                    >
                        <InputLabel id="demo-simple-select-standard-label">
                            Gender
                        </InputLabel>
                        <Select
                            labelId="demo-simple-select-label"
                            id="demo-simple-select"
                            value={gender}
                            label="Gender"
                            onChange={(e) => setGender(e.target.value)}
                        >
                            <MenuItem value={"female"}>female</MenuItem>
                            <MenuItem value={"male"}>male</MenuItem>
                            <MenuItem value={"genderless"}>genderless</MenuItem>
                            <MenuItem value={"unknown"}>unknown</MenuItem>
                        </Select>
                    </FormControl>
                    <div style={{ paddingBottom: "10px" }}>
                        <Button
                            variant="text"
                            sx={{ height: "2rem" }}
                            onClick={() => {
                                setStatus("");
                                setGender("");
                            }}
                        >
                            Clear
                        </Button>
                    </div>
                </div>
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
            <div className="contactListToolBar">
                {`Page ${page}/ ${contactList?.info?.pages}`}
                <IconButton
                    size="small"
                    onClick={handleBack}
                    disabled={contactList?.info?.prev === null}
                >
                    <ArrowBackIosIcon />
                </IconButton>
                <IconButton
                    size="small"
                    onClick={handleNext}
                    disabled={contactList?.info?.next === null}
                >
                    <ArrowForwardIosIcon />
                </IconButton>
            </div>
        </>
    );
}

export default ContactList;
