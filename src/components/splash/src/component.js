import Data from '../../../data/data';
import router from '../../../router/index';

export default {
  name: 'splash',
  mounted() {
    let url = 'static/data/data.json';

    let xhr = new XMLHttpRequest();
        xhr.onreadystatechange = ()=> {
              if (xhr.readyState == 4) {
                    if (xhr.status == 200 || xhr.status == 0) {
                          try {
                              this.onLoaded(JSON.parse(xhr.responseText));
                          } catch (e) {
                              this.onError(e);
                                return;
                          }
                    } else {
                        this.onError(xhr.status);
                    }
              }
        }
        try {
              xhr.open("GET", url, true);
              xhr.send();
        } catch (e) {
            this.onError(e);
        }   
  },
  methods:{
      onLoaded(data){
          Data.collection = data.items;
          setTimeout(() => {
              router.push('home');   
          }, 1000);
      },
      onErro(){

      }
  }
};
