import axios from "axios"

export function getSignboard<T>() {
    return axios.get<T>('/')
}