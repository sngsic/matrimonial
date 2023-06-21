import React, { useEffect, useState } from "react";
import Header from "./components/Header";
import NaviBar from "./components/NaviBar";
// import Footer from "./components/footer";
import { Card } from "react-bootstrap";
import "./components/cssfiles/profiles.css";
import "./components/cssfiles/footer.css";
import firebase from '../firebase';

function Profile() {
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

    return (
        <div>
            <Header title="Profiles" />
            <NaviBar />
            <div id="profile-windows">
                <div className='profile-list'>
                    {data.map((profile) => (
                        <Card key={profile.REG_NO} className="profile-container">
                            <Card.Img className="profile-pic" variant="top" src="" />
                            <Card.Body>
                                <Card.Title style={{ padding: '5px' }}>Reg.No:</Card.Title>
                                <hr />
                                <Card.Text className='profile-content' style={{ padding: '5px' }}>
                                    Name          : {profile.name} <br />
                                    Age           : {calculateAge(profile.dob)}<br />
                                    Status        : {profile.martialStatus}<br />
                                    Religion      : {profile.religion}<br />
                                    District      : {profile.district}
                                </Card.Text>
                            </Card.Body>
                        </Card>
                    ))}
                </div>
            </div>
            {/* <Footer title="&copy;SBSY" /> */}
        </div>
    );
}

export default Profile;

