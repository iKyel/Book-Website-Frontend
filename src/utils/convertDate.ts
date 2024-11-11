


const convertDate = (datetime: string) => {
    if (datetime) {
        const date = new Date(datetime);

        // Lấy từng thành phần và định dạng chúng với 2 chữ số nếu cần
        const hours = date.getHours().toString().padStart(2, "0");
        const minutes = date.getMinutes().toString().padStart(2, "0");
        const seconds = date.getSeconds().toString().padStart(2, "0");
        const day = date.getDate().toString().padStart(2, "0");
        const month = (date.getMonth() + 1).toString().padStart(2, "0");
        const year = date.getFullYear();

        // Kết hợp thành chuỗi định dạng mong muốn
        const formattedDate = `${hours}:${minutes}:${seconds} ${day}/${month}/${year}`;

        return formattedDate;
    }
    return datetime;
}

export default convertDate;