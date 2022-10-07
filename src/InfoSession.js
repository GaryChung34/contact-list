import {
    Avatar,
    Paper,
    styled,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
} from "@mui/material";
import { tableCellClasses } from "@mui/material/TableCell";
import moment from "moment";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

const StyledTableCell = styled(TableCell)(({ theme }) => ({
    [`&.${tableCellClasses.head}`]: {
        backgroundColor: "lightgray",
    },
}));

function InfoSession() {
    const { id: characterId } = useParams();
    const [characterInfo, setCharacterInfo] = useState({});
    const [episodeList, setEpisodeList] = useState([]);

    const getEpisodeNum = (episodes) => {
        let episodeNum = "";
        episodes.map((url, index) => {
            if (index === 0) {
                episodeNum += url.split("/")[url.split("/").length - 1];
            } else {
                episodeNum += "," + url.split("/")[url.split("/").length - 1];
            }
        });
        return episodeNum;
    };

    useEffect(() => {
        fetch(`https://rickandmortyapi.com/api/character/${characterId}`)
            .then((response) => response.json())
            .then((result) => {
                const episodes = result.episode;
                setCharacterInfo(result);
                fetch(
                    `https://rickandmortyapi.com/api/episode/${getEpisodeNum(
                        episodes
                    )}`
                )
                    .then((response) => response.json())
                    .then((result) => setEpisodeList(result));
            })
            .catch((error) => console.error(error));
    }, [characterId]);

    console.log("episode: ", episodeList);
    console.log("char: ", characterInfo);

    return (
        <>
            <div className="infoHeader">
                <div className="infoAvatar">
                    <Avatar
                        alt={characterInfo.name}
                        src={characterInfo?.image}
                        style={{ width: "5rem", height: "5rem" }}
                        component="span"
                    />
                </div>
                <div className="infoName">{characterInfo.name}</div>
                <div className="infoDetail">
                    <div className="title">Personal Info</div>
                    <ol>
                        <li>{`Status: ${characterInfo.status}`}</li>
                        <li>{`Gender: ${characterInfo.gender}`}</li>
                        <li>{`Species: ${characterInfo.species}`}</li>
                        <li>{`Location: ${characterInfo?.location?.name}`}</li>
                        <li>{`Origin: ${characterInfo?.origin?.name}`}</li>
                        <li>{`Created Data: ${moment(
                            characterInfo.created
                        ).format("MMMM DD, YYYY")}`}</li>
                    </ol>
                    <div className="title">Episodes</div>
                </div>
            </div>

            <div className="tableContainer">
                <TableContainer
                    component={Paper}
                    sx={{ overflow: "auto", minHeight: "0", maxHeight: "95%" }}
                >
                    <Table stickyHeader aria-label="sticky table">
                        <TableHead>
                            <TableRow>
                                <StyledTableCell>Name</StyledTableCell>
                                <StyledTableCell>Air Date</StyledTableCell>
                                <StyledTableCell>Episode</StyledTableCell>
                                <StyledTableCell>Created Date</StyledTableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {Array.isArray(episodeList) &&
                                episodeList?.map((item) => (
                                    <TableRow>
                                        <TableCell>{item.name}</TableCell>
                                        <TableCell>{item.air_date}</TableCell>
                                        <TableCell>{item.episode}</TableCell>
                                        <TableCell>
                                            {moment(episodeList.created).format(
                                                "DD MMM YYYY"
                                            )}
                                        </TableCell>
                                    </TableRow>
                                ))}
                            {!Array.isArray(episodeList) && (
                                <TableRow>
                                    <TableCell>{episodeList.name}</TableCell>
                                    <TableCell>
                                        {episodeList.air_date}
                                    </TableCell>
                                    <TableCell>{episodeList.episode}</TableCell>
                                    <TableCell>
                                        {moment(episodeList.created).format(
                                            "DD MMM YYYY"
                                        )}
                                    </TableCell>
                                </TableRow>
                            )}
                        </TableBody>
                    </Table>
                </TableContainer>
            </div>
        </>
    );
}

export default InfoSession;
