import React from 'react';
import { View, StyleSheet, Dimensions} from 'react-native';
import { ActivityIndicator } from 'react-native-paper';
let { width, height } = Dimensions.get('window');

const LoadingIndicator = ({ isLoading }) => {
    return (
        <View style={styles.loading}>
            <ActivityIndicator style={styles.loading} animating={isLoading} size={100}/>
        </View>
    )
}

export default LoadingIndicator;

const styles = StyleSheet.create({
    loading: {
        alignItems: 'center',
        justifyContent: 'center',
        position: 'absolute',
        width: width,
        height: height - 130
    }
});
