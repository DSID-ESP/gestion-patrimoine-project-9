package sn.douanes.controllers;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;
import sn.douanes.entities.FonctionAgent;
import sn.douanes.entities.HttpResponse;
import sn.douanes.services.FonctionAgentService;

import java.util.List;

import static org.springframework.http.HttpStatus.OK;


@RestController
@RequestMapping( "/api")
public class FonctionAgentController {

    @Autowired
    FonctionAgentService fonctionAgentService;


    @GetMapping("/FonctionAgents")
    // @PreAuthorize("hasAnyAuthority('ADMINISTRATEUR')")
    public ResponseEntity<List<FonctionAgent>> getAllFonctionAgents() {
        List<FonctionAgent> fonctionAgents = fonctionAgentService.getAllFonctionAgents();
        return new ResponseEntity<>(fonctionAgents, OK);
    }

    @PostMapping("/AjouterFonctionAgent")
    // @PreAuthorize("hasAnyAuthority('ADMINISTRATEUR')")
    public FonctionAgent AjouterFonctionAgent(@RequestBody FonctionAgent fonctionAgent) {
        return fonctionAgentService.saveFonctionAgent(fonctionAgent);
    }


    @PutMapping("/ModifierFonctionAgent")
    // @PreAuthorize("hasAnyAuthority('ADMINISTRATEUR')")
    public FonctionAgent ModifierFonctionAgent(@RequestBody FonctionAgent f) {
        return fonctionAgentService.updateFonctionAgent(f);
    }

    @DeleteMapping("SupprimerFonctionAgentById/{codeFonctionAgent}")
    // @PreAuthorize("hasAnyAuthority('ADMINISTRATEUR')")
    public void SupprimerFonctionAgentById(@PathVariable("codeFonctionAgent") String codeFonctionAgent) {
        fonctionAgentService.deleteFonctionAgentById(codeFonctionAgent);
    }

    private ResponseEntity<HttpResponse> response(HttpStatus httpStatus, String message) {
        return new ResponseEntity<>(
                new HttpResponse(httpStatus.value(), httpStatus, httpStatus.getReasonPhrase().toUpperCase(), message), httpStatus
        );
    }

}
