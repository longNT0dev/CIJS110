import { createContext, useContext } from "react";



export const UserContext = createContext({
    name: "",
    email: "",
    dob: "",
    isLoggedIn: false,
})


export const useUserContext = () => useContext(UserContext)