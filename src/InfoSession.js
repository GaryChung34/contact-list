import {
    Avatar,
    Paper,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
} from "@mui/material";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

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
        <div>
            <div className="title">{characterInfo.name}</div>
            <Avatar alt={characterInfo.name} src={characterInfo?.image} />

            <div className="title">Personal Info</div>
            <ol>
                <ul>{`Status: ${characterInfo.status}`}</ul>
                <ul>{`Gender: ${characterInfo.gender}`}</ul>
                <ul>{`Species: ${characterInfo.species}`}</ul>
                <ul>{`Location: ${characterInfo?.location?.name}`}</ul>
                <ul>{`Origin: ${characterInfo?.origin?.name}`}</ul>
                <ul>{`Created Data: ${characterInfo.created}`}</ul>
            </ol>

            <div className="title">Episodes</div>
            <TableContainer component={Paper}>
                <Table>
                    <TableHead>
                        <TableRow>
                            <TableCell>Name</TableCell>
                            <TableCell>Air Date</TableCell>
                            <TableCell>Episode</TableCell>
                            <TableCell>Created Date</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {Array.isArray(episodeList) &&
                            episodeList?.map((item) => (
                                <TableRow>
                                    <TableCell>{item.name}</TableCell>
                                    <TableCell>{item.air_date}</TableCell>
                                    <TableCell>{item.episode}</TableCell>
                                    <TableCell>{item.created}</TableCell>
                                </TableRow>
                            ))}
                        {!Array.isArray(episodeList) && (
                            <TableRow>
                                <TableCell>{episodeList.name}</TableCell>
                                <TableCell>{episodeList.air_date}</TableCell>
                                <TableCell>{episodeList.episode}</TableCell>
                                <TableCell>{episodeList.created}</TableCell>
                            </TableRow>
                        )}
                    </TableBody>
                </Table>
            </TableContainer>
        </div>
    );
}

export default InfoSession;
