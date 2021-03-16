<template>
	<tr>
		<td>
			<strong>{{movie.rank}}</strong>
			<span>{{dayRankTxt}}</span>
		</td>
		<td><nuxt-link to="/movie-detail">{{movie.movieNm}}</nuxt-link></td>
		<td>{{movie.openDt}}</td>
		<td>{{movie.audiAcc}}</td>
	</tr>
</template>
<script>
export default {
	props: ['movie'],
	computed: {
		dayRankTxt(){
			if(this.movie.rankOldAndNew == 'NEW'){
				return 'new'
			}else{
				return this.movie.rankInten == 0 ? '-' : this.movie.rankInten;
			}
		}
	},
	methods: {
		
	},
}
</script>
