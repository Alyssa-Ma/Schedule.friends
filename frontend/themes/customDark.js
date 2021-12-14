import { DarkTheme as NavigationDarkTheme } from '@react-navigation/native';
import { DarkTheme as PaperDarkTheme } from 'react-native-paper';
    
  //Dark Mode
const CustomDarkTheme = {
    ...NavigationDarkTheme,
    ...PaperDarkTheme,
    colors: {
        ...NavigationDarkTheme.colors,
        ...PaperDarkTheme.colors,
        backgroundColor: '#493e81',
        text: '#ffffff',
        primary: '#7464CC',
        accent: '#7DD1FF',
        invertedColor: 'white',
        backgroundCardColors: ['#7464CC', '#B8ACFB', '#927EFF', '#696580', '#786CBC'],
        fabButtonColor: '#696580',
        radioButtonColor: '#927EFF',
        activityIndicatorColor: '#B8ACFB',
        drawerBackgroundColor: '#493e81',
        dialogButton: '#7464CC',
        calHeaderBackground: '#6355aa',
        calHeaderBorderColor: '#5448A4',
        calIconColor: '#453a75',
        eventBorderColor: '#453a75',
        firstColor: '#7464CC',
        secondColor: '#927EFF',
        thirdColor: '#B8ACFB',
        fourthColor: '#696580',
        fifthColor: '#786CBC',
        // for TimePickerModal
        surface: '#2a2349',
        primary: '#7464CC',
        placeholder: 'white',
        error: '#FF6D6D',
        focusedColor: '#ffffff',
        unfocusedColor: '#404040',
        searchBar: '#7464CC',
    }
}

export default CustomDarkTheme;
