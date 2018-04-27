import Data from '../../../data/data';
import { EventBus } from '../../../event/eventbus';

export default {
  name: 'search',
  data() {
    return {
        state: Data
    }
  },
  methods: {
    onKeyUp(event) {
      if(event.keyCode == 13){
        setTimeout(()=> {
          this.$el.parentNode.querySelector('h1').focus();
        },50);
      }
        EventBus.$emit('SEARCH_RESULT', this.state.search);
    }
  }
};
