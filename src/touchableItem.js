import React, { Component } from 'react';
import { View, TouchableOpacity, Text } from 'react-native';
import PropTypes from 'prop-types';
import { ThemeProvider, Icon } from 'react-native-material-ui';
import { pickerItems as styles } from '../../theme/styles';

export default class TouchableItem extends Component {
    static propTypes = {
        value: PropTypes.string,
        onPress: PropTypes.func.isRequired,
        showIcon: PropTypes.bool,
        isOpen: PropTypes.bool,
        selected: PropTypes.bool,
        itemToSend: PropTypes.oneOfType([PropTypes.number, PropTypes.string, PropTypes.array, PropTypes.object])
    }

    static defaultProps = {
        value: null,
        showIcon: false,
        isOpen: false,
        selected: false,
        itemToSend: null
    }

    onPress = () => {
        this.props.onPress(this.props.itemToSend);
    }

    render() {
        return (
            <ThemeProvider uiTheme={{}}>
                <TouchableOpacity onPress={this.onPress} style={styles.item}>
                    <View style={{ flex: 1, flexDirection: 'row', alignItems: 'center' }}>
                        {this.props.showIcon &&
                            <Icon
                                name={!this.props.isOpen ? 'keyboard-arrow-right' : 'keyboard-arrow-down'}
                                size={22}
                                style={{ marginLeft: -15 }} />}
                        <Text style={styles.text}>
                            {this.props.value}
                        </Text>
                        {this.props.selected &&
                            <View style={{ alignItems: 'flex-end' }}>
                                <Icon
                                    name="done"
                                    color="green"
                                    size={22} />
                            </View>
                        }
                    </View>
                </TouchableOpacity>
            </ThemeProvider>
        );
    }
}
