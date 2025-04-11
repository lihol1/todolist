import { BASE_URL } from "./constants.js";

export async function getTasks() {
    // return fetch(`${BASE_URL}/GetTasks`)
    // return fetch(`${BASE_URL}/GetTasks`, {
    //   method: 'GET',
    //   headers: {
    //     'Content-Type': 'application/json; charset=utf-8'
    //   },

    // });

    try {
        const response = await fetch(`${BASE_URL}/GetTasks`);

        const res = await response.json();
        if (!response.ok) {
            throw new Error(response.text);
        }
        return res;
    } catch (err) {
        console.log(err);
    }
}

export function getCategories() {
    return fetch(`${BASE_URL}/GetCategories`);
}

export async function removeTask(id) {
    // return fetch(`${BASE_URL}/RemoveTask/${id}`);
    try {
        const response = await fetch(`${BASE_URL}/RemoveTask/${id}`);
        if (!response.ok) {
            throw new Error(response.text);
        }
        const res = await response.json();
        return res;
    } catch (err) {
        console.log(err);
    }
}

export function removeCategory(id) {
    return fetch(`${BASE_URL}/RemoveCategory/${id}`);
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
        const res = await response.json();
        return res;
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

export async function updateTask(task) {
    try {
        const response = await fetch(
            `${BASE_URL}/UpdateTask`,
            {
                method: "POST",
                headers: {
                    "Content-Type": "application/json;charset=utf-8",
                },
                body: JSON.stringify(task),
            }
        );

        if (!response.ok) {
            throw new Error(response.text);
        }
        const res = await response.json();
        
        return res;
    } catch (err) {
        console.log(err);
    }
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
