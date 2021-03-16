<template>
	<div class="container">
		<h1>일별 박스 오피스 순위</h1>
		<fieldset>
			<legend>조회 날짜 선택</legend>
			<input type="date" v-model="targetDate" @change="fnChangeDate()">
		</fieldset>

		<table class="tbl-list">
			<caption>박스 오피스 리스트</caption>
			<colgroup>
				<col width="50px" />
				<col width="*" />
				<col width="60px" />
				<col width="80px" />
			</colgroup>
			<thead>
				<tr>
					<th>순위</th>
					<th>제목</th>
					<th>개봉일</th>
					<th>누적관객</th>
				</tr>
			</thead>
			<tbody>
				<MovieList
					v-for="movie in movies"
					v-bind:movie="movie"
					v-bind:key="movie.id"
				/>
			</tbody>
		</table>
	</div>
</template>

<script>
import * as config from '~/assets/js/config.js';

export default {
	data(){
		return {
			movies: [],
			param: {
				key : config.key,
				targetDt : this.$moment().subtract(1, 'days').format('YYYYMMDD')
			},
			targetDate: this.$moment().subtract(1, 'days').format('YYYY-MM-DD')
		}
	},
	mounted(){
		this.getMovieList();
	},
	methods:{
		async getMovieList(){
			this.$axios({
				method: config.apiList['boxOffice'].type,
				url: config.apiList['boxOffice'].url + `?key=${this.param.key}&targetDt=${this.param.targetDt}`
			})
				.catch((err) => {
					console.log('err : ', err)
				})
				.then((res) => {
					this.movies = res.data.boxOfficeResult.dailyBoxOfficeList;
				})
		},
		fnChangeDate(){
			this.param.targetDt = this.$moment(this.targetDate, 'YYYY-MM-DD').format('YYYYMMDD');

			this.getMovieList();
		}
	}
}
</script>

<style lang="scss">
</style>
