# react-native-tree-picker

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

    render() {
        return (
            <View style={{ flex: 1 }}>
                <TreePicker 
                    title="Select" 
                    data={data}
                    onPress={this.onPress} />
            </View>
        );
    }
}
	
```