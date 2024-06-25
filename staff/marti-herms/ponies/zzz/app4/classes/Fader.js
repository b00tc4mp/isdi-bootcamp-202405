class Fader extends Component {
    constructor() {
        super(document.createElement('div'));
        this.container.className = 'fader';
    }

    setDisplay(display) {
        if (display !== 'none' && display !== 'flex') {
            throw new Error('invalid argument');
        }
        this.container.style.display = display;
    }
}