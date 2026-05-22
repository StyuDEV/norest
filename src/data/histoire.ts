// Textes de la slide "Notre histoire" — NOREST.
// Édités ici dans un seul fichier ; le composant `NotreHistoire` les consomme
// et gère uniquement l'affichage.

export type VersionId = "longue" | "moyenne" | "courte";

export type Version = {
  id: VersionId;
  label: string;
  short: string;
  paragraphs: string[];
};

const longue: Version = {
  id: "longue",
  label: "Version longue",
  short: "Longue",
  paragraphs: [
    "Paris Est, vingtième arrondissement, deux gamins, deux trajectoires différentes mais la même faim.",
    "Il est tard, ou tôt pour certains, les rues sentent le béton mouillé, les rideaux métalliques sont encore baissés pendant que certains sont encore debout.",
    "William et Léonidas se rencontrent en 2013. Ils ont seize, peut-être dix-sept ans. Ils grandissent ensemble dans le même décor : Paris Est, ses immeubles, ses toits, ses couloirs de métro, ses épiceries ouvertes jusqu'à tard et ses bancs où les discussions deviennent des manifestes. Deux adolescents du même arrondissement, portés par la même sensation étrange : celle de ne jamais réussir à rester immobiles. À cet âge où l'on cherche encore qui l'on veut devenir, eux cherchent déjà ce qu'ils vont construire ensemble.",
  ],
};

const moyenne: Version = {
  id: "moyenne",
  label: "Version moyenne",
  short: "Moyenne",
  paragraphs: [
    "Paris, 20e arrondissement, deux gamins, deux trajectoires différentes mais la même faim.",
    "Guillaume et Léo se rencontrent en 2013, ils ont seize ans. Ils grandissent ensemble dans le même décor : Paris Nord-Est. Deux adolescents du même arrondissement, portés par la même sensation étrange : celle de ne jamais réussir à rester immobiles.",
    "Caméras en main, leurs quartiers deviennent leurs terrains d'apprentissage. Les toits et les transports de nuit de la capitale deviennent leurs salles de réunion. Ils parlent le même langage. Pas seulement celui de l'image, celui de l'obsession. Créer, comprendre, explorer, toujours plus loin.",
    "Puis il y avait ce petit kebab de quartier, abordable et sincère. Tenu par Kassim et son père, un homme âgé, discret, fatigué parfois, mais toujours debout. Travaillant avec des produits frais, enchaînant des journées sans repos. Une certaine idée de la dignité. Avec le temps, l'endroit devient une seconde maison. Ils regardent ça sans forcément se le dire, mais ils apprennent déjà. Le travail, la loyauté, la transmission et surtout : construire quelque chose de vrai.",
    "Les années avancent et la culture hip-hop devient leur colonne vertébrale : elle rythme leurs vies, leurs trajets, leurs nuits blanches. Ils tournent des clips, parfois payés, souvent non. Leur vie entière repose sur des compromis qu'ils ne savent pas faire. Dormir ou créer, sortir ou travailler, partir ou rester, ralentir ou continuer. Alors ils continuent. Parce qu'au fond, ils partagent la même obsession : construire quelque chose ensemble.",
    "Avec les années, leurs passions s'empilent comme des couches de peinture sur un vieux mur parisien. Ils rêvent d'une structure capable de raconter des histoires et de donner une forme à tout ce qu'ils portent depuis l'adolescence : des images, des films, des vêtements, des objets. Leur univers.",
    "Cette idée finit par prendre un nom “CHARBON”, pour l'aspect travailleur, ensuite “SLICE”, comme la part qu'on partage autour d'une table ou comme l'outil de montage. Résumant parfaitement leur histoire : tout partager. Le temps, les idées, les galères, les projets. Mais le nom existe déjà ailleurs. Alors ils cherchent encore, longtemps. Jusqu'à trouver celui qui avait toujours été là.",
    "D'un côté, il y a les terres des ancêtres de William, le Nord-Est du Brésil. De l'autre, celles de Léonidas : l'Alsace, elle aussi au Nord-Est. Deux héritages différents, une même direction, pour ce binôme du Nord-Est parisien.",
    "Nord-Est / No Rest / “NOREST”.",
    "Aujourd'hui, ils ont trente ans, et pour la première fois, ils prennent le temps. Pas pour ralentir, mais pour donner une forme définitive à tout ce qu'ils ont construit. C'est l'histoire de deux garçons devenus des hommes sans jamais abandonner la version adolescente d'eux-mêmes. Celle qui croyait que l'amitié sincère n'avait pas de date de péremption. Que les rêves pouvaient survivre aux factures. Que créer avait plus de valeur que paraître.",
    "Et qu'au milieu du bruit, des nuits blanches et des villes qui changent… certaines promesses, elles, ne disparaissent jamais.",
    "NOREST",
  ],
};

const courte: Version = {
  id: "courte",
  label: "Version courte",
  short: "Courte",
  paragraphs: [
    "Paris, 20e. Deux gamins, la même faim.",
    "2013. Caméras en main, les toits comme bureaux, les nuits comme atelier.",
    "Dix-sept ans plus tard, deux héritages du Nord-Est, une même direction.",
    "NOREST.",
  ],
};

export const versions: Record<VersionId, Version> = {
  longue,
  moyenne,
  courte,
};

export const versionOrder: VersionId[] = ["longue", "moyenne", "courte"];
