import { BASE_URL } from "./constants.js";
import { Task, Category } from "./types";

export async function fetchTasks(): Promise<Response | string> {
    try {
        const response = await fetch(`${BASE_URL}/GetTasks`);
        if (!response.ok) {
            throw new Error(response.statusText);
        }
        return response;
    } catch (err) {
        console.log(err);
        return err;
    }
}

export async function fetchAddTask(task: Task): Promise<Response | string> {
    try {
        const response = await fetch(`${BASE_URL}/AddTask`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json; charset=utf-8",
            },
            body: JSON.stringify(task),
        });

        if (!response.ok) {
            throw new Error(response.statusText);
        }
        return response;
    } catch (err) {
        console.log(err);
        return err;
    }
}

export async function fetchUpdateTask(task: Task): Promise<Response | string> {
    try {
        const response = await fetch(`${BASE_URL}/UpdateTask`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json;charset=utf-8",
            },
            body: JSON.stringify(task),
        });

        if (!response.ok) {
            throw new Error(response.statusText);
        }

        return response;
    } catch (err) {
        console.log(err);
        return err;
    }
}

export async function fetchRemoveTask(id: number): Promise<Response | string> {
    try {
        const response = await fetch(`${BASE_URL}/RemoveTask/${id}`);
        if (!response.ok) {
            throw new Error(response.statusText);
        }
        return response;
    } catch (err) {
        console.log(err);
        return err;
    }
}

export async function fetchCategories(): Promise<Response | string> {
    try {
        const response = await fetch(`${BASE_URL}/GetCategories`);
        if (!response.ok) {
            throw new Error(response.statusText);
        }
        return response;
    } catch (err) {
        console.log(err);
        return err;
    }
}

export async function fetchRemoveCategory(id: number): Promise<Response | string> {
    try {
        const response = await fetch(`${BASE_URL}/RemoveCategory/${id}`);
        if (!response.ok) {
            throw new Error(response.statusText);
        }

        return response;
    } catch (err) {
        console.log(err);
        return err;
    }
}

export async function fetchAddCategory(cat: Category): Promise<Response | string> {
    try {
        const response = await fetch(
            "http://localhost:8089/api/ToDoList/AddCategory",
            {
                method: "POST",
                headers: {
                    "Content-Type": "application/json;charset=utf-8",
                },
                body: JSON.stringify(cat),
            }
        );

        if (!response.ok) {
            throw new Error(response.statusText);
        }
        return response;
    } catch (err) {
        console.log(err);
        return err;
    }
}

export async function fetchUpdateCategory(
    cat: Category
): Promise<Response | string> {
    try {
        const response = await fetch(
            "http://localhost:8089/api/ToDoList/UpdateCategory",
            {
                method: "POST",
                headers: {
                    "Content-Type": "application/json;charset=utf-8",
                },
                body: JSON.stringify(cat),
            }
        );

        if (!response.ok) {
            throw new Error(response.statusText);
        }

        return response;
    } catch (err) {
        console.log(err);
        return err;
    }
}
