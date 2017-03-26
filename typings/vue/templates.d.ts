declare module '!view*'
{
	import Vue from 'vue';
	interface WithRender
	{
		<V extends Vue>( options: Vue.ComponentOptions<V> ): Vue.ComponentOptions<V>;
		<V extends typeof Vue>( component: V ): V;
	}
	const Template: WithRender;
	export = Template;
}
