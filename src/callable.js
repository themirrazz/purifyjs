(function () {
    // Purify.js (Embedded) - v1.1.0 - GPL3
    // (c) themirrazzkun 2025+
    var purify = {
        utils: {
            thrower: function (strictMode, errors) {
                return function (d) {
                    if(strictMode) {
                        throw d;
                    } else {
                        errors.push(d);
                    }
                }
            }
        },
        sfk: {
            decode: function (set, index, strictMode) {
                var errors = [];
                var panic = purify.utils.thrower(strictMode, errors);
                if(set === 's 0') {
                    return { errors: errors, data: 0 };
                } else if(set === 's 1') {
                    return { errors: errors, data: 1 };
                } else if(set === 's 2') {
                    return { errors: errors, data: 2 };
                } else {
                    panic({
                        type: "TypeError",
                        message: "Did not contain exact expected value",
                        code: "UNEXPECTED_VALUE",
                        stackTrace: {
                            start: 0,
                            end: index.length
                        }
                    });
                    return { errors: errors, data: null };
                }
            }
        },
        icra: {
            /**
             * Decodes ICRA ratings.
             * @param {string} set 
             * @param {number} index 
             * @returns {ICRARating}
             */
            decode: function (set, index, strictMode) {
                var errors = [];
                var panic = purify.utils.thrower(strictMode, errors);
                var pairs = set.split(" ");
                var alpha = 'abcdefghijklmnopq';
                var table = {
                    c: [
                        'unmoderated',
                        'moderated'
                    ],
                    l: [
                        'explicit',
                        'moderate',
                        'mild'
                    ],
                    n: [
                        'erections',
                        'maleGenitals',
                        'femaleGenitals',
                        'breasts',
                        'butt',
                        'explicit',
                        'implied',
                        'touching',
                        'kissing'
                    ],
                    v: [
                        'rape',
                        'blood',
                        'bloodAnimal',
                        'bloodFantasy',
                        'killing',
                        'killingAnimal',
                        'killingFantasy',
                        'violence',
                        'animalCruelty',
                        'fantasyViolence',
                        'vandalism'
                    ],
                    o: [
                        'tobacco',
                        'alcohol',
                        'drugs',
                        'gambling',
                        'weapons',
                        'harm',
                        'badExample',
                        'disturbing'
                    ]
                };
                var prefixs = {
                    c: 'chat',
                    l: 'language',
                    n: 'nudity',
                    v: 'violence',
                    o: 'misc'
                };
                var results = {
                    chat: {
                        unmoderated: false,
                        moderated: false,
                        none: false
                    },
                    language: {
                        explicit: false,
                        moderate: false,
                        mild: false,
                        none: false
                    },
                    nudity: {
                        erections: false,
                        maleGenitals: false,
                        femaleGenitals: false,
                        breasts: false,
                        butt: false,
                        explicit: false,
                        implied: false,
                        touching: false,
                        kissing: false,
                        artistic: false,
                        educational: false,
                        medical: false
                    },
                    violence: {
                        rape: false,
                        blood: false,
                        bloodAnimal: false,
                        bloodFantasy: false,
                        killing: false,
                        killingAnimal: false,
                        killingFantasy: false,
                        violence: false,
                        fantasyViolence: false,
                        animalCruelty: false,
                        vandalism: false,
                        none: false,
                        artistic: false,
                        educational: false,
                        medical: false,
                        sports: false
                    },
                    misc: {
                        tobacco: false,
                        alcohol: false,
                        drugs: false,
                        gambling: false,
                        weapons: false,
                        harm: false,
                        badExample: false,
                        disturbing: false,
                        none: false
                    }
                };
                var len = 0
                for(var i = 0; i < pairs.length; i += 2) {
                    var key = pairs[i];
                    var value = pairs[i + 1];
                    if(!value) {
                        // prevent crashes
                        value = '';
                    }
                    if(len) {
                        len += 1;
                    }
                    len += key.length + 1 + value.length;
                    if(!prefixs[key.charAt(0)]) {
                        panic({
                            name: "TypeError",
                            message: "Invalid rating category or key",
                            code: "INVALID_CATEGORY",
                            stackTrace: {
                                start: len - key.length - 1 - value.length,
                                end: len
                            }
                        });
                    } else {
                        if('zrsti'.indexOf(key.charAt(1)) < 0 && !table[key.charAt(0)][alpha.indexOf(key.charAt(1))]) {
                            panic({
                                name: "TypeError",
                                message: "Invalid rating category or key",
                                code: "INVALID_CATEGORY",
                                stackTrace: {
                                    start: len - key.length - 1 - value.length,
                                    end: len
                                }
                            });
                        } else {
                            if(value !== '1') {
                                panic({
                                    name: "TypeError",
                                    message: "Expected '1' but received a non-one value",
                                    code: "NON_ONE_VALUE",
                                    stackTrace: {
                                        start: len - key.length - 1 - value.length,
                                        end: len
                                    }
                                });
                            }
                        
                            if(key.charAt(1) === 'z') {
                                results[prefixs[key.charAt(0)]]["none"] = true;
                            } else if(key.charAt(1) === 'r') {
                                results[prefixs[key.charAt(0)]]["artistic"] = true;
                            } else if(key.charAt(1) === 's') {
                                results[prefixs[key.charAt(0)]]["educational"] = true;
                            } else if(key.charAt(1) === 't') {
                                results[prefixs[key.charAt(0)]]["medical"] = true;
                            } else if(key.charAt(1) === 'u') {
                                results[prefixs[key.charAt(0)]]["sports"] = true;
                            } else {
                                results[prefixs[key.charAt(0)]][table[key.charAt(0)][alpha.indexOf(key.charAt(1))]] = true;
                            }
                        }
                    }
                }
                return { data: results, errors: errors };
            }
        },
        rsac: {
            /**
             * Decodes RSAC/RSACi ratings.
             * @param {string} set 
             * @param {number} index 
             * @returns {RSACRating}
             */
            decode: function (set, index, strictMode) {
                var errors = [];
                var panic = purify.utils.thrower(strictMode, errors);
                var pairs = set.split(' ');
                var levels = {
                    nudity: 0,
                    violence: 0,
                    language: 0,
                    sex: 0
                };
                var table = {
                    n: 'nudity',
                    v: 'violence',
                    l: 'language',
                    s: 'sex'
                };
                var len = 0;
                var key = '', value = '';
                for(var i = 0; i < pairs.length; i += 2) {
                    key = pairs[i];
                    value = pairs[i+1]
                    if(len) {
                        len += 1;
                    }
                    len += key.length + 1 + value.length;
                    if(!table[key]) {
                        panic({
                            name: "ReferenceError",
                            message: "Unknown key",
                            code: "UNKNOWN_KEY",
                            stackTrace: {
                                start: len - key.length - 1 - value.length,
                                end: len
                            }
                        });
                    } else if(isNaN(value)) {
                        panic({
                            name: "TypeError",
                            message: "Not a number",
                            code: "NON_NUMERAL",
                            stackTrace: {
                                start: len - key.length - 1 - value.length,
                                end: len
                            }
                        });
                    } else if(Math.floor(value) != value) {
                        panic({
                            name: "TypeError",
                            message: "Not an integer",
                            code: "NON_INTEGER",
                            stackTrace: {
                                start: len - key.length - 1 - value.length,
                                end: len
                            }
                        });
                    } else {
                        if(value < 0) {
                            panic({
                                name: "TypeError",
                                message: "Must be zero or greater",
                                code: "UNDER_THRESHOLD",
                                stackTrace: {
                                    start: len - key.length - 1 - value.length,
                                    end: len
                                }
                            });
                            value = 0;
                        }
                        if(value > 4) {
                            panic({
                                name: "TypeError",
                                message: "Must be four or lesser",
                                code: "OVER_THRESHOLD",
                                stackTrace: {
                                    start: len - key.length - 1 - value.length,
                                    end: len
                                }
                            });
                            value = 4;
                        }
                        levels[table[pairs[i]]] = Number(value);
                    }
                }
                return { data: levels, errors: errors };
            },
            /**
             * @param {ICRARating} rating
            */
            fromICRA: function (rating) {
                throw new Error("TODO");
            }
        },
        systems: {
            'http://www.icra.org/ratingsv02.html': 'icra',
            'http://www.rsac.org/ratingsv01.html': 'rsac',
            'http://www.weburbia.com/safe/ratings.htm': 'sfk'
        },
        /**
         * Parses a PICS 1.1 rating.
         * @param {string} rating 
         * @returns {{
         *  namespace: "http://www.icra.org/ratingsv02.html"|"http://www.rsac.org/ratingsv01.html",
         *  gen: -1|0|1,
         *  comment?: string,
         *  data: string,
         *  rating?: ICRARating|RSACRating,
         *  errors: PurifyError[]
         *  parseError?: SyntaxError|ReferenceError|TypeError|Error
         * }[]}
         */
        parse: function (rating, strictMode) {
            var lexed = purify.lexar(rating);
            var ratings = [];
            var rating = {};
            var ratingURL = '';
            var comment = '';
            var genLevel = -1;
            var nextEqualsComment = false;
            for(var i = 0; i < lexed.length; i++) {
                if(lexed[i].type === 'BOOLEAN') {
                    if(lexed[i].value === 'true') {
                        genLevel = 1;
                    } else {
                        genLevel = 0;
                    }
                } else if(lexed[i].type === 'KEYWORD') {
                    if(lexed[i].value === 'comment') {
                        nextEqualsComment = true;
                    }
                } else if(lexed[i].type === 'STRING_LITERAL') {
                    if(!ratingURL) {
                        ratingURL = lexed[i].value;
                    }
                    if(nextEqualsComment) {
                        comment = lexed[i].value;
                        nextEqualsComment = false;
                    }
                } else if(lexed[i].type === 'RATING') {
                    rating = {
                        namespace: ratingURL,
                        data: lexed[i].value,
                        comment: comment,
                        gen: genLevel,
                        errors: []
                    };
                    try {
                        if(typeof purify[purify.systems[ratingURL]].decode === 'function') {
                            var res = purify[purify.systems[ratingURL]].decode(
                                lexed[i].value,
                                lexed[i].end - lexed[i].value.length,
                                strictMode
                            );
                            rating.rating = res.data;
                            rating.errors = res.errors || [];
                        }
                        /*if(ratingURL === 'http://www.icra.org/ratingsv02.html') {
                            rating.rating = this.icra.decode(lexed[i].value, lexed[i].end - lexed[i].value.length);
                        } else if(ratingURL === 'http://www.rsac.org/ratingsv01.html') {
                            rating.rating = this.rsac.decode(lexed[i].value, lexed[i].end - lexed[i].value.length);
                        }*/
                    } catch (error) {
                        rating.parsingError = error;
                        rating.errors.push(error);
                    }
                    ratings.push(rating);
                    comment = '';
                    genLevel = -1;
                    ratingURL = '';
                }
            }
            return ratings;
        },
        lexar: function (rating) {
            if(!rating.charAt(0)) {
                return [];
            }
            if(rating.charAt(0) !== '(') {
                throw new SyntaxError("Unexpected token \"" + rating.charAt(0) + "\" at line 1, column 1");
            }
            var out = [];
            var bc = '';
            var c = '';
            var cp = '';
            var cpp = '';
            var inHeader = true;
            var isBeginning = false;
            var inURL = false;
            var inComment = false;
            var isInGen = false;
            var isInFor = false;
            var isRightBeforeGen = false;
            var isRightBeforeComment = false;
            var isRightBeforeRating = false;
            var isInRating = false;
            var isRightBeforeFor = false;
            var didFor = false;
            var didURL = false;
            var didComment = false;
            var didGen = false;
            var tok = '';
            var last = 'whitespace';
            var ESCAPES = { 't': '\t', 'n': '\n', 'r': '\r' };
            for(var i = 1; i < rating.length; i++) {
                bc = rating.charAt(i - 1) || '';
                c = rating.charAt(i);
                cp = rating.charAt(i+1) || '';
                cpp = rating.charAt(i+2) || '';
                if(inComment || inURL || isInFor) {
                    if(c === '\\') {
                        if(!cp) {
                            throw new SyntaxError("Unexpected EOL at line 1, column " + (i+1));
                        } else {
                            tok += ESCAPES[cp] || cp;
                            i += 1;
                        }
                    } else if(c === '"') {
                        if(!cp) {
                            throw new SyntaxError("Unexpected EOL at line 1, column " + (i+1));
                        } else if(cp !== ' ' && cp !== '\n') {
                            throw new SyntaxError("Unexpected token \"" + cp + "\" at line 1, column " + (i+1));
                        } else {
                            if(inComment) {
                                didComment = true;
                            } else if(inURL) {
                                didURL = true;
                            } else if(isInFor) {
                                didFor = true;
                            }
                            inComment = inURL = isInFor = false;
                            out.push({
                                type: "STRING_LITERAL",
                                value: tok,
                                end: i
                            });
                            tok = "";
                            out.push({
                                type: "STRING_TERMINATOR",
                                value: '\"',
                                end: i + 1
                            });
                            last = 'string';
                        }
                    } else {
                        tok += c;
                    }
                } else if(isInRating) {
                    if(c === ')') {
                        if(!cp) {
                            throw new SyntaxError("Unexpected EOL at line 1, column " + (i+1));
                        } else if(cp !== ' ' && cp !== '\n') {
                            if(cp === ')') {
                                if(cpp) {
                                    throw new SyntaxError("Unexpected token \"" + cpp + "\" at line 1, column " + (i+ 2));
                                }
                            } else {
                                throw new SyntaxError("Unexpected token \"" + cp + "\" at line 1, column " + (i+1));
                            }
                        }
                        out.push({
                            type: "RATING",
                            value: tok,
                            end: i
                        });
                        tok = '';
                        out.push({
                            type: "RATING_TERMINATOR",
                            value: ')',
                            end: i + 1
                        });
                        isBeginning = true;
                        inURL = false;
                        inComment = false;
                        isInGen = false;
                        isInFor = false;
                        isRightBeforeGen = false;
                        isRightBeforeComment = false;
                        isRightBeforeRating = false;
                        isInRating = false;
                        isRightBeforeFor = false;
                        didFor = false;
                        didURL = false;
                        didComment = false;
                        didGen = false;
                    } else {
                        tok += c;
                    }
                } else {
                    if(c === ' ' || c === '\n' || c === '\t' || c === '\r') {
                        if(tok) {
                            if(isInGen) {
                                if(tok !== 'true' && tok !== 'false') {
                                    throw new TypeError("Expected boolean literal, but got unknown value at line 1, column " + (i - tok.length));
                                }
                                didGen = true;
                                isInGen = false;
                                isRightBeforeGen = false;
                                out.push({
                                    type: "BOOLEAN",
                                    value: tok,
                                    end: i
                                });
                            } else if(inHeader) {
                                if(tok === 'pics-1.1' || tok === 'pics-1.0') {
                                    inHeader = false;
                                    isBeginning = true;
                                } else if(tok.indexOf('pics-') === 0) {
                                    throw new SyntaxError("Invalid header version at line 1, column " + (i - tok.length));
                                } else {
                                    throw new SyntaxError("Missing header at line 1, column " + (i - tok.length));
                                }
                            } else if(isRightBeforeComment || isBeginning) {
                                throw new TypeError("Expected string literal, but got unknown value at line 1, column " + (i - tok.length));
                            } else if(isRightBeforeRating) {
                                throw new TypeError("Expected rating literal, but got unknown value at line 1, column " + (i - tok.length));
                            } else if(isRightBeforeGen) {
                                if(tok !== 'gen' && tok !== 'generic') {
                                    throw new SyntaxError("Expected keyword \"gen\" (or \"generic\"), but got invalid token at line 1, column " + (i - tok.length));
                                }
                                isInGen = true;
                                out.push({
                                    type: "KEYWORD",
                                    value: tok,
                                    end: i
                                });
                            } else {
                                if(tok === 'l' || tok === 'labels') {
                                    isRightBeforeGen = true;
                                    out.push({
                                        type: "KEYWORD",
                                        value: tok,
                                        end: i
                                    });
                                } else if(tok === 'for') {
                                    if(!didGen) {
                                        throw new SyntaxError("Attempted to declare the \"for\" field when the \"gen\" field has not yet been declared at line 1, column " + (i - tok.length));
                                    }
                                    isRightBeforeFor = true;
                                    out.push({
                                        type: "KEYWORD",
                                        value: tok,
                                        end: i
                                    });
                                } else if(tok === 'comment') {
                                    isRightBeforeComment = true;
                                    out.push({
                                        type: "KEYWORD",
                                        value: tok,
                                        end: i
                                    });
                                } else if(tok === 'r' || tok === 'ratings') {
                                    if(didGen && !didFor) {
                                        throw new SyntaxError("Attempted to declare the \"r\" field when the \"for\" field has not yet been declared at line 1, column " + (i - tok.length));
                                    }
                                    isRightBeforeRating = true;
                                    out.push({
                                        type: "KEYWORD",
                                        value: tok,
                                        end: i
                                    });
                                } else {
                                    throw new SyntaxError("Unexpected token \"" + tok + "\" at line 1, column " + (i - tok.length));
                                }
                            }
                        }
                        tok = '';
                    } else if(c === '\"') {
                        if(isBeginning) {
                            isBeginning = false;
                            inURL = true;
                            out.push({
                                type: "STRING_START",
                                value: '\"',
                                end: i + 1
                            });
                            tok = ''
                        } else if(isRightBeforeComment) {
                            isRightBeforeComment = false;
                            if(didComment) {
                                throw new SyntaxError("Attempted to declare a comment after comment had already been declared at line 1, column " + i);
                            }
                            inComment = true;
                            out.push({
                                type: "STRING_START",
                                value: '\"',
                                end: i + 1
                            });
                            tok = '';
                        } else if(isRightBeforeFor) {
                            isRightBeforeFor = false;
                            if(didFor) {
                                throw new SyntaxError("Attempted to declare a for statement after for statement had already been declared at line 1, column " + i);
                            }
                            isInFor = true;
                            out.push({
                                type: "STRING_START",
                                value: '\"',
                                end: i + 1
                            });
                            tok = '';
                        } else {
                            throw new SyntaxError("Unexpected string literal at line 1, column " + i);
                        }
                    } else if(c === '(') {
                        if(isRightBeforeRating) {
                            isInRating = true;
                            out.push({
                                type: "RATING_START",
                                value: '(',
                                end: i + 1
                            });
                            tok = '';
                        } else {
                            throw new SyntaxError("Unexpected rating literal at line 1, column " + i);
                        }
                    } else if(c === ')') {
                        if(cp) {
                            throw new SyntaxError("Unexpected EOL charcater before end of line at line 1, column " + i);
                        }
                        out.push({
                            type: "LINE_TERMINATOR",
                            value: ')',
                            end: i + 1
                        });
                    } else {
                        tok += c;
                    }
                }
            }
            return out;
        }
    };
    return purify;
})();