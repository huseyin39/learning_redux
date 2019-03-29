import { StyleSheet, View, TextInput, Button, TouchableOpacity, Text, FlatList, ActivityIndicator} from 'react-native'
import React, { Component } from 'react';
import { getFilmsFromApiWithSearchedText } from '../API/TMDBApi'
import Item from './Item'
import { connect } from'react-redux'

class SearchBar extends Component {
  constructor(props) {
    super(props)
    this.state = {
      films: [],
      isLoading: false
    }
    this.searchedText = ""
    this.page = 0
    this.totalPages = 0
  }

  _searchFilms() {
    this.page = 0
    this.totalPages = 0
    this.setState(
    {
      films: []
    }, () => {
      console.log("Page : " + this.page + " / TotalPages : " + this.totalPages + " / Nombre de films : " + this.state.films.length)
      this._loadFilms()
    }
    )
  }

  _loadFilms() {
    if (this.searchedText.length > 0) {
      this.setState({ isLoading: true }) 
      getFilmsFromApiWithSearchedText(this.searchedText, this.page+1).then(data => {
        this.page = data.page
        this.totalPages = data.total_pages
        this.setState({
          films:  [...this.state.films, ...data.results ],
          isLoading: false})
      })
    }
 }

 _displayLoading() {
    if (this.state.isLoading) {
      return (
        <View style={styles.loading_container}>
          <ActivityIndicator size='large' />
        </View>
      )
    }
  }

  _displayDetailForFilm = (idFilm) => {
    console.log("Display film with id " + idFilm)
    this.props.navigation.navigate("FilmDetail", { idFilm: idFilm })
  }

	render() {
    return (
      <View style={styles.main_container}>
      	<View style={styles.bar_container}>
      		<TextInput style={styles.textinput}
                      placeholder='Title of the movie'
                      onChangeText={(text) => this.searchedText = text}
                      onSubmitEditing={() => this._searchFilms()}
          />
          <TouchableOpacity onPress={() => this._searchFilms()} style={styles.button}>
  	    	  <Text style={styles.textButton}>Search</Text>
  	      </TouchableOpacity>
  			</View>
        <View style={styles.main_container}>
          <FlatList
                data={this.state.films}
                extraData={this.props.favoritesFilm}
                keyExtractor={(item) => key=item.id.toString()}
                renderItem={({item}) => <Item film={item}
                                              displayDetailForFilm={this._displayDetailForFilm}
                                              isFilmFavorite={(this.props.favoritesFilm.findIndex(film => film.id === item.id) !== -1) ? true : false}/>}
                onEndReachedThreshold={0.5}
                onEndReached={() => {
                  if (this.page < this.totalPages) { 
                    this._loadFilms()
                  }
                }}
          />
        </View>
        {this._displayLoading()}
      </View>
    );
  }
}


const styles = StyleSheet.create({
  main_container:{
    flex: 1
  },
  bar_container: {
  	justifyContent: 'center',
  	alignItems: 'flex-start',
    flexDirection: 'row'
  },
  textinput: {
  	flex: 2,
    height: 50,
    borderColor: '#000000',
    borderWidth: 1,
    textAlign: 'center',
    margin: 10
  },
  textButton: {
    fontSize: 15,
    textAlign: 'center'
  },
  button: {
  	flex: 1,
    height: 50,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#DDDDDD',
    borderColor: '#000000',
    borderWidth: 1,
    margin: 10
  },
  loading_container: {
    position: 'absolute',
    left: 0,
    right: 0,
    top: 100,
    bottom: 0,
    alignItems: 'center',
    justifyContent: 'center'
  }
})


const mapStateToProps = (state) => {
  console.log(state.favoritesFilm)
  return {
    favoritesFilm: state.favoritesFilm
  }
}

export default connect(mapStateToProps)(SearchBar)
