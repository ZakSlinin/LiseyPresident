export function itemPipe(data, key) {
    let item = data[key];
    if (item && item.startsWith('http://127.0.0.1:8001/')) {
        item = item.replace('http://127.0.0.1:8001/', 'https://www.kringeproduction.ru/files/');
    }
    return item;
}