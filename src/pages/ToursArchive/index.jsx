import { Card, Col, Container, Form, FormControl, FormGroup, Row } from "react-bootstrap"
import './index.css'
import CardTours from "../../componentes/CardTours"
import { useContext, useEffect, useState } from "react"
import { useFetch } from "../../Hook/useFetch"
import { GeneralContext } from "../../context/general"
import { DotLoader } from "react-spinners"

function ToursArchive() {


    const languageId = localStorage.lng === 'es' ? 1 : localStorage.lng === 'en' ? 2 : null;
    const requestOptions = {
        method: 'POST',
        body: {
            language_id: languageId
        }
    };

    const { data: GeneralData, loading: generalLoading, error: generalError } = useFetch("https://api.vertigotravelperu.com/api/categorias", requestOptions);
    const { data: tourData, loading: tourLoading, error: tourError } = useFetch("https://api.vertigotravelperu.com/api/tours", requestOptions);


    const [filteredCount, setFilteredCount] = useState(0);
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 6;
    const [category, setCategory] = useState('');
    const [maxPrice, setMaxPrice] = useState(0);
    const [keyword, setKeyword] = useState('');
    const [filters, setFilters] = useState({
        category: 'all',
        maxPrice: 0,
        keyword: ''
    });
    const [toursData, setToursData] = useState([]);
    useEffect(() => {
        if (tourData) {
            setToursData(tourData);
            updateFilteredCount(tourData);
        }
    }, [tourData, filters]);
    const paginate = (array, page_size, page_number) => {
        return array.slice((page_number - 1) * page_size, page_number * page_size);
    };





    const updateFilteredCount = (data) => {
        const filtered = filterTours(data);
        setFilteredCount(filtered.length);
    };

    const handleChange = (event) => {
        const newCategory = event.target.id;
        setCategory(newCategory);
        setFilters(prevFilters => ({
            ...prevFilters,
            category: newCategory
        }));
    };

    const handleChangeMaxPrice = (event) => {
        const newMaxPrice = event.target.value;
        setMaxPrice(newMaxPrice);
        setFilters(prevFilters => ({
            ...prevFilters,
            maxPrice: newMaxPrice
        }));
    };
    const handleChangeKeyword = (event) => {
        const newKeyword = event.target.value;
        setKeyword(newKeyword);
        setFilters(prevFilters => ({
            ...prevFilters,
            keyword: newKeyword
        }));
    };

    const filterTours = (tours) => {
        return tours.filter(tour => {
            const price = Number(tour.precio);
            return (
                price >= filters.maxPrice &&
                (filters.category === 'all' || tour.categoria.nombre.toLowerCase() === filters.category) &&
                tour.nombre.toLowerCase().includes(filters.keyword.toLowerCase())
            );
        });
    };

    const filteredTours = filterTours(toursData);

    const paginatedTours = paginate(filteredTours, itemsPerPage, currentPage);

    const totalPages = Math.ceil(filteredTours.length / itemsPerPage);

    const handlePageChange = (pageNumber) => {
        setCurrentPage(pageNumber);
    };

    const paginationItems = Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
        <li key={page} className={`page-item ${currentPage === page ? 'active' : ''}`}>
            <button className="page-link" onClick={() => handlePageChange(page)}>
                {page}
            </button>
        </li>
    ));

    if (tourLoading) return <div className="mainloader">
        <div style={{ textAlign: 'center', marginTop: '20px' }}>
            <DotLoader color="#00b5c4" loading={true} size={100} />
        </div>
    </div>;
    if (tourError) return <div>Error: {tourError.message}</div>;
    if (!toursData) return <div>No se encontraron tours</div>;



    return (
        <>
            <div className="hero-wrap js-mediumheight" style={{ backgroundImage: "url('../../../src/assets/images/bg_5.jpg')" }}>
                <div className="container p-3">
                    <div className="row no-gutters slider-text js-mediumheight align-items-center">
                        <div className="col-md-7 ">
                            <span className="subheading">Bienvenido a Destiny Travel</span>
                            <p className="caps">Lorem ipsum dolor sit amet consectetur adipisicing elit. Laboriosam nulla, ex nobis culpa iusto rem itaque consequatur illum fugiat dolore consequuntur saepe sapiente provident. Quod accusantium quidem fuga dolores architecto! Lorem, ipsum dolor sit amet consectetur adipisicing elit. Exercitationem, voluptatibus alias. Sit nisi, tenetur voluptate recusandae esse numquam unde quo corporis ad laborum? Sed excepturi, tenetur odit fugiat libero molestiae?</p>
                        </div>
                    </div>
                </div>
            </div>
            <Container className="mt-4">
                <Row>
                    <Col md={3}>
                        <Card>
                            <Card.Body>
                                <Form className="filter-form">
                                    <FormGroup className="mb-3 form-group-filter" controlId="BuscarInput">
                                        <Form.Label className="form-control-sm m-0 font-weight-bolder">Buscar </Form.Label>
                                        <FormControl type="text" value={filters.keyword}
                                            onChange={handleChangeKeyword} className="input-formulario-filter fs-12" />
                                    </FormGroup>
                                    <FormGroup className="mb-3">
                                        <Form.Label className="form-control-sm m-0 font-weight-bolder">Características</Form.Label>
                                        <div>
                                            {GeneralData.map((categoria) => (
                                                <Form.Check
                                                    type="radio"
                                                    label={categoria.nombre}
                                                    id={categoria.nombre.toLowerCase()}
                                                    className="fs-14"
                                                    name="categoria"
                                                    onChange={handleChange}
                                                    key={categoria.id}
                                                />
                                            ))}
                                            <Form.Check
                                                type="radio"
                                                label="Todos"
                                                id="all"
                                                className="fs-14"
                                                name="categoria"
                                                onChange={handleChange}
                                            />
                                        </div>
                                    </FormGroup>
                                    <FormGroup className="mb-3" controlId="FiltroRadio">
                                        <Form.Label className="form-control-sm m-0 font-weight-bolder">Precio Maximo</Form.Label>
                                        <div className="d-flex gap-2">
                                            <Form.Range
                                                variant="primary"
                                                min={0}
                                                max={1000}
                                                defaultValue={0}
                                                onChange={handleChangeMaxPrice}
                                            />
                                            <span>{maxPrice}</span>
                                        </div>
                                    </FormGroup>
                                </Form>
                            </Card.Body>
                        </Card>
                    </Col>
                    <Col md={9}>
                        <Row>
                            <div className="mb-3">
                                <p>Mostrando {filteredCount} resultados</p>
                            </div>
                            <div className="mb-3">
                                <ul className="pagination">
                                    {paginationItems}
                                </ul>
                            </div>
                            <CardTours tours={paginatedTours} md={6} />
                            <div className="mb-3">
                                <ul className="pagination">
                                    {paginationItems}
                                </ul>
                            </div>
                        </Row>
                    </Col>
                </Row>
            </Container>
        </>
    )
}

export default ToursArchive
