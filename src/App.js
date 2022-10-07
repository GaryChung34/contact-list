import "./App.css";
import InfoSession from "./InfoSession";
import ContactStart from "./ContactStart";
import { Route, BrowserRouter as Router, Routes, Link } from "react-router-dom";
import ContactList from "./ContactList";

function App() {
    return (
        <Router>
            <div className="App">
                <div className="container">
                    {/* Nav bar */}
                    <div className="navBar">
                        <div className="navBarHeader">
                            <div className="title">Rick and Morty</div>
                        </div>
                        <div className="navBarContact">
                            <div className="title">
                                <Link to="/contact">Contact</Link>
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
                            <Route path="/contact" element={<ContactStart />} />
                            <Route
                                path="/contact/:id"
                                element={<InfoSession />}
                            />
                        </Routes>
                    </div>
                </div>
            </div>
        </Router>
    );
}

export default App;
