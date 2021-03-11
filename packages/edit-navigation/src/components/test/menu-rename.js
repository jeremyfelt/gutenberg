/**
 * External dependencies
 */
import { shallow } from 'enzyme';
/**
 * WordPress dependencies
 */
import * as mockWpElement from '@wordpress/element';
import * as mockWpData from '@wordpress/data';
/**
 * Internal dependencies
 */
import Layout from '../layout';
import Editor from '../editor';
import MenuSwitcher from '../menu-switcher';
import NameDisplay from '../name-display';
import NameEditor from '../name-editor';
import InspectorAdditions from '../inspector-additions';
import { ToolbarButton } from '@wordpress/components';
import * as hooks from '../../hooks';

const useNavigationEditorData = {
	menus: [
		{
			auto_add: false,
			description: '',
			id: 102,
			meta: [],
			name: 'adas',
			slug: 'adas',
		},
		{
			auto_add: false,
			description: '',
			id: 103,
			meta: [],
			name: 'das',
			slug: 'das',
		},
	],
	hasLoadedMenus: true,
	hasFinishedInitialLoad: true,
	selectedMenuId: 102,
	navigationPost: {},
	selectMenu: () => {},
	deleteMenu: () => {},
};

describe( 'Menu name editor', () => {
	let wrapper, input, nameEditor;
	beforeEach( () => {
		// jest.spyOn( hooks, 'useNavigationEditor' ).mockImplementation(
		// 	() => useNavigationEditorData
		// );
		wrapper = shallow( <Layout blockEditorSettings={ {} } /> );
		wrapper.find('.wp-block-navigation-placeholder').simulate('click')
		nameEditor = wrapper.find( NameEditor );
		input = nameEditor.find( 'input' );
	} );
	it( 'is displayed in toolbar', () => {
		const toolbar = wrapper.find( InspectorAdditions );
		toolbar.find( NameDisplay ).to.have.lengthOf( 1 );
	} );
	it.skip( 'is focused upon clicking on menu name in toolbar', () => {
		const nameDisplay = wrapper.find( NameDisplay );
		nameDisplay.find( ToolbarButton ).simulate( 'click' );
		expect( input.is( ':focus' ) ).toBe( true );
	} );
	it.skip( 'saves menu name upon clicking save button', () => {} );
} );
