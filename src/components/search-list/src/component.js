import Data from '../../../data/data';
import {
  EventBus
} from '../../../event/eventbus';

export default {
  name: 'search-list',
  data() {
    return {
      state: Data,
      resultCollection: []
    }
  },
  computed: {
    resultList() {
      return (this.state.search);
    }
  },
  mounted() {
    EventBus.$on('SEARCH_RESULT', this.onSearchResult.bind(this));
  },
  methods: {
    onSearchResult(data) {
    this.resultCollection = [];
        if (data.length < 2)return;
      Data.collection.forEach((item) => {
          let nameSimilarity = this.similarity(data.toLowerCase(),item.name.toLowerCase());
        let accuracy = 0.6;
          if (nameSimilarity >= accuracy || name.indexOf(data) >= 0)
          {
              this.addItemToCollection(item);
          }else{
              let found = false;
              item.alias.forEach((name) => {
                  let similarity = this.similarity(data.toLowerCase(), name.toLowerCase());
                  if (similarity >= accuracy || name.indexOf(data) >= 0) found = true;
              });
              item.safeCollection.forEach((name) => {
                  let similarity = this.similarity(data.toLowerCase(), name.toLowerCase());
                  if (similarity >= accuracy || name.indexOf(data) >= 0) found = true;
              });
              item.avoidCollection.forEach((name) => {
                  let similarity = this.similarity(data.toLowerCase(), name.toLowerCase());
                  if (similarity >= accuracy || name.indexOf(data) >= 0) found = true;
              });

              if(found)
              {
                  this.addItemToCollection(item);
              }
          }
       
      });
    },
    addItemToCollection(item){
        this.resultCollection.push(item);
    },
    similarity(s1, s2) {
      var longer = s1;
      var shorter = s2;
      if (s1.length < s2.length) {
        longer = s2;
        shorter = s1;
      }
      var longerLength = longer.length;
      if (longerLength == 0) {
        return 1.0;
      }
      return (longerLength - this.editDistance(longer, shorter)) / parseFloat(longerLength);
    },
    editDistance(s1, s2) {
      s1 = s1.toLowerCase();
      s2 = s2.toLowerCase();

      var costs = new Array();
      for (var i = 0; i <= s1.length; i++) {
        var lastValue = i;
        for (var j = 0; j <= s2.length; j++) {
          if (i == 0)
            costs[j] = j;
          else {
            if (j > 0) {
              var newValue = costs[j - 1];
              if (s1.charAt(i - 1) != s2.charAt(j - 1))
                newValue = Math.min(Math.min(newValue, lastValue),
                  costs[j]) + 1;
              costs[j - 1] = lastValue;
              lastValue = newValue;
            }
          }
        }
        if (i > 0)
          costs[s2.length] = lastValue;
      }
      return costs[s2.length];
    }
  }
};
