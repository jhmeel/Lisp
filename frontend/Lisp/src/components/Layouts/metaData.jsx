import { Helmet,HelmetProvider } from 'react-helmet-async'

const MetaData = ({ title,description=''}) => {
    return (
        <HelmetProvider>
        <>
        <Helmet>
            <title>{title}</title>
            <meta name="description" content={description}/>
            </Helmet>
            </>
    </HelmetProvider>
    );
};

export default MetaData;