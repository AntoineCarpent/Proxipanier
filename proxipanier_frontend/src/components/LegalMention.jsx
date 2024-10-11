import React from "react";
import { NavLink } from "react-router-dom";

function LegalMention() {
    return (
        <div className="legal-mention min-h-screen bg-gray-50 flex flex-col items-center px-4 py-8">
            <div className="container max-w-3xl bg-white shadow-md rounded-lg p-8">
                <h1 className="text-3xl font-bold text-gray-800 mb-6 text-center">
                    MENTIONS LÉGALES
                </h1>

                <p className="text-gray-700 mb-4">
                    Conformément aux dispositions de la loi n° 2004-575 du 21 juin 2004
                    pour la confiance en l'économie numérique, il est précisé aux
                    utilisateurs du site <strong>Proxipanier</strong> l'identité des
                    différents intervenants dans le cadre de sa réalisation et de son
                    suivi.
                </p>

                <h2 className="text-2xl font-semibold text-gray-800 mt-6 mb-2">
                    Édition du site
                </h2>
                <p className="text-gray-700 mb-4">
                    Le présent site, accessible à l’URL{" "}
                    <a
                        href="http://localhost:3000/"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-blue-600 hover:underline"
                    >
                        http://localhost:3000/
                    </a>{" "}
                    (le « Site »), est édité par :
                </p>
                <p className="text-gray-700 mb-4">
                    Antoine Carpentier, résidant 123 avenue des Champs Elysée, de nationalité
                    Française (France), né(e) le 16/06/1997.
                </p>

                <h2 className="text-2xl font-semibold text-gray-800 mt-6 mb-2">
                    Hébergement
                </h2>
                <p className="text-gray-700 mb-4">
                    Le Site est hébergé par la société render, situé 222 Boulevard
                    Gustave Flaubert, 63000 Clermont-Ferrand, (contact téléphonique ou
                    email : (+33) 4 44 44 60 40).
                </p>

                <h2 className="text-2xl font-semibold text-gray-800 mt-6 mb-2">
                    Directeur de publication
                </h2>
                <p className="text-gray-700 mb-4">
                    Le Directeur de la publication du Site est Antoine Carpentier.
                </p>

                <h2 className="text-2xl font-semibold text-gray-800 mt-6 mb-2">
                    Nous contacter
                </h2>
                <p className="text-gray-700 mb-2">Par téléphone : +33612548963</p>
                <p className="text-gray-700 mb-2">
                    Par email :{" "}
                    <a
                        href="mailto:johan@gmail.com"
                        className="text-blue-600 hover:underline"
                    >
                        antoine@gmail.com
                    </a>
                </p>
                <p className="text-gray-700 mb-6">
                    Par courrier : 123 avenue des Champs Elysée
                </p>

                <p className="text-sm text-gray-500">
                    Génération des mentions légales par Legalstart.
                </p>

                <NavLink to="/" className="mt-3">
                    Retour à l'accueil
                </NavLink>
            </div>
        </div>
    );
}

export default LegalMention;