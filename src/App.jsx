import { Routes, Route} from "react-router";
import EnTete from "./components/EnTete.jsx";
import Accueil from "./pages/Accueil.jsx";
import Partie from "./pages/Partie.jsx";
// *** Ajout après la soutenance
import Scores from "./pages/Scores.jsx";
import Statistiques from "./pages/Statistiques.jsx";
import Regles from "./pages/Regles.jsx";

export default function App() {
    return (
        <>
            <EnTete />
            <main>
                <Routes>
                    <Route path="/" element={<Accueil />} />
                    <Route path="/partie" element={<Partie />} />
                    {/* *** Ajout après la soutenance*/}
                    <Route path="/scores" element={<Scores />} />
                    <Route path="/statistiques" element={<Statistiques />} />
                    <Route path="/regles" element={<Regles />} />
                    {/* *** */}
                </Routes>
            </main>
        </>
    );
}