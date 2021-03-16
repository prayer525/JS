<template>
  <div class="container">

  </div>
</template>

<script>
export default {
	data(){
		return {
			movies: []
		}
	},
	mounted(){
		this.getMovieList();
	},
	methods:{
		async getMovieList(){
			this.$axios({
				method: 'POST',
				url: 'http://www.kobis.or.kr/kobisopenapi/webservice/soap/boxoffice',
				data: {
					key: '53b6a105245674610485b736392fffc9',
					targetDt: '20210316'
				}
			})
				.catch((err) => {
					console.log('err : ', err)
				})
				.then((res) => {
					console.log('res : ' , res)
				})
		}
	}
}
</script>

<style>
.container {
  margin: 0 auto;
  min-height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  text-align: center;
}
</style>
