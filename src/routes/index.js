import { useRoutes } from 'react-router-dom';

// project import
import { useSelector } from 'react-redux';
import routes from './routes';

// ==============================|| ROUTING RENDER ||============================== //

export default function ThemeRoutes() {
    const { isLoggedIn } = useSelector((state) => state.auth);
    // console.log(isLoggedIn);
    return useRoutes(routes(isLoggedIn));
}
