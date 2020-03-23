import React, { Component } from 'react'
import { Text, View, TouchableOpacity, Image, FlatList, Container } from 'react-native'
import { db, auth } from '../../config/config'
import styles from '../../styles/styles'

class HomeScreen extends Component {
    static navigationOptions = {
        title: 'Message',
        headerRight :( 
        <TouchableOpacity>
            <Image style={{width: 32, height: 32}} />
        </TouchableOpacity>
        )
      }
      
      state = {
          users: []
      }
    
      componentDidMount() {
          this.getDataUser()
      }

    getDataUser() {
       db.ref('/user').on('value', (snapshot) => {
           const current_user = auth.currentUser.uid
           const data = snapshot.val()
           const user = Object.values(data)
           const result = user.filter(user => user.uid !== current_user);
           console.log(result)
           this.setState({
               users : result})
       })
    }

    onLogout = async () => {
        auth.signOut()
            .then(res => console.warn("oke"))
    }

  renderRow= ({item}) => {
      return (
          <TouchableOpacity 
          onPress={()=> this.props.navigation.navigate('Message', item)}
          style={{padding: 10, borderBottomColor: '#ccc', borderBottomWidth:1
          }}>
              <Text>{item.name}</Text>
          </TouchableOpacity>
      )
  }

    render(){
        console.disableYellowBox = true;
        return (
            <>
            <View>
                <FlatList
                    data = {this.state.users}
                    renderItem={this.renderRow} 
                    keyExtractor={(item) => {item.uid}}
                />
                <TouchableOpacity onPress={this.onLogout}>
                    <Text>
                        Logout
                    </Text>
                </TouchableOpacity>
            </View>
            </>
        )
    }
}
export default HomeScreen
 