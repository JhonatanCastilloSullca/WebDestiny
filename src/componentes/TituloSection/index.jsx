import './index.css';

function TituloSection({ titulo, subtitulo }) {
    return (
        <div className="row justify-content-center pb-4">
            <div className="col-md-12 heading-section text-center">
                <span className="subheading">{titulo}</span>
                <h2 className="line-09">{subtitulo}</h2>
                <div className="col-md-12 text-center heading-section   d-flex flex-column align-items-center  ">
                    <div className='d-flex gap-2 w-50 justify-content-center align-items-center'>
                        <div className="lineadiseño">
                        </div>
                        <div className="">
                            <img src="src\assets\images\loc.png" alt="" className='imgdiseño' />
                        </div>
                        <div className="lineadiseño">

                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default TituloSection;
