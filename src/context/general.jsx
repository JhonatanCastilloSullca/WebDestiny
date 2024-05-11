import { createContext } from "react";
import { useFetch } from "../Hook/useFetch";
import { DotLoader } from "react-spinners";

export const GeneralContext = createContext();
export const GeneralProvider = ({ children }) => {

    const requestOptions = {
        method: 'POST',
        body: {
            language_id: 1
        }
    };
    const { data, loading, error } = useFetch("http://192.168.1.22/api/general", requestOptions);
    const general = data;

    if (loading) {
        <>
            <div className="mainloader">
                <div style={{ textAlign: 'center', marginTop: '20px' }}>
                    <DotLoader color="#f79633" loading={true} size={100} />
                </div>
            </div>
        </>
    }

    if (error && !error.message) {
        return (
            <>
                <div className="mainloader">
                    <div style={{ textAlign: 'center', marginTop: '20px' }}>
                        <DotLoader color="#f79633" loading={true} size={100} />
                    </div>
                </div>
            </>
        );
    }

    if (error) {
        return (
            <>
                <div className="mainloader">
                    <div style={{ textAlign: 'center', marginTop: '20px' }}>
                        <DotLoader color="#ff0011" loading={true} size={100} />
                    </div>
                </div>
            </>
        );
    }

    if (!general) {
        return (
            <>
                <div className="mainloader">
                    <div style={{ textAlign: 'center', marginTop: '20px' }}>
                        <DotLoader color="#f79633" loading={true} size={100} />
                    </div>
                </div>
            </>
        );
    }

    return (
        <GeneralContext.Provider value={{ general }}>
            {children}
        </GeneralContext.Provider>
    );
};
