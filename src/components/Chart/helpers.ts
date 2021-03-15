export const snakeToSentence = (str: string): string => {
    const sentence = str.toLowerCase().split('_');
    sentence[0] = sentence[0][0].toUpperCase() + sentence[0].slice(1);
    return sentence.join(' ');
}