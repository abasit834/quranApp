import { useState, useEffect } from "react";
import axios from "axios";
import AsyncStorage from '@react-native-async-storage/async-storage';

const useGetArabic = (url) => {
    const [data, setData] = useState(null);  // Set null because API returns an object
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get(url);
                console.log("Fetched Data:", response.data.data.ayahs); // Log API response
                setData(response.data.data.ayahs); // Store API response in state
                AsyncStorage.setItem('ayah-data',JSON.stringify(response.data.data.ayahs));
            } catch (error) {
                console.error("Error fetching data:", error);
            } finally {
                setLoading(false);
            }
        };
        
        AsyncStorage.getItem('ayah-data').then((value)=>{
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

    return { data, loading , setLoading };
};

export default useGetArabic;