package sn.douanes.controllers;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;
import sn.douanes.entities.HttpResponse;
import sn.douanes.entities.Sections;
import sn.douanes.entities.UniteDouaniere;
import sn.douanes.services.SectionsService;

import java.util.List;

import static org.springframework.http.HttpStatus.OK;
import static sn.douanes.constants.ApplicationConstants.PRESTATAIRES_DELETED_SUCCESSFULLY;
import static sn.douanes.constants.ApplicationConstants.SECTIONS_DELETED_SUCCESSFULLY;


@RestController
@RequestMapping( "/api")
public class SectionsController {

    @Autowired
    SectionsService sectionsService;


    @GetMapping("/Sections")
    // @PreAuthorize("hasAnyAuthority('ADMINISTRATEUR')")
    public ResponseEntity<List<Sections>> getAllSectionss() {
        List<Sections> sections = sectionsService.getAllSectionss();
        return new ResponseEntity<>(sections, OK);
    }

    @PostMapping("/AjouterSections")
    // @PreAuthorize("hasAnyAuthority('ADMINISTRATEUR')")
    public Sections AjouterSections(@RequestBody Sections sections) {
        return sectionsService.saveSections(sections);
    }


    @PutMapping("/ModifierSections")
    // @PreAuthorize("hasAnyAuthority('ADMINISTRATEUR')")
    public Sections ModifierSections(@RequestBody Sections t) {

        return sectionsService.updateSections(t);
    }

    @DeleteMapping("SupprimerSectionsById/{codeSection}")
    // @PreAuthorize("hasAnyAuthority('ADMINISTRATEUR')")
    public ResponseEntity<HttpResponse> SupprimerSectionsById(@PathVariable("codeSection") String codeSection) {

        sectionsService.deleteSectionsById(codeSection);
        return response(OK, SECTIONS_DELETED_SUCCESSFULLY);
    }


    private ResponseEntity<HttpResponse> response(HttpStatus httpStatus, String message) {
        return new ResponseEntity<>(
                new HttpResponse(httpStatus.value(), httpStatus, httpStatus.getReasonPhrase().toUpperCase(), message), httpStatus
        );
    }


}
