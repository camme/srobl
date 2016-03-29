const React = require('react');
const Editor = require('../../components/editor');

class Start extends React.Component {

    constructor (props, context) {
        super(props, context);
    }


    render () {

        return (
            <div>
                <h1 className="start--title">SROBL</h1>
                <Editor appState={this.props.appState}/>
            </div>
        );

    }

}

module.exports = Start;
