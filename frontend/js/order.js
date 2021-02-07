class Order {
    constructor() {
        this.arrayOrders = [];
        //localStorage.removeItem('orders');
    }
    createOrdersArray() {
        var orders = localStorage.getItem("orders");
        if (orders === null) {
            console.log('aucun historique de commandes');
        } else {
            this.arrayOrders = JSON.parse(orders);
        } 
    } 

    appendOrder(order) {
        this.arrayOrders.push(order);
        //console.log(this.arrayOrders);
        localStorage.removeItem('orders');
        localStorage.setItem('orders', JSON.stringify(this.arrayOrders));
        //console.log(`commandes : ${this.arrayOrders}`);
        //console.log(JSON.parse(localStorage.getItem('orders')));
    }

    returnArrayOrders() {
        return this.arrayOrders;
    }
    
    returnArrayOrdersLastRecord() {
        return this.arrayOrders[this.arrayOrders.length - 1];
    }

    static returnOrdersTable() {
        let oldOrders = JSON.parse(localStorage.getItem('orders'));
        return oldOrders;
    }

}