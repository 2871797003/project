export default {
    data(){
        return {
            breadlist:[]
        }
    },
    created(){
        this.breadCrumb()
    },
    methods:{
        breadCrumb(){
            this.breadlist=this.$route.meta.bread?this.$route.meta.bread:[]
        }
    },
    watch:{
        $route(){
            this.breadCrumb()
        }
    }
}