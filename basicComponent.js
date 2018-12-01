const reactBasic = `import React, { Component } from 'react';

    
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

export default ${process.argv[4]};`;

const reactNativeBasic = `
import { View, Text } from 'react-native';
import React, { Component } from 'react';
import { connect } from 'react-redux';

class ${process.argv[4]} extends Component {
    constructor(props) {
        super(props);
        this.state = {  };
    }
    render() {
        return (
            <View style={{alignItems:"center", justifyContent:"center"}}>
                <Text>${process.argv[4]}</Text>
            </View>
        );
    }
}

export default ${process.argv[4]};


const stateToProps = state => ({})
const ${process.argv[4]}Page = connect(stateToProps, {})(${process.argv[4]})


export default ${process.argv[4]}Page`;

module.exports = { reactBasic, reactNativeBasic };
