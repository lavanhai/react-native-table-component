import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {StyleSheet, TouchableOpacity, View} from 'react-native';
import {Cell} from './cell';
import {sum} from '../utils';

export class Row extends Component {
    static propTypes = {
        style: PropTypes.object,
        textStyle: PropTypes.object
    };

    render() {
        const {
            data,
            style,
            widthArr,
            height,
            flexArr,
            textStyle,
            cellTextStyle,
            handleOnPress,
            index,
            ...props
        } = this.props;
        let width = widthArr ? sum(widthArr) : 0;

        return data ? (
            <TouchableOpacity
                disabled={!handleOnPress}
                onPress={ () => handleOnPress(data, index)}
                style={[height && {height}, width && {width}, styles.row, style]}>
                {data.map((item, i) => {
                    const flex = flexArr && flexArr[i];
                    const wth = widthArr && widthArr[i];
                    return (
                        <Cell
                            key={i}
                            data={item}
                            width={wth}
                            height={height}
                            flex={flex}
                            textStyle={[cellTextStyle && cellTextStyle(item), textStyle]}
                            {...props}
                        />
                    );
                })}
            </TouchableOpacity>
        ) : null;
    }
}

export class Rows extends Component {
    static propTypes = {
        style: PropTypes.object,
        textStyle: PropTypes.object
    };

    render() {
        const {data, style, widthArr, heightArr, flexArr, textStyle, ...props} = this.props;
        const flex = flexArr ? sum(flexArr) : 0;
        const width = widthArr ? sum(widthArr) : 0;

        return data ? (
            <View style={[flex && {flex}, width && {width}]}>
                {data.map((item, i) => {
                    const height = heightArr && heightArr[i];
                    return (
                        <Row
                            key={i}
                            index={i}
                            data={item}
                            widthArr={widthArr}
                            height={height}
                            flexArr={flexArr}
                            style={style}
                            textStyle={textStyle}
                            {...props}
                        />
                    );
                })}
            </View>
        ) : null;
    }
}

const styles = StyleSheet.create({
    row: {
        flexDirection: 'row',
        overflow: 'hidden'
    }
});
