import { View, ImageBackground, Text } from 'react-native';

export default function Loading({ navigation }) {

    setTimeout(() => { navigation.navigate('List') }, 2000)

    return <View style={{ flex: 1 }}>
        <ImageBackground
            style={{ flex: 1, justifyContent: 'center' }}
            source={{ uri: "./assets/medpeople.png" }}
            resizeMode="cover"
        />
    </View>
};