import React, { Component } from "react";
import { Container, Content } from "native-base";
import { View, Image, Text, StyleSheet, TouchableOpacity, Linking } from 'react-native';
import { ScrollView } from "react-native-gesture-handler";

//Components
class Terms extends Component {
  static navigationOptions = {
    headerTitle: "Terms of Use",
    headerRight: (
      <View>
      </View>
    )
  };
  render() {
    const { navigate } = this.props.navigation;
    return (
      <Container style={styles.container}>
        <View style={{flex:1, flexDirection:'column', textAlign:'left'}}>
        <ScrollView>
        <Text style={{margin:10, fontSize:16, textAlign:'left'}}>
          {`

Please read the Terms of Use and the Privacy Policy carefully before downloading or using the GoCompost App (the “App”). Your access to and use of the App is conditioned on your acceptance of and compliance with all terms of both documents. If you disagree with any term hereof, please do not use or access the App.


TERMS OF USE

(Last updated: December 1, 2020)
          
These Terms of Use apply to all visitors, users and others (collectively, “User” or “Users”) who access or use the App. By clicking the "I Agree" button, downloading or using the GoCompost App (“App”), you (“you” or “User”) expressly agree to be bound by these Terms of Use (“Agreement”) and acknowledge that you have read and accepted the Privacy Policy. This Agreement is made between you/User and We Sense Inc. (“We Sense”). We Sense is a 501c3 nonprofit organization based in North Carolina. In this Agreement, “we”, “us” and “our” refer to We Sense; “App” refers to the GoCompost App and linked websites (www.GoCompost.org and www.we-sense.org, collectively “Sites”).
          
The App is a community service project of the We Sense GoCompost Team, aiming to encourage residents to divert compostable waste from landfills through composting. Your support can help build a greener community. 
          
          
1. USER ELIGIBILITY AND ACCOUNT
          
The current App is designed to only serve the area of Orange County, North Carolina (“Area”). To be eligible to use the App, you must be a resident in the Area, and warrant that you have the necessary legal capacity (and legal guardian’s consent where applicable), and are not prohibited under any law or in any way, to enter into this Agreement.
          
You may choose to use the App as a visitor or create a personal account. Each User is limited to one account and may not share your account or password. We reserve the right to refuse registration to any person and to suspend, delete or deactivate your account at any time, without liability to you.
          
The App is free to use under the terms of this Agreement. You are granted a revocable, non-exclusive, non-transferable, limited license to use the App solely for your internal, personal, non-commercial use strictly in accordance with the terms of this Agreement (additional terms may apply from Google Play store, manufacturers of your device and/or third party services). You may not exploit any part of the App, its content and/or data in any way not expressly authorized by us. We reserve the right to modify, suspend or discontinue, temporarily or permanently, the App or any feature/service to which it connects, without notice and without liability to you.
          
          
2. PRIVACY
          
We do not use cookies. The App uses Firebase framework and Firestore database (service provided by Google Cloud Platform) for user management, security and app data. The data entered by an individual User is used and processed to generate reports (such as dashboard and impact pages) for that User.  You acknowledge that you have read and agreed to the Privacy Policy (attached), which is made part of this Agreement.
          
          
3. USER CONTENT AND FEEDBACK
          
The App may allow Users to post, link, store, share and otherwise make available certain information (including without limitation your name, feedback, suggestions etc), text, graphics, videos, or other material (collectively "Content") through its communication channels. Upon submitting the Content, you agree to grant us a non-exclusive, irrevocable, transferable, sub-licensable, royalty-free license to use, store, copy and publish your Content and share your Content with others. You shall not submit any Content that you don’t have right or that may cause any infringement or damage. All Content should be friendly and appropriate for the community at large. You agree to keep us and our volunteers indemnified from any liability with respect to your Content. We reserve the right to decide on the display of the Content, and may remove any Content at any time without notice and without liability to you. 
          
          
4. DISCLAIMERS
          
The App is a community service project of We Sense, and use is entirely voluntary. You agree not to hold us and/or our volunteers liable in any case.
The information contained in the App and the Sites is for general awareness purposes only, and you should not rely on this information as a substitute for professional advice. It’s your responsibility to make your own decisions based upon your independent research. We do not guarantee the accuracy, relevance, timeliness, or completeness of any information in the App, the Sites and/or any linked third-party websites or services. We have no control over, and assume no responsibility for, the content, privacy policies, or practices of any third party web sites or services. 
          
The App (and all associated features, content and services) is provided “as is” and we do not promise that any aspect will work properly or continuously. We reserve the right to make additions, deletions, or modification to any contents and/or features at any time without prior notice. If you are dissatisfied, your only remedy is to stop using the App.
          
You further acknowledge and agree that we shall not be responsible or liable, directly or indirectly, for any special, incidental, consequential and/or other whatsoever damage or loss caused or alleged to be caused by, arising out of, or in connection with use of or reliance on any such component/feature available in or through the App, the Sites and/or its links.
          
          
5. TERM AND TERMINATION
          
This Agreement shall remain in effect until terminated by you or us. We may, in its sole discretion, at any time and for any or no reason, suspend or terminate this Agreement with or without prior notice. Upon termination of this Agreement, you shall cease all use of the App and delete the App and all copies thereof from your devices. All provisions of this Agreement which by their nature should survive termination shall survive termination, including, without limitation, ownership provisions, warranty disclaimers, dispute resolution, indemnity and limitations of liability.


6. DISPUTE RESOLUTION AND LIABILITY LIMIT

In case of any dispute or claim, you agree to contact us and solve it amicably with us. You waive any right to sue in court or have a jury trial. To the maximum extent permitted by applicable law, you release us (and our directors and volunteers) from claims, demands and damages (actual and consequential) of every kind and nature, known and unknown, arising out of or in any way connected with such disputes. You agree that we shall be excused for any problem due to a circumstance beyond our reasonable control. You expressly agree that in no event shall We Sense and/or our volunteers/directors be liable to you for more than US$100 in total. This Agreement is governed by the laws of North Carolina. This clause will survive the termination of the Agreement.

          
7. OTHER TERMS

7.1 Independent Relationship: This Agreement does not create any agency, partnership, joint venture, employment or franchise relationship. We are not responsible for the actions of any Users; each User is responsible for their own actions and behavior.

7.2 Severability: If any provision of this Agreement is held to be unenforceable or invalid, such provision will be changed and interpreted to accomplish the objectives of such provision to the greatest extent possible under applicable law and the remaining provisions will continue in full force and effect. 

7.3 Indemnity: If someone brings a claim against us (whether against We Sense or any of its directors or volunteers) based on a harm or issue you caused, you agree to reimburse us for any costs we incur in defending against that claim, including reasonable attorneys’ fees as well as damages.

7,4 Modification: We reserve the right, at our sole discretion, to modify or replace this Agreement at any time. If a revision is material we will provide at least 7 days' notice (by announcing in the App) to any new terms taking effect. What constitutes a material change will be determined at our sole discretion.

7.5 Third-Party Content and Services: Some of the information and services available in the App are from third parties and covered by these third-party terms and disclosures. Some map information, business address information, and contact information is from third parties, including without limitation Google, Inc. via its Maps API. Google Maps and Places information is provided subject to Google’s Terms of Service, including the Google Maps/Google Earth APIs Terms of Service, and its privacy policy. Any unauthorized exploitation is strictly prohibited.

7.6 Contact: If you have any questions about this Agreement, please email GoCompost@we-sense.org.



PRIVACY POLICY

(Last updated: December 1, 2020)
  
Welcome to GoCompost! The GoCompost App is a community service project of the We Sense GoCompost Team. We Sense is a 501c3 nonprofit organization based in North Carolina, and “we”, “us” and “our” refer to We Sense in this Privacy Policy. This Privacy Policy applies to the GoCompost App and linked websites www.GoCompost.org and www.we-sense.org (collectively “App”) regarding the collection, use and share of information we receive from users (including all visitors and users) of the App.

By using or accessing the App, you accept and agree to this Privacy Policy regarding the collection, use and share of information. This Privacy Policy constitutes part of the Terms of Use as user Agreement.

1. COLLECTION OF INFORMATION 

We may collect your information in different ways as follows (collectively “Information”):

1.1 Personal Information: While using the App, you may voluntarily provide certain personally identifiable information (including without limitation your name, login, contact and network details), posts, events, feedback, communications, activities, survey responses, content and/or data entries, as part of the Information. The data entered by an individual user may be used and processed to generate reports (such as dashboard and impact pages) for that user.

1.2 Data from Your Browser and Device: Whenever you visit or use the App or read a message from us, information may be collected automatically from your browser, computer, or mobile device. This provides us with technical information regarding your visit and/or use, including your device data and log data. This may include data sent by your app or browser, such as the date and time of your visit, the browser or app version you used (and its settings), the URLs you come from and go to, your IP address and protocol, and how you used the App (for example, which links you clicked on, the pages of the App that you visited, the time spent on those pages and other statistics). We may use third party services such as Google Analytics that collect, monitor, track and analyze such data.

1.3 Public Available Information: We may also collect information from third parties, service providers, partners, and publicly-available sources.

1.4 No Cookies: The App does not use cookies to collect or store information.

2. USE OF INFORMATION 

We use the Information to help provide, operate, improve, understand, customize, support, and market the App and any associated features and services. The Information may be used to analyze, research and/or implement on any matters concerning the App and its environmental missions. We may also use the Information for other purposes where permitted by law.

3. SHARE OF INFORMATION 

We may share any Information with service providers, affiliates, partners, and other third parties in order to perform Section 2 (Use of Information) and/or any term of the User Agreement, to provide any features and services of the App, for any legal and safety reasons, and/or for any other purposes described in this Privacy Policy. The Content (as defined in the User Agreement) you provide, such as posts, feedback and your personal information, may be shared with the public based on the settings you choose when submitting the Content. 

4. COMMUNICATIONS 
  
We may use your personal information to contact you with newsletters, marketing or promotional materials and other information on the subject matters concerning the App or its content. We do not sell your personal information.

5. SECURITY

The App uses Firebase framework and Firestore database (service provided by Google Cloud Platform) for user management, security and app data. The security of the Information is important to us. However, the internet is not a fully secure environment, and no method of electronic storage is 100% secure. We cannot guarantee the absolute security of the Information. Please ensure to keep your password safe and do not share it with anyone.

6. THIRD PARTIES

In using the App, you may come across links to websites and services operated by third parties. These third parties have their own privacy policies. We assume no responsibility or liability for such external sites’ privacy and security practices.

7. DELETION OF PERSONAL INFORMATION 

You may contact us at GoCompost@we-sense.org to make a verifiable request to delete your personal information that you submitted to us and can practically and distinctly identify you, subject to conditions as may be required or permitted by law.
  
8. CHANGE TO THIS PRIVACY POLICY

This Privacy Policy is effective as of the above date and will remain in effect except with respect to any changes in its provisions in the future, which will be in effect immediately after being posted. We reserve the right to update or change this Privacy Policy at any time and you should check this Privacy Policy periodically. Your continued use of the App after we post any modifications to the Privacy Policy will constitute your acknowledgment of the modifications and your consent to abide and be bound by the modified Privacy Policy. If we make any material changes to this Privacy Policy, we will notify you by placing a notice in the App.
  
9. CONTACT US

If you have any questions about this Privacy Policy, please contact us at  GoCompost@we-sense.org.
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