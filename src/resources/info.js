import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";


const Info = () => {
    const [userInfoData, setUserData] = useState([]);
    const [loading, setLoading] = useState(true);
    let userId;


    useEffect(() => {
        try {
            const currentUser = JSON.parse(localStorage.getItem("currentUser"));
            if (!currentUser || !currentUser.id) {
                throw new Error("localStorage is empty, can't show the 'Info'.");
            }
            userId = currentUser.id;
        } catch (error) {
            console.error(error);
        }


        fetch(`https://jsonplaceholder.typicode.com/users`)
            .then((response) => response.json())
            .then((data) => {
                const infoData = data.filter((item) => item.id === userId);
                setUserData(infoData);
                setLoading(false);
            })
            .catch((error) => {
                console.error(error + "there is a problem with the fetch");
                setLoading(false);
            });
    }, []);


    return (
        <>
            <Link to={`/users/${userId}/layout`}>Go back</Link>
            <h1>Info of {localStorage.currentUsername}:</h1>

            {loading ? (
                <p>Loading...</p>
            ) : userInfoData !== null ? (
                <ul>
                    {userInfoData.map((item) => (
                        <li key={item.id}>
                            <strong>ID:</strong> {item.id}
                            <br />
                            <strong>Name:</strong> {item.name}
                            <br />
                            <strong>UserName:</strong> {item.username}
                            <br />
                            <strong>Email:</strong> {item.email}
                            <br />
                            <strong>Address:</strong> {item.address.street+ " " + item.address.city }
                            <br />
                            <strong>Phone:</strong> {item.phone}
                            <br />
                            <strong>Website:</strong> {item.website}
                            <br />
                            <strong>Company:</strong> {item.company.name}
                            <br />
                        </li>
                    ))}
                </ul>
            ) : (
                <p>No info found for the specified user.</p>
            )}
        </>
    );
};

export default Info;