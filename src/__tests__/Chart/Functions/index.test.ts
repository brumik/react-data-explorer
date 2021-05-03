import functions from '../../../components/Chart/Functions/';

describe('Chart/Functions/index', () => {
    test('should return an object of functions with 3 entries', () => {
        expect(Object.keys(functions)).toEqual([
            'onClick', 'axisFormat', 'fetchFnc'
        ]);
    })
});