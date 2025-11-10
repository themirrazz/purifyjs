declare interface IRCARating {
    chat: {
        unmoderated: boolean,
        moderated: boolean,
        none: boolean
    },
    language: {
        /** Sexually explicit language */
        explicit: boolean,
        /** Moderate or strong language */
        moderate: boolean,
        /** Mild language */
        mild: boolean,
        none: boolean
    },
    nudity: {
        /** Erections or detailed female genitals */
        erections: boolean,
        /** Male genitals */
        maleGenitals: boolean,
        /** Female genitals */
        femaleGenitals: boolean,
        /** Breasts */
        breasts: boolean,
        /** Bare butt */
        butt: boolean,
        /** Sexually explicit acts */
        explicit: boolean,
        /** Implied/blurred sexual acts */
        implied: boolean,
        /** Visible sexual touching */
        touching: boolean,
        /** Passionate kissing */
        kissing: boolean,
        /** Not present */
        none: boolean,
        /** Artistic context */
        artistic: boolean,
        /** Educational context */
        educational: boolean,
        /** Medical context */
        medical: boolean,
    },
    violence: {
        /** Rape/sexual violence */
        rape: boolean,
        /** Blood/gore (humans) */
        blood: boolean,
        /** Blood/gore (animals) */
        bloodAnimal: boolean,
        /** Blood/gore (fantasy characters) */
        bloodFantasy: boolean,
        /** Killing of humans */
        killing: boolean,
        /** Killing of animals */
        killingAnimal: boolean,
        /** Killing of fantasy characters */
        killingFantasy: boolean,
        /** Deliberate injury to humans */
        violence: boolean,
        /** Deliberate injury to fantasy characters */
        fantasyViolence: boolean,
        /** Deliberate injury to animals */
        animalCruelty: boolean,
        /** Deliberate destruction of objects */
        vandalism: boolean,
        /** Not present */
        none: boolean,
        /** Artistic context */
        artistic: boolean,
        /** Educational context */
        educational: boolean,
        /** Medical context */
        medical: boolean
    },
    misc: {
        /** Promotes tobacco use */
        tobacco: boolean,
        /** Promotes alcohol use */
        alcohol: boolean,
        /** Promotes drug use */
        drugs: boolean,
        /** Promotes gambling */
        gambling: boolean,
        /** Promotes weapon use */
        weapons: boolean,
        /** Promotes harm towards others */
        harm: boolean,
        /** Bad example for children */
        badExample: boolean,
        /** Disturbing to young children */
        disturbing: boolean,
        /** None of the above */
        none: boolean
    }
};

declare interface RSACRating {
    nudity: 0|1|2|3|4,
    violence: 0|1|2|3|4,
    language: 0|1|2|3|4,
    sex: 0|1|2|3|4,
};

declare type PICSRatingNamespace = "http://www.icra.org/ratingsv02.html"|"http://www.rsac.org/ratingsv01.html";
