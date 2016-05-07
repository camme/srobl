const React = require('react');
const actions = require('../../actions');
const Button = require('../button');
const PEG = require('pegjs');

let parser;

class Editor extends React.Component {

    constructor (props, context) {

        super(props, context);

        this.state = {
            code: 'åk fram 10 steg\rsnurra till höger 2 steg\rvänta 10 sekunder\råk bak 1 steg' 
        };

        let grammar = decodeURI(props.appState.grammar);
        parser = PEG.buildParser(grammar);

    }

    translate (content) {
        let translated = content;
        translated = translated.replace(/Expected/g, 'Förväntade');
        translated = translated.replace(/ or /g, ' eller ');
        translated = translated.replace(/but "(.*)?" found/, 'men hittade "$1"');
        translated = translated.replace(/end of input/, 'slutet av meningen');
        translated = translated.replace(/\[\\r\\n\]/g, 'ny rad');
        return translated;
    }

    fixEncoding (content) {
        let fixedContent = content.replace(/\\xE5/g, 'å').replace(/\\xE4/g, 'ä').replace(/\\xF6/g, 'ö');
        return fixedContent;
    }

    runCode () {
        actions.code.run(this.state.code);
    }

    codeChange (e) {
        let code = e.currentTarget.value;
        let state = { code: code, error: null };
        try {
            parser.parse(code);
        } catch (err) {
            state.error = this.translate(this.fixEncoding(err.message));
        }
        this.setState(state);
    }

    render () {

        let error;
        let button;
        if (this.state.error) {
            error = (
                <div className="editor--error">
                    {this.state.error}
                </div>
            );
            button = (<div><Button type="error" disabled="true">Kör</Button></div>);
        } else {
            error = (
                <div className="editor--no-error">
                    <div>Koden ser bra ut.</div>
                    <div>Bra jobbat!</div>
                </div>
            );
            button = (<div><Button onClick={this.runCode.bind(this)}>Kör</Button></div>);
        }

        return (
            <div className="editor--container">
                <div className="editor--textarea-container">
                    <textarea className="editor--textarea" onChange={this.codeChange.bind(this)} value={this.state.code}></textarea>
                    {error}
                </div>
                <div className="editor--actions-container">
                    {button}
                </div>
            </div>
        );

    }

}

module.exports = Editor;
