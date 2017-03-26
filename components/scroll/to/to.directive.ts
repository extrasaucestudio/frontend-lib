import Vue from 'vue';
import { Scroll } from '../scroll.service';

export const AppScrollTo: Vue.DirectiveOptions = {
	bind( el, binding )
	{
		el.addEventListener( 'click', () =>
		{
			const to = binding.value || (el.getAttribute( 'href' ) || '').substring( 1 );
			if ( !to ) {
				console.error( new Error( `Couldn't get scroll to.` ) );
			}

			Scroll.to( to, { animate: true } );
		} );
	},
};
