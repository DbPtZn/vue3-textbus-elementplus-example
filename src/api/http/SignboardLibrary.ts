import axios from "../index"

export function getSignboardLibrary<T>() {
    return axios.get<T>('/')
}

export function createSignboardLibrary<T>(name:string) {
    console.log(name)
    return axios.post<T>('signboardLibrary/create',name)
}