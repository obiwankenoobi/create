const reactBasic = name => `import React, { Component } from 'react';

    
class ${process.argv[4]} extends Component {
    constructor(props) {
        super(props);
        this.state = {  };
    }
    render() {
        return (
            <view style={{}}>
                <p>Hello</p>
            </view>
        );
    }
}

export default ${name};`;

const reactNativeBasic = name => `
import { View, Text } from 'react-native';
import React, { Component } from 'react';
import { connect } from 'react-redux';

class ${name} extends Component {
    constructor(props) {
        super(props);
        this.state = {  };
    }
    render() {
        return (
            <View style={{alignItems:"center", justifyContent:"center"}}>
                <Text>${name}</Text>
            </View>
        );
    }
}

export default ${name};


const stateToProps = state => ({})
const ${name}Page = connect(stateToProps, {})(${name})


export default ${name}Page`;

module.exports = { reactBasic, reactNativeBasic };
