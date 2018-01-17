import React, { Component } from 'react';
import { View, Text, Modal, TouchableOpacity, ScrollView } from 'react-native';
import PropTypes from 'prop-types';
import { ThemeProvider, Icon } from 'react-native-material-ui';
import { picker as styles } from './theme/styles';
import TouchableItem from './touchableItem';
import Button from './button';
import vars from './theme/vars';

export default class Picker extends Component {
    static propTypes = {
        title: PropTypes.string,
        data: PropTypes.arrayOf(PropTypes.any),
        onPress: PropTypes.func.isRequired,
        style: PropTypes.shape({
            text: PropTypes.shape({
                color: PropTypes.string
            }),
            icon: PropTypes.shape({
                color: PropTypes.string
            }),
            underline: PropTypes.shape({
                borderBottomColor: PropTypes.string,
                paddingBottom: PropTypes.number
            })
        })
    }

    static defaultProps = {
        title: null,
        data: [],
        style: {
            text: {
                color: 'white'
            },
            icon: {
                color: 'white'
            },
            underline: {
                borderBottomColor: 'white',
                paddingBottom: 10
            }
        }
    }

    constructor(props) {
        super(props);
        this.state = {
            visible: false,
            showChildren: {},
            selected: {}
        };
    }


    /**
     * Нажатие на элемент в пикере
     */
    onItemPress = (Id, once, title) => {
        if (once) {
            this.setState({
                selected: {
                    [Id]: !this.state.selected[Id],
                    title
                }
            });
        } else {
            this.setState({
                showChildren: {
                    ...this.state.showChildren,
                    [Id]: !this.state.showChildren[Id]
                },
                selected: {
                    [Id]: !this.state.selected[Id],
                    title
                }
            });
        }
    }

    onCancelPress = () => {
        this.toVisible();
    }

    selectItem = () => {
        this.toVisible();
        const key = Object.keys(this.state.selected);
        this.props.onPress(key[0], this.state.selected.title);
    }

    /**
     * Вернуть заголовок Пикера
     */
    showPickerTitle = () => (
        <View>
            <TouchableOpacity onPress={this.toVisible}>
                <View style={styles.row}>
                    <View style={{ flex: 1, justifyContent: 'center' }}>
                        <Text style={[styles.titleText, this.props.style.text]}>{this.props.title}</Text>
                    </View>
                    <View style={styles.arrowImage}>
                        <ThemeProvider uiTheme={{}}>
                            <Icon name="arrow-drop-down" color={this.props.style.icon.color} />
                        </ThemeProvider>
                    </View>
                </View>
            </TouchableOpacity>
            <View style={[styles.underline, this.props.style.underline]} />
        </View>
    )

    /**
     * Показат/скрыть пикер
     */
    toVisible = () => {
        this.setState({
            visible: !this.state.visible
        });
    }

    renderChildren = (children, id, margin) => children.map((item) => {
        if (this.state.showChildren[id]) {
            if (item.Children.length > 0) {
                return (
                    <View key={item.Id} style={{ marginLeft: margin }}>
                        <TouchableItem
                            selected={this.state.selected[item.Id]}
                            showIcon={item.Children.length > 0}
                            isOpen={this.state.showChildren[item.Id]}
                            value={item.Title}
                            onPress={() => this.onItemPress(item.Id, false, item.Title)} />
                        {this.renderChildren(item.Children, item.Id, 20)}
                    </View>
                );
            }
            return (
                <View key={item.Id} style={{ marginLeft: margin }}>
                    <TouchableItem
                        selected={this.state.selected[item.Id]}
                        value={item.Title}
                        onPress={() => this.onItemPress(item.Id, true, item.Title)} />
                </View>
            );
        }
        return null;
    })

    renderFeedbackItems = () => {
        const { data } = this.props;
        return data.map((item) => {
            if (item.Children.length > 0) {
                return (
                    <View key={item.Id}>
                        <TouchableItem
                            selected={this.state.selected[item.Id]}
                            showIcon={item.Children.length > 0}
                            isOpen={this.state.showChildren[item.Id]}
                            value={item.Title}
                            onPress={() => this.onItemPress(item.Id, false, item.Title)} />
                        {this.renderChildren(item.Children, item.Id, 20)}
                    </View>
                );
            }
            return (
                <View key={item.Id}>
                    <TouchableItem
                        selected={this.state.selected[item.Id]}
                        value={item.Title}
                        onPress={() => this.onItemPress(item.Id, true, item.Title)} />
                </View>
            );
        });
    }

    render() {
        alert('123');
        return (
            <View>
                {this.showPickerTitle()}
                <Modal
                    visible={this.state.visible}
                    onRequestClose={this.toVisible}
                    transparent>
                    <View style={styles.absoluteView}>
                        <View style={styles.pickerContainer}>
                            <ScrollView>
                                {this.renderFeedbackItems()}
                            </ScrollView>
                            <View style={{ flexDirection: 'row', justifyContent: 'flex-end', padding: 10 }}>
                                <Button
                                    color="white"
                                    backgroundColor={vars.primaryColor}
                                    width={112}
                                    onPress={this.selectItem}
                                    title="Выбрать" />
                                <Button
                                    color="black"
                                    backgroundColor={vars.cointainerBackgroundColor}
                                    width={112}
                                    onPress={this.onCancelPress}
                                    title="Отмена"
                                    style={{ container: { marginLeft: 20 } }} />
                            </View>
                        </View>
                    </View>
                </Modal>
            </View>
        );
    }
}
