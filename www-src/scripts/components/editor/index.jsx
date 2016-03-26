const React = require('react');

class Editor extends React.Component {

    constructor (props, context) {

        super(props, context);

        this.state = {
            code: 'åk fram 10 steg\rsnurra till höger 2 steg\rvänta 10 sekunder\råk bak 1 steg' 
        };

    }

    codeChange (e) {
        this.setState({ code: e.currentTarget.value });
    }

    render () {

        return (
            <div className="editor--container">
                <div className="editor--textarea-container">
                    <textarea className="editor--textarea" onChange={this.codeChange.bind(this)} value={this.state.code}></textarea>
                </div>
                <div><button>Kör</button></div>
            </div>
        );

    }

}

module.exports = Editor;
