import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import RightClube from "../../components/RightClube";

const API_CLUBES = "http://localhost:8080/v1/conectaBook/clubes";
const API_GENEROS = "http://localhost:8080/v1/conectaBook/generos";

export default function MeusClubes() {
    const navigate = useNavigate();

    const [clubes, setClubes] = useState([]);
    const [generos, setGeneros] = useState([]);

    const [pesquisa, setPesquisa] = useState("");
    const [generoSelecionado, setGeneroSelecionado] = useState("");

    useEffect(() => {
        async function buscarClubes() {
            const res = await fetch(API_CLUBES);
            const data = await res.json();
            setClubes(data.response);
        }

        buscarClubes();
    }, []);
    useEffect(() => {
        async function buscarGeneros() {
            const res = await fetch(API_GENEROS);
            const data = await res.json();
            setGeneros(data.response);
        }

        buscarGeneros();
    }, []);

    const clubesFiltrados = clubes.filter((clube) => {
        const generoValido =
            generoSelecionado === "" ||
            clube.genero ===
                generos.find((g) => g.id_genero == generoSelecionado)?.nome;

        const nomeValido = clube.nome
            .toLowerCase()
            .includes(pesquisa.toLowerCase());

        return generoValido && nomeValido;
    });

    async function participarClube(idClube) {
        console.log("Entrar no clube:", idClube);
    }

    return (
        <div className="pagina-descobrir-clubes">

            <h1>Descubra novos clubes</h1>

            <RightClube
                pesquisa={pesquisa}
                setPesquisa={setPesquisa}
                navigate={navigate}
                generos={generos}
                generoSelecionado={generoSelecionado}
                setGeneroSelecionado={setGeneroSelecionado}
                clubesFiltrados={clubesFiltrados}
                participarClube={participarClube}
            />

        </div>
    );
}