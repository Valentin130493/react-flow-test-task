export interface BaseEntity {
    id: number;
    name: string;
    created: string;
    edited: string;
    url: string;
    title: string
}


export interface Starship extends BaseEntity {
    MGLT: string;
    cargo_capacity: string;
    consumables: string;
    cost_in_credits: string;
    crew: string;
    hyperdrive_rating: string;
    length: string;
    manufacturer: string;
    max_atmosphering_speed: string;
    model: string;
    passengers: string;
    films: number[];
    pilots: number[];
    starship_class: string;
}

export interface Film extends BaseEntity {
    characters: number[];
    director: string;
    episode_id: number;
    opening_crawl: string;
    planets: number[];
    producer: string;
    release_date: string;
    species: number[];
    starships: number[];
    vehicles: number[];
}

export interface Character extends BaseEntity {
    name: string;
    birth_year: string;
    eye_color: string;
    gender: string;
    hair_color: string;
    height: string;
    mass: string;
    skin_color: string;
    homeworld: string;
    films: string[];
    species: string[];
    starships: string[];
    vehicles: string[];
    url: string;
}
