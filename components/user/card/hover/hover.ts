import View from '!view!./hover.html?style=./hover.styl';
import { Api } from 'game-jolt-frontend-lib/components/api/api.service';
import { Screen } from 'game-jolt-frontend-lib/components/screen/screen-service';
import Vue from 'vue';
import { Component, Prop, Watch } from 'vue-property-decorator';
import { AppPopper } from '../../../popper/popper';
import { User } from '../../user.model';
import { AppUserCard } from '../card';

@View
@Component({
	components: {
		AppPopper,
		AppUserCard,
	},
})
export class AppUserCardHover extends Vue {
	@Prop(User)
	user?: User;

	@Prop(Boolean)
	disabled?: boolean;

	isShowing = false;
	isLoaded = false;

	get isDisabled() {
		return Screen.isXs || GJ_IS_CLIENT || !!this.disabled;
	}

	get shouldShow() {
		return !!this.user && this.isShowing;
	}

	get component() {
		return this.isDisabled ? 'span' : AppPopper;
	}

	get componentProps() {
		return this.isDisabled
			? {}
			: {
					placement: 'top',
					trigger: 'hover',
					delay: { show: 500, hide: 0 },
					openGroup: 'user-card-hover',
					block: true,
			  };
	}

	get componentOn() {
		return this.isDisabled
			? {}
			: {
					show: () => this.onShow(),
					hide: () => this.onHide(),
			  };
	}

	@Watch('user.id', { immediate: true })
	onUserChange() {
		if (this.user) {
			this.isLoaded = false;
		}
	}

	onShow() {
		this.isShowing = true;
		if (!this.isLoaded) {
			this.fetchCardInfo();
		}
	}

	onHide() {
		this.isShowing = false;
	}

	async fetchCardInfo() {
		if (!this.user) {
			return;
		}

		const response = await Api.sendRequest('/web/profile/card/' + this.user.id, undefined, {
			detach: true,
		});

		this.isLoaded = true;

		// Assign to the user to make sure the following status is up to date.
		if (this.user) {
			this.user.assign(response.user);
		}
	}
}
