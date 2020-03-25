import React, {Component} from 'react';
import {
  Text,
  View,
  TouchableOpacity,
  Image,
  FlatList,
} from 'react-native';
import { Container, Header, Content, Footer, FooterTab, Button, Icon } from 'native-base';
import {db, auth} from '../../config/config';
import styles from '../../styles/styles';
// import Icon from 'react-native-vector-icons/Ionicons';

class HomeScreen extends Component {
  static navigationOptions = {
    title: 'Wayah Chat',
    headerRight: (
      <TouchableOpacity>
        <Image style={{width: 32, height: 32}} />
      </TouchableOpacity>
    ),
  };

  state = {
    user: [],
  };

  componentDidMount() {
    this.getDataUser();
  }

  getDataUser() {
    db.ref('/user').on('value', snapshot => {
      const current_user = auth.currentUser.uid;
      const data = snapshot.val();
      const user = Object.values(data);
      const result = user.filter(user => user.uid !== current_user);
      console.log(result);
      this.setState({
        users: result,
      });
    });
  }

  onLogout = async () => {
    auth.signOut().then(res => console.warn('oke'));
  };

  renderRow = ({item}) => {
    return (
      <>
        <View >
          <View
            style={styles.home}>
            <TouchableOpacity
              onPress={() => this.props.navigation.navigate('Message', item)}>
              <Image
                style={{
                  width: 50,
                  height: 50,
                  marginTop: 20,
                  borderRadius: 25,
                  marginLeft: 15
                }}
                source={require('../../styles/darth.png')}></Image>
            </TouchableOpacity>
            <View style={{marginLeft: 20, marginTop: 35}}>
              <Text>{item.name}</Text>
            </View>
          </View>
        </View>
      </>
    );
  };

  render() {
    console.disableYellowBox = true;
    return (
      <>
      <View style={{backgroundColor: '#e3fae6',flex:1}}>
        <View>
          <FlatList
            data={this.state.users}
            renderItem={this.renderRow}
            keyExtractor={item => {
              item.uid;
            }}
          />
       </View>
          </View>

      

          <Footer>
          <FooterTab style={{backgroundColor: 'white'}}>
            <Button onPress={() => this.props.navigation.navigate('Home')}>
              <Icon name="chatbubbles" />
            </Button>
            <Button onPress={() => this.props.navigation.navigate('Map')}>
              <Icon name="navigate" />
            </Button>
            <Button onPress={() => this.props.navigation.navigate('Profile')}>
              <Icon name="person" />
            </Button>
          </FooterTab>
        </Footer>

         
        
      
      </>
    );
  }
  
}
export default HomeScreen;

