import Dayjs from 'dayjs';

const getCorrectMonth = (num) => {
    let month;
    switch (num) {
        case '01':
            month = '00';
            break;
        case '02':
            month = '01';
            break;
        case '03':
            month = '02';
            break;
        case '04':
            month = '03';
            break;
        case '05':
            month = '04';
            break;
        case '06':
            month = '05';
            break;
        case '07':
            month = '06';
            break;
        case '08':
            month = '07';
            break;
        case '09':
            month = '08';
            break;
        case '10':
            month = '09';
            break;
        case '11':
            month = '10';
            break;
        case '12':
            month = '11';
            break;
        default:
            month = num;
            break;
    }
    return month;
};

/* export const convertDateForApi = (data) => {
  console.log(data, typeof data);
  let comingDate;
  if (!data) comingDate = new Date();

  if (typeof data === "object") {
    console.log("object is true");
    comingDate = data;
  } else if (data.includes("GMT")) {
    console.log("GMT is true");
    comingDate = new Date(data);
  } else if (data.includes("/")) {
    console.log("/ is true");
    comingDate = convertDataFromTable(data);
  } */

export const convertDateForApi = (data) => {
    console.log(data, typeof data);
    let comingDate;
    if (!data) comingDate = new Date();

    if (String(data).includes('/')) {
        comingDate = convertDataFromTable(data);
    } else {
        comingDate = new Date(data);
    }

    let day = String(comingDate.getDate());
    let month = String(comingDate.getMonth() + 1);
    const year = String(comingDate.getFullYear());
    day = day.length === 1 ? `0${day}` : day;
    month = month.length === 1 ? `0${month}` : month;
    const date = `${year}${day}${month}`;
    return date;
};

export const convertDataFromTable = (data) => {
    // console.log(data);
    const correctedData = data.replaceAll('/', '');
    const day = correctedData.slice(0, 2);
    let month = correctedData.slice(2, 4);
    month = getCorrectMonth(month);
    const year = correctedData.slice(4, 8);
    const date = new Date(year, month, day);
    console.log(date, typeof date);
    return date;
};

export const convertDataForTable = (data) => {
    if (data.includes('NaN')) return '';
    const year = data.slice(0, 4);
    const day = data.slice(4, 6);
    let month = data.slice(6, 8);

    return `${day}/${month}/${year}`;
};

// gpt suggestion
// function parseDate(inputValue, format) {
//     const parts = inputValue.split('/');
//     const day = parseInt(parts[0], 10);
//     const month = parseInt(parts[1], 10) - 1;
//     const year = parseInt(parts[2], 10);
//     const date = new Date(year, month, day);
//     return date;
//   }

export const formatDateForApi = (value) => {
    return Dayjs(value).format('YYYYDDMM');
};
export const formatDateForEdit = (value) => {
    return Dayjs(value, 'DD-MM-YYYY');
};
export const formatDateForTable = (value) => {
    const date = Dayjs(value, 'YYYYDDMM');
    return Dayjs(date).format('DD/MM/YYYY');
};
