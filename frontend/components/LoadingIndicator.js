import React from 'react';
import { View, StyleSheet, Dimensions} from 'react-native';
import { ActivityIndicator,  useTheme } from 'react-native-paper';
let { width, height } = Dimensions.get('window');

const LoadingIndicator = ({ isLoading }) => {
    const { colors } = useTheme();
    return (
        <View style={styles.loading}>
            <ActivityIndicator color={colors.activityIndicatorColor} backgroundColor={colors.backgroundColor} style={styles.loading} animating={isLoading} size={100}/>
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
