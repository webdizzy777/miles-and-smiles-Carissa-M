//function to format date if input from the date picker
export function formatDate(date){
    let formattedDate = "";
    if(/^\d{4}-\d{2}-\d{2}$/.test(date)){
        const [year, month, day] = date.split("-");
        formattedDate = `${month}/${day}/${year}`;
        return formattedDate;
    }else{
        formattedDate = date;
        return formattedDate;
    }
}

//create a function to format numbers as currency
export function formatCurrency(num){
    let formatted = new Intl.NumberFormat('en-US',{
        style: 'currency',
        currency: 'USD',
    }).format(num);

    return formatted;
}

//function to format due date
export function formatDueDate(dueDate){
    if(dueDate == 1 || dueDate == 21 || dueDate == 31){
        return `${dueDate}st`;
    }else if(dueDate == 2 || dueDate == 22){
        return `${dueDate}nd`;
    }else if(dueDate == 3 || dueDate == 23){
        return `${dueDate}rd`;
    }else if((dueDate >= 4 && dueDate <= 20) || (dueDate >= 24 && dueDate <= 30)){
        return `${dueDate}th`;
    }else{
        return "-";
    }
}