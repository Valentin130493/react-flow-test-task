import {Container} from "../../components/ui/Container.tsx";
import {useEffect} from "react";
import {useGetData} from "../../hooks/useGetData.ts";
import {ListItem} from "../../components/ui/ListItem.tsx";
import './index.css'
import {CustomButton} from "../../components/ui/CustomButton.tsx";
import {useNavigate} from "react-router";
import {ROUTES} from "../../routes";
import {API_PEOPLE} from "../../static";
import {useGetFilms} from "../../hooks/useGetFilms.ts";

const HomePage = () => {
    const navigate = useNavigate();
    const {fetchFilms} = useGetFilms();
    const {getData, isLoading, data, next, prev} = useGetData();

    useEffect(() => {
        getData(API_PEOPLE);
        if (typeof localStorage !== 'undefined') {
            const cachedFilms = localStorage.getItem('cachedFilms');
            if (!cachedFilms) {
                fetchFilms();
            }
        }
    }, []);

    const handleNext = () => getData(`${next}`);
    const handlePrev = () => getData(`${prev}`);
    const handleNavigate = (id: number) => () => {
        navigate(`${ROUTES.hero}/${id}`);
    };

    if (isLoading) {
        return (
            <Container>
                <div>Data Loading...</div>
            </Container>
        );
    }

    return (
        <Container>
            <div className={'buttons'}>
                <CustomButton text={'Prev'} disabled={!prev} onClick={handlePrev}/>
                <CustomButton text={'Next'} disabled={!next} onClick={handleNext}/>
            </div>
            <ul>
                {data?.map((item) => (
                    <ListItem onClick={handleNavigate(item.id)} key={item?.id} character={item}/>
                ))}
            </ul>

        </Container>
    );
};

export default HomePage;
