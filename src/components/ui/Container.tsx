import {FC, ReactNode} from 'react';
import './index.css'

interface Props {
    children: ReactNode
}

export const Container: FC<Props> = ({children}) => {
    return (
        <div className={"container"}>
            {children}
        </div>
    );
};

