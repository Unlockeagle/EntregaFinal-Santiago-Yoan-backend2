import TicketRepository from "../repositories/ticket.repository.js";

class TicketService{
    async createTicket({dataTicket}){
        return TicketRepository.create({dataTicket})
    }
    async getTickets(){
        return TicketRepository.getTickets()
    }
    async getTicketById(tid){
        return TicketRepository.getTicketById(tid)
    }
    async updateTicket(tid, dataTicket){
        return TicketRepository.updateTicket(tid, dataTicket)
    }
}

export default new TicketService()