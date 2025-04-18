import { BASE_URL } from "./constants.js";

export async function getTasks() {
    try {
        const response = await fetch(`${BASE_URL}/GetTasks`);
        if (!response.ok) {
            throw new Error(response.text);
        }
        return response;
    } catch (err) {
        console.log(err);
    }
}

export async function addTask(task) {
    try {
        const response = await fetch(`${BASE_URL}/AddTask`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json; charset=utf-8",
            },
            body: JSON.stringify(task),
        });

        if (!response.ok) {
            throw new Error(response.text);
        }
        return response;
    } catch (err) {
        console.log(err);
    }
}

export async function updateTask(task) {
    try {
        const response = await fetch(`${BASE_URL}/UpdateTask`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json;charset=utf-8",
            },
            body: JSON.stringify(task),
        });

        if (!response.ok) {
            throw new Error(response);
        }

        return response;
    } catch (err) {
        console.log(err);
    }
}

export async function removeTask(id) {
    try {
        const response = await fetch(`${BASE_URL}/RemoveTask/${id}`);
        if (!response.ok) {
            throw new Error(response.text);
        }
        return response;
    } catch (err) {
        console.log(err);
    }
}

export function getCategories() {
    return fetch(`${BASE_URL}/GetCategories`);
}

export async function removeCategory(id) {
    try {
        const response = await fetch(`${BASE_URL}/RemoveCategory/${id}`);
        if (!response.ok) {
            throw new Error(response.text);
        }

        return response;
    } catch (err) {
        console.log(err);
    }
}

export function addCategory(cat) {
    return fetch("http://localhost:8089/api/ToDoList/AddCategory", {
        method: "POST",
        headers: {
            "Content-Type": "application/json;charset=utf-8",
        },
        body: JSON.stringify(cat),
    });
}

export function updateCategory(cat) {
    return fetch("http://localhost:8089/api/ToDoList/UpdateCategory", {
        method: "POST",
        headers: {
            "Content-Type": "application/json;charset=utf-8",
        },
        body: JSON.stringify(cat),
    });
}
