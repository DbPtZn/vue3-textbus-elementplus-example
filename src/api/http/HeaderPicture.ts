import axios from "axios"

export function getHeaderPicture<T>() {
    return axios.get<T>('/')
}