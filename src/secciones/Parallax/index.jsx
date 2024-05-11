import './index.css'
function Parallax() {
    // style={{ backgroundImage: `url(${parallax.imagen})` }}
    return (
        <div className="ftco-section ftco-about img" style={{ backgroundImage: "url('./src/assets/images/Lago-Salvador-_Parque-Nacional-del-Manu-Juan-Carlos.webp')" }}>
            <div className="overlay overlay-parallax"></div>
        </div>
    );
}

export default Parallax
