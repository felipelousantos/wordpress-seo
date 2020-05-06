/* External dependencies */
import React, { Component } from "react";
import PropTypes from "prop-types";

/* Internal dependencies */
import { SocialMetadataPreviewForm } from "@yoast/social-metadata-forms";
import FacebookPreview from "../facebook/FacebookPreview";
import TwitterPreview from "../twitter/TwitterPreview";
import { recommendedReplacementVariablesShape, replacementVariablesShape } from "@yoast/replacement-variable-editor";

/**
 * A form with an image selection button, a title input field and a description field and the social preview.
 *
 * @returns {void} Void.
 */
class SocialPreviewEditor extends Component {
	/**
	 * The constructor.
	 * @param {Object} props The props object.
	 *
	 * @returns {void}
	 */
	constructor( props ) {
		super( props );

		this.state = {
			activeField: "",
			hoveredField: "",
		};

		this.SocialPreview = props.socialMediumName === "Facebook" ? FacebookPreview : TwitterPreview;
		this.setHoveredField = this.setHoveredField.bind( this );
		this.setActiveField = this.setActiveField.bind( this );
		this.setEditorRef = this.setEditorRef.bind( this );
		this.setEditorFocus = this.setEditorFocus.bind( this );
	}

	/**
	 * Sets the field that the mouse is hovering over in state.
	 *
	 * @param {string} field The field that is hovered over.
	 *
	 * @returns {void}
	 */
	setHoveredField( field ) {
		if ( field === this.state.hoveredField ) {
			return;
		}
		this.setState( {
			hoveredField: field,
		} );
	}

	/**
	 * Sets the active field that is selected in state.
	 *
	 * @param {string} field The field that is selected.
	 *
	 * @returns {void}
	 */
	setActiveField( field ) {
		if ( field === this.state.activeField ) {
			return;
		}
		this.setState(
			{ activeField: field },
			() => this.setEditorFocus( field )
		);
	}

	/**
	 * Sets focus on the editor that is the active field.
	 *
	 * @param {String} field The active field belonging to the editor to focus.
	 *
	 * @returns {void}
	 */
	setEditorFocus( field ) {
		switch ( field ) {
			case "title":
				this.titleEditorRef.focus();
				break;
			case "description":
				this.descriptionEditorRef.focus();
				break;
		}
	}

	/**
	 * Sets the reference of each editor.
	 * Used by child components to communicate with this focus managing component.
	 * This component can then call the .focus() function on the passed refs.
	 *
	 * @param {string} field The field belonging to the editor that belongs to the ref.
	 * @param {*} ref A ref to an editor.
	 *
	 * @returns {void}
	 */
	setEditorRef( field, ref ) {
		switch ( field ) {
			case "title":
				this.titleEditorRef = ref;
				break;
			case "description":
				this.descriptionEditorRef = ref;
				break;
		}
	}

	/**
	 * The render function.
	 *
	 * @returns {void} Void.
	 */
	render() {
		const {
			onDescriptionChange,
			onTitleChange,
			onSelectImageClick,
			onRemoveImageClick,
			socialMediumName,
			imageWarnings,
			siteUrl,
			authorName,
			description,
			descriptionPlaceholder,
			imageUrl,
			imageFallbackUrl,
			alt,
			title,
			replacementVariables,
			recommendedReplacementVariables,
			applyReplacementVariables,
			isPremium,
			isLarge,
		} = this.props;

		// Preset a title fallback for the preview if title is empty.
		const previewTitle = title === "" ? "%%title%% %%sep%% %%sitename%%" : title;

		const replacedVars = applyReplacementVariables( { title: previewTitle, description } );
		const previewDescription = replacedVars.description === "" ? descriptionPlaceholder : replacedVars.description;

		return (
			<React.Fragment>
				<this.SocialPreview
					onMouseHover={ this.setHoveredField }
					onSelect={ this.setActiveField }
					onImageClick={ onSelectImageClick }
					siteUrl={ siteUrl }
					authorName={ authorName }
					title={ replacedVars.title }
					description={ previewDescription }
					imageUrl={ imageUrl }
					imageFallbackUrl={ imageFallbackUrl }
					alt={ alt }
					isLarge={ isLarge }
				/>
				<SocialMetadataPreviewForm
					onDescriptionChange={ onDescriptionChange }
					socialMediumName={ socialMediumName }
					title={ title }
					onRemoveImageClick={ onRemoveImageClick }
					imageSelected={ !! imageUrl }
					imageUrl={ imageUrl }
					onTitleChange={ onTitleChange }
					onSelectImageClick={ onSelectImageClick }
					description={ description }
					descriptionPlaceholder={ descriptionPlaceholder }
					imageWarnings={ imageWarnings }
					replacementVariables={ replacementVariables }
					recommendedReplacementVariables={ recommendedReplacementVariables }
					onMouseHover={ this.setHoveredField }
					hoveredField={ this.state.hoveredField }
					onSelect={ this.setActiveField }
					activeField={ this.state.activeField }
					isPremium={ isPremium }
					setEditorRef={ this.setEditorRef }
				/>
			</React.Fragment>
		);
	}
}

SocialPreviewEditor.propTypes = {
	title: PropTypes.string.isRequired,
	onTitleChange: PropTypes.func.isRequired,
	description: PropTypes.string.isRequired,
	onDescriptionChange: PropTypes.func.isRequired,
	imageUrl: PropTypes.string.isRequired,
	imageFallbackUrl: PropTypes.string.isRequired,
	onSelectImageClick: PropTypes.func.isRequired,
	onRemoveImageClick: PropTypes.func.isRequired,
	socialMediumName: PropTypes.string.isRequired,
	alt: PropTypes.string,
	isPremium: PropTypes.bool,
	imageWarnings: PropTypes.array,
	isLarge: PropTypes.bool,
	siteUrl: PropTypes.string,
	descriptionPlaceholder: PropTypes.string,
	authorName: PropTypes.string,
	replacementVariables: replacementVariablesShape,
	recommendedReplacementVariables: recommendedReplacementVariablesShape,
	applyReplacementVariables: PropTypes.func,
};

SocialPreviewEditor.defaultProps = {
	imageWarnings: [],
	recommendedReplacementVariables: [],
	replacementVariables: [],
	isPremium: false,
	isLarge: true,
	siteUrl: "",
	descriptionPlaceholder: "",
	alt: "",
	authorName: "",
	applyReplacementVariables: data => data,
};

export default SocialPreviewEditor;
