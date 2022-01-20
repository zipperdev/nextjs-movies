import Link from "next/link";
import { useRouter } from "next/router";
import Seo from "../components/Seo";

export default function Home({ results }) {
    const router = useRouter();
    return <div className="container">
        <Seo title="Home" />
        {results?.map((movie) => (
            <div onClick={() => router.push(`/movies/${movie.original_title}/${movie.id}`)} key={movie.id} className="movie">
                <img src={`https://image.tmdb.org/t/p/w500/${movie.poster_path}`} />
                <h4>
                    <Link href={`/movies/${movie.original_title}/${movie.id}`}>
                        <a>
                            {movie.original_title}
                        </a>
                    </Link>
                </h4>
            </div>
        ))}
        <style jsx>{`
            .container {
                display: grid;
                grid-template-columns: 1fr 1fr;
                padding: 20px;
                gap: 20px;
            }
            .movie img {
                max-width: 100%;
                border-radius: 12px;
                transition: transform 0.2s ease-out;
                box-shadow: rgba(0, 0, 0, 0.1) 0px 4px 12px;
            }
            .movie:hover img {
                cursor: pointer;
                transform: scale(1.04) translateY(-10px);
            }
            .movie h4 {
                font-size: 18px;
                text-align: center;
            }
        `}</style>
    </div>;
};

export async function getServerSideProps() {
    const { results } = await (
        await fetch("http://localhost:3000/api/movies")
    ).json();
    return {
        props: {
            results
        }
    };
};