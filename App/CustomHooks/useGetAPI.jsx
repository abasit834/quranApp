import { useState, useEffect } from "react";
import axios from "axios";
import AsyncStorage from '@react-native-async-storage/async-storage';

const useGETAPI = (url) => {
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        
       
        const fetchData = async () => {  // Define an async function inside useEffect
            try {
                const response = await axios.get(url);
                setData(response.data.data);
                AsyncStorage.setItem('surah-data',JSON.stringify(response.data.data));
                console.log("Fetched Data:", response.data.data); // Log the fetched data
            } catch (error) {
                console.error("Error fetching data:", error);
            } finally {
                setLoading(false);
            }
        };

        AsyncStorage.getItem('surah-data').then((value)=>{
            if(value)
            { 
                const myvalue = JSON.parse(value);
                setData(myvalue);
                setLoading(false);
            }
            else{
                fetchData();
            }

        });
    }, [url]); 

    return { data, loading };
};

export default useGETAPI;