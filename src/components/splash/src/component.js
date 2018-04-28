import Data from '../../../data/data';
import router from '../../../router/index';

export default {
  name: 'splash',
  mounted() {
    this.loadSpreadsheet();
  },
  methods: {
    loadLocalFile() {
      let url = 'static/data/data.json';

      let xhr = new XMLHttpRequest();
      xhr.onreadystatechange = () => {
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
    loadSpreadsheet() {
      Tabletop.init({
        key: 'https://docs.google.com/spreadsheets/d/1388DmdneL72roKI0Xn2JBJFqbbbu9N3LQvYckKHyHyY/edit?usp=sharing',
        callback: this.onSpreadsheetLoaded.bind(this),
        simpleSheet: true
      })

    },
    onSpreadsheetLoaded(data, tabletop) {
      let items = [];
        data.forEach((row,index) => {
          let safeValue = this.getValueByString(row, 'safe');
          let avoidValue = this.getValueByString(row, 'avoid');
            let item = {
                name: this.getValueByString(row,'name'),
                source: this.getValueByString(row, 'source'),
                alias: this.getValueByString(row, 'alias').split(','),
                verdict: this.getValueByString(row, 'verdict'),
                snippet: this.getValueByString(row, 'important'),
                description: this.getValueByString(row, 'description').replace(/\\n/g, ''),
                safeCollection: safeValue ? safeValue.split(','):[],
                avoidCollection: avoidValue ? avoidValue.split(','): []
            }
            items.push(item);
        });
        this.onLoaded({
            items:items
        });
    },
    getValueByString(item,keyPart){
        for(let key in item){
            if (key.toLowerCase().indexOf(keyPart.toLowerCase()) >= 0)
            {
                return item[key];
            }
        }
    },
    onLoaded(data) {
      Data.collection = data.items;
      setTimeout(() => {
        router.push('home');
      }, 1000);
    },
    onErro() {

    }
  }
};
