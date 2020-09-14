import addZeroIfSingleDigit from './addZeroIfSingleDigit'

export default function(num, max, add = true, by = 1) {
    num = parseInt(num);
    (add) ? num = num + by : num = num - by

    if (num < max) {
        if (add) {
            return addZeroIfSingleDigit(num)
        } else {
            if (num < 0) {
                return num = max - 1
            }
        return addZeroIfSingleDigit(num)
        }
    } else {
        return '00';
    }
}