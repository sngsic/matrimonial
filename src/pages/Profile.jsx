import React from "react";
import Header from "./components/Header";
import NaviBar from "./components/NaviBar";
import { Card } from "react-bootstrap";
import "./components/cssfiles/profiles.css";
import data from "./matrimonial_record.json";

function Profile() {

    return (
        <div>
            <Header title="Profiles" />
            <NaviBar />

            {/* ----------------------------------------------------------------------- */}
            <div class='profile-list'>
                {data.map((profile) => (
                <Card className="container">
                    <Card.Img className = "profile-pic" variant="top" src={profile.IMG_PATH} />
                    <Card.Body>
                        <Card.Title style={{ padding: '5px' }}>Reg.No: {profile.REG_NO}</Card.Title>
                        <hr />
                        <Card.Text className='profile-content' style={{ padding: '5px' }}> 
                                Name          : {profile.NAME} <br />
                                Age           : {profile.AGE}<br />
                                Status: {profile.MARTIAL_STATUS}<br />
                                Religion      : {profile.RELIGION}<br />
                                District      : {profile.DISTRICT}
                        </Card.Text>
                    </Card.Body>
                </Card>
                ))}
            </div>
            {/* ----------------------------------------------------------------------- */}
        </div>
    );
}

export default Profile;