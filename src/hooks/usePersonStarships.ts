import axiosInstance from "../helpers/axiosConfig.ts";
import {API_STARSHIPS} from "../static";
import {useEffect, useState} from "react";
import {Film, Starship} from "../types/entitiesTypes.ts";

interface ResType {
    count: number
    next: string | null
    previous: string | null
    results: Starship[]
}

export function usePersonStarships(id: number) {
    const [starships, setStarships] = useState<Starship[]>([]);
    const filmsData = localStorage.getItem('cachedFilms')
    const films: Film[] | [] = filmsData ? JSON.parse(filmsData) : [];

    const personFilms = films.filter((item: Film) => {
        return item.characters.includes(id)
    })

    const filmsIds = personFilms.map((item: Film) => item.id).join(',')

    useEffect(() => {
        fetchStarships();
    }, [id]);
    const fetchStarships = async () => {
        if (films.length > 0) {

            try {
                const res: ResType = await axiosInstance.get(`${API_STARSHIPS}?films__in=${filmsIds}&pilots__in=${id}`)
                setStarships(res.results)
            } catch (err) {
                throw new Error(`${err}`)
            }
        }
    }


    return {
        starships
    }
}