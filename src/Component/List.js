import { StyleSheet, View, FlatList, Text} from 'react-native'
import React, { Component } from 'react'
import Item from './Item'


export default class List extends Component {
  render() {
    return (
      <View style={styles.main_container}>
			<FlatList
	          data={data}
	          keyExtractor={(item) => key=item.id.toString()}
	          renderItem={({item}) => <Item film={item}/>}
	        />
		</View>
    );
  }
}

const styles = StyleSheet.create({
  main_container: {
  }
})
