import { DefaultTheme as NavigationDefaultTheme } from '@react-navigation/native';
import { DefaultTheme as PaperDefaultTheme } from 'react-native-paper';

//Default 'Light mode'
const CustomDefaultTheme = {
    ...NavigationDefaultTheme,
    ...PaperDefaultTheme,
    colors: {
        ...NavigationDefaultTheme.colors,
        ...PaperDefaultTheme.colors,
        backgroundColor: '#ffffff',
        text: '#333333',
        invertedColor: 'black',
        backgroundCardColors: ['#D7A4FF', '#9E8DFF', '#7DD1FF', '#68B0D8', '#5CDBD5'],
        fabButtonColor: '#53c3fe',
        radioButtonColor: '#9E8DFF',
        activityIndicatorColor: '#9E8DFF',
        drawerBackgroundColor: '#ffffff',
        dialogButton: '#9E8DFF',
        calHeaderBackground: '#F5F5F6',
        calHeaderBorderColor: '#E6E8F0',
        calIconColor: "#9CA0B8",
        eventBorderColor: '#DDE5FD',
        accent: '#7DD1FF',
        firstColor: '#D7A4FF',
        secondColor: '#9E8DFF',
        thirdColor: '#7DD1FF',
        fourthColor: '#68B0D8',
        fifthColor: '#5CDBD5',
        // for TimePickerModal
        surface: '#EEEDFF',
        primary: '#6C59FF',
        placeholder: 'black',
        error: '#C40031',
        focusedColor: '#ffffff',
        unfocusedColor: '#696580',
        searchBar: '#D7A4FF',
        textLight: '#ffffff',
    }
}

export default CustomDefaultTheme;
