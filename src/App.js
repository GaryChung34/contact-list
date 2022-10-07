import "./App.css";
import InfoSession from "./InfoSession";
import ContactStart from "./ContactStart";
import { Route, Routes, useNavigate } from "react-router-dom";
import ContactList from "./ContactList";

function App() {
    const navigate = useNavigate();

    const toHome = () => {
        navigate("/contact");
        window.location.reload();
    };

    return (
        <>
            <div className="App">
                <div className="container">
                    {/* Nav bar */}
                    <div className="navBar">
                        <div className="navBarHeader">
                            <div className="title">Rick and Morty</div>
                        </div>
                        <div className="navBarContact">
                            <div className="contactButton">
                                <div onClick={toHome}>Contact</div>
                            </div>
                        </div>
                    </div>

                    {/* Contact list */}
                    <div className="contactList">
                        <ContactList />
                    </div>

                    {/* Info. session */}
                    <div className="infoSection">
                        <Routes>
                            {/* this is for starting logo page */}
                            <Route path="/contact" element={<ContactStart />} />

                            {/* detail info when click */}
                            <Route
                                path="/contact/:id"
                                element={<InfoSession />}
                            />
                        </Routes>
                    </div>
                </div>
            </div>
        </>
    );
}

export default App;
