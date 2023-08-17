import { db } from "@/FIREBASE/clientApp";
import { SimpleGrid, Text } from "@chakra-ui/react";
import { collection, getDocs, query, where } from "firebase/firestore";
import { useState } from "react";
import { useEffect } from "react";
import Exemple from "./test";
import { useRouter } from "next/router";

const Listing = ({categorie}) => {
   
    const [tab,setTab] = useState([])
    useEffect(()=>{
        // console.log("categorie")
        // console.log(JSON.parse(localStorage.getItem(categorie)))

    })
   

    
    return(
    <>
         <Exemple key={index} dat={JSON.parse(localStorage.getItem(categorie))} />
    </>
    )
   
   
       

};

export default function Pagination() {
  const [cat, setCat] = useState([]);
  const [total, setTotal] = useState(0);
  const [nombre, setNombre] = useState(0);
  const [check, setCheck] = useState(0);
    const router = useRouter()
  const GetCat = async () => {
    const q = query(collection(db, "Services/"));

    const querySnapshot = await getDocs(q);
    querySnapshot.forEach((doc) => {
      // doc.data() is never undefined for query doc snapshots
      cat.push(doc.id);
    localStorage.setItem("all",cat) 
  
    });
    
  };

  const GetAll = () => {
  
    cat.map(async (data, index) => {
    

      const q = query(
        collection(db, "Admin/"),
        where("categorie", "==", String(data))
      );
      const query1 = await getDocs(q);
      const docs = query1.docs.map((doc) => {
        const data = doc.data();
        data.id = doc.id;
        return data;
      });
      localStorage.setItem(`${data}`, JSON.stringify(docs));
    });
    router.push("/otherContent/test")
  };
  useEffect(() => {
   
      
      GetCat(), GetAll();
      setCheck(1);
    
  }, [check, GetAll, GetCat]);

  return (
    <>
      <SimpleGrid>
        {cat.map((data, index) => (
          <>
            <Listing key={index} categorie={data} />
          </>
        ))}
      </SimpleGrid>
    </>
  );
}
