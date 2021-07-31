// import React,  { createContext, useContext, useState } from "react"
// import { UserProfileContext } from "./postUserProfileManager"
// import firebase from "firebase/app";
import "firebase/auth";
import { getToken } from "./authManager";

const _apiUrl = "/api/question";


export const editQuestion = (question) => {
    return getToken().then((token) => {
        return fetch(`${_apiUrl}/${question.id}`, {
            method: "PUT",
            headers: {
                Authorization: `Bearer ${token}`,
                "Content-Type": "application/json"
            },
            body: JSON.stringify(question)
        }).then(resp => {
            if (resp.ok) {
                return;
            } else if (resp.status === 401) {
                throw new Error("Unauthorized");
            } else {
                throw new Error("An unknown error occurred while trying to save a new category.");
            }
        });
    });
};