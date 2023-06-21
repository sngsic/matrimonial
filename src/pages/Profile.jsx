import React, { useEffect, useState } from "react";
import Header from "./components/Header";
import NaviBar from "./components/NaviBar";
import Footer from "./components/footer";
import { Card } from "react-bootstrap";
import "./components/cssfiles/profiles.css";
import "./components/cssfiles/footer.css";
import firebase from '../firebase';

function Profile() {
    const [data, setData] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const snapshot = await firebase.database().ref('path/to/data').once('value');
                const dataVal = snapshot.val();
                if (dataVal) {
                    const profiles = Object.values(dataVal);
                    setData(profiles);
                }
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };

        fetchData();
    }, []);

    return (
        <div>
            <Header title="Profiles" />
            <NaviBar />
            <div id="profile-windows">
                <div className='profile-list'>
                    {data.map((profile) => (
                        <Card className="profile-container">
                            <Card.Img className="profile-pic" variant="top" src={profile.profilePic} />
                            <Card.Body>
                                <Card.Title style={{ padding: '5px' }}>Reg.No: {profile.REG_NO}</Card.Title>
                                <hr />
                                <Card.Text className='profile-content' style={{ padding: '5px' }}>
                                    Name          : {profile.name} <br />
                                    {/* Age           : {profile.AGE}<br />
                                    Status: {profile.MARTIAL_STATUS}<br />
                                    Religion      : {profile.RELIGION}<br />
                                    District      : {profile.DISTRICT} */}
                                </Card.Text>
                            </Card.Body>
                        </Card>
                    ))}
                </div>
            </div>
            <Footer title="&copy;SBSY" />
        </div>
    );
}

export default Profile;


















// import React from "react";
// import Header from "./components/Header";
// import NaviBar from "./components/NaviBar";
// import Footer from "./components/footer";
// import { Card } from "react-bootstrap";
// import "./components/cssfiles/profiles.css";
// // import data from "./matrimonial_record.json";
// import "./components/cssfiles/footer.css";

// function Profile() {
//     const data=[];
//     return (
//         <div>
//             <Header title="Profiles" />
//             <NaviBar />
//             <div id="profile-windows">
//                 {/* ----------------------------------------------------------------------- */}
//                 <div class='profile-list'>
//                     {data.map((profile) => (
//                         <Card className="profile-container">
//                             <Card.Img className="profile-pic" variant="top" src="" />
//                             <Card.Body>
//                                 <Card.Title style={{ padding: '5px' }}>Reg.No: {profile.REG_NO}</Card.Title>
//                                 <hr />
//                                 <Card.Text className='profile-content' style={{ padding: '5px' }}>
//                                     Name          : {profile.NAME} <br />
//                                     Age           : {profile.AGE}<br />
//                                     Status: {profile.MARTIAL_STATUS}<br />
//                                     Religion      : {profile.RELIGION}<br />
//                                     District      : {profile.DISTRICT}
//                                 </Card.Text>
//                             </Card.Body>
//                         </Card>
//                     ))}
//                 </div>
//                 {/* ----------------------------------------------------------------------- */}
//             </div>
//             <Footer title="&copy;SBSY" />
//         </div>
//     );
// }

// export default Profile;