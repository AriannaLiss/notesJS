export const shortText = (text, length = 28) => {
    if (Array.isArray(text)) return text.join(', ')
    return text.length>length ? text.slice(0,length)+'...' : text;
}

export const dateAsText = date => new Date(date).toLocaleDateString('en-US');
