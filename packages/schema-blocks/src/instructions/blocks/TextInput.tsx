import { useCallback } from "react";
import { TextControl } from "@wordpress/components";
import { createElement } from "@wordpress/element";
import { BlockConfiguration } from "@wordpress/blocks";
import BlockInstruction from "../../core/blocks/BlockInstruction";
import { RenderEditProps, RenderSaveProps } from "../../core/blocks/BlockDefinition";
import { BlockLeaf } from "../../core/blocks";

/**
 * The text input instruction.
 */
export default class TextInput extends BlockInstruction {
	public options: {
		name: string;
		type: string;
		label: string;
		hideLabelFromVision: boolean;
		placeholder: string;
	}

	/**
	 * Renders editing the instruction.
	 *
	 * @param props The props.
	 * @param leaf  The leaf being rendered.
	 * @param index The number the rendered element is of its parent.
	 *
	 * @returns The rendered instruction.
	 */
	edit( props: RenderEditProps, leaf: BlockLeaf, index: number ): React.ReactElement | string {
		const { hideLabelFromVision, label, type, placeholder } = this.options;

		const value = props.attributes[ this.options.name ] as string;

		const onChange = useCallback(
			newValue => {
				props.setAttributes( { [ this.options.name ]: newValue } );
			},
			[ props ],
		);

		return <TextControl
			key={ index }
			className={ props.className }
			hideLabelFromVision={ hideLabelFromVision }
			label={ label }
			onChange={ onChange }
			type={ type }
			placeholder={ placeholder }
			value={ value }
		/>;
	}

	/**
	 * Renders saving the instruction.
	 *
	 * @param props The props.
	 *
	 * @returns The element to render.
	 */
	save( props: RenderSaveProps ): React.ReactElement | string {
		return props.attributes[ this.options.name ] as string;
	}

	/**
	 * Adds the select to the block configuration.
	 *
	 * @returns The block configuration.
	 */
	configuration(): Partial<BlockConfiguration> {
		return {
			attributes: {
				[ this.options.name ]: {
					type: "string",
				},
			},
		};
	}
}

BlockInstruction.register( "text-input", TextInput );

