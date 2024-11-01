import TicketDao from "../dao/ticket.dao.js"

class TicketRepository{
    async create(dataTicket){
        return await TicketDao.save(dataTicket)
    }
    async getTickets(){
        return await TicketDao.find()
    }
    async getTicketById(tid){
        return await TicketDao.findById(tid)
    }
    async updateTicket(tid, dataTicket){
        return await TicketDao.update(tid, dataTicket)
    }
    async countDocuments(){
        return await TicketDao.countDocuments()
    }
}

export default new TicketRepository()