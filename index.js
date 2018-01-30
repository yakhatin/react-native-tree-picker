import React, { Component } from 'react';
import PropTypes from 'prop-types';
import OneElPicker from './src/oneElPicker';
import MultiplePicker from './src/multiplePicker';

export default class TreePicker extends Component {
    static propTypes = {
        multipleSelection: PropTypes.bool,
        title: PropTypes.string.isRequired,
        data: PropTypes.arrayOf(PropTypes.object).isRequired,
        onPress: PropTypes.func.isRequired,
        selectParent: PropTypes.bool,
        selectAllChildren: PropTypes.bool,
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
        firstBtnTitle: PropTypes.string,
        scndBtnTitle: PropTypes.string,
        customTitle: PropTypes.func,
        clearAfterSelect: PropTypes.bool
    }

    static defaultProps = {
        multipleSelection: false,
        selectParent: false,
        selectAllChildren: false,
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
        scndBtnTitle: null,
        customTitle: null,
        clearAfterSelect: false
    }

    render() {
        if (!this.props.multipleSelection) {
            return (
                <OneElPicker
                    title={this.props.title}
                    data={this.props.data}
                    onPress={this.props.onPress}
                    selectParent={this.props.selectParent}
                    style={this.props.style}
                    firstBtnTitle={this.props.firstBtnTitle}
                    scndBtnTitle={this.props.scndBtnTitle}
                    customTitle={this.props.customTitle}
                    clearAfterSelect={this.props.clearAfterSelect} />
            );
        }
        return (
            <MultiplePicker
                title={this.props.title}
                data={this.props.data}
                onPress={this.props.onPress}
                selectParent={this.props.selectParent}
                selectAllChildren={this.props.selectAllChildren}
                style={this.props.style}
                firstBtnTitle={this.props.firstBtnTitle}
                scndBtnTitle={this.props.scndBtnTitle}
                customTitle={this.props.customTitle}
                clearAfterSelect={this.props.clearAfterSelect} />
        );
    }
}
