import View from '!view!./jolticons-styleguide.html';
import Vue from 'vue';
import { Component } from 'vue-property-decorator';
import { AppJolticon } from '../../vue/components/jolticon/jolticon';
import { AppTooltip } from '../tooltip/tooltip';

@View
@Component({
	components: {
		AppJolticon,
	},
	directives: {
		AppTooltip,
	},
})
export class AppJolticonsStyleguide extends Vue {
	filter = '';

	get filteredIcons() {
		return [
			'verified',
			'itchio',
			'indiedb',
			'radio-circle-filled',
			'radio-circle',
			'dashboard',
			'playlist',
			'pedestals-numbers',
			'pause',
			'play-small',
			'help-circle',
			'exclamation-circle',
			'info-circle',
			'user',
			'youtube',
			'unity',
			'silverlight',
			'java',
			'flash',
			'html5',
			'users',
			'friends',
			'token',
			'ellipsis-h',
			'ellipsis-v',
			'link',
			'world',
			'plug',
			'brackets',
			'markdown',
			'search',
			'broadcast',
			'feed',
			'arrows',
			'arrows-h',
			'arrows-v',
			'steam',
			'heart',
			'box-empty',
			'comment',
			'filter',
			'chevron-right',
			'chevron-down',
			'chevron-left',
			'chevron-up',
			'musical-note-double',
			'windows',
			'video',
			'user-messages',
			'twitter-bird',
			'twitter',
			'tumblr',
			'trophy',
			'thumbs-up',
			'thumbs-down',
			'tags',
			'tag',
			'subscribed',
			'subscribe',
			'screenshot',
			'rss',
			'reply',
			'remove',
			'reddit',
			'play',
			'other-os',
			'notifications',
			'notice',
			'menu',
			'mac',
			'logout',
			'linux',
			'key-diagonal',
			'inactive',
			'gamejolt',
			'game',
			'friend-requests',
			'friend-remove-2',
			'friend-add-2',
			'folder-open',
			'folder',
			'facebook',
			'exp',
			'email',
			'edit',
			'download-box',
			'download',
			'cog',
			'checkbox',
			'check',
			'chart',
			'bundle',
			'blog-article',
			'add-comment',
			'add',
			'active',
			'thumbtack',
			'flag',
			'lock',
			'calendar',
			'calendar-plus',
			'calendar-grid',
			'credit-card',
			'rom',
			'google-plus',
			'twitch',
			'sketchfab',
			'fireside',
			'devlogs',
			'forums',
			'jams',
			'client',
			'share-airplane',
		]
			.sort()
			.filter(i => i.indexOf(this.filter) !== -1);
	}
}
