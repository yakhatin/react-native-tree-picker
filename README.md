# react-native-tree-picker

# Props
```javascript
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
        customTitle: PropTypes.func
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
        customTitle: null
    }
    
```
# Example
```javascript
import React, { Component } from 'react';
import { View } from 'react-native';
import TreePicker from 'react-native-tree-picker';

const data = [
    {
        Id, 
        Title, 
        Children: [
            {
                Id, 
                Title,
                < Here Children can be too >
            }
        ]
    },
    {
        Id, 
        Title,
        Children: []
    }
];

export default class Test extends Component {
    onPress = (selected) => {
        alert(JSON.stringify(selected));
    }
    
    customTitle = (funcShowPicker) => {
    	<Text onPress={funcShowPicker}>
	     Show picker
	</Text>
    }

    render() {
        return (
            <View style={{ flex: 1 }}>
                <TreePicker 
                    title="Select" 
                    data={data}
                    onPress={this.onPress}
                    selectParent={true} />
		<TreePicker 
                    title="Select" 
                    data={data}
                    onPress={this.onPress}
                    selectParent={true}
		    customTitle={this.customTitle}/>
            </View>
        );
    }
}
	
```
