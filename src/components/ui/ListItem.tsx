import {FC, MouseEvent, useState} from 'react';
import './index.css'
import {Character} from "../../types/entitiesTypes.ts";

interface Props {
    character: Character
    onClick?: () => void
}

export const ListItem: FC<Props> = ({character, onClick}) => {
    const [show, setShow] = useState(false)
    const handleShowMore = (e: MouseEvent<HTMLParagraphElement>) => {
        e.stopPropagation()
        setShow(true)
    }
    return (
        <div className={'list_item'} onClick={onClick}>
            <h2>{character?.name}</h2>
            {!show && <p className={'loading'} onClick={handleShowMore}>More info...</p>}
            {show &&
                <>
                    <p>Height: {character?.height}</p>
                    <p>Mass: {character?.mass}</p>
                    <p>Hair Color: {character?.hair_color}</p>
                    <p>Skin Color: {character?.skin_color}</p>
                    <p>Eye Color: {character?.eye_color}</p>
                    <p>Birth Year: {character?.birth_year}</p>
                    <p>Gender: {character?.gender}</p>
                </>
            }
        </div>
    );
};

