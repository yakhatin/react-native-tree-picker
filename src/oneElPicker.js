import React, { Component } from 'react';
import { View, Text, Modal, TouchableOpacity, ScrollView } from 'react-native';
import PropTypes from 'prop-types';
import { ThemeProvider, Icon } from 'react-native-material-ui';
import { picker as styles } from './theme/styles';
import TouchableItem from './touchableItem';
import Button from './button';

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
            }),
            firstBtnColor: PropTypes.string,
            scndBtnColor: PropTypes.string,
            firstBtnTxtColor: PropTypes.string,
            scndBtnTxtColor: PropTypes.string
        }),
        selectParent: PropTypes.bool.isRequired,
        firstBtnTitle: PropTypes.string,
        scndBtnTitle: PropTypes.string
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
            },
            firstBtnColor: '#1A3D80',
            scndBtnColor: 'white',
            firstBtnTxtColor: 'white',
            scndBtnTxtColor: 'black'
        },
        firstBtnTitle: null,
        scndBtnTitle: null
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
        if (Id === this.state.selected.Id) {
            this.setState({
                selected: {}
            });
        } else if (once) {
            this.setState({
                selected: {
                    Id,
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
                selected: this.props.selectParent ? {
                    Id,
                    [Id]: !this.state.selected[Id],
                    title
                } : this.state.selected
            });
        }
    }

    onCancelPress = () => {
        this.toVisible();
    }

    selectItem = () => {
        this.toVisible();
        this.props.onPress(this.state.selected.Id);
    }

    /**
     * Вернуть заголовок Пикера
     */
    showPickerTitle = () => (
        <View>
            <TouchableOpacity onPress={this.toVisible}>
                <View style={styles.row}>
                    <View style={{ flex: 1, justifyContent: 'center' }}>
                        <Text style={[styles.titleText, this.props.style.text]}>
                            { this.props.title }
                        </Text>
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
            if (item.Children && item.Children.length > 0) {
                return (
                    <View key={item.Id} style={{ marginLeft: margin }}>
                        <TouchableItem
                            selected={this.state.selected[item.Id]}
                            showIcon={item.Children.length > 0}
                            isOpen={this.state.showChildren[item.Id]}
                            value={item.Title}
                            onPress={() => this.onItemPress(item.Id, false, item.Title)} />
                        { this.renderChildren(item.Children, item.Id, 20) }
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
            if (item.Children && item.Children.length > 0) {
                return (
                    <View key={item.Id}>
                        <TouchableItem
                            selected={this.state.selected[item.Id]}
                            showIcon={item.Children.length > 0}
                            isOpen={this.state.showChildren[item.Id]}
                            value={item.Title}
                            onPress={() => this.onItemPress(item.Id, false, item.Title)} />
                        { this.renderChildren(item.Children, item.Id, 20) }
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
        return (
            <View>
                { this.showPickerTitle() }
                <Modal visible={this.state.visible} onRequestClose={this.toVisible} transparent>
                    <View style={styles.absoluteView}>
                        <View style={styles.pickerContainer}>
                            <ScrollView>
                                { this.renderFeedbackItems() }
                            </ScrollView>
                            <View style={{ flexDirection: 'row', justifyContent: 'flex-end', padding: 10 }}>
                                {this.state.selected.Id &&
                                <Button
                                    color={this.props.style.firstBtnTxtColor || 'white'}
                                    backgroundColor={this.props.style.firstBtnColor || '#1A3D80'}
                                    width={112}
                                    onPress={this.selectItem}
                                    title={this.props.firstBtnTitle || 'Done'} />}
                                <Button
                                    color={this.props.style.scndBtnTxtColor || 'black'}
                                    backgroundColor={this.props.style.scndBtnColor || 'white'}
                                    width={112}
                                    onPress={this.onCancelPress}
                                    title={this.props.scndBtnTitle || 'Cancel'}
                                    style={{ container: { marginLeft: 20 } }} />
                            </View>
                        </View>
                    </View>
                </Modal>
            </View>
        );
    }
}
