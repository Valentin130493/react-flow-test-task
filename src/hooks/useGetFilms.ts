import {Film} from "../types/entitiesTypes.ts";
import axiosInstance from "../helpers/axiosConfig.ts";
import {API_FILMS} from "../static";


interface ResType {
    count: number
    next: string | null
    previous: string | null
    results: Film[]
}

export function useGetFilms() {

    const fetchFilms = async () => {
        try {
            const response: ResType = await axiosInstance.get(API_FILMS);
            const fetchedFilms = response.results;

            if (typeof localStorage !== 'undefined') {
                localStorage.setItem('cachedFilms', JSON.stringify(fetchedFilms));
            }
        } catch (error) {
            console.error('Error fetching films:', error);
        }
    };

    return {
        fetchFilms,
    }
}