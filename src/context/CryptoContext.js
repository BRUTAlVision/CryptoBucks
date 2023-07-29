//create context object 

import { createContext, useState, useLayoutEffect } from "react";


export const CryptoContext = createContext({});

// create the provider component 

export const CryptoProvider = ({ children }) => {


    const [cryptoData, setcryptoData] = useState();
    const [searchData, setsearchData] = useState();
    const [coinSearch, setcoinSearch] = useState("");
    const [currency, setcurrency] = useState("usd");
    const [sort, setsort] = useState("market_cap_desc");
    const [page, setpage] = useState(1);
    const [Totalpage, setTotalpage] = useState(1);
    const [Perpage, setPerpage] = useState(10);

    // const getCoinData = async () => {
    //     try {
    //         const data = await fetch(`https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=10&page=1&sparkline=false&price_change_percentage=1h%2C24h%2C7d&locale=en`).then(res => res.json()).then(json => json);
    //         // console.log(data);
    //         setcryptoData(data);
    //     } catch (error) {
    //         console.log(error);
    //     }
    // }

    const getSearchResult = async (query) => {
        try {
            const data = await fetch(`https://api.coingecko.com/api/v3/search?query=${query}`).then(res => res.json()).then(json => json);
            console.log(data);
            setsearchData(data.coins);
        } catch (error) {
            console.log(error);
        }
    }
    const getCryptoData = async () => {
        try {
            const data = await fetch(`https://api.coingecko.com/api/v3/coins/list`).then(res => res.json()).then(json => json);
            // console.log(data);
            setTotalpage(data.length);
        } catch (error) {
            console.log(error);
        }
        try {
            const data = await fetch(`https://api.coingecko.com/api/v3/coins/markets?vs_currency=${currency}&ids=${coinSearch}&order=${sort}&per_page=${Perpage}&page=${page}&sparkline=false&price_change_percentage=1h%2C24h%2C7d&locale=en`).then(res => res.json()).then(json => json);
            // console.log(data);
            setcryptoData(data);
        } catch (error) {
            console.log(error);
        }
    }


    useLayoutEffect(() => {
        getCryptoData();

    }, [coinSearch, currency, sort, page, Totalpage,Perpage])

    return (
        <CryptoContext.Provider value={{ cryptoData, searchData, getSearchResult, setcoinSearch, setsearchData, setcurrency, currency, setsort, sort, setpage, page, Totalpage,Perpage,setPerpage }}>
            {children}
        </CryptoContext.Provider>
    )
}