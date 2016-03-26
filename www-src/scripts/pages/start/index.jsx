const React = require('react');
const Editor = require('../../components/editor');

class Start extends React.Component {

    constructor (props, context) {
        super(props, context);
    }


    render () {

        return (
            <div>
                <Editor/>
            </div>
        );

    }

}

module.exports = Start;
