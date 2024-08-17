import {useEffect, useState} from "react";

import {Character} from "../types/entitiesTypes.ts";
import axiosInstance from "../helpers/axiosConfig.ts";
import {API_PEOPLE} from "../static";

export const useFetchCharacter = (id: number | string) => {
    const [selectedPerson, setSelectedPerson] = useState<Character | null>(null);
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        fetchPerson(`${API_PEOPLE}/${id}/`);
    }, [id]);

    const fetchPerson = async (url: string) => {
        if (isLoading || !url) return;
        setIsLoading(true);
        setError(null);

        try {
            const response: Character = await axiosInstance.get(url)
            setSelectedPerson(response);
        } catch (error) {
            let errorMessage: string;
            if (typeof error === 'string') {
                errorMessage = error;
            } else if (error instanceof Error) {
                errorMessage = error.message;
            } else {
                errorMessage = 'An unknown error occurred';
            }
            setError(errorMessage);
        } finally {
            setIsLoading(false);
        }
    };

    return {selectedPerson, isLoading, error};
};