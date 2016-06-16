import { Injectable } from 'ng-metadata/core';

// Swappable if display is none or starts with table except "table", "table-cell", or "table-caption"
// See here for display values: https://developer.mozilla.org/en-US/docs/CSS/display
const DISPLAY_SWAP_REGEX = /^(none|table(?!-c[ea]).+)/;
const CSS_SHOW_STYLES = {
	position: 'absolute',
	visibility: 'hidden',
	display: 'block',
};

@Injectable()
export class Ruler
{
	width( elem: HTMLElement | Document )
	{
		return this._dimensions( 'clientWidth', elem );
	}

	height( elem: HTMLElement | Document )
	{
		return this._dimensions( 'clientHeight', elem );
	}

	outerWidth( elem: HTMLElement | Document )
	{
		return this._dimensions( 'offsetWidth', elem );
	}

	outerHeight( elem: HTMLElement | Document )
	{
		return this._dimensions( 'offsetHeight', elem );
	}

	private _dimensions( baseProp: string, _elem: HTMLElement | Document ): number
	{
		let elem: HTMLElement;

		if ( _elem === window.document ) {
			elem = window.document.body;
		}
		else {
			elem = <HTMLElement>_elem;
		}

		const styles = window.getComputedStyle( elem );

		// Certain elements can have dimension info if we invisibly show them,
		// but it must have a current display style that would benefit.
		// This only matters for currently hidden elements that wouldn't return dimensions.
		let swappedStyles = false;
		const oldStyles = {};
		if ( DISPLAY_SWAP_REGEX.test( styles.display ) && elem.offsetWidth === 0 ) {
			swappedStyles = true;

			for ( const name in CSS_SHOW_STYLES ) {
				oldStyles[ name ] = elem.style[ name ];
				elem.style[ name ] = CSS_SHOW_STYLES[ name ];
			}
		}

		let val = elem[ baseProp ];
		if ( baseProp === 'clientWidth' ) {
			val -= parseFloat( styles.paddingLeft ) + parseFloat( styles.paddingRight );
		}
		else if ( baseProp === 'clientHeight') {
			val -= parseFloat( styles.paddingTop ) + parseFloat( styles.paddingBottom );
		}
		else if ( baseProp === 'offsetWidth' ) {
			val += parseFloat( styles.marginLeft ) + parseFloat( styles.marginRight );
		}
		else if ( baseProp === 'offsetHeight') {
			val += parseFloat( styles.marginTop ) + parseFloat( styles.marginBottom );
		}

		if ( swappedStyles ) {
			for ( const name in CSS_SHOW_STYLES ) {
				elem.style[ name ] = oldStyles[ name ];
			}
		}

		return val;
	}
}




// angular.module( 'gj.Ruler' ).service( 'Ruler', function( $window )
// {
// 	// Swappable if display is none or starts with table except "table", "table-cell", or "table-caption"
// 	// See here for display values: https://developer.mozilla.org/en-US/docs/CSS/display
// 	var DISPLAY_SWAP_REGEX = /^(none|table(?!-c[ea]).+)/;
// 	var CSS_SHOW_STYLES = {
// 		position: 'absolute',
// 		visibility: 'hidden',
// 		display: 'block',
// 	};

// 	angular.forEach( { width: 'clientWidth', height: 'clientHeight', outerWidth: 'offsetWidth', outerHeight: 'offsetHeight' }, function( baseProp, prop )
// 	{
// 		this[ prop ] = function( elem )
// 		{
// 			if ( elem === $window.document ) {
// 				elem = $window.document.body;
// 			}

// 			var styles = $window.getComputedStyle( elem );

// 			// Certain elements can have dimension info if we invisibly show them,
// 			// but it must have a current display style that would benefit.
// 			// This only matters for currently hidden elements that wouldn't return dimensions.
// 			var swappedStyles = false;
// 			if ( DISPLAY_SWAP_REGEX.test( styles.display ) && elem.offsetWidth === 0 ) {
// 				var oldStyles = {};
// 				var name;

// 				swappedStyles = true;
// 				for ( name in CSS_SHOW_STYLES ) {
// 					oldStyles[ name ] = elem.style[ name ];
// 					elem.style[ name ] = CSS_SHOW_STYLES[ name ];
// 				}
// 			}

// 			var val = elem[ baseProp ];
// 			if ( prop === 'width' ) {
// 				val -= parseFloat( styles.paddingLeft ) + parseFloat( styles.paddingRight );
// 			}
// 			else if ( prop === 'height') {
// 				val -= parseFloat( styles.paddingTop ) + parseFloat( styles.paddingBottom );
// 			}
// 			else if ( prop === 'outerWidth' ) {
// 				val += parseFloat( styles.marginLeft ) + parseFloat( styles.marginRight );
// 			}
// 			else if ( prop === 'outerHeight') {
// 				val += parseFloat( styles.marginTop ) + parseFloat( styles.marginBottom );
// 			}

// 			if ( swappedStyles ) {
// 				for ( name in CSS_SHOW_STYLES ) {
// 					elem.style[ name ] = oldStyles[ name ];
// 				}
// 			}

// 			return val;
// 		};
// 	}, this );
// } );
