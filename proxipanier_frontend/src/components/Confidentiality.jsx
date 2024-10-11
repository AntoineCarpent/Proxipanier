import React from "react";
import { NavLink } from "react-router-dom";

const Confidentiality = () => {
    return (
        <div className="confidentiality min-h-screen bg-gray-50 flex flex-col items-center px-4 py-8">
            <div className="container max-w-3xl bg-white shadow-md rounded-lg p-8">
                <h1 className="text-3xl font-bold text-gray-800 mb-6 text-center">
                    Charte de Confidentialité
                </h1>
                <p className="text-gray-700 mb-4">
                    <strong>Dernière mise à jour : [Date]</strong>
                </p>

                <p className="text-gray-700 mb-4">
                    Nous nous engageons à protéger la confidentialité de nos utilisateurs.
                    Cette charte de confidentialité décrit comment nous collectons,
                    utilisons, partageons et protégeons vos informations personnelles
                    lorsque vous utilisez notre site <strong>Proxipanier</strong>{" "}
                    accessible à l’URL{" "}
                    <a
                        href="[URL du Site]"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-blue-600 hover:underline"
                    >
                        [http://localhost:3000/]
                    </a>
                    .
                </p>

                <h2 className="text-2xl font-semibold text-gray-800 mt-6 mb-2">
                    1. Informations que nous collectons
                </h2>
                <p className="text-gray-700 mb-4">
                    Nous pouvons collecter et traiter les types d'informations suivants :
                </p>
                <ul className="list-disc pl-5 text-gray-700 mb-6">
                    <li>
                        <strong>Informations personnelles</strong> : nom, adresse e-mail, numéro de téléphone, adresse.
                    </li>
                    <li>
                        <strong>Informations de compte</strong> : identifiants, mot de
                        passe, préférences de communication.
                    </li>
                    <li>
                        <strong>Informations techniques</strong> : adresse IP, type de
                        navigateur, système d'exploitation, pages visitées, durée de la
                        visite, etc.
                    </li>
                </ul>

                <h2 className="text-2xl font-semibold text-gray-800 mt-6 mb-2">
                    2. Utilisation de vos informations
                </h2>
                <p className="text-gray-700 mb-4">
                    Nous utilisons vos informations personnelles pour :
                </p>
                <ul className="list-disc pl-5 text-gray-700 mb-6">
                    <li>Fournir et maintenir nos services.</li>
                    <li>Améliorer, personnaliser et développer nos services.</li>
                    <li>
                        Communiquer avec vous, y compris pour répondre à vos questions et
                        vous envoyer des mises à jour.
                    </li>
                    <li>
                        Analyser l'utilisation de notre site pour améliorer nos offres.
                    </li>
                </ul>

                <h2 className="text-2xl font-semibold text-gray-800 mt-6 mb-2">
                    3. Partage de vos informations
                </h2>
                <p className="text-gray-700 mb-4">
                    Nous ne vendons pas vos informations personnelles. Nous pouvons
                    partager vos informations avec :
                </p>
                <ul className="list-disc pl-5 text-gray-700 mb-6">
                    <li>
                        <strong>Prestataires de services</strong> : des tiers qui
                        fournissent des services en notre nom (hébergement, support client,
                        analyse de données, etc.).
                    </li>
                    <li>
                        <strong>Autorités légales</strong> : si requis par la loi ou en
                        réponse à des demandes légales.
                    </li>
                    <li>
                        <strong>En cas de fusion ou d'acquisition</strong> : vos
                        informations pourraient être transférées en cas de restructuration
                        de notre entreprise.
                    </li>
                </ul>

                <h2 className="text-2xl font-semibold text-gray-800 mt-6 mb-2">
                    4. Vos droits
                </h2>
                <p className="text-gray-700 mb-4">
                    Vous disposez de plusieurs droits concernant vos informations
                    personnelles :
                </p>
                <ul className="list-disc pl-5 text-gray-700 mb-6">
                    <li>
                        <strong>Droit d'accès</strong> : demander une copie des informations
                        que nous détenons à votre sujet.
                    </li>
                    <li>
                        <strong>Droit de rectification</strong> : demander la correction de
                        vos informations inexactes ou incomplètes.
                    </li>
                    <li>
                        <strong>Droit d'effacement</strong> : demander la suppression de vos
                        informations personnelles.
                    </li>
                    <li>
                        <strong>Droit d'opposition</strong> : vous pouvez vous opposer au
                        traitement de vos informations dans certaines circonstances.
                    </li>
                    <li>
                        <strong>Droit à la portabilité</strong> : demander le transfert de
                        vos informations à un tiers.
                    </li>
                </ul>
                <p className="text-gray-700 mb-4">
                    Pour exercer vos droits, veuillez nous contacter à l'adresse suivante
                    : <strong>[antoine@gmail.com]</strong>.
                </p>

                <h2 className="text-2xl font-semibold text-gray-800 mt-6 mb-2">
                    5. Sécurité de vos informations
                </h2>
                <p className="text-gray-700 mb-6">
                    Nous prenons des mesures techniques et organisationnelles appropriées
                    pour protéger vos informations personnelles contre la perte, le vol et
                    l'accès non autorisé. Cependant, aucune méthode de transmission sur
                    Internet ou de stockage électronique n'est entièrement sécurisée.
                </p>

                <h2 className="text-2xl font-semibold text-gray-800 mt-6 mb-2">
                    6. Modifications de cette charte
                </h2>
                <p className="text-gray-700 mb-6">
                    Nous pouvons mettre à jour cette charte de confidentialité de temps à
                    autre. Nous vous informerons de tout changement en publiant la
                    nouvelle charte sur notre site avec une date de mise à jour.
                </p>

                <h2 className="text-2xl font-semibold text-gray-800 mt-6 mb-2">
                    7. Nous contacter
                </h2>
                <p className="text-gray-700 mb-4">
                    Pour toute question concernant cette charte de confidentialité,
                    veuillez nous contacter à :
                </p>
                <ul className="list-disc pl-5 text-gray-700 mb-6">
                    <li>
                        <strong>Par email</strong> :{" "}
                        <a
                            href="mailto:[Adresse e-mail]"
                            className="text-blue-600 hover:underline"
                        >
                            [antoine@gmail.com]
                        </a>
                    </li>
                    <li>
                        <strong>Par courrier</strong> : [123 avenue des champs Elysée]
                    </li>
                </ul>

                <NavLink to="/" className="mt-3">
                    Retour à l'accueil
                </NavLink>
            </div>
        </div>
    );
};

export default Confidentiality;