import {useMemo} from "react";
import {Character, Film, Starship} from "../types/entitiesTypes.ts";
import {EdgeType, NodeType} from "../types/reactFlow.ts";
import {
    NODE_START_X,
    NODE_START_Y,
    NODE_VERTICAL_SPACING,
    STARSHIP_START_X,
    STARSHIP_START_Y,
    STARSHIP_X_INCREMENT,
    STARSHIP_Y_INCREMENT
} from "../static";

export const useGraphData = (selectedPerson: Character | null, starships: Starship[] | []) => {
    const filmsData = localStorage.getItem('cachedFilms')
    const films: Film[] | [] = filmsData ? JSON.parse(filmsData) : [];

    const getGraphData = () => {
        if (!selectedPerson) {
            return {nodes: [], edges: []};
        }

        const personFilms = films.filter((item: Film) => {
            return item.characters.includes(selectedPerson.id)
        });

        const updatedNodes: NodeType[] = [];
        const updatedEdges: EdgeType[] = [];


        updatedNodes.push({
            id: 'hero',
            type: 'input',
            data: {label: `${selectedPerson.name || ''}`},
            position: {x: NODE_START_X, y: NODE_START_Y},
            style: {
                background: 'red'
            },
        });


        personFilms.forEach((film, filmIndex) => {
            const filmNodeId = `film-${film.id}`;

            updatedNodes.push({
                id: filmNodeId,
                data: {label: `${film.title || ''}`},
                position: {
                    x: NODE_START_X,
                    y: NODE_START_Y + NODE_VERTICAL_SPACING + filmIndex * NODE_VERTICAL_SPACING
                },
                style: {
                    background: 'orange'
                },
            });


            updatedEdges.push({
                id: `edge-hero-${filmNodeId}`,
                source: 'hero',
                target: filmNodeId,
            });


            film.starships.forEach((starshipId, starshipIndex) => {
                const starship = starships.find(s => s.id === starshipId);
                if (starship) {
                    const starshipNodeId = `starship-${starship.id}`;

                    updatedNodes.push({
                        id: starshipNodeId,
                        data: {label: `${starship.model || ''}`},
                        position: {
                            x: STARSHIP_START_X + starshipIndex * STARSHIP_X_INCREMENT,
                            y: STARSHIP_START_Y + filmIndex * NODE_VERTICAL_SPACING + starshipIndex * STARSHIP_Y_INCREMENT
                        },
                        style: {
                            background: 'yellow'
                        },
                    });


                    updatedEdges.push({
                        id: `edge-${filmNodeId}-${starshipNodeId}`,
                        source: filmNodeId,
                        target: starshipNodeId,
                    });
                }
            });
        });

        return {nodes: updatedNodes, edges: updatedEdges};
    };


    return useMemo(getGraphData, [selectedPerson, starships]);
};
