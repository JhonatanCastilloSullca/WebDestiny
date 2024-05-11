import './index.css';

function TituloSection({ titulo, subtitulo }) {
    return (
        <div className="row justify-content-center pb-4">
            <div className="col-md-12 heading-section text-center">
                <span className="subheading">{titulo}</span>
                <h2 className="mb-4">{subtitulo}</h2>
            </div>
        </div>
    );
}

export default TituloSection;
