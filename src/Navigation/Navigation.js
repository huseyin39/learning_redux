import { createStackNavigator, createAppContainer } from 'react-navigation'
import SearchBar from '../Component/SearchBar'
import FilmDetail from '../Component/FilmDetail'

const SearchStackNavigator = createStackNavigator({
  SearchBar: { 
    screen: SearchBar,
    navigationOptions: {
      title: 'Rechercher'
    }
  },
  FilmDetail: {
  	screen: FilmDetail
  }
})
export default createAppContainer(SearchStackNavigator)