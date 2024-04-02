package sn.douanes.controllersSupprimer;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;
import sn.douanes.entities.HttpResponse;
import sn.douanes.servicesSupprimer.TicketsService;

import java.util.List;

import static org.springframework.http.HttpStatus.OK;


@RestController
////@RequestMapping(path = { "/", "/user"})
//@RequestMapping( "/")
//@CrossOrigin("http://localhost:4200")
public class TicketsController {

    @Autowired
    TicketsService ticketsService;


    @GetMapping("/Tickets")
    @PreAuthorize("hasAnyAuthority('ADMINISTRATEUR')")
    public ResponseEntity<List<Tickets>> getAllTickets() {
        List<Tickets> tickets = ticketsService.getAllTickets();
        return new ResponseEntity<>(tickets, OK);
    }

    @PostMapping("/AjouterTickets")
    @PreAuthorize("hasAnyAuthority('ADMINISTRATEUR')")
    public Tickets AjouterTickets(@RequestBody Tickets t) {
        return ticketsService.saveTickets(t);
    }

    @PutMapping("/ModifierTickets")
    @PreAuthorize("hasAnyAuthority('ADMINISTRATEUR')")
    public Tickets ModifierTickets(@RequestBody Tickets t) {

        return ticketsService.updateTickets(t);
    }

    @DeleteMapping("SupprimerTicketsById/{id}")
    @PreAuthorize("hasAnyAuthority('ADMINISTRATEUR')")
    public void SupprimerTicketsById(@PathVariable("id") Long numero_ticket) {
        ticketsService.deleteTicketsById(numero_ticket);
    }


    private ResponseEntity<HttpResponse> response(HttpStatus httpStatus, String message) {
        return new ResponseEntity<>(
                new HttpResponse(httpStatus.value(), httpStatus, httpStatus.getReasonPhrase().toUpperCase(), message), httpStatus
        );
    }



}
