import React, { Component } from "react";
import { Container, Content } from "native-base";
import { View, Image, Text, StyleSheet, TouchableOpacity, Linking } from 'react-native';
import compostable from '../../assets/compostableTopLogo.jpg';
import { ScrollView } from "react-native-gesture-handler";

//Components
class Terms extends Component {
  static navigationOptions = {
    headerTitle: "Terms",
    headerRight: (
      <View>
      </View>
    )
  };
  render() {
    const { navigate } = this.props.navigation;
    return (
      <Container style={styles.container}>
        <View style={{flex:1, flexDirection:'column'}}>
        <ScrollView>
        <Text style={{margin:10, fontSize:16}}>
        {`
        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Maecenas id nisi lacus. Integer at ornare libero. In ac turpis non erat feugiat elementum sit amet nec lacus. Aenean nec massa non nunc consectetur pretium dapibus vel metus. Pellentesque dapibus vel enim at hendrerit. Cras elit mauris, semper eu convallis quis, porttitor at augue. Praesent ultrices, massa sed ultricies luctus, ante tortor fringilla magna, vel porttitor turpis arcu et arcu. Vestibulum feugiat enim ut tellus hendrerit, quis aliquam ex placerat. Integer eget elit mi. Sed non fringilla massa. Cras sit amet leo non urna interdum lacinia vitae vel purus. Phasellus varius quam ut mauris euismod pulvinar. Nam nec metus quis ligula vestibulum blandit ut id felis.

        Vivamus laoreet commodo mi quis egestas. In eu pellentesque enim. Maecenas at massa congue, accumsan dolor sed, sagittis enim. Nulla pretium odio in convallis luctus. Suspendisse at condimentum diam. Fusce rutrum interdum venenatis. In vel egestas mi. Phasellus tincidunt faucibus commodo. Etiam quis lorem efficitur, consectetur massa id, ultricies metus. Vestibulum vestibulum vel turpis non hendrerit. Nunc sit amet semper magna. Mauris a mauris vitae urna faucibus consequat at eu metus. Praesent consequat sapien a ex dapibus, id faucibus dolor auctor. Nunc pellentesque facilisis tempor.
        
        Nulla facilisi. Cras ut nunc non diam bibendum vestibulum vitae vel orci. In dictum turpis mauris, pretium auctor nisl imperdiet id. Nullam fermentum placerat iaculis. Vestibulum vitae sodales mi. Mauris nisl lacus, varius eu ante ac, consectetur suscipit tellus. Nullam in hendrerit metus, at hendrerit enim. Aliquam quis tellus odio.
        
        Cras eget finibus magna, quis efficitur lectus. Aliquam nec facilisis orci, vitae scelerisque mi. Vivamus ac ipsum purus. Curabitur enim nulla, euismod vitae lectus vitae, mollis luctus erat. Sed ut eleifend magna, in malesuada enim. Sed facilisis, erat nec ornare accumsan, mauris ligula accumsan mauris, et elementum dolor augue vel enim. Praesent suscipit risus ut ex molestie volutpat. Phasellus dignissim ante nec purus molestie, ut lobortis justo gravida. Phasellus aliquet varius augue, lacinia dapibus nulla convallis eu. Proin aliquam mauris in ligula porttitor luctus. Maecenas turpis arcu, facilisis a blandit consectetur, viverra ac enim. Nulla nisi enim, semper fringilla suscipit sed, semper nec lectus. Nunc non augue blandit ex aliquet bibendum quis quis ante.
        
        Aenean egestas orci neque, vel finibus leo mattis in. Duis quis est tortor. Aenean in sem vestibulum, pretium eros eu, ultricies sem. Sed porta purus sed mollis dapibus. Nunc est est, sodales eu lectus congue, sagittis suscipit nulla. Cras nec aliquam neque. Integer fermentum augue ac dignissim fringilla. Sed blandit ut odio id volutpat. Fusce vel dapibus lorem. Curabitur commodo ipsum non viverra ultrices. Etiam tristique vulputate ipsum nec molestie. Nam in eros ligula. Aliquam erat volutpat. Phasellus in orci ultricies arcu lacinia interdum. Aliquam molestie posuere justo, quis pellentesque nibh. Nunc lacus risus, laoreet eu erat sit amet, consectetur ornare elit.
        `}
        </Text>
        </ScrollView>
        </View>
        <View>
        <TouchableOpacity 
                style={styles.backButton}
                onPress= {() => {this.props.navigation.navigate('Landing');}}
            >
            <Text style={styles.backButton}>  Back  </Text>      
        </TouchableOpacity>
        </View>
      </Container>
    );
  }
}

const styles = StyleSheet.create({
    container: {
      flex: 1,
      alignItems: 'center',
      justifyContent: 'center',
    },
    image: {
        alignItems: 'center',
        resizeMode: "center",
        width: 400,
        height: 400
    },
    backButton: {
        backgroundColor: "#cfe1e0",
        fontSize: 20,
        textAlign: "center",
        padding: 6
  
    },
});

export default Terms;