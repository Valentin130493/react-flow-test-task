import {useNavigate} from "react-router";
import {ROUTES} from "../../routes";
import './errorPage.css'
import {Container} from "../../components/ui/Container.tsx";
import {CustomButton} from "../../components/ui/CustomButton.tsx";

const ErrorPage = () => {
    const navigate = useNavigate();
    const handleBackHome = () => {
        navigate(ROUTES.home);
    }
    return (
        <Container>
            <h1>404 Not Found</h1>
            <p>This page does not exist</p>
            <CustomButton text={"Go Back"} onClick={handleBackHome}/>
        </Container>
    );
};

export default ErrorPage;