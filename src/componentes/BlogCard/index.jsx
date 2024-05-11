import './index.css';


function BlogCard({ blog }) {
    return (
        <div className="col-md-12 d-flex ">
            <div className="blog-entry justify-content-end">
                <a href="blog-single.html" className="block-20" style={{ backgroundImage: `url(${blog.imagenUrl || '../../../src/assets/images/image_1.jpg'})` }}>
                </a>
                <div className="text">
                    <div className="d-flex align-items-center mb-4 topp">
                        <div className="">
                            <span className="mos">{blog.fecha}</span>
                        </div>
                    </div>
                    <h3 className="heading"><a href="#">{blog.Titulo}</a></h3>
                    <div className="descripcion-corta-container">
                        <p className="clamp">{blog.descripcionCorta}</p>
                    </div>
                    <p><a href="#" className="btn btn-primary">Read more</a></p>
                </div>
            </div>
        </div>
    );
}

export default BlogCard;
