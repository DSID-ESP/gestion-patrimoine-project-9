package sn.douanes.servicesSupprimer;

import java.util.List;

public interface TicketsService {

    Tickets saveTickets(Tickets t);
    Tickets updateTickets(Tickets t);
    void deleteTickets(Tickets t);
    void deleteTicketsById(Long id);
    Tickets getTickets(Long id);
    List<Tickets> getAllTickets();


}
