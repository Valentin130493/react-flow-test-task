import { FC, MouseEvent} from 'react';
import './index.css'

interface Props {
    text: string
    onClick?: (event: MouseEvent<HTMLButtonElement>) => void
    disabled?: boolean
}

export const CustomButton: FC<Props> = ({text, onClick, disabled}) => {
    return (
        <button onClick={onClick} className={'button'} disabled={disabled}>
            {text}
        </button>
    );
};
