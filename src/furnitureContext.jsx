import { useState } from "react";
import { useContext } from "react";
import { createContext } from "react";
import MockFurniture from '../MOCK_FURNITURE.json' 
// import MockFurniture from '../BIG_MOCK_FURNITURE.json' 

export const FurnitureContext = createContext({
    furniture: [ ],
    setFurniture: () => { },
    createNewFurniture: () => { },
    UpdateFurniture: () => { }
})

export const useFurniture = () => {
    return useContext(FurnitureContext)
}

const FurnitureProvider = ({ children }) => {
    const [furniture, setFurniture] = useState(
        JSON.parse(localStorage.getItem("Furniture")) || 
        // [
        //     {
        //         title: '',
        //         description: '',
        //         photo: [],
        //         category: '',
        //         color: '',
        //         condition: '',
        //         publishDate: new Date,
        //         isAtStorage: true,
        //         address: '',
        //         donerName: '',
        //         donerPhone: '',
        //         furnitureID: '',
        //     }
        // ]
        MockFurniture
    );



    const createNewFurniture = (newFurniture) => {
        setFurniture((prev) => {
            if (prev.some((Furniture) => Furniture.title === newFurniture.title)) {
                return prev,
                    alert('furniture already exsists')
            }
            localStorage.setItem("Furniture", JSON.stringify([...prev, newFurniture]));
            return [...prev, newFurniture];
        });
    };

    // const createDummyData = () => {
    //     setFurniture(MockFurniture)
    // }
    const UpdateFurniture = (info)=>{
        const tempFurnitureArray = furniture.filter((e)=> e.furnitureID !== info.furnitureID)
        tempFurnitureArray.push(info)
        setFurniture(tempFurnitureArray)
        localStorage.setItem("Furniture", JSON.stringify(tempFurnitureArray))
        return [tempFurnitureArray]
      }


    return (
        <FurnitureContext.Provider value={{ furniture, setFurniture, createNewFurniture, UpdateFurniture }}>
            {children}
        </FurnitureContext.Provider>
    )
}

export default FurnitureProvider