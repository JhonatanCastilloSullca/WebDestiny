import { createContext } from "react";
import { useFetch } from "../Hook/useFetch";
import { DotLoader } from "react-spinners";

export const GeneralContext = createContext();
export const GeneralProvider = ({ children }) => {
    const languageId = localStorage.lng === 'es' ? 1 : localStorage.lng === 'en' ? 2 : 2;

    const requestOptions = {
        method: 'POST',
        token: 'eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiJ9.eyJhdWQiOiI1IiwianRpIjoiNmJjZWFhNWFlYWRkZTQyNDY3ZDZkYmJmMTVlMDhkMmVjMjZkZGM4Yjc5ZDZlZWM5NGIwODliOWRlMDUzNTdlMmE5YWUyOTc4ZjVhYzM5MTQiLCJpYXQiOjE2OTEwMDUwMDMuMjI5NzQzLCJuYmYiOjE2OTEwMDUwMDMuMjI5NzQ2LCJleHAiOjE3MjI2Mjc0MDMuMTA4MzU0LCJzdWIiOiIxIiwic2NvcGVzIjpbXX0.VPsULN8PnrW5EzFxiYlyn5R8ML4w0le-FvZFf1IxMOj2o2NVMUg-EERqJdKV3YWn2NquVgW8-SOPkmCtWJ4kfA_UZdaJ2JUkm0qo39cSNLt2AylXP8s4_pBK6cVBI8xo98fTkcoXgj-hDk6B04t4S2wIu7ddxSfgVdcWbVorN4Woac4i40d3xf6Iu-DnOfs6m5RKGDpOrzExQDrIn6A5_efpcNf1-I3rGgf00aAar2vKtdtZjFAzcVpDKMLm36Q-A0Yl54uEuC_e2RI2nsRhjtK7P0CwSPXzYyz29lU_k47WWJp4nVb0prt_-D5OHHk81LkFZqTiuiw5AB88_l3q65PG20oo8HSTW2c3hV1XPFHwhdVsjLncFX3TWhHUyHAIN48qBOiXl9JVmfeUj6t6uTurjRnaH-kykSke2dUPE77gCiMsLDUYA1dMD8EU42Y3F1tLWs4_CoXiwpjR2TGdjACY4FBHPwOAyrBpLIUKypeBcx3xrWcU2uZS7iTtQS_C2uhGyeMy0xSeBr0S0GICoJmiHmRUMc9gEHzlv40ObZpncXmw7VX1Txc5-DS6Y-GgjKjIPmmVQOWSJbjU7OqMtSaGyjmOTtECwgtlmFpfwEi0_g8L8T2OzgZVYOOROkzxOYnuCB1NLfj2N-NFcZ1cXUvB915l8C-v5ZD9Uulmxmsi',
        body: {
            language_id: languageId
        }
    };
    const { data, loading, error } = useFetch("https://api.vertigotravelperu.com/api/general", requestOptions);
    const general = data;

    if (loading) {
        <>
            <div className="mainloader">
                <div style={{ textAlign: 'center', marginTop: '20px' }}>
                    <DotLoader color="#00b5c4" loading={true} size={100} />
                </div>
            </div>
        </>
    }

    if (error && !error.message) {
        return (
            <>
                <div className="mainloader">
                    <div style={{ textAlign: 'center', marginTop: '20px' }}>
                        <DotLoader color="#00b5c4" loading={true} size={100} />
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
                        <DotLoader color="#00b5c4" loading={true} size={100} />
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
