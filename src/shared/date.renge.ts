const dateFormat = require("dateformat");

export class DateRange{
 
    static lastDays(numberDays: number = 1): {from,to} {
        const dates :{from,to} = this.dates()
        let from = dates.from.setDate(dates.from.getDate()-numberDays); 
        let to = dates.to; 
        to = dateFormat(to, "yyyy-mm-dd 00:00:00");
        from = dateFormat(from, "yyyy-mm-dd 00:00:00");
        return {from, to}
    }
    private static dates():{from,to}{
        return Object.assign({}, {
            from : new Date(),
            to: new Date()
        })
    }
      
}