import CardBlogs from '../../componentes/CardBlogs'
import './index.css'

function Blog() {
    return (
        <>
            <div className="ftco-section">
                <div className="container">
                    <div className="row justify-content-center pb-4">
                        <div className="col-md-12 heading-section text-center ">
                            <span className="subheading">Nuestro Blog</span>
                        </div>
                    </div>
                    <div className="row d-flex">
                        <CardBlogs />
                    </div>
                </div>
            </div>
        </>
    )
}

export default Blog
