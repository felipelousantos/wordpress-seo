import AbstractResearcher from "../../AbstractResearcher";

// All config
import firstWordExceptions from "./config/firstWordExceptions";
import { all as functionWords } from "./config/functionWords";
import transitionWords from "./config/transitionWords";
import twoPartTransitionWords from "./config/twoPartTransitionWords";
import syllables from "./config/syllables.json";

// All helpers
import getStemmer from "./helpers/getStemmer";
import isPassiveSentence from "./helpers/isPassiveSentence";
import fleschReadingScore from "./helpers/calculateFleschReadingScore";

/**
 * The researches contains all the researches
 */
export default class Researcher extends AbstractResearcher {
	/**
	 * Constructor
	 * @param {Paper} paper The Paper object that is needed within the researches.
	 * @constructor
	 */
	constructor( paper ) {
		super( paper );

		Object.assign( this.config, {
			language: "ru",
			passiveConstructionType: "morphological",
			firstWordExceptions,
			functionWords,
			transitionWords,
			twoPartTransitionWords,
			syllables,
		} );

		Object.assign( this.helpers, {
			getStemmer,
			isPassiveSentence,
			fleschReadingScore,
		} );
	}
}
