import search from '@/components/search/search'
import searchList from '@/components/search-list/search-list'
import Data from '../../../data/data';

export default {
name: 'home',
components:{
    search,
    searchList
},
mounted(){
    Data.navigationClass = '';
}
};

