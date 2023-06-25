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
                const snapshot = await firebase.firestore().collection("users").get();
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

    function handleprofileclick(){
        navigate("/user");
    }
    return (
        <div>
            <Header title="Profiles" />
            <NaviBar />

            <div className='profile-list'>
                {data.map((profile) => (
                    <Card  className="profile-container" onClick={handleprofileclick}>
                        <Card.Img className="rounded-circle" variant="top" src= {profile.Image} /> //"https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8dXNlcnxlbnwwfHwwfHx8MA%3D%3D&auto=format&fit=crop&w=500&q=60" />
                        <Card.Body>
                            <Card.Title style={{ padding: '5px' }}>Reg.No:</Card.Title>
                            <hr />
                            <Card.Text className='profile-content' style={{ padding: '5px' }}>
                                Name          : {profile.Name} <br />
                                Age           : {calculateAge(profile.DoB)}<br />
                                Status        : {profile.MartialStatus}<br />
                                Occupation    : {profile.Occupation}<br />
                                District      : {profile.District}
                            </Card.Text>
                        </Card.Body>
                    </Card>
                ))}
            </div>

            {/* <Footer title="&copy;SBSY" /> */}
        </div>
    );
}

export default Profile;

