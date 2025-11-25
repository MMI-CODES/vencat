export const getDuration = (start: Date, end: Date): number => {
    const diff = end.getTime() - start.getTime();
    return diff / (1000 * 60 * 60);
}

export const toFormatHHMM = (date: Date): string => {
    const hours = date.getHours().toString().padStart(2, '0');
    const minutes = date.getMinutes().toString().padStart(2, '0');
    return `${hours}:${minutes}`;
}

export const colors: Record<string, string> = {
	'DS': '#FF48F3',
	'TD': '#2E8DB6',
	'TP': '#622FB5',
	'CM': '#E14864',
	'Projet Tutoré': '#5349D7'
}

export interface Module {
	title: string;
	emoji: string;
	short: string;
	description: string;
	coeff: number
}

export const modules: Record<string, Module> = {
	'R 1.01':   { title: 'Anglais',                                   emoji: '🇬🇧', short: 'Anglais', description: 'Cours d\'anglais pour améliorer vos compétences linguistiques.', coeff: 1 },
	'R 1.02':   { title: 'Anglais',                                   emoji: '🇬🇧', short: 'Anglais', description: 'Cours d\'anglais pour améliorer vos compétences linguistiques.', coeff: 1 },
	'R 1.03':   { title: 'Ergonomie et Accessibilité',                emoji: '🚹', short: 'Ergo. & Accessibilité', description: 'Apprenez les principes de l\'ergonomie et de l\'accessibilité dans le design numérique.', coeff: 3 },
	'R 1.04':   { title: 'Culture Numérique',                         emoji: '🌐', short: 'Cult. Numérique', description: 'Explorez l\'impact de la culture numérique sur la société moderne.', coeff: 3 },
	'R 1.05':   { title: 'Stratégies de Communication',               emoji: '📢', short: 'Strat. Communication', description: 'Développez des stratégies efficaces de communication dans divers contextes.', coeff: 2 },
	'R 1.06':   { title: 'Expression & Communication',                emoji: '🗣️', short: 'Expr. Communication', description: 'Améliorez vos compétences en expression orale et écrite.', coeff: 2 },
	'R 1.07':   { title: 'Écriture Multimédia et Narration',          emoji: '📝', short: 'Écriture & Narr.', description: 'Apprenez à créer des contenus narratifs pour les médias numériques.', coeff: 3 },
	'R 1.08':   { title: 'Graphisme',                                 emoji: '✒️', short: 'Graphisme', description: 'Découvrez les bases du design graphique et de la création visuelle.', coeff: 4 },
	'R 1.09':   { title: 'Culture Artistique',                        emoji: '🖼️', short: 'Cult. Artistique', description: 'Explorez l\'histoire et les mouvements de l\'art à travers les âges.', coeff: 2 },
	'R 1.10':   { title: 'Audiovisuel',                               emoji: '🎥', short: 'Audiovisuel', description: 'Apprenez les techniques de production audiovisuelle.', coeff: 4 },
	'R 1.11':   { title: 'Intégration',                               emoji: '⌨️', short: 'Intégration', description: 'Intégrez des maquettes en pages web fidèles, structurées et compatibles avec les standards du web.', coeff: 5 },
	'R 1.12':   { title: 'Développement Web',                         emoji: '💻', short: 'Dev. Web', description: 'Développez des fonctionnalités interactives et dynamiques pour donner vie à vos interfaces.', coeff: 4 },
	'R 1.13':   { title: 'Hébergement',                               emoji: '🚀', short: 'Hébergement', description: 'Mettez vos projets en ligne en configurant des solutions d’hébergement fiables et performantes.', coeff: 3 },
	'R 1.14':   { title: 'Représentation et Traitement Informatique', emoji: '🔣', short: 'Repr. & Trait. Info', description: 'Comprenez et manipulez les données numériques pour mieux les représenter, les structurer et les exploiter.', coeff: 3 },
	'R 1.15':   { title: 'Gestion de Projet',                         emoji: '🧠', short: 'Gestion de Projet', description: 'Apprenez à organiser, planifier et piloter efficacement un projet numérique en équipe.', coeff: 2 },
	'R 1.16':   { title: 'Économie & Droit',                          emoji: '📜', short: 'Économie & Droit', description: 'Découvrez les bases juridiques et économiques liées au secteur du numérique et à ses acteurs.', coeff: 1.5 },
	'R 1.17':   { title: 'Projet Personnel Professionnel',            emoji: '💼', short: 'Projet Perso. Pro.', description: 'Identifiez vos objectifs professionnels et construisez progressivement votre parcours de formation.', coeff: .5 },

	'Portfolio': { title: 'Portfolio',                                emoji: '💼', short: 'Portfolio', description: 'Présentez vos compétences à travers un projet complet, structuré et argumenté, reflétant votre progression et votre savoir-faire.', coeff: 1 }, // Coeff. inconnu

	'SAE 1.02': { title: 'Recommandation Numérique',                  emoji: '📊', short: 'Recomm. Numérique', description: 'Analysez des besoins et proposez des solutions numériques adaptées à un contexte donné.', coeff: 6 },
	'SAE 1.03': { title: 'Design Graphique',                          emoji: '✒️', short: 'Design Graphique', description: 'Concevez des visuels cohérents et esthétiques en appliquant les principes fondamentaux du design.', coeff: 6 },
	'SAE 1.04': { title: 'Audiovisuel',                               emoji: '🎥', short: 'Audiovisuel', description: 'Réalisez des contenus audiovisuels en maîtrisant la prise de vue, le montage et la narration visuelle.', coeff: 6 },
	'SAE 1.05': { title: 'Site Web',                                  emoji: '💻', short: 'Site Web', description: 'Créez un site web complet en combinant conception graphique, intégration et développement.', coeff: 12 },
	'SAE 1.06': { title: 'Gestion de Projet & Recommandation',        emoji: '🧠', short: 'Gest. Projet & Recomm.', description: 'Menez un projet de bout en bout en produisant une recommandation argumentée et structurée.', coeff: 10 },

	'lunch': { title: 'Déjeûner',  emoji: '🍽️', short: 'Déjeûner', description: 'Savourez un repas 5 étoiles ou un plateau du CROUS', coeff: 0 },
	'Réunion': { title: 'Réunion', emoji: '🧠', short: 'Réunion', description: '', coeff: 0 },
}