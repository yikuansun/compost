import React, { Component } from "react";
import { Container, Content } from "native-base";
import { View, Image, Text, StyleSheet, TouchableOpacity } from 'react-native';
import compostable from '../../assets/compostableTopLogo.jpg';
import { ScrollView } from "react-native-gesture-handler";

//Components
class AboutScreen extends Component {
  static navigationOptions = {
    headerTitle: "About",
    headerRight: (
      <View>
      </View>
    )
  };
  render() {
    const { navigate } = this.props.navigation;
    return (
      <Container style={styles.container}>
        <View style={{flex:2, flexDirection:'column'}}>
            <Image source={compostable} style={styles.image} ></Image>
        </View>
        <View style={{flex:1, flexDirection:'column'}}>
        <ScrollView>
        <Text>
        {`
          “What can we do to help our community as students?”
          
          A question asked by Ben, Bo, Yichen and Yikuan, four students from Chapel Hill, NC, inspired their GoCompost journey. From Ms. Kyra Levau, the Recycling Education and Outreach Coordinator of the Orange County Solid Waste Management, the students learned that composting is a high priority area which needs more community participation. During the COVID lockdown, this has been made especially important since people spend more time eating at home. As Ben said, “looking at our own trash bins, we realize why we are all part of the problem, because we often throw food scraps away without thought.” Yichen and Yikuan shared that “awareness makes a huge difference. Ever since we began the GoCompost project, changes are already happening in our own home. We started backyard composting, sending our food scraps (and their nutrients) to enrich our backyard soil.” “We are positive that we can all be part of the solution, because composting is easier than we think, if we are aware of its opportunities and benefits,” said Bo, who now sends his family’s food waste to the collection site at Carrboro Farmers Market on Saturdays.

          Food waste is the No. 1 component in US landfills, producing methane, a highly potent greenhouse gas contributing to global warming. Composting is an obvious solution because half of the waste in landfills is compostable. Unfortunately, the food waste composting rate is worryingly low, at only 6% in the US. On the other hand, this is also an opportunity for high growth potential.

          The students all agreed that they wanted to apply their interest in STEM to help increase community composting. Aimed at engaging the community to divert compostable waste from landfills, the GoCompost app was created as a simple, friendly tool to make composting more accessible, inclusive, and simple for all community members. As everyone has a role in addressing climate change, this app is designed to reach people who encounter barriers in their green efforts, including a lack of awareness, motivation, resources, or community support. The app is currently set for Orange County, where the students live. It can be adapted for other communities in the future.	

          Our everyday choices and actions have a significant impact on the environment. Use GoCompost App to CHECK if waste is compostable, see a MAP of where to send the food waste, log and track your IMPACT, and find COMMUNITY posts and events to get involved. Visit www.GoCompost.org to learn more.
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

export default AboutScreen;