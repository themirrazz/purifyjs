// Purifyjs (Typings) - v1.0.4 - GPL3
// (c) themirrazzkun 2025+
import { RSACRating, ICRARating, PICSRatingDetails, PICSRatingNamespace, PICSLexarToken } from './types';

export let purify: {
    icra: {
        decode: (set: string, index: number, strict?: boolean) => ICRARating
    },
    rsac: {
        decode: (set: string, index: number, strict?: boolean) => RSACRating
    },
    parse: (rating: string) => PICSRatingDetails[],
    lexar: (rating: string) => PICSLexarToken[]
};

export default purify;