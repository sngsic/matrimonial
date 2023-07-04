import React, { useEffect, useState } from "react";
import Header from "./components/Header";
import NaviBar from "./components/NaviBar";
import { Card } from "react-bootstrap";
import "./components/cssfiles/profiles.css";
import "./components/cssfiles/footer.css";
import firebase from '../firebase';
import "bootstrap/dist/css/bootstrap.min.css";
import { useNavigate } from "react-router-dom";


function Profile() {
    const navigate = useNavigate();
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const snapshot = await firebase.firestore().collection("user-details").get();
                const profiles = snapshot.docs.map(doc => doc.data());
                setData(profiles);
            } catch (error) {
                console.error('Error fetching data:', error);
            }
            setLoading(false);
        };

        fetchData();
    }, []);

    if (loading) {
        return <div className="loading">Loading...</div>;
    }

    function calculateAge(dateOfBirth) {
        const birthDate = new Date(dateOfBirth);
        const today = new Date();

        let age = today.getFullYear() - birthDate.getFullYear();

        const hasBirthdayOccurred = today.getMonth() > birthDate.getMonth() ||
            (today.getMonth() === birthDate.getMonth() && today.getDate() >= birthDate.getDate());

        if (!hasBirthdayOccurred) {
            age--;
        }

        return age;
    }

    function handleprofileclick() {
        if (localStorage.getItem("email")) {
            navigate("/user");
        } else {
            alert("You need to be logged in to view this profile.");
        }
    }
    return (
        <div>
            <Header title="Profiles" />
            <NaviBar />

            <div className='profile-list'>
                {data.map((profile) => (
                    <div className="profile-container" onClick={handleprofileclick} key={profile.id}>
                        <div className="profile-image">
                            <img
                                className="rounded-circle"
                                src={profile.DownloadURL || "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8dXNlcnxlbnwwfHwwfHx8MA%3D%3D&auto=format&fit=crop&w=500&q=60"}
                                alt="Profile"
                            />
                        </div>
                        <div className="profile-details">
                            <h5 className="profile-name">{profile.Name}</h5>
                            <p className="profile-info">Age: {calculateAge(profile.DoB)}</p>
                            <p className="profile-info">Status: {profile.MartialStatus}</p>
                            <p className="profile-info">Occupation: {profile.Occupation}</p>
                            <p className="profile-info">District: {profile.District}</p>
                        </div>
                    </div>
                ))}
            </div>


            {/* <Footer title="&copy;SBSY" /> */}
        </div>
    );
}

export default Profile;

