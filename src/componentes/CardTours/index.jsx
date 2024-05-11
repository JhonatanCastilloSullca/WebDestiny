import './index.css'
import { GiDuration } from "react-icons/gi";
import { AiOutlineTeam } from "react-icons/ai";
import { NavLink } from 'react-router-dom';
import { Button, Card } from 'react-bootstrap';
import { FaClock, FaLocationDot, FaRightLong } from 'react-icons/fa6';
import { FaLongArrowAltRight, FaUserFriends } from 'react-icons/fa';

function CardTours({ tours, md }) {
    const hasTours = tours?.length > 0;
    return (
        <>
            {hasTours ? (
                tours.map(tour => (
                    <NavLink key={tour.id}
                        to={`/tours/${tour.slug}`}
                        className={`col-md-${md} pt-4`}
                    >
                        <Card className=" border-0 bg-transparent">
                            <Card.Img variant="top" className='bg-gray img-card-style' src={tour.imagenprincipal} />
                            <Card.Body className='body-card'>
                                <Card.Title className='body-card-tittle'>{tour.nombre}</Card.Title>
                                <Card.Title className='ubicaciones-card-tittle d-flex align-items-center'>
                                    <FaLocationDot className='text-primary' />
                                    {
                                        tour?.ubicaciones?.map((ubi, index) => (
                                            <span key={ubi.id}>
                                                {ubi.nombre}
                                                {index < (tour.ubicaciones.length - 1) && ' - '}
                                            </span>
                                        ))
                                    }

                                </Card.Title>
                                <Card.Text className='card-description' dangerouslySetInnerHTML={{ __html: tour.descripcion }} />
                                <div className='d-flex justify-content-end'>
                                    <div className="text-precio-card"> Precio: </div>
                                    <div className="text-precio-data px-2"> {tour.precio}</div>
                                </div>
                                <div className="m-2">
                                    <div className="ba-meta">
                                        <div className="meta-left d-flex gap-2 align-items-center">
                                            <FaClock />
                                            <span>{tour.duracion} {tour.unidad}</span>
                                            <FaUserFriends />
                                            <span>{tour.tamaño_grupo} Max</span>
                                        </div>
                                        <div className="meta-right">
                                            <FaRightLong className='text-primary ver-tour' />
                                        </div>
                                    </div>
                                </div>
                            </Card.Body>
                        </Card>
                    </NavLink>

                ))
            ) : (
                <p>*No se encontraron resultados</p>
            )}
        </>
    );
}

export default CardTours;



// <div key={tour.id} className="col-md-4">
// <div className="project-wrap">
//     <div className="rounded"></div>
//     <NavLink
//         to={`/tours/${tour.slug}`}
//         className="img"
//         style={{
//             backgroundImage: `url(${tour.imagenprincipal ? tour.imagenprincipal : 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSTJbnQkQbM5APIunAO_B6Upp9b8zqnscVro8WPe2Ic9Q&s'})`
//         }}
//     >
//         <span className="price">S/. {tour.precio || 'Precio no disponible'}</span>
//     </NavLink>
//     <div className="text p-4">
//         <NavLink to={`/tours/${tour.slug}`} className="category-link">{tour.categoria?.nombre || 'Categoría no disponible'}</NavLink>
//         <h3><NavLink to={`/tours/${tour.slug}`}>{tour.nombre}</NavLink></h3>
//         <p className="location mb-0"><span className="fa fa-map-marker"></span>
//             {tour.ubicaciones?.map((ubicacion, index) => (
//                 <span key={ubicacion.id}>{(index ? ', ' : '') + ubicacion.nombre}</span>
//             ))}
//         </p>
//         <ul>
//             <li><span><AiOutlineTeam /></span> {tour.tamaño_grupo || 'Tamaño del grupo no disponible'}</li>
//             <li><span><GiDuration /></span> {tour.duracion} {tour.unidad?.toLowerCase() || 'Duración no disponible'}</li>
//         </ul>
//     </div>
// </div>
// </div>