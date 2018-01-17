import { StyleSheet } from 'react-native';
import vars from './vars';

/**
 * Основной контейнер
 */
export const MainContainer = {
    flex: 1,
    backgroundColor: vars.cointainerBackgroundColor,
    paddingHorizontal: 15,
    paddingTop: 20
};

/**
 * Элемент по центру
 */
export const CenterElement = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    },
    text: {
        color: vars.textColor
    }
});

/**
 * Стили для пикера
 */
export const picker = {
    row: {
        flexDirection: 'row'
    },
    titleText: {
        flex: 1,
        color: 'white',
        paddingRight: 5
    },
    arrowImage: {
        justifyContent: 'flex-end',
        flexDirection: 'row',
        alignItems: 'center'
    },
    underline: {
        flex: 1,
        borderBottomColor: 'white',
        borderBottomWidth: 0.5,
        paddingBottom: 10
    },
    absoluteView: {
        position: 'absolute',
        width: '100%',
        height: '100%'
    },
    pickerContainer: {
        flex: 1,
        margin: 20,
        backgroundColor: vars.cointainerBackgroundColor,
        borderColor: vars.borderColorDark,
        borderWidth: 0.5,
        borderRadius: 5
    }
};

/**
 * стили для элементов пикера
 */
export const pickerItems = {
    item: {
        flex: 1,
        padding: 10,
        borderBottomColor: vars.borderColorDark,
        borderBottomWidth: 0.5,
        marginLeft: 10
    },
    text: {
        flex: 1,
        color: vars.textColor
    }
};

