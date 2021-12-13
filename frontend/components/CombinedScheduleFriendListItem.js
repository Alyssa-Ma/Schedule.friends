import React, { useEffect, useState } from 'react';
import { Checkbox  } from 'react-native-paper';

const CombinedScheduleFriendListItem = ({ navigation, route, user, selectedUsersListener, init, index, color }) => {
    const [checked, setChecked] = useState(false);
    useEffect(() => {
        if (init)
            setChecked(true);
    }, [])
    return (
        <Checkbox.Item
            label={user.username}
            color={color}
            status={checked ? 'checked': 'unchecked'}
            onPress={() => setChecked(selectedUsersListener(index))}
        />
    )
}

export default CombinedScheduleFriendListItem;
