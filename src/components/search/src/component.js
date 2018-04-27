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
          document.querySelector('a').focus();
        },50);
      }
        EventBus.$emit('SEARCH_RESULT', this.$el.querySelector('input').value);
    }
  }
};
