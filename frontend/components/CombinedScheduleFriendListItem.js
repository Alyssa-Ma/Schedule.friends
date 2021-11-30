import React, { useEffect, useState } from 'react';
import { View, StyleSheet } from 'react-native';
import { Checkbox, Text, Avatar } from 'react-native-paper';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

const CombinedScheduleFriendListItem = ({ navigation, route, user, selectedUsersListener, init, index, color }) => {
    const [checked, setChecked] = useState(false);
    useEffect(() => {
        if (init)
            setChecked(true);
    }, [])
    return (
        // <View style={styles.listItem}>
            <Checkbox.Item
                label={user.username}
                color={color}
                status={checked ? 'checked': 'unchecked'}
                onPress={() => setChecked(selectedUsersListener(index))}
            />
        // </View> 
    )
}

// const styles = StyleSheet.create({
//     listItem: {
//         flexDirection: 'row',
//         justifyContent: 'space-between',
//         alignItems: 'center',
//         borderRadius: 20,
//         margin: 5,
//         padding: 5
//     },
//     header: {
//         flexDirection: 'row',
//         justifyContent: 'flex-start',
//         alignItems: 'center',
//     }
// })

export default CombinedScheduleFriendListItem;
