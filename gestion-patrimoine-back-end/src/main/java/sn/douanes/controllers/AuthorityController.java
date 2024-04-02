package sn.douanes.controllers;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;
import sn.douanes.entities.Authorities;
import sn.douanes.entities.HttpResponse;
import sn.douanes.services.AuthorityService;

import java.util.List;

import static org.springframework.http.HttpStatus.OK;


@RestController
@RequestMapping( "/api")
public class AuthorityController {

    @Autowired
    AuthorityService authorityService;


    @GetMapping("/Authorities")
    @PreAuthorize("hasAnyAuthority('ADMINISTRATEUR')")
    public ResponseEntity<List<Authorities>> getAllAjouterAuthorities() {
        List<Authorities> authority = authorityService.getAllAuthorities();
        return new ResponseEntity<>(authority, OK);
    }

    @PostMapping("/AjouterAuthority")
    @PreAuthorize("hasAnyAuthority('ADMINISTRATEUR')")
    public Authorities AjouterAjouterAuthority(@RequestBody Authorities authority) {
        return authorityService.saveAuthority(authority);
    }


    @PutMapping("/ModifierAuthority")
    @PreAuthorize("hasAnyAuthority('ADMINISTRATEUR')")
    public Authorities ModifierAuthority(@RequestBody Authorities t) {

        return authorityService.updateAuthority(t);
    }

    @DeleteMapping("SupprimerAuthorityById/{id}")
    @PreAuthorize("hasAnyAuthority('ADMINISTRATEUR')")
    public void SupprimerAuthorityById(@PathVariable("id") Integer authorityId) {
        authorityService.deleteAuthorityById(authorityId);
    }


    private ResponseEntity<HttpResponse> response(HttpStatus httpStatus, String message) {
        return new ResponseEntity<>(
                new HttpResponse(httpStatus.value(), httpStatus, httpStatus.getReasonPhrase().toUpperCase(), message), httpStatus
        );
    }


}
