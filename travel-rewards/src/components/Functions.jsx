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


//function to calculate if the date is within 30, 90 days, or past due
export function getTimeRemaining(date) {
  const today = new Date();
  const expiringDate = new Date(date);

  // Calculate difference in days, getTime is in milliseconds, round up, (seconds * minutes * hours * 24 hours)
  const diffInTime = expiringDate.getTime() - today.getTime();
  const diffInDays = Math.ceil(diffInTime / (1000 * 60 * 60 * 24));

  // Return css class name
  if (diffInDays < 0 || diffInDays <= 30) {
    return 'red';
  } else if (diffInDays <= 90) {
    return 'orange';
  } else {
    return 'green';
  }
}
