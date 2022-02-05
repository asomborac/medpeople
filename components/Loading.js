import { View, ImageBackground } from 'react-native';

export default function Loading({ navigation }) {

    setTimeout(() => { navigation.navigate('List') }, 2000)

    return <View style={{ flex: 1, backgroundColor: '#FF4F70' }}>
        <ImageBackground
            style={{ flex: 1, justifyContent: 'center' }}
            source={{ uri: "https://raw.githubusercontent.com/asomborac/medpeople/master/assets/medpeople.png" }}
            resizeMode="contain"
        />
    </View>
};