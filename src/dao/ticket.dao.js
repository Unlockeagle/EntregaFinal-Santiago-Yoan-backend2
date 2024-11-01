import TicketModel from "../models/ticket.model.js";

class TicketDao {
    async save( dataCart ) {
        const ticket = new TicketModel(dataCart );
        return await ticket.save();
    }
    async find() {
        return await TicketModel.find();
    }
    async findById(tid) {
        return await TicketModel.findById(tid);
    }
    async update(tid, dataTicket){
        return await TicketModel.findByIdAndUpdate(tid, dataTicket, { new: true })
    }
}

export default new TicketDao();
