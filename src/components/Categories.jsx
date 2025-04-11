import { useState, useEffect } from "react";
import { getCategories } from "../services";

export default function CategoryPage() {
    const [cats, setCats] = useState();
    // const context = useContext(Context)
    // console.log(context)

    async function getData() {
        try {
            const response = await getCategories();

            const res = await response.json();
            if (!response.ok) {
                throw new Error(response.text);
            }
            setCats(res);
            console.log(res);
            return res;
        } catch (err) {
            console.log(err);
        }
    }

    useEffect(() => {
        getData();
    }, []);

    return (
        <ul>
            {cats &&
                cats.map((cat) => {
                    return (
                        <li key={cat.id}>
                            {cat.name} - {cat.description}
                        </li>
                    );
                })}
        </ul>
    );
}
