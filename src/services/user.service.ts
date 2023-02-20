import { httpService } from './http.service'
import type { User } from '../models/User.model'

const LOGGED_IN_USER = 'user'

export const userService = {
    login,
    logout,
    signup,
    getLoggedinUser,
    getUsers,
    getById,
    remove,
    update,
    saveLocalUser,
}

async function getUsers() {
    return httpService.get(`user`)
}

async function getById(userId: string) {
    const user = await httpService.get(`user/${userId}`)
    return user
}

async function remove(userId: string) {
    return httpService.delete(`user/${userId}`)
}

async function update(user: User) {
    await httpService.put(`user/${user._id}`, user)
}

async function login(userCred: User) {
    const user = await httpService.post('auth/login', userCred)
    saveLocalUser(user)
    return user
}

async function signup(userCred: User) {
    const user = await httpService.post('auth/signup', userCred)
    saveLocalUser(user)
    return user
}

async function logout() {
    sessionStorage.removeItem(LOGGED_IN_USER)
    return await httpService.post('auth/logout')
}

function getLoggedinUser() {
    return JSON.parse(sessionStorage.getItem(LOGGED_IN_USER) || 'null')
}

function saveLocalUser(user: User) {
    sessionStorage.setItem(LOGGED_IN_USER, JSON.stringify(user))
    return user
}