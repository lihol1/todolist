import Header from "./components/Header.js";
import Tasks from "./components/Tasks.js";
import Categories from "./components/Categories.js";
import "./App.css";
import Modal from "./components/Modal.js";
import React from "react";
import { useStoreContext } from "./hooks/useStoreContext.js";

function App() {
    const todoStore = useStoreContext();

    return (
        <>
            <div className="page">
                <div className="page__container">
                    <Header />
                    <main className="page__main">
                        {todoStore.type === "task" ? <Tasks /> : <Categories />}
                        <Modal />
                    </main>

                    <footer></footer>
                </div>
            </div>
        </>
    );
}

export default App;
