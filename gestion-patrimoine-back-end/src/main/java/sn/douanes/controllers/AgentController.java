package sn.douanes.controllers;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;
import sn.douanes.entities.Agent;
import sn.douanes.entities.HttpResponse;
import sn.douanes.services.AgentService;

import java.util.List;

import static org.springframework.http.HttpStatus.OK;
import static sn.douanes.constants.ApplicationConstants.AGENT_DELETED_SUCCESSFULLY;


@RestController
@RequestMapping( "/api")
public class AgentController {

    @Autowired
    AgentService agentService;


    @GetMapping("/Agents")
    // @PreAuthorize("hasAnyAuthority('ADMINISTRATEUR')")
    public ResponseEntity<List<Agent>> getAllAgents() {
        List<Agent> agents = agentService.getAllAgents();
        return new ResponseEntity<>(agents, OK);
    }

    @PostMapping("/AjouterAgent")
    // @PreAuthorize("hasAnyAuthority('ADMINISTRATEUR')")
    public Agent AjouterAgent(@RequestBody Agent agent) {
        return agentService.saveAgent(agent);
    }

    @PutMapping("/ModifierAgent")
    // @PreAuthorize("hasAnyAuthority('ADMINISTRATEUR')")
    public Agent ModifierAgent(@RequestBody Agent a) {
        return agentService.updateAgent(a);
    }

    @DeleteMapping("SupprimerAgentById/{matriculeAgent}")
    // @PreAuthorize("hasAnyAuthority('ADMINISTRATEUR')")
    public ResponseEntity<HttpResponse> SupprimerAgentById(@PathVariable("matriculeAgent") String matriculeAgent) {
        agentService.deleteAgentById(matriculeAgent);
        return response(OK, AGENT_DELETED_SUCCESSFULLY);
    }

    @GetMapping("RecupererAgentById/{matriculeAgent}")
    // @PreAuthorize("hasAnyAuthority('ADMINISTRATEUR')")
    public Agent RecupererAgentById(@PathVariable("matriculeAgent") String matriculeAgent) {
        return agentService.getAgentByMatriculeAgent(matriculeAgent);
    }

    private ResponseEntity<HttpResponse> response(HttpStatus httpStatus, String message) {
        return new ResponseEntity<>(
                new HttpResponse(httpStatus.value(), httpStatus, httpStatus.getReasonPhrase().toUpperCase(), message), httpStatus
        );
    }

}
