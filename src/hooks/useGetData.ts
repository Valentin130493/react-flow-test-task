import {useState} from "react";
import axiosInstance from "../helpers/axiosConfig.ts";
import {Character} from "../types/entitiesTypes.ts";


interface ResType {
    count: number
    next: string | null
    previous: string | null
    results: Character[]
}

export function useGetData() {
    const [isLoading, setIsLoading] = useState(false);
    const [data, setData] = useState<Character[]>([]);
    const [next, setNext] = useState<string | null>('')
    const [prev, setPrev] = useState<string | null>('')

    const getData = async (url: string) => {
        setIsLoading(true);
        try {
            const res: ResType = await axiosInstance.get(url)
            setPrev(res.previous)
            setNext(res.next)
            setData(res.results as Character[])
        } catch (e) {
            console.error(e)
        } finally {
            setIsLoading(false)
        }

    }


    return {
        isLoading,
        next,
        prev,
        data,
        getData
    }

}