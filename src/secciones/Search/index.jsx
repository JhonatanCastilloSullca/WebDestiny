import { Col, Container, Form, Row, Tab } from 'react-bootstrap'
import './index.css'
import { FaSearch } from 'react-icons/fa'
import { useState } from "react"
import { NavLink } from 'react-router-dom'
import { useTranslation } from 'react-i18next'

const SearchResultList = ({ results }) => {

    if (!Array.isArray(results)) {
        return <div></div>;
    }

    return (
        <>

            {results.map((result) => (
                <NavLink to={`/tours/${result.id}`} key={result.id} className="nav-link">
                    <Row className='result-item p-0 m-0'>
                        <Col md={2} className='p-0 m-0'>
                            <img src={result.imagenprincipal} alt="" className='h-100 w-100 object-fit-cover p-4' />
                        </Col>
                        <Col md={10} className="d-flex align-items-center p-0 m-0">
                            <div className="d-grid">
                                <div className="titulo-search text-dark">
                                    {result.nombre}
                                </div>
                                <div className="categorias-search">
                                    {result.categoria.nombre}
                                </div>
                            </div>
                        </Col>
                    </Row>
                </NavLink>
            ))}
        </>
    );
};


function Search() {

    const { t } = useTranslation("translation");
    const languageId = localStorage.lng === 'es' ? 1 : localStorage.lng === 'en' ? 2 : 1;
    const [input, setInput] = useState("");
    const [results, setResults] = useState(""); const fetchData = (value) => {
        if (value.trim() === '') {
            setResults([]);
            return;
        }

        const headers = {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiJ9.eyJhdWQiOiI1IiwianRpIjoiNmJjZWFhNWFlYWRkZTQyNDY3ZDZkYmJmMTVlMDhkMmVjMjZkZGM4Yjc5ZDZlZWM5NGIwODliOWRlMDUzNTdlMmE5YWUyOTc4ZjVhYzM5MTQiLCJpYXQiOjE2OTEwMDUwMDMuMjI5NzQzLCJuYmYiOjE2OTEwMDUwMDMuMjI5NzQ2LCJleHAiOjE3MjI2Mjc0MDMuMTA4MzU0LCJzdWIiOiIxIiwic2NvcGVzIjpbXX0.VPsULN8PnrW5EzFxiYlyn5R8ML4w0le-FvZFf1IxMOj2o2NVMUg-EERqJdKV3YWn2NquVgW8-SOPkmCtWJ4kfA_UZdaJ2JUkm0qo39cSNLt2AylXP8s4_pBK6cVBI8xo98fTkcoXgj-hDk6B04t4S2wIu7ddxSfgVdcWbVorN4Woac4i40d3xf6Iu-DnOfs6m5RKGDpOrzExQDrIn6A5_efpcNf1-I3rGgf00aAar2vKtdtZjFAzcVpDKMLm36Q-A0Yl54uEuC_e2RI2nsRhjtK7P0CwSPXzYyz29lU_k47WWJp4nVb0prt_-D5OHHk81LkFZqTiuiw5AB88_l3q65PG20oo8HSTW2c3hV1XPFHwhdVsjLncFX3TWhHUyHAIN48qBOiXl9JVmfeUj6t6uTurjRnaH-kykSke2dUPE77gCiMsLDUYA1dMD8EU42Y3F1tLWs4_CoXiwpjR2TGdjACY4FBHPwOAyrBpLIUKypeBcx3xrWcU2uZS7iTtQS_C2uhGyeMy0xSeBr0S0GICoJmiHmRUMc9gEHzlv40ObZpncXmw7VX1Txc5-DS6Y-GgjKjIPmmVQOWSJbjU7OqMtSaGyjmOTtECwgtlmFpfwEi0_g8L8T2OzgZVYOOROkzxOYnuCB1NLfj2N-NFcZ1cXUvB915l8C-v5ZD9Uulmxmsi'
        };
        const body = {
            language_id: languageId
        }

        fetch("https://api.machupicchudestinytravel.com/api/tours", {
            method: 'POST',
            headers: headers,
            body: JSON.stringify(body),
        })
            .then((response) => {
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                return response.json();
            })
            .then((json) => {
                const result = json.filter((tour) => {
                    return tour && tour.nombre && tour.nombre.toLowerCase().includes(value.toLowerCase());
                });
                setResults(result);
            })
            .catch((error) => {
                console.error('Error fetching data:', error);
            });
    }

    const handleChange = (value) => {
        setInput(value);
        fetchData(value);
    }

    return (
        <>
            <div className="ftco-section ftco-no-pb ftco-no-pt">
                <Container>
                    <Row>
                        <Col md={12}>
                            <div className="ftco-search d-flex justify-content-center z-3">
                                <Row className='w-100'>
                                    <Col md={12} className="tab-wrap">
                                        <Tab.Content id="v-pills-tabContent">
                                            <Tab.Pane active id="v-pills-1" role="tabpanel" aria-labelledby="v-pills-nextgen-tab">
                                                <Form className="search-property-1" >
                                                    <Row >
                                                        <Col md className="d-flex">
                                                            <div className="form-group px-4 py-2 border-0">
                                                                <div className="form-field d-flex h2 m-0">
                                                                    <FaSearch className='icon-search' ></FaSearch>
                                                                    <Form.Control type="text" placeholder={t("header.search")} className='h1 m-0 text-search' value={input} onChange={(e) => handleChange(e.target.value)} />
                                                                </div>
                                                            </div>
                                                        </Col>
                                                    </Row>
                                                    <SearchResultList results={results} />
                                                </Form>
                                            </Tab.Pane>
                                        </Tab.Content>
                                    </Col>
                                </Row>
                            </div>
                        </Col>
                    </Row>
                </Container>
            </div>
        </>
    )
}

export default Search
