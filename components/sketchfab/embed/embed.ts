import * as Vue from 'vue';
import { Component, Prop, Watch } from 'vue-property-decorator';
import * as View from '!view!./embed.html';

import { Ruler } from '../../ruler/ruler-service';
import { Screen } from '../../screen/screen-service';

const RATIO = 0.5625; // 16:9

@View
@Component({
	name: 'sketchfab-embed',
})
export class AppSketchfabEmbed extends Vue
{
	@Prop( String ) sketchfabId: string;
	@Prop( Number ) maxWidth: number;
	@Prop( Number ) maxHeight: number;
	@Prop( { type: Boolean, default: false } ) autoplay: boolean;

	embedUrl = '';
	width = 0;
	height = 0;

	resize$ = Screen.resizeChanges.subscribe( async () =>
	{
		await this.$nextTick();
		this.recalculateDimensions();
	} );

	mounted()
	{
		this.$nextTick( () => this.recalculateDimensions() );
	}

	destroyed()
	{
		this.resize$.unsubscribe();
	}

	@Watch( 'sketchfabId', { immediate: true } )
	idChange()
	{
		if ( !this.sketchfabId ) {
			return;
		}

		let url = `https://sketchfab.com/models/${this.sketchfabId}/embed`;

		if ( this.autoplay ) {
			url += '?autostart=1';
		}

		this.embedUrl = url;
	}

	recalculateDimensions()
	{
		this.width = Ruler.width( this.$el.getElementsByClassName( 'sketchfab-embed-inner' )[0] as HTMLElement );

		if ( this.maxWidth ) {
			this.width = Math.min( this.maxWidth, this.width );
		}

		this.height = this.width * RATIO;

		if ( this.maxHeight && this.height > this.maxHeight ) {
			this.height = this.maxHeight;
			this.width = this.height / RATIO;
		}
	}
}
