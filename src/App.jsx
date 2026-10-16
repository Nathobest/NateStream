
import { useState } from "react";
import { Search, Play, Plus, Check, X, Film, Heart } from "lucide-react";

const movies = [
  {
    id: 1,
    title: "L'Horizon secret",
    type: "Film",
    genre: "Aventure",
    year: 2025,
    image: "photo-1440404653325-ab127d49abb1",
    description: "Une expédition révèle un secret oublié."
  },
  {
    id: 2,
    title: "Dernière fréquence",
    type: "Série",
    genre: "Thriller",
    year: 2025,
    image: "photo-1519608487953-e999c86e7455",
    description: "Une voix mystérieuse bouleverse une ville."
  },
  {
    id: 3,
    title: "Au-delà des étoiles",
    type: "Film",
    genre: "Science-fiction",
    year: 2024,
    image: "photo-1462331940025-496dfbfc7564",
    description: "Un équipage découvre un monde inconnu."
  },
  {
    id: 4,
    title: "Les ombres du passé",
    type: "Série",
    genre: "Drame",
    year: 2025,
    image: "photo-1518709268805-4e9042af9f23",
    description: "Une famille doit affronter ses secrets."
  },
  {
    id: 5,
    title: "Opération minuit",
    type: "Film",
    genre: "Action",
    year: 2024,
    image: "photo-1500530855697-b586d89ba3ee",
    description: "Une équipe dispose d'une seule nuit."
  },
  {
    id: 6,
    title: "Cœurs en voyage",
    type: "Série",
    genre: "Romance",
    year: 2024,
    image: "photo-1470770841072-f978cf4d019e",
    description: "Deux inconnus changent leurs projets."
  }
];

const imageUrl = (id) =>
  `https://images.unsplash.com/${id}?auto=format&fit=crop&w=800&q=80`;

export default function App() {
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("Tout");
  const [favorites, setFavorites] = useState([]);
  const [selected, setSelected] = useState(null);

  const filtered = movies.filter((movie) => {
    const matchesSearch =
      `${movie.title} ${movie.genre} ${movie.type}`
        .toLowerCase()
        .includes(search.toLowerCase());

    const matchesCategory =
      category === "Tout" ||
      movie.type === category ||
      movie.genre === category ||
      (category === "Favoris" && favorites.includes(movie.id));

    return matchesSearch && matchesCategory;
  });

  function toggleFavorite(id) {
    setFavorites((old) =>
      old.includes(id)
        ? old.filter((item) => item !== id)
        : [...old, id]
    );
  }

  return (
    <div className="app">
      <header className="topbar">
        <a className="logo" href="#">
          NATE<span>STREAM</span>
        </a>

        <nav>
          <button onClick={() => setCategory("Tout")}>Accueil</button>
          <button onClick={() => setCategory("Film")}>Films</button>
          <button onClick={() => setCategory("Série")}>Séries</button>
          <button onClick={() => setCategory("Favoris")}>
            <Heart size={15} /> Ma liste ({favorites.length})
          </button>
        </nav>

        <label className="search">
          <Search size={17} />
          <input
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Rechercher..."
          />
          {search && (
            <button onClick={() => setSearch("")} aria-label="Effacer">
              <X size={15} />
            </button>
          )}
        </label>
      </header>

      <main>
        <section className="hero">
          <p className="eyebrow">BIENVENUE SUR NATESTREAM</p>
          <h1>Le cinéma, <span>à votre façon.</span></h1>
          <p>
            Découvrez des films et des séries pour votre prochaine soirée.
          </p>
          <button
            className="gold-button"
            onClick={() =>
              document.getElementById("catalogue").scrollIntoView({
                behavior: "smooth"
              })
            }
          >
            <Play size={17} fill="currentColor" /> Explorer le catalogue
          </button>
        </section>

        <section className="catalogue" id="catalogue">
          <div className="section-title">
            <div>
              <p className="eyebrow">VOTRE PROCHAINE HISTOIRE</p>
              <h2>Films et séries</h2>
            </div>
            <span>{filtered.length} titres</span>
          </div>

          <div className="filters">
            {[
              "Tout",
              "Film",
              "Série",
              "Action",
              "Aventure",
              "Thriller",
              "Drame",
              "Romance",
              "Favoris"
            ].map((item) => (
              <button
                key={item}
                className={category === item ? "active" : ""}
                onClick={() => setCategory(item)}
              >
                {item}
              </button>
            ))}
          </div>

          <div className="grid">
            {filtered.map((movie) => (
              <article className="card" key={movie.id}>
                <button
                  className="poster"
                  onClick={() => setSelected(movie)}
                  style={{
                    backgroundImage:
                      `linear-gradient(0deg,#080808,transparent 70%),` +
                      `url("${imageUrl(movie.image)}")`
                  }}
                  aria-label={`Voir ${movie.title}`}
                >
                  <span className="type">{movie.type}</span>
                  <span className="play"><Play size={20} /></span>
                </button>

                <div className="details">
                  <div>
                    <h3>{movie.title}</h3>
                    <p>{movie.year} · {movie.genre}</p>
                  </div>
                  <button
                    className="favorite"
                    onClick={() => toggleFavorite(movie.id)}
                    aria-label="Ajouter ou retirer des favoris"
                  >
                    {favorites.includes(movie.id)
                      ? <Check size={18} />
                      : <Plus size={18} />}
                  </button>
                </div>
              </article>
            ))}
          </div>

          {filtered.length === 0 && (
            <p className="empty">Aucun titre trouvé. Essayez une autre recherche.</p>
          )}
        </section>
      </main>

      <footer>
        <a className="logo" href="#">NATE<span>STREAM</span></a>
        <p>Votre univers de films et de séries.</p>
        <small>© 2026 NateStream · Prototype</small>
      </footer>

      {selected && (
        <div className="overlay" onClick={() => setSelected(null)}>
          <section className="modal" onClick={(e) => e.stopPropagation()}>
            <button className="close" onClick={() => setSelected(null)}>
              <X />
            </button>
            <img src={imageUrl(selected.image)} alt="" />
            <div className="modal-info">
              <p className="eyebrow">{selected.type} · {selected.year}</p>
              <h2>{selected.title}</h2>
              <p>{selected.description}</p>
              <button
                className="gold-button"
                onClick={() =>
                  alert("Connectez une source vidéo autorisée pour activer la lecture.")
                }
              >
                <Play size={16} /> Lire
              </button>
              <button
                className="outline-button"
                onClick={() => toggleFavorite(selected.id)}
              >
                <Plus size={16} /> Ajouter aux favoris
              </button>
            </div>
          </section>
        </div>
      )}
    </div>
  );
}
