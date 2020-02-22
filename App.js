import React, {Component} from 'react';
import {StyleSheet, Text, View, TouchableOpacity, Dimensions} from 'react-native';
import Calculator from './Calculator'
type Props = {};

//Kalkulator - Ernest Bieś, PWSZ Tarnów 2019
export default class App extends Component<Props> {
    C = new Calculator();

    constructor(props) {
        super(props);

        this._isMounted = false;
        const isPortrait = () => {
            const dim = Dimensions.get('screen');
            return dim.height >= dim.width;
        };

        // Event Listener for orientation changes
        Dimensions.addEventListener('change', () => {
            this._isMounted && this.setState({
                orientation: isPortrait() ? 'portrait' : 'landscape'
            });
        });

        this.state = {
            oper: this.C.getOperacje(),
            wysw: this.C.getWyswietl(),
            orientation: isPortrait() ? 'portrait' : 'landscape'
        };
    }

    componentDidMount() {
        this._isMounted = true;
    }

    componentWillUnmount(){
        this._isMounted = false;
    }

    onPress = () => {
        this.setState({
            oper: this.C.getOperacje(),
            wysw: this.C.getStr_liczba(),
        });
    }

    onPress_2 = () => {
        this.setState({
            oper: this.C.getOperacje(),
            wysw: this.C.getWyswietl(),
        });
    }

    onPressButton = (param) => {
        const tableNumbers = ['0','1','2','3','4', '5', '6', '7', '8', '9'];
        const tableOperators = ['+','-','*','/','=','%','v','ex','ln','s','10x','log','x2','x3'];
        if(tableNumbers.includes(param)) {
            this.C.numer(param);
            this.onPress();
        }
        if(param == '.'){
            this.C.numer('.');
            this.setState({
                wysw: this.C.getStr_liczba()
            });
        }

        if(tableOperators.includes(param)){
            this.C.oper(param);
            this.onPress_2();
        }

        if(param == '+-'){
            this.C.plusminus();
            this.setState({
                wysw: this.C.getStr_liczba()
            });
        }

        if(param == 'AC'){
            this.C.clear();
            this.onPress_2();
        }

        if(param == 'backspace'){
            this.C.backspace();
            this.setState({
                wysw: this.C.getStr_liczba()
            });
        }

        if(param == 'PI'){
            let PI = Math.PI.toString();
            this.C.numer(PI);
            this.onPress();
        }
        if(param == 'E'){
            let E = Math.E.toString();
            this.C.numer(E);
            this.onPress();
        }
    }

    render() {
        const generateButtons = (param) => {
            return param.map((item) => {
                return (
                    <TouchableOpacity key={item.key} onPress={this.onPressButton.bind(this,item.key)}
                                      style={[styles.buttonView, {backgroundColor: item.backgroundColor}]}><Text style={styles.buttonStyle}>{item.title}</Text></TouchableOpacity>
                )
            });
        }

        if (this.state.orientation === 'portrait') {
            return (
                <View style={styles.parentView}>
                    <View style={styles.blueView}>
                        <Text numberOfLines={2} style={styles.textStyle2}>{this.state.oper}</Text>
                        {
                            this.state.wysw === 'Nieprawidłowe dane' || this.state.wysw === 'Dzielenie przez zero'
                                ? <Text numberOfLines={2} style={styles.textStyleError}>{this.state.wysw}</Text> :
                                <Text numberOfLines={2} style={styles.textStyle}>{this.state.wysw}</Text>
                        }
                    </View>
                    <View style={styles.parentView2}>
                        <View style={styles.buttonBox}>
                            {generateButtons(buttons[0])}
                        </View>
                        <View style={styles.buttonBox}>
                            {generateButtons(buttons[1])}
                        </View>
                        <View style={styles.buttonBox}>
                            {generateButtons(buttons[2])}
                        </View>
                        <View style={styles.buttonBox}>
                            {generateButtons(buttons[3])}
                        </View>
                    </View>
                </View>
            );
        }else {
            return(
                <View style={styles.parentView}>
                    <View style={styles.blueView}>
                        <Text numberOfLines={2} style={landscapeStyles.textStyle2}>{this.state.oper}</Text>
                        <Text numberOfLines={2} style={landscapeStyles.textStyle}>{this.state.wysw}</Text>
                    </View>
                    <View style={styles.parentView2}>
                        <View style={styles.buttonBox}>
                            {generateButtons(buttons[4])}
                        </View>
                        <View style={styles.buttonBox}>
                            {generateButtons(buttons[5])}
                        </View>
                        <View style={styles.buttonBox}>
                            {generateButtons(buttons[0])}
                        </View>
                        <View style={styles.buttonBox}>
                            {generateButtons(buttons[1])}
                        </View>
                        <View style={styles.buttonBox}>
                            {generateButtons(buttons[2])}
                        </View>
                        <View style={styles.buttonBox}>
                            {generateButtons(buttons[3])}
                        </View>
                    </View>
                </View>
            );
        }
    }

}

const styles = StyleSheet.create({
    parentView: {
        flex: 1,
    },
    parentView2: {
        flex: 2,
        flexDirection: 'row'
    },
    blueView: {
        flex: 1,
        justifyContent: 'flex-end',
        alignItems: 'flex-end',
        backgroundColor: '#1E90FF'
    },
    buttonBox: {
        flex: 1,
        backgroundColor: '#696969'
    },
    buttonView: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#696969',
        borderWidth: 0.5
    },
    buttonStyle: {
        color: 'white',
        fontSize: 35
    },
    textStyle: {
        color: 'white',
        justifyContent: 'center',
        alignItems: 'center',
        fontSize: 90
    },
    textStyleError: {
        color: 'white',
        justifyContent: 'center',
        alignItems: 'center',
        fontSize: 50
    },
    textStyle2: {
        color: 'black',
        justifyContent: 'center',
        alignItems: 'center',
        fontSize: 30
    }
});

const landscapeStyles = StyleSheet.create({
    textStyle: {
        color: 'white',
        justifyContent: 'center',
        alignItems: 'center',
        fontSize: 60
    },
    textStyle2: {
        color: 'black',
        justifyContent: 'center',
        alignItems: 'center',
        fontSize: 20
    }
});

const buttons = [
    [
        {
            title: 'AC',
            key: 'AC',
            backgroundColor: '#696969'
        },
        {
            title: '1',
            key: '1',
            backgroundColor: '#696969'
        },
        {
            title: '4',
            key: '4',
            backgroundColor: '#696969'
        },
        {
            title: '7',
            key: '7',
            backgroundColor: '#696969'
        },
        {
            title: '+/-',
            key: '+-',
            backgroundColor: '#696969'
        },
    ],
    [
        {
            title: '%',
            key: '%',
            backgroundColor: '#696969'
        },
        {
            title: '2',
            key: '2',
            backgroundColor: '#696969'
        },
        {
            title: '5',
            key: '5',
            backgroundColor: '#696969'
        },
        {
            title: '8',
            key: '8',
            backgroundColor: '#696969'
        },
        {
            title: '0',
            key: '0',
            backgroundColor: '#696969'
        },
    ],
    [
        {
            title: '<-',
            key: 'backspace',
            backgroundColor: '#696969'
        },
        {
            title: '3',
            key: '3',
            backgroundColor: '#696969'
        },
        {
            title: '6',
            key: '6',
            backgroundColor: '#696969'
        },
        {
            title: '9',
            key: '9',
            backgroundColor: '#696969'
        },
        {
            title: ',',
            key: '.',
            backgroundColor: '#696969'
        },
    ],
    [
        {
            title: '÷',
            key: '/',
            backgroundColor: '#FFA500'
        },
        {
            title: '×',
            key: '*',
            backgroundColor: '#FFA500'
        },
        {
            title: '-',
            key: '-',
            backgroundColor: '#FFA500'
        },
        {
            title: '+',
            key: '+',
            backgroundColor: '#FFA500'
        },
        {
            title: '=',
            key: '=',
            backgroundColor: '#FFA500'
        },
    ],
    [
        {
            title: 'y√x',
            key: 'v',
            backgroundColor: '#696969'
        },
        {
            title: 'eⁿ',
            key: 'ex',
            backgroundColor: '#696969'
        },
        {
            title: 'ln',
            key: 'ln',
            backgroundColor: '#696969'
        },
        {
            title: 'e',
            key: 'E',
            backgroundColor: '#696969'
        },
        {
            title: 'PI',
            key: 'PI',
            backgroundColor: '#696969'
        },
    ],
    [
        {
            title: 'n!',
            key: 's',
            backgroundColor: '#696969'
        },
        {
            title: '10ⁿ',
            key: '10x',
            backgroundColor: '#696969'
        },
        {
            title: 'log10',
            key: 'log',
            backgroundColor: '#696969'
        },
        {
            title: 'n²',
            key: 'x2',
            backgroundColor: '#696969'
        },
        {
            title: 'n³',
            key: 'x3',
            backgroundColor: '#696969'
        },
    ]
];
