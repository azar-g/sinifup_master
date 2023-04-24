import { Suspense } from 'react';

// project import
import Loader from './Loader';

// ==============================|| LOADABLE - LAZY LOADING ||============================== //

const Loadable = (Component) => (props) => {
    // console.log(Component);
    // console.log(props);
    return (
        <Suspense fallback={<Loader />}>
            <Component {...props} />
        </Suspense>
    );
};

export default Loadable;
