import { View, Image } from 'react-native';
import BgImage from '../../assets/images/image-bg.jpg';

export default function Background() {
    return (
        <View
            style={{
                flex: 1,
                position: 'absolute',
                height: '100%',
                width: '100%'
            }}>
            <Image
                source={BgImage}
                style={{width:'100%'}}
                resizeMode='cover'
            />
        </View>
    );
};