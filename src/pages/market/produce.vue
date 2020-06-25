<template>
  
<b-tab>
    <template slot="title">
        <i class="icon-image mr-2"></i>Images
    </template>

    <div class="info-block">
        <p class="pb-4 col-sm-12 digits">About 12,120 results (0.50 seconds)</p>
        <div class="my-gallery row gallery-with-description">
            <figure class="col-xl-3 col-sm-6" v-for="(n,index) in lightgallery" :key="index" @click="gindex = index">
                <a>
                    <img :src="getpath(n.image)" alt="Image description">
                    <div class="caption">
                        <h4 v-text="n.title"></h4>
                        <p v-text="n.description"></p>
                    </div>
                </a>
            </figure>
            <VueGallery :images="biglightgallery" :index="gindex" @close="gindex = null" :options="galleryoptions"  ></VueGallery>
        </div>
    </div>
    <div class="info-block">
        <b-pagination-nav
        :number-of-pages="3"
        base-url="#"
        prev-text="Previous"
        next-text="Next"
        class="pagination-primary"
            >
        </b-pagination-nav>
    </div>
</b-tab>

</template>

<script>
export default {
    data(){
		return{
			gindex:null,
			lightgallery:[
				{
					image:'01.jpg',
					title:'Portfolio Title',
					description:"is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy."
				},
				{
					image:'02.jpg',
					title:'Portfolio Title',
					description:"is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy."
				},
				{
					image:'03.jpg',
					title:'Portfolio Title',
					description:"is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy."
				},
				{
					image:'04.jpg',
					title:'Portfolio Title',
					description:"is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy."
				},
				{
					image:'05.jpg',
					title:'Portfolio Title',
					description:"is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy."
				},
				{
					image:'06.jpg',
					title:'Portfolio Title',
					description:"is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy."
				},
				{
					image:'07.jpg',
					title:'Portfolio Title',
					description:"is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy."
				},
				{
					image:'08.jpg',
					title:'Portfolio Title',
					description:"is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy."
				}
			],
			biglightgallery:[
			'01.jpg',
			'02.jpg',
			'03.jpg',
			'04.jpg',
			'05.jpg',
			'06.jpg',
			'07.jpg',
			'08.jpg'
			],
			galleryoptions:{
				prevClass: 'prev',
				nextClass: 'next',
			}
		}
    },
    methods:{
		setimagesparth(){
			for (var i = 0; i < this.biglightgallery.length; i++) {
				this.biglightgallery[i] = this.getbigimgpath(this.biglightgallery[i]);
			}
		},
		getpath(filename){
			return require('@/assets/images/lightgallry/'+filename)
		},
		getbigimgpath(filename){
			return require('@/assets/images/big-lightgallry/'+filename)
		}
	}
}
</script>

<style>

</style>