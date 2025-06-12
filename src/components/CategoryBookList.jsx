import { useContext, useEffect } from "react";
import { useLocation } from "react-router-dom";
import { CateGoryContext } from "../context/CategoryContext";




export default function CategoryBookList() {
    const { categoryList, fetchBooks } = useContext(CateGoryContext);
    const { state } = useLocation()
    const { item } = state


    useEffect(() => {
        if (item) {
            fetchBooks({ query: item })
        }
    }, [item])


    return (
        <div>
            {
                categoryList.map((item) =>
                    <div key={item.isbn}>
                        <div>{item.isbn}</div>
                        <div><img src={item.thumbnail} alt="" /></div>
                    </div>
                )
            }
        </div>)
}