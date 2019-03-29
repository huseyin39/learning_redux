import React, { Component }  from 'react'
import { StyleSheet, Image, View, Text, TouchableOpacity } from 'react-native'
import { getImageFromApi } from '../API/TMDBApi'


export default class Item extends Component {

  _displayFavoriteImage() {
    if (this.props.isFilmFavorite) {
      return (
        <Image
          style={styles.favorite_image}
          source={require('../Image/ic_favorite.png')}
        />
      )
    }
  }


  render() {
  	const {film, displayDetailForFilm} = this.props;
    return (
    	<TouchableOpacity style={styles.main_container}
            onPress={() => displayDetailForFilm(film.id)}>
    		<Image source={{uri: getImageFromApi(film.poster_path)}} style={styles.image}/>
    		<View style={styles.content_container}>
    			<View style={styles.header_container}>
            {this._displayFavoriteImage()}
    				<Text style={styles.title} numberOfLines={6}>{film.title}</Text>
    				<Text style={styles.mark}>{film.vote_average}</Text>
    			</View>
    			<View style={styles.description_container}>
    				<Text style={styles.description} numberOfLines={6}>{film.overview}</Text>
    			</View>
    			<View style={styles.date_container}>
    				<Text style={styles.date}>Released on {film.release_date}</Text>
    			</View>
    		</View>
    	</TouchableOpacity>
      
    )
  }
}

const styles = StyleSheet.create({
  main_container:{
  	padding: 3,
  	flexDirection: 'row',
  	height: 190
  },
  image: {
  	width: 120,
    height: 180,
    margin: 5,
    backgroundColor: 'gray'
  },
  content_container:{
  	flex: 1
  },
  header_container:{
  	flexDirection: 'row'
  },
  title:{
  	fontWeight: 'bold',
    fontSize: 20,
    flexWrap: 'wrap',
    flex: 1,
    paddingRight: 5
  },
  mark:{
  	fontWeight: 'bold',
    fontSize: 26,
    color: '#666666'
  },
  description_container:{
  	flex: 7
  },
  description:{
  	fontStyle: 'italic',
    color: '#666666'
  },
  date_container:{
  	flex: 1
  },
  date:{
  	textAlign: 'right',
    fontSize: 14
  },
  favorite_image: {
    width: 25,
    height: 25,
    marginRight: 5
  }
})