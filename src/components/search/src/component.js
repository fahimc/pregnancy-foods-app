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
    onKeyUp() {
        EventBus.$emit('SEARCH_RESULT', this.state.search);
    }
  }
};
