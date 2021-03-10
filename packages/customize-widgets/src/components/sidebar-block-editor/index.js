/**
 * WordPress dependencies
 */
import { useMemo } from '@wordpress/element';
import {
	BlockEditorProvider,
	BlockList,
	BlockSelectionClearer,
	ObserveTyping,
	WritingFlow,
	BlockEditorKeyboardShortcuts,
} from '@wordpress/block-editor';
import {
	DropZoneProvider,
	SlotFillProvider,
	Popover,
} from '@wordpress/components';

/**
 * External dependencies
 */
import { useDialogState } from 'reakit/Dialog';

/**
 * Internal dependencies
 */
import Header from '../header';
import useSidebarBlockEditor from './use-sidebar-block-editor';

export default function SidebarBlockEditor( { sidebar } ) {
	const [ blocks, onInput, onChange ] = useSidebarBlockEditor( sidebar );
	const inserter = useDialogState( {
		modal: false,
		animated: 150,
	} );
	const settings = useMemo(
		() => ( {
			__experimentalSetIsInserterOpened: inserter.setVisible,
		} ),
		[ inserter.setVisible ]
	);

	return (
		<>
			<BlockEditorKeyboardShortcuts.Register />
			<SlotFillProvider>
				<DropZoneProvider>
					<BlockEditorProvider
						value={ blocks }
						onInput={ onInput }
						onChange={ onChange }
						settings={ settings }
					>
						<BlockEditorKeyboardShortcuts />

						<Header inserter={ inserter } />

						<BlockSelectionClearer>
							<WritingFlow>
								<ObserveTyping>
									<BlockList />
								</ObserveTyping>
							</WritingFlow>
						</BlockSelectionClearer>
					</BlockEditorProvider>

					<Popover.Slot name="block-toolbar" />
					<Popover.Slot />
				</DropZoneProvider>
			</SlotFillProvider>
		</>
	);
}
