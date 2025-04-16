import Header from "./components/Header.jsx";
import Tasks from "./components/Tasks";
import Categories from "./components/Categories";
import { TodoStore } from "./context/StoreProvider.jsx";
import "./App.css";
import { useContext } from "react";
import Modal from "./components/Modal.jsx";

function App() {
    const todoStore = useContext(TodoStore);

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
